module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var symbolLibrary = [
        "✰✱✲✳✴✵✶✷✸✹✺",
        "✼✽✾✿❀❁❂❃❄❅❆",
        "❡❢❣❤❥❦❧❏❐❑❒",
        "❬❭❮❯❰❱❲❳❴❵❶",
        "➜➝➞➟➠➡➢➣➤➥➦"
    ];

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

    const generateList = function () {
        var chosenSymbolListNumber = Math.floor(Math.random() * 4);
        var chosenLibrary = symbolLibrary[chosenSymbolListNumber];

        var randomlySortedArray = shuffle(chosenLibrary.split(""));

        var r = [];
        for (var i = 0; i <= randomlySortedArray.length - 1; i++) {
            r.push({
                order_id: i,
                value: randomlySortedArray[i]
            });
        }
        return r;
    };

    const generateLists = function () {
        var r = [];
        for (var i = 0; i <= symbolLibrary.length; i++) {
            r.push(generateList());
        }
        return r;
    };

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: generateLists(),
        headers: {
            'Content-Type': 'application/json'
        }
    };
}