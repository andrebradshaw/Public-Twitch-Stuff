function checker(elm, type){
  if (elm != undefined) {
    if (type == 'click') return elm.click();
    if (type == 'href') return elm.href; 
    if (type == 'text') return elm.innerText.trim().replace(/,/g, '');
    if (type == 'next') return elm;
    if (type == 'src') return elm.getAttribute('src');
  } else {
    return '';
  }
}

var reg = (elm, n) => elm != null ? elm[n] : '';
var cn = (ob, nm) => ob.getElementsByClassName(nm);
var tn = (ob, nm) => ob.getElementsByTagName(nm);
var nm = (ob, nm) => ob.getElementsByName(nm);

function openChatAuthor(){
	var path = cn(this, 'chat-author__display-name')[0].getAttribute('data-a-user');
	window.open('https://www.twitch.tv/'+path);
}

cn(document,'right-column tw-flex-shrink-0 tw-full-height tw-relative')[0].setAttribute('id','chat_window_ob');
var chatArr = document.getElementById("pop_container") ? chatArr : [];

function getCurrentLogs(){
  var arr = [];
  var chatLog = cn(document, 'chat-line__message');
  for(var i=0; i<chatLog.length; i++){
    var badges = Array.from(tn(tn(chatLog[i], 'span')[0],'a')).map(elm=>{return tn(elm,'img')[0].getAttribute('alt')});
    var userName = checker(cn(chatLog[i], 'chat-author__display-name')[0], 'text');
	var mention = checker(cn(chatLog[i], 'mention-fragment')[0], 'text');
    var msgText = checker(cn(chatLog[i], 'text-fragment')[0], 'text');
    var timestamp = new Date().getTime();
	var htmlDat = chatLog[i].outerHTML; 
	if(/omit_cat_shit/.test(htmlDat) === false){
      arr.push([badges,userName,mention,msgText,timestamp,htmlDat]);
    }
  }
  return arr; 
}

var domObserver = new MutationObserver(() => {
  var chats = getCurrentLogs();
  for(c=0; c<chats.length; c++){chatArr.push(chats[c]);}
  var lastChat = chats[chats.length - 1];
  chatArr.push(lastChat);
  chatArr = unqObj(chatArr);
});

domObserver.observe(document.getElementById('chat_window_ob'), {
  childList: true,
  subtree: true
});

function unqObj(arrg) {
  var resArr = [];
  arrg.filter(item => {
    var i = resArr.findIndex(x => x[5] == item[5]);
    if (i <= -1) {
      resArr.push(item);
    }
    return null;
  });
  return resArr;
}

function downloadr(arr2D, filename) {
  var data = JSON.stringify(arr2D);
  var type = 'data:application/json;charset=utf-8,';
  var file = new Blob([data], {
    type: type
  });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(file, filename);
  } else {
    var a = document.createElement('a'),
      url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 10);
  }
}


function dragElement() {
  this.style.background = 'rgb(85, 41, 135)';
  this.style.transition = 'all 566ms';
  var elmnt = this.parentElement;
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(this.id)) {
    document.getElementById(this.id).onmousedown = dragMouseDown;
  } else {
    this.onmousedown = dragMouseDown;
  }
  function dragMouseDown(e) {
    e = e || window.event;
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    elmnt.style.opacity = "0.85";
    elmnt.style.transition = "opacity 1300ms";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.style.opacity = "1";
  }
}
if(document.getElementById("pop_container")) document.body.removeChild(document.getElementById("pop_container"));
var cDiv = document.createElement("div");
cDiv.setAttribute("id", "pop_container");
document.body.appendChild(cDiv);
cDiv.style.display = "inline-block";
cDiv.style.position = "fixed";
cDiv.style.top = "300px";
cDiv.style.left = "50%";
cDiv.style.width = "16%";
cDiv.style.height = "35%";
cDiv.style.border = "1px solid Transparent";
cDiv.style.background = "Transparent";
cDiv.style.borderRadius = "1em";
cDiv.style.padding = "3px";
cDiv.style.zIndex = "10000";
cDiv.style.fontFamily = '"Courier New", monospace';

