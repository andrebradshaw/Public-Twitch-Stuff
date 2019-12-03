var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var unqHsh = (a,o) => a.filter(i=> o.hasOwnProperty(i) ? false : (o[i] = true));

var cleanObject = (ob) => 
  Object.entries(ob).reduce((r, [k, v]) => {
    if(v) { r[k] = v; return r;
    } else { return r; }
  }, {});

var containArr = [];

function readChats(){
  var chatObj = Array.from(cn(document,'chat-line__message')).map(el=> {
    var obj = {
	  t: cn(el,'chat-line__timestamp') && cn(el,'chat-line__timestamp').length ? cn(el,'chat-line__timestamp')[0].innerText : null,
      u: cn(el,'chat-author__display-name') && cn(el,'chat-author__display-name').length ? cn(el,'chat-author__display-name')[0].innerText : null,
      c: cn(el,'text-fragment') && cn(el,'text-fragment').length ? Array.from(cn(el,'text-fragment')).map(cc=> cc.innerText).reduce((a,b)=> a+b).trim() : null,
      e: cn(el,'chat-image chat-line__message--emote tw-inline-block') && cn(el,'chat-image chat-line__message--emote tw-inline-block').length ? Array.from(cn(el,'chat-image chat-line__message--emote tw-inline-block')).map(cc=> cc.getAttribute('alt')) : null,
      m: cn(el,'mention-fragment') && cn(el,'mention-fragment').length ? Array.from(cn(el,'mention-fragment')).map(cc=> cc.innerText).reduce((a,b)=> a+b).trim() : null,
    };
    return cleanObject(obj);
  });
  chatObj.forEach(el=> {if(containArr.every(i=> JSON.stringify(i) != JSON.stringify(el))) containArr.push(el)});

  if(JSON.stringify(containArr).length > 1000){
    console.log(JSON.stringify(containArr).length);
//     console.log(containArr);
    containArr = [];
  }
}
// console.log(containArr)

var domObserver = new MutationObserver(() => readChats() );

domObserver.observe(cn(document,'chat-list__list-container tw-flex-grow-1 tw-full-height tw-pd-b-1')[0], {
  childList: true,
  subtree: true
});
