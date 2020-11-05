module.exports = async function (context, req) {

  context.log('JavaScript HTTP trigger function processed a request.');
  const symbolGen = new SymbolGenerator();
  
  context.res = {
    // status: 200, /* Defaults to 200 */
    body: symbolGen.getCorrectOrders(),
    headers: {
        'Content-Type': 'application/json'
    }
  };
}

class SymbolGenerator {
  constructor() {
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
    let ordLib = symbolLibrary.map((chars) => {
      return chars.map((char, index) => {
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
      let listChoices = [1,1,2,2];//[1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4];
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