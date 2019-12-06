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

var checkContainArr = [];

function getLastChatObj(){
  var el = cn(document,'chat-line__message') && cn(document,'chat-line__message').length ? cn(document,'chat-line__message')[(cn(document,'chat-line__message').length-1)] : null
  var chatObj = el ? cleanObject({
	  time: cn(el,'chat-line__timestamp') && cn(el,'chat-line__timestamp').length ? cn(el,'chat-line__timestamp')[0].innerText : null,
      user: cn(el,'chat-author__display-name') && cn(el,'chat-author__display-name').length ? cn(el,'chat-author__display-name')[0].innerText : null,
      chat: cn(el,'text-fragment') && cn(el,'text-fragment').length ? Array.from(cn(el,'text-fragment')).map(cc=> cc.innerText).reduce((a,b)=> a+b).trim() : null,
      emotes: cn(el,'chat-image chat-line__message--emote tw-inline-block') && cn(el,'chat-image chat-line__message--emote tw-inline-block').length ? Array.from(cn(el,'chat-image chat-line__message--emote tw-inline-block')).map(cc=> cc.getAttribute('alt')) : null,
      mentions: cn(el,'mention-fragment') && cn(el,'mention-fragment').length ? Array.from(cn(el,'mention-fragment')).map(cc=> cc.innerText) : null,
      links: cn(el,'link-fragment tw-interactive tw-link tw-link--button') && cn(el,'link-fragment tw-interactive tw-link tw-link--button').length ? Array.from(cn(el,'link-fragment tw-interactive tw-link tw-link--button')).map(cc=> cc.innerText) : null,
    }) : null;
  return chatObj;
}

async function validateLastChatObject(){
  var lastChatObj = getLastChatObj();
  if(checkContainArr.length){
    if(checkContainArr.every(el=> JSON.stringify(el) != JSON.stringify(lastChatObj))){checkContainArr.push(lastChatObj);}
  }else{
	checkContainArr.push(lastChatObj);
  }
  if(encodeURIComponent(JSON.stringify(checkContainArr)).length > 2000){
    checkContainArr.shift(); //this makes it so we will miss the first chat in the first run, but also prevents duplicates after the first run
    console.log(checkContainArr);
    checkContainArr = [];
  }
}

var domObserver = new MutationObserver(() => validateLastChatObject() );

domObserver.observe(cn(document,'chat-list__list-container tw-flex-grow-1 tw-full-height tw-pd-b-1')[0], {
  childList: true,
  subtree: true
});
