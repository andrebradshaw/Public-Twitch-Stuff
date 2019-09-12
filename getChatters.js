var reg = (o, n) => o ? o[n] : '';
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var fixCase = (s)=> s.split(/\b-\b/).map(el=> el.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())).join('-');

var t_color = {purpleBlack: '#0f0e11', navyPurple: '#19171c', darkPurple: '#2c2541', purpleLightGrey: '#dad8de', purple: '#392e5c', lightPurple: '#7d5bbe', brightPurple: '#885dd9', onGreen: '#07ba5b', offRed: '#e21212'};
var svgs = {
	close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="${t_color.offRed}" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`
};
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

function aninCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(45deg) translate(-49px, -50px)";
  l1.style.transition = "all 333ms";
  l2.style.transform = "translate(49px, 50px) rotate(135deg) translate(-49px, -50px)";
  l2.style.transition = "all 333ms";
}

function anoutCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l1.style.transition = "all 333ms";
  l2.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l2.style.transition = "all 333ms";
}


function createChatSearchHTML(text){
  if (gi(document, 'chatters_container')) gi(document, 'chatters_container').outerHTML = "";
    var cont = ele('div');
    attr(cont,'id','chatters_container');
    attr(cont,'style', `position: fixed; top: ${Math.round(screen.height * 0.15)}px; width: ${Math.round(screen.width * 0.25)}px; right: 2%; z-index: 111111; border-radius: 0.15em;`);
    document.body.appendChild(cont);

    var head = ele('div');
    cont.appendChild(head);
    attr(head, 'style', `display: grid; grid-template-columns: 94% 5%; grid-gap: 1%; justify-content: space-between; background: ${t_color.purple}; color: ${t_color.purpleLightGrey}; padding: 1px; border: 1.2px solid ${t_color.navyPurple}; border-top-right-radius: 0.3em; border-top-left-radius: 0.3em; cursor: move;`);
    head.onmouseover = dragElement;

    var htext = ele('div');
    head.appendChild(htext);
    attr(htext, 'style', 'grid-area: 1 / 1; padding: 4px');
    htext.innerText = 'Chatters';

    var cls = ele('div');
    head.appendChild(cls);
    attr(cls, 'style', 'grid-area: 1 / 2; width: 27px; height: 27px; cursor: pointer; transform: scale(1.2, 1.2);');
    cls.innerHTML = svgs.close;
    cls.onmouseenter = aninCloseBtn;
    cls.onmouseleave = anoutCloseBtn;
    cls.onclick = closeView;

    var c_bod = ele('div'); 
    attr(c_bod,'style',`background: ${t_color.navyPurple}; color: ${t_color.purpleLightGrey}; border: 1.2px solid ${t_color.purpleBlack}; padding: 6px;`);
    attr(c_bod,'id','chatters_content_container');
    cont.appendChild(c_bod);
    c_bod.innerHTML = text;

}
function closeView() {
  this.parentElement.parentElement.outerHTML = '';
}


async function getChatters(){
  var res = await fetch(`https://tmi.twitch.tv/group/user/${reg(/(?<=twitch\.tv\/).+?(?=\?|$)/.exec(window.location.href), 0)}/chatters`);
  var d = await res.json();
  var mods = d.chatters.moderators ? d.chatters.moderators.reduce((a,b)=> a+'\n'+b) : '';
  var viewers;
  var arr = Object.entries(d.chatters);
  var out = '';
   
  arr.forEach(el=> {
    if(el[1] && el[1].length > 0){
      out = out +`<b style="font-weight: 600;">${fixCase(el[0])}</b>: ${el[1].toString().replace(/,/g, ', ')}<br><br>`;
    }
  });
  console.log(d.chatter_count+' total\n'+out);
createChatSearchHTML(`<b style="font-weight: 600;">Total: ${d.chatter_count}<br>${out}`);
}

getChatters()

