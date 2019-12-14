var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

var a = (l, r) => r.forEach(a => attr(l, a[0], a[1]));

var unqHsh = (a,o) => a.filter(i=> o.hasOwnProperty(i) ? false : (o[i] = true));

var pollString = `You can vote with bits or tips for the following options: amy(-50), bennet(5.5), bernie(13118), biden(-14), castro(106), cory(1), delaney(9), marianne(295), pete(-601), trump(-1421), tulsi(180), warren(2051), weld(624), yang(2050), dennis(9009), deval(5), steyer(6), bloomberg(-251)`;

function pollToArray(msg){
  var datarr = cn(msg,'text-fragment')[0].innerText.replace(/You can vote with bits or tips for the following options: /g,'').replace(/\)\s*$/,'').split(/\),\s*/).map(el=> el.split(/\(/)).map(i=> [i[0],parseFloat(i[1])]);
  datarr.sort((a,b)=> a[1] - b[1]);
  datarr.reverse()
  console.log(datarr)
  createTableView(cn(msg,'text-fragment')[0],datarr)
  return datarr;
}

function createTableView(elm,arr){
  var html = `<div style="border: 2px solid rgb(180, 84, 255)"><span style="border-left: 1px dotted rgb(180, 84, 255); width: 60%; padding: 6px;">Candidate</span><span  style="width: 40%; padding: 6px;">Points</span>`+arr.map(row=>  `<div><span style="border-left: 1px dotted rgb(180, 84, 255); width: 60%; padding: 6px;">${row[0]}</span><span  style="width: 40%; padding: 6px;">${row[1]}</span></div>`).reduce((a,b)=> a+b) + '</div>';
  elm.innerHTML = html;
}

Array.from(cn(document,'chat-line__message')).forEach(el=> /You can vote with bits or tips for the following options:/.test(el.innerText) ? pollToArray(el) : '');

