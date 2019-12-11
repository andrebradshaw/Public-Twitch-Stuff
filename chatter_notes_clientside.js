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



var svgs = {
  close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`,
};


function aninCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(45deg) translate(-49px, -50px)";
  l1.style.transition = "all 233ms";
  l2.style.transform = "translate(49px, 50px) rotate(135deg) translate(-49px, -50px)";
  l2.style.transition = "all 233ms";
}

function anoutCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l1.style.transition = "all 233ms";
  l2.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l2.style.transition = "all 233ms";
}


function dragElement() {
  var el = this.parentElement;
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(this.id)) document.getElementById(this.id).onmousedown = dragMouseDown;
  else this.onmousedown = dragMouseDown;
  function dragMouseDown(e) {
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    el.style.top = (el.offsetTop - pos2) + "px";
    el.style.left = (el.offsetLeft - pos1) + "px";
    el.style.opacity = "0.85";
    el.style.transition = "opacity 700ms";
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    el.style.opacity = "1";
  }
}



function setChatOption(elm){
  var username = cn(elm,'chat-author__display-name') && cn(elm,'chat-author__display-name').length ? cn(elm,'chat-author__display-name')[0].innerText : ''; 
  var rgb = cn(elm,'chat-author__display-name') && cn(elm,'chat-author__display-name').length ? cn(elm,'chat-author__display-name')[0].style.color : ''; 
  var cont = ele('span');
  elm.insertBefore(cont,elm.firstChild);
  a(cont,[['jdat',`${JSON.stringify({username:username,rgb:rgb})}`],['class','setChatOption_'],['style',`font-size: 1.9em; padding: 6px; color: #007862; cursor: pointer;`]]);
  cont.innerText = '+';
  cont.onclick = createOptionHTML;
}

function createOptionHTML(){
  if(gi(document,'note_option_cont')) gi(document,'note_option_cont').outerHTML = '';

  var rect = this.getBoundingClientRect();
  var jdat = JSON.parse(this.getAttribute('jdat'));

  var cont = ele('div');
  a(cont,[['id','note_option_cont'],['style',`position: fixed; top: ${rect.top}px; left: ${(rect.left-300)}px; z-index: ${new Date().getTime()}; width: 300px; border: 1px solid ${jdat.rgb}; border-radius: 0.4em; background: ${jdat.rgb};`]]);
  document.body.appendChild(cont);

  var head = ele('div');
  a(head, [['style', `width: 100%; background: #0a1114; border: 1.6px solid #0a1114; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; cursor: move; padding: 4px;`]]);
  cont.appendChild(head);
  head.onmouseover = dragElement;

  var txt = ele('span');
  a(txt,[['jdat',`${this.getAttribute('jdat')}`],['style',`color: ${jdat.rgb}; font-size: 1.1em; cursor: pointer; border-radius: 0.5em; padding: 4px; `]]);
  head.appendChild(txt);  
  txt.onmouseenter = ()=> { txt.style.borderBottom = `1px solid ${jdat.rgb}`; txt.style.borderTop = `1px solid ${jdat.rgb}`; };
  txt.onmouseleave = ()=> { txt.style.borderBottom = `1px solid transparent`; txt.style.borderTop = `1px solid transparent`; };
  txt.innerText = jdat.username;
  txt.onclick = createNotesHistoryHTML;

  var cls = ele('div');
  a(cls, [['style', `width: 27px; height: 27px; cursor: pointer; float: right;`]]);
  head.appendChild(cls);
  cls.innerHTML = svgs.close;
  cls.onmouseenter = aninCloseBtn;
  cls.onmouseleave = anoutCloseBtn;
  cls.onclick = () => cont.outerHTML = '';

  var cbod = ele('div');
  a(cbod, [['style', `width: 100%; border-bottom-right-radius: 0.4em; border-bottom-left-radius: 0.4em; background: #122026; padding 4px;`]]);
  cont.appendChild(cbod);

  var noteCont = ele('div');
  a(noteCont,[['style',`padding: 4px;`]]);
  cbod.appendChild(noteCont);
  
  var input = ele('textarea');
  a(input,[['placeholder','add user note'],['style',`width: 88%; border: 1px solid #b4ced9; border-radius: .4em; background: ##c3dbe6; padding: 4px;`]]);
  noteCont.appendChild(input);

  var add = ele('div');
  a(add,[['style',`font-size: 1.3em; cursor: pointer; float: right; padding: 8px; color: #007862;`]]);
  add.innerText = '=>';
  noteCont.appendChild(add);
  add.onclick = sendToSheets;
  
}

