function checker(elm, type) {  if (elm != undefined) {    if (type == 'src') {     return elm.getAttribute('src');    }	if (type == 'click') {     elm.click();    }	if (type == 'href') {      return elm.href;    }    if (type == 'text') {      return elm.innerText.trim().replace(/,/g, '');    }    if (type == 'next') {      return elm;    }  } else {    return '';  }}
function reg(elm, n){if(elm != null){return elm[n];}else{return '';}}
var cn = (ob, nm) => {    return ob.getElementsByClassName(nm)  };
var tn = (ob, nm) => {    return ob.getElementsByTagName(nm)  };
var nm = (ob, nm) => {    return ob.getElementsByName(nm)  };

var chatArr = Array.from(cn(document, 'chat-line__message')).map(itm => {
  return [checker(cn(itm, 'chat-author__display-name')[0], 'text'), checker(cn(itm, 'text-fragment')[0], 'text')]
});

var domObserver = new MutationObserver(() => {
  var chats = Array.from(cn(document, 'chat-line__message')).map(itm => {
    return [checker(cn(itm, 'chat-author__display-name')[0], 'text'), checker(cn(itm, 'text-fragment')[0], 'text')]
  });
  var lastChat = chats[chats.length - 1];
  chatArr.push(lastChat);
  chatArr = unqObj(chatArr);
});

domObserver.observe(document, {
  childList: true,
  subtree: true
});

function unqObj(arr) {
  var resArr = [];
  arr.filter(item => {
    var i = resArr.findIndex(x => x[1] == item[1]);
    if (i <= -1) {
      resArr.push(item);
    }
    return null;
  });
	return resArr;
}

function downloadr(arr2D, filename) {
  if (/\.csv$/.test(filename) === true) {
    var data = arr2D.map(itm => {
      return itm.toString().replace(/$/, '\r');
    }).toString().replace(/\r,/g, '\r');
  }
  if (/\.json$|.js$/.test(filename) === true) {
    var data = JSON.stringify(arr2D);
    var type = 'data:application/json;charset=utf-8,';
  } else {
	var type = 'data:text/plain;charset=utf-8,';
  }
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
  this.style.background = 'CadetBlue';
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
    elmnt.style.transition = "opacity 1300ms"
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.style.opacity = "1";
  }
}

var cDiv = document.createElement("div");
cDiv.setAttribute("id", "pop_container");
document.body.appendChild(cDiv);
cDiv.style.display = "inline-block";
cDiv.style.position = "fixed";
cDiv.style.top = "300px";
cDiv.style.left = "50%";
cDiv.style.width = "20%";
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
mDiv.style.border = "1px solid DarkCyan ";
mDiv.style.backgroundColor = 'DarkCyan';
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
document.getElementById("pop_container").appendChild(textbox_1);
textbox_1.style.width = "100%";
textbox_1.style.height = "13%";
textbox_1.style.padding = "6px";
textbox_1.style.border = "1px solid DarkSlateGrey";
textbox_1.style.background = "FloralWhite";
textbox_1.style.display = "block";
textbox_1.style.fontSize = "1.2em";
textbox_1.style.userSelect = "none";
textbox_1.style.fontFamily = '"Courier New", monospace';

var evalBtn = document.createElement("button");
document.getElementById("pop_container").appendChild(evalBtn);
evalBtn.setAttribute("id", "btn_box");
document.getElementById("btn_box").innerText = "Search";
evalBtn.style.background = "DarkCyan";
evalBtn.style.border = "1px solid DarkSlateGrey";
evalBtn.style.width = "50%";
evalBtn.style.height = "10%";
evalBtn.style.borderBottomLeftRadius = "1em";
evalBtn.style.cursor = "pointer";
evalBtn.style.color = "white";
evalBtn.style.textAlign = "center";

var dlBtn = document.createElement("button");
document.getElementById("pop_container").appendChild(dlBtn);
dlBtn.setAttribute("id", "dl_box");
document.getElementById("dl_box").innerText = "Save";
dlBtn.style.background = "DarkCyan";
dlBtn.style.border = "1px solid DarkSlateGrey";
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
  this.style.background = 'DarkCyan';
  this.style.transition = 'all 566ms';
}

function shrinker() {
  cDiv.style.opacity = ".77", cDiv.style.transition = 'all 566ms';
}

function expander() {
  cDiv.style.opacity = "1", cDiv.style.transition = 'all 566ms';
}

function expandPop() {
  if (cDiv.style.width == "25%") {
    cDiv.style.width = "45%";
  } else {
    cDiv.style.width = "25%";
  }
}

function clearSearchRes(){
	if(document.getElementById('resultsBox') != null || /^.{0}$/.test(document.getElementById('textbox_code').value) === true){
		document.getElementById("pop_container").removeChild(document.getElementById('resultsBox'));
	}
}

function searchChat() {
if(textbox_1.value.length <1){
	clearSearchRes();
}
if(textbox_1.value.length > 3){
  clearSearchRes();
  var matches = [];
  var regXs = new RegExp(textbox_1.value.replace(/\W+/g, '\\W+'), 'i'); 
  chatArr.forEach(itm => {
    if (regXs.test(itm[1]) === true) {
      matches.push(itm);
    }
  });

  var resultsText = '';
  matches.forEach(elm => {
    resultsText = resultsText + elm[0] + ': ' + elm[1] + '\n\n'
  });

  var resultsBox = document.createElement("textarea");
  resultsBox.setAttribute("id", "resultsBox");
  document.getElementById("pop_container").appendChild(resultsBox);
  resultsBox.style.width = "100%";
  resultsBox.style.height = "100%";
  resultsBox.style.padding = "6px";
  resultsBox.style.border = "1px solid DarkSlateGrey";
  resultsBox.style.background = "FloralWhite";
  resultsBox.style.display = "block";
  resultsBox.style.fontSize = "1.2em";
  resultsBox.style.userSelect = "none";
  resultsBox.style.fontFamily = '"Courier New", monospace';
  resultsBox.value = resultsText;

  cDiv.style.width = "45%";

  resultsBox.addEventListener('keyup', () => {
    if (/^.{0}$/.test(document.getElementById('resultsBox').value) === true) {
      document.getElementById("pop_container").removeChild(document.getElementById('resultsBox'));
    }
  });
}
}

cDiv.addEventListener('mouseover', expander);
mDiv.addEventListener('mouseout', nodrag);
mDiv.addEventListener('mouseover', dragElement);
evalBtn.addEventListener("click", searchChat);
clsBtn.addEventListener("click", close);
expBtn.addEventListener("click", expandPop);
dlBtn.addEventListener("click", dlFileName);
textbox_1.addEventListener("keyup", searchChat);
