module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var symbolLibrary = [
        "✰✱✲✳✴✵✶✷✸✹✺✻".split(""),
        "✼✽✾✿❀❁❂❃❄❅❆❇".split(""),
        "❡❢❣❤❥❦❧❏❐❑❒❈".split(""),
        "❬❭❮❯❰❱❲❳❴❵❶❉".split(""),
        "➜➝➞➟➠➡➢➣➤➥➦❊".split("")
    ];

    //15 Iterations

    function shuffle(array)
    {
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

    function getCorrectOrders() {
      let listChoices = [1,1,2,2];//[1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4];
      let chosenChoices = {};
      listChoices = shuffle(listChoices);
      let correctOrders = [];

      for(var i = 0; i <= listChoices.length - 1; i++) {
        let chosenList = symbolLibrary[listChoices[i]];
        
        if (chosenChoices[listChoices[i]] == null) {
          chosenChoices[listChoices[i]] = 0;
        }

        let chosenPlace = chosenList[chosenChoices[listChoices[i]] * 4];
        let stuff = [];
        let cOrder = [];
        for(var ii = 0; ii <= 3; ii++) {
          let ordinalValue = chosenChoices[listChoices[i]] * 4 + ii;
          let character = chosenList[ordinalValue];
          stuff.push({
            Id: ordinalValue,
            Char: character
          });
          cOrder.push(ordinalValue);
        }

        correctOrders.push({
          Stuff: shuffle(stuff),
          CorrectOrder: cOrder
        });

        chosenChoices[listChoices[i]] = chosenChoices[listChoices[i]] + 1;

      }

      return {
        CorrectOrders: correctOrders,
        Lists: symbolLibrary
      }
    }

    // const generateList = function () {
    //     var chosenSymbolListNumber = Math.floor(Math.random() * 4);
    //     var chosenLibrary = symbolLibrary[chosenSymbolListNumber];

    //     var randomlySortedArray = shuffle(chosenLibrary.split(""));

    //     var r = [];
    //     for (var i = 0; i <= randomlySortedArray.length - 1; i++) {
    //         r.push({
    //             order_id: i,
    //             value: randomlySortedArray[i]
    //         });
    //     }
    //     return r;
    // };

    // const generateLists = function () {
    //     var r = [];
    //     for (var i = 0; i <= symbolLibrary.length; i++) {
    //         r.push(generateList());
    //     }
    //     return r;
    // };

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: getCorrectOrders(),
        headers: {
            'Content-Type': 'application/json'
        }
    };
}