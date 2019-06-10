var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var fixCase = (s) => s.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
var formatNum = (n) => n ? '</td><td style="padding: 0.5px; border: 2px solid rgb(94, 47, 147); font-size: 1.1em; text-align: right;"> ' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '</td><td style="padding: 1px; border: 2px solid rgb(94, 47, 147); font-size: .9em; text-align: right;"> ' + 'FeelsBadMan';


function quickRank(input) {
  var xs = /(\w+)\((\d+)/;
  var arrg = input.split(',').map(el => [reg(xs.exec(el), 1), parseInt(reg(xs.exec(el), 2))]).sort((a, b) => b[1] - a[1]);
  return createNextRank(arrg);
}

function indexOfLowestRanked(arr, start) {
  for (var i = (start - 2); i > 0; i--) {
    if (arr[i][1] > 0) return i;
  }
}

function createNextRank(arr) {
  var temp = [];
  for (var i = 0; i < arr.length; i++) {
    var name = arr[i][0];
    var bits = arr[i][1];
    if (i == 0) {
      temp.push([name, bits, '0']);
    } else {
      var nextRank = arr[i - 1][1] - bits ? arr[i - 1][1] - bits : arr[indexOfLowestRanked(arr, i)][1] - bits;
      temp.push([name, bits, nextRank]);
    }
  }
  return temp;
}

function switchRankText() {
  var updated = '<table><tr style="border: 2px solid rgb(94, 47, 147)"><td style="padding: 0.5px; border: 2px solid rgb(94, 47, 147); font-size: 1em; text-align: center;">Candidate</td><td style="padding: 0.5px; border: 2px solid rgb(94, 47, 147); font-size: 1em; text-align: center;">Bit Rank</td><td style="padding: 0.5px; border: 2px solid rgb(94, 47, 147); font-size: 1em; text-align: center;">Needed</td></tr>';
  var chats2020 = Array.from(cn(document, 'chat-line__message')).filter(el => /You can vote with bits or tips for the following options:/.test(el.innerText));
  if (chats2020.length > 0) {
    var lastChat2020 = chats2020[chats2020.length - 1];
    var ranked = quickRank(lastChat2020.innerText);
    ranked.forEach(el => {
      updated = updated + '<tr style="border: 2px solid rgb(94, 47, 147)"><td style="padding: 0.5px; border: 2px solid rgb(94, 47, 147); font-size: 1.1em; text-align: left;">' + fixCase(el[0]) + formatNum(el[1]) + formatNum(el[2]) + '</td>' + '</tr>'
    });
    chats2020[chats2020.length - 1].innerHTML = updated + '</table>';
  }
}
switchRankText();

var domo = new MutationObserver(() => {
if (/twitch\.tv\/imreallyimportant/.test(window.location.href)) switchRankText();
});

domo.observe(cn(document, 'tw-flex-grow-1 tw-full-height tw-pd-b-1')[0], {
childList: true,
subtree: true
});


