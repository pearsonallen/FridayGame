let azure = require("azure-storage");
const { v4: uuidv4 } = require('uuid');

module.exports = async function (context, req) {

  context.log('JavaScript HTTP trigger function processed a request.');
  const symbolGen = new SymbolGenerator(req.query.difficulty == null ? 1 : req.query.difficulty);
  
  var tableSvc = azure.createTableService('miscprojectsstorage',process.env["AzureTableStorageAccessKey"]);
    var uniqueID = uuidv4();
    var entity = {
        PartitionKey: {'_':'1'},
        RowKey: {'_':uniqueID},
        Data: {'_':JSON.stringify(symbolGen.getCorrectOrders())}
    };
    let r = await insertEntity(tableSvc, "fridaygame", entity);

    if (r[".metadata"].etag != null) {
      context.res = {
        body: uniqueID
      }
    }
}

async function insertEntity(tableService, ...args) {
  return new Promise((resolve, reject) => {
    let promiseHandling = (err, result) => {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    };
    args.push(promiseHandling);
    tableService.insertEntity.apply(tableService, args);
  });
};

class SymbolGenerator {
  constructor(difficulty) {
    this.difficulty = difficulty;
    this.symbolLists = this.getSymbols();
    this.shuffledSymbolLists = this.getShuffledSymbolLists(JSON.parse(JSON.stringify(this.symbolLists)));
  }

  getShuffledSymbolLists = (s) => {
    let ShuffledOrdLib = s.map((item) => {
      return this.shuffle(item);
    });

    return ShuffledOrdLib;
  }

  getSymbols = () => {
    let symbolLibrary = [
      "✰✱✲✳✴✵✶✷✸✹✺✻".split(""),
      "✼✽✾✿❀❁❂❃❄❅❆❇".split(""),
      "❡❢❣❤❥❦❧❏❐❑❒❈".split(""),
      "❬❭❮❯❰❱❲❳❴❵❶❉".split(""),
      "➜➝➞➟➠➡➢➣➤➥➦❊".split("")
    ];
    if (this.difficulty === '3') {
      symbolLibrary = [].concat(...symbolLibrary);
      symbolLibrary = this.shuffle(symbolLibrary);
      const r = [];
      while(symbolLibrary.length) r.push(symbolLibrary.splice(0,12));
      symbolLibrary = r;
    }
    let ordLib = symbolLibrary.map((chars) => {
      let newChars = this.difficulty === '2' ? this.shuffle(chars) : chars;
      return newChars.map((char, index) => {
        return {
          Position: index,
          Character: char
        }
      })
    });
    
    return ordLib;
  }

  shuffle = (array) => {
        var m = array.length, t, i;
        while (m > 0) 
        {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        return array;
    }

  getCorrectOrders = () => {
      let listChoices = [1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4];
      let chosenChoices = {};
      listChoices = this.shuffle(listChoices);
      let correctOrders = [];

      for(var i = 0; i <= listChoices.length - 1; i++) {
        let chosenList = this.shuffledSymbolLists[listChoices[i]];
        
        if (chosenChoices[listChoices[i]] == null) {
          chosenChoices[listChoices[i]] = 0;
        }

        let stuff = [];
        let cOrder = [];
        for(var ii = 0; ii <= 3; ii++) {
          let ordinalValue = chosenChoices[listChoices[i]] * 4 + ii;
          let character = chosenList[ordinalValue].Character;
          stuff.push({
            Id: chosenList[ordinalValue].Position,
            Char: character
          });
          cOrder.push(chosenList[ordinalValue].Position);
        }

        correctOrders.push({
          Stuff: this.shuffle(stuff),
          CorrectOrder: cOrder.sort(function(a,b) {return a - b;})
        });

        chosenChoices[listChoices[i]] = chosenChoices[listChoices[i]] + 1;
      }

      return {
        CorrectOrders: correctOrders,
        Lists: this.symbolLists.map((x) => {return x.map((xx) => xx.Character)})
      }
  } 
}