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
  
  return datarr;
}

function createTableView(elm,arr){
  arr.map(row=> row.map(col=> {
    
  }));
}

Array.from(cn(document,'chat-line__message')).forEach(el=> /You can vote with bits or tips for the following options:/.test(el.innerText) ? pollToArray(el) : '');