function createNotesHistoryHTML(){
  if(gi(document,'notes_view_cont')) gi(document,'notes_view_cont').outerHTML = '';
  var rect = this.parentElement.parentElement.getBoundingClientRect();
  var jdat = JSON.parse(this.getAttribute('jdat'));

  var cont = ele('div');
  a(cont,[['id','notes_view_cont'],['style',`position: fixed; top: ${(rect.top-50)}px; left: ${(rect.left-300)}px; z-index: ${new Date().getTime()}; width: 600px; border: 1px solid ${jdat.rgb}; border-radius: 0.4em; background: ${jdat.rgb};`]]);
  document.body.appendChild(cont);

  var head = ele('div');
  a(head, [['style', `display: grid; grid-template-columns: minmax(260px, 1fr) 30px; width: 100%; background: #0a1114; border: 1.6px solid #0a1114; border-top-left-radius: 0.4em; border-top-right-radius: 0.4em; cursor: move; padding: 4px;`]]);
  cont.appendChild(head);
  head.onmouseover = dragElement;
  
  var txt = ele('span');
  a(txt,[['jdat',`${this.getAttribute('jdat')}`],['style',`color: ${jdat.rgb}; font-size: 1.1em; border-radius: 0.5em; padding: 4px; `]]);
  head.appendChild(txt);
  txt.innerHTML = jdat.username+` notes history`;

  var cls = ele('div');
  a(cls, [['style', `width: 27px; height: 27px; cursor: pointer;`]]); // float: right;
  head.appendChild(cls);
  cls.innerHTML = svgs.close;
  cls.onmouseenter = aninCloseBtn;
  cls.onmouseleave = anoutCloseBtn;
  cls.onclick = () => cont.outerHTML = '';

  var cbod = ele('div');
  a(cbod, [['style', `width: 100%; border-bottom-right-radius: 0.4em; border-bottom-left-radius: 0.4em; background: #122026; width: 100%; padding 4px;`]]);
  cont.appendChild(cbod);

  var noteCont = ele('div');
  a(noteCont,[['style',`padding: 4px; width: 100%;`]]);
  cbod.appendChild(noteCont);
  
  var notesHistoryArr = [{mod: 'Mod', channel: 'Channel', comment: 'Comment', username: 'Username'},{mod: 'sourcingsupport', channel: 'ACTdotTV', comment: 'alt account for BustedHipGaming', username: 'BareBonesTalk'}];

  for(var i=0; i<notesHistoryArr.length; i++){
    var row = ele('div');
    a(row,[['style',`display: grid; grid-template-columns: minmax(100px, 1fr) 100px 390px; color: #fff;${(i == 0 ? 'color: '+jdat.rgb+';' : '#fff;')} border-bottom: 1px solid ${jdat.rgb}; padding: 4px;`]]);
    noteCont.appendChild(row);

    var mod = ele('div');
    a(mod,[['style',`padding: 2px; border-right: 1px dotted ${jdat.rgb}; ${(i==0 ? 'text-align: center;' : 'text-align: left;')}`]]);
    row.appendChild(mod);
    mod.innerText = `${notesHistoryArr[i].mod}`;

    var channel = ele('div');
    a(channel,[['style',`padding: 2px; border-right: 1px dotted ${jdat.rgb}; ${(i==0 ? 'text-align: center;' : 'text-align: left;')}`]]);
    row.appendChild(channel);
    channel.innerText = `${notesHistoryArr[i].channel}`;

    var comment = ele('div');
    a(comment,[['style',`padding: 2px; ${(i==0 ? 'text-align: center;' : 'text-align: left;')}`]]);
    row.appendChild(comment);
    comment.innerText = `${notesHistoryArr[i].comment}`;

  }
  
}

function sendToSheets(){
  var content = tn(this.parentElement,'textarea') && tn(this.parentElement,'textarea').length ? tn(this.parentElement,'textarea')[0].value : '';
  var output = content ? encodeURIComponent(content.trim()) : '';
  console.log(output);
  
}

function openUserOptions(){
  console.log('openUserOptions');
}

function initAddOnScript(){
  if(cn(document,'setChatOption_') && cn(document,'setChatOption_').length) Array.from(cn(document,'setChatOption_')).forEach(el=> el.outerHTML = '');
  var chats = Array.from(cn(document,'chat-line__username')).map(el=> el.parentElement).forEach(el=> setChatOption(el));
  console.log(chats);
}

initAddOnScript()