var mDiv = document.createElement("button");
mDiv.setAttribute("id", "mover_div");
document.getElementById("pop_container").appendChild(mDiv);
mDiv.style.width = "100%";
mDiv.style.height = "10%";
mDiv.style.border = "1px solid rgb(85, 41, 135)";
mDiv.style.backgroundColor = 'rgb(94, 47, 147)';
mDiv.style.borderTopLeftRadius = "1em";
mDiv.style.borderTopRightRadius = "1em";
mDiv.style.padding = "3px";
mDiv.style.fontFamily = '"Courier New", monospace';
mDiv.style.cursor = 'move';

var clsBtn = document.createElement("button");
document.getElementById("mover_div").appendChild(clsBtn);
clsBtn.setAttribute("id", "btn_close");
document.getElementById("btn_close").innerText = "+";
clsBtn.style.position = "absolute";
clsBtn.style.background = "transparent";
clsBtn.style.height = "0px";
clsBtn.style.width = "0px";
clsBtn.style.display = "inline-block";
clsBtn.style.transform = "scale(3.9, 3.9) translate(7px, -10px) rotate(45deg)";
clsBtn.style.borderRadius = "1em";
clsBtn.style.padding = "0px";
clsBtn.style.boxShadow = "0px";
clsBtn.style.border = "0px";
clsBtn.style.cursor = "pointer";
clsBtn.style.userSelect = "none";
clsBtn.style.fontSize = '1em';
clsBtn.style.fontFamily = '"Courier New", monospace';
clsBtn.style.fontWeight = "bold";
clsBtn.style.color = "Crimson";

var expBtn = document.createElement("button");
document.getElementById("mover_div").appendChild(expBtn);
expBtn.setAttribute("id", "btn_expand");
document.getElementById("btn_expand").innerText = "-";
expBtn.style.position = "absolute";
expBtn.style.background = "transparent";
expBtn.style.height = "0px";
expBtn.style.width = "0px";
expBtn.style.display = "inline-block";
expBtn.style.transform = "scale(3.9, 3.9) translate(11px, -10px) rotate(0deg)";
expBtn.style.fontSize = "1.2em";
expBtn.style.borderRadius = "1em";
expBtn.style.padding = "0px";
expBtn.style.boxShadow = "0px";
expBtn.style.border = "0px";
expBtn.style.cursor = "pointer";
expBtn.style.userSelect = "none";
expBtn.style.fontSize = '1em';
expBtn.style.fontFamily = '"Courier New", monospace';
expBtn.style.fontWeight = "bold";
expBtn.style.align = "right";
expBtn.style.color = "lightgrey";

var textbox_1 = document.createElement("input");
textbox_1.setAttribute("id", "textbox_code");
textbox_1.setAttribute("placeholder", "search text");
document.getElementById("pop_container").appendChild(textbox_1);
textbox_1.style.width = "100%";
textbox_1.style.height = "9%";
textbox_1.style.padding = "6px";
textbox_1.style.border = "1px solid rgb(85, 41, 135)";
textbox_1.style.background = "rgb(19, 25, 35)";
textbox_1.style.display = "block";
textbox_1.style.fontSize = "1.2em";
textbox_1.style.userSelect = "none";
textbox_1.style.fontFamily = '"Courier New", monospace';
textbox_1.style.color = "white";

var textbox_2 = document.createElement("input");
textbox_2.setAttribute("id", "textbox_2");
textbox_2.setAttribute("placeholder", "search users");
document.getElementById("pop_container").appendChild(textbox_2);
textbox_2.style.width = "100%";
textbox_2.style.height = "9%";
textbox_2.style.padding = "6px";
textbox_2.style.border = "1px solid rgb(85, 41, 135)";
textbox_2.style.background = "rgb(19, 25, 35)";
textbox_2.style.display = "block";
textbox_2.style.fontSize = "1.2em";
textbox_2.style.userSelect = "none";
textbox_2.style.fontFamily = '"Courier New", monospace';
textbox_2.style.color = "white";

var evalBtn = document.createElement("button");
document.getElementById("pop_container").appendChild(evalBtn);
evalBtn.setAttribute("id", "btn_box");
document.getElementById("btn_box").innerText = "Search";
evalBtn.style.background = "rgb(94, 47, 147)";
evalBtn.style.border = "1px solid rgb(85, 41, 135)";
evalBtn.style.width = "50%";
evalBtn.style.height = "10%";
evalBtn.style.borderBottomLeftRadius = "1em";
evalBtn.style.cursor = "pointer";
evalBtn.style.color = "white";
evalBtn.style.textAlign = "center";

var dlBtn = document.createElement("button");
document.getElementById("pop_container").appendChild(dlBtn);
dlBtn.setAttribute("id", "dl_box");
document.getElementById("dl_box").innerText = "Save Logs";
dlBtn.style.background = "rgb(94, 47, 147)";
dlBtn.style.border = "1px solid rgb(85, 41, 135)";
dlBtn.style.width = "50%";
dlBtn.style.height = "10%";
dlBtn.style.borderBottomRightRadius = "1em";
dlBtn.style.cursor = "pointer";
dlBtn.style.color = "white";
dlBtn.style.textAlign = "center";

function dlFileName(){
	var path = reg(/(?<=\.tv\/).+/.exec(window.location.href),0);
	var tstamp = new Date().getTime();
	downloadr(chatArr,path+'_'+tstamp+'.json');
}

function close() {
  document.body.removeChild(document.getElementById("pop_container"));
}

function nodrag() {
  this.style.background = 'rgb(94, 47, 147)';
  this.style.transition = 'all 566ms';
}

function expander() {
  cDiv.style.opacity = "1", cDiv.style.transition = 'all 566ms';
}

function expandPop() {
  if (cDiv.style.width == "16%") {
    cDiv.style.width = "35%";
  } else {
    cDiv.style.width = "16%";
  }
}

function clearSearchRes(){
	if(document.getElementById('resultsBox') != null){
		document.getElementById("pop_container").removeChild(document.getElementById('resultsBox'));
cDiv.style.width = "16%";
	}
}


function createResDivs(obj, n){
  if (obj.value.length > 2) {
    clearSearchRes();
    var matches = [];
    var regXs = new RegExp(obj.value.replace(/\W+/g, '\\W+'), 'i');
    for (i = 0; i < chatArr.length; i++) {
      if (regXs.test(chatArr[i][n]) === true) {
        matches.push(chatArr[i]);
      }
    }

    var resultsText = '';
    matches.forEach(elm => {
		var timer = reg(/\d+:\d+:\d+/.exec(new Date(elm[4]).toTimeString()),0) + ' ';
		var styler = ' style="font-size: 0.7em; padding: 3px; border-bottom: 1px solid RebeccaPurple; color: RebeccaPurple"';
		resultsText = resultsText + elm[5].replace(/<\/span><\/div>$/, '') + '<b '+styler+' data="omit_cat_shit">'+timer+'</b></span></div>';
    });

    var resultsBox = document.createElement("div");
    resultsBox.setAttribute("id", "resultsBox");
    resultsBox.setAttribute("class", "simplebar-scroll-content");
    document.getElementById("pop_container").appendChild(resultsBox);
    resultsBox.style.width = "100%";
    resultsBox.style.height = "100%";
    resultsBox.style.padding = "6px";
    resultsBox.style.border = "1px solid rgb(85, 41, 135)";
    resultsBox.style.background = "rgb(19, 25, 35)";
    resultsBox.style.display = "block";
    resultsBox.style.fontSize = "1.2em";
    resultsBox.style.userSelect = "none";
    resultsBox.style.fontFamily = '"Courier New", monospace';
    resultsBox.style.color = "white";
    resultsBox.innerHTML = resultsText;

    cDiv.style.width = "35%";

    resultsBox.addEventListener('keyup', () => {
      if (/^.{0}$/.test(document.getElementById('resultsBox').value) === true) {
        document.getElementById("pop_container").removeChild(document.getElementById('resultsBox'));
      }
    });
    var resText = cn(document, 'chat-line__message');
    for(t=0; t<resText.length; t++){
      if(/omit_cat_shit/.test(resText[t].outerHTML)) resText[t].addEventListener("click", openChatAuthor);
    }
  }
}
function searchChat() {
  clearSearchRes();
  createResDivs(textbox_1, 3);
  createResDivs(textbox_2, 1);
}



cDiv.addEventListener('mouseover', expander);
mDiv.addEventListener('mouseout', nodrag);
mDiv.addEventListener('mouseover', dragElement);
evalBtn.addEventListener("click", searchChat);
clsBtn.addEventListener("click", close);
expBtn.addEventListener("click", expandPop);
dlBtn.addEventListener("click", dlFileName);
textbox_1.addEventListener("keyup", searchChat);
textbox_2.addEventListener("keyup", searchChat);
