var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unqHsh = (a,o) => a.filter(i=> o.hasOwnProperty(i) ? false : (o[i] = true));
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var reChar = (s) => s.match(/&#.+?;/g) && s.match(/&#.+?;/g).length > 0 ? s.match(/&#.+?;/g).map(el=> [el,String.fromCharCode(/d+/.exec(el)[0])]).map(m=> s = s.replace(new RegExp(m[0], 'i'), m[1])).pop() : s;

var booleanSearch = (bool, target) => parseAsRegexArr(bool).every(x=> x.test(target));

var currentChats = Array.from(cn(document,'chat-line__message'));

var currentChatText = currentChats.map(el=> unqHsh(Array.from(tn(el,'span')).map(t=> t.innerText).filter(i=> i != ''),{}).reduce((a,b)=> a+b));


var chatterData = currentChats.map(el=> cn(el,'chat-author__display-name')[0].innerText + cn(el,'chat-author__display-name')[0].style.cssText.replace(/color/,''));

function parseChatterObj(arr){
  return arr.map(el=> {
	return {
		user: reg(/.+?(?=:)/.exec(el),0),
		chat: reg(/(?<=:\s+).+/.exec(el),0)
    }
  });
}

function addNewChats(){
    var chats = Array.from(cn(document,'chat-line__message')).map(el=> unqHsh(Array.from(tn(el,'span')).map(t=> t.innerText).filter(i=> i != ''),{}).reduce((a,b)=> a+b));
    for(c=0; c<chats.length; c++){
      currentChatText.push(chats[c]);
    }
    currentChatText = unqHsh(currentChatText,{});
}

function addNewUsers(){
  var userData = Array.from(cn(document,'chat-line__message')).map(el=> cn(el,'chat-author__display-name')[0].innerText + cn(el,'chat-author__display-name')[0].style.cssText.replace(/color/,''));
  for(c=0; c<userData.length; c++){
    chatterData.push(userData[c]);
  }
  unqHsh(chatterData,{});
}

var domObserver = new MutationObserver(() => {
  var chatterData = currentChats.map(el=> cn(el,'chat-author__display-name')[0].innerText + cn(el,'chat-author__display-name')[0].style.cssText.replace(/color/,''));
  addNewChats();
  addNewUsers();
});

domObserver.observe(cn(document,'chat-room tw-flex tw-flex-column tw-flex-grow-1 tw-flex-shrink-1 tw-full-width')[0], {
  childList: true,
  subtree: true
});


function parseAsRegexArr(bool) {
  if (typeof bool == 'object') {
    /* if object, and ensure it is returned as an array */
    return Array.isArray(bool) ? bool : [bool];
  } else {
    var rxReady = (s) => s ? s.replace(/"/g, '\\b').trim().replace(/\)/g, '').replace(/\(/g, '').replace(/\s+/g, '.{0,2}').replace(/\//g, '\\/').replace(/\+/g, '\\+').replace(/\s*\*\s*/g, '\\s*\\w*\\s+') : s;
    var checkSimpleOR = (s)=> /\bor\b/i.test(s) && /\(/.test(s) === false && /\b\s+and\s\b/.test(s) === false;
    var checkAndOrSimple = (s) => [/\bor\b/i,/\band\b/i].every(el=> el.test(s) && /\(/.test(s) === false);

    if(checkAndOrSimple(bool)){
      return bool.replace(/\s+OR\s+|\s*\|\s*/gi, '|').replace(/\//g, '\\/').replace(/"/g, '\\b').replace(/\s+/g, '.{0,2}').replace(/\s*\*\s*/g, '\\s*\\w*\\s+').split(/\band\b/).map(el=> new RegExp(el.trim(), 'i'));

    } else if (checkSimpleOR(bool)) {
      return [new RegExp(bool.replace(/\s+OR\s+|\s*\|\s*/gi, '|').replace(/\//g, '\\/').replace(/"/g, '\\b').replace(/\s+/g, '.{0,2}').replace(/\s*\*\s*/g, '\\s*\\w*\\s+'), 'i')];

    } else {
      var orx = "\\(.+?\\)|(\\(\\w+\\s{0,1}OR\\s|\\w+\\s{0,1}OR\\s)+((\\w+\s)+?|(\\w+)\\)+)+?";
      var orMatch = bool ? bool.match(new RegExp(orx, 'g')) : [];
      var orArr = orMatch ? orMatch.map(b=> rxReady(b.replace(/\s+OR\s+|\s*\|\s*/gi, '|')) ) : [];
      var noOrs = bool ? bool.replace(new RegExp(orx, 'g'), '').split(/\s+[AND\s+]+/i) : bool;
      var ands = noOrs ? noOrs.map(a=> rxReady(a)) : [];
      var xArr = ands.concat(orArr).filter(i=> i != '').map(x=> new RegExp(x, 'i') );
      return xArr;
    }
  }
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

function boolswitch() {
  var b = gi(document, 'posicon_bool_switch');
  var txt = tn(b.parentElement.parentElement,'input')[0];
  var cir = tn(b, 'circle')[0];
  if (cir.getAttribute('status') == 'pos') {
    cir.style.stroke = '#d11124';
    cir.style.fill = '#e21212';
    cir.style.transform = 'translate(-55%, 0%)';
    cir.style.transition = 'all 211ms';
    attr(cir,'status','neg');
    txt.style.color = '#e21212';
  }else{
    cir.style.stroke = '#659C35';
    cir.style.fill = '#88C057'; 
    cir.style.transform = 'translate(0%, 0%)';
    cir.style.transition = 'all 211ms';
    attr(cir,'status','pos');
    txt.style.color = '#4d7828';
  }
  search();
}

function closeView() {
  this.parentElement.parentElement.outerHTML = '';
}

function search(){
  var searchInput = gi(document,'saved_msg_search_input');
  var str = searchInput.value.trim();
  if(str.length > 2){
    var arr = gi(document,'circleSwitchStatus').getAttribute('status') == 'pos' ? currentChatText.filter(el=> booleanSearch(str,el) || booleanSearch(str,el)) : currentChatText.filter(el=> booleanSearch(str,el) === false && booleanSearch(str,el) === false);

    var ats = arr.map( el=> el.match(/(?<=@)[a-zA-Z]+/g) ).filter(el => el ).flat(); /* not in use, but this captures all the ats in the search response.*/

    creatSearchResultsHTML(parseChatterObj(arr),parseChatterObj(chatterData),ats);
  }else{
    gi(document,'res_content_container').innerHTML = '';
  }
}

var t_color = {purpleBlack: '#0f0e11', navyPurple: '#19171c', darkPurple: '#2c2541', purpleLightGrey: '#dad8de', purple: '#392e5c', lightPurple: '#7d5bbe', brightPurple: '#885dd9', onGreen: '#07ba5b', offRed: '#e21212'};


var svgs = {
	close: `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="${t_color.offRed}" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`
};

function createEle(obj, parent) {
  if (obj.attr && obj.attr.id)
    if (gi(document, obj.attr.id)) gi(document, obj.attr.id).outerHTML = '';
  var cont = ele(obj.tag);
  obj.attr ? Object.entries(obj.attr).forEach(el => attr(cont, el[0], el[1])) : '';
  obj.styles ? Object.entries(obj.styles).forEach(el => cont.style[el[0]] = el[1]) : '';
  parent.appendChild(cont);
  obj.text ? cont.innerText = obj.text : '';
  obj.innerHTML ? cont.innerHTML = obj.innerHTML : '';
  obj.outerHTML ? cont.outerHTML = obj.outerHTML : '';
  return cont;
}


var mainCont = {
  tag: 'div',
  attr: {
    id: 'saved_msg_search_cont'
  },
  styles: {
	position: 'fixed',
	top: `${Math.round(screen.height * 0.15)}px`,
	width: `${Math.round(screen.width * 0.25)}px`,
	right: `2%`,
	zIndex: `111111`,
	borderRadius: `0.15em`
  }
};


function createChatSearchHTML(){
  if (gi(document, 'saved_msg_search_cont')) gi(document, 'saved_msg_search_cont').outerHTML = "";
  var cont = createEle(mainCont,document.body);

    var head = ele('div');
    cont.appendChild(head);
    attr(head, 'style', `display: grid; grid-template-columns: 95% 5%; grid-gap: 1%; justify-content: space-between; background: ${t_color.purple}; color: ${t_color.purpleLightGrey}; padding: 1px; border: 1.2px solid ${t_color.navyPurple}; border-top-right-radius: 0.3em; border-top-left-radius: 0.3em; cursor: move;`);
    head.onmouseover = dragElement;

    var htext = ele('div');
    head.appendChild(htext);
    attr(htext, 'style', 'grid-area: 1 / 1; padding: 4px');
    htext.innerText = 'Chat Search';

    var cls = ele('div');
    head.appendChild(cls);
    attr(cls, 'style', 'grid-area: 1 / 2; width: 27px; height: 27px; cursor: pointer;');
    cls.innerHTML = svgs.close;
    cls.onmouseenter = aninCloseBtn;
    cls.onmouseleave = anoutCloseBtn;
    cls.onclick = closeView;

    var c_bod = ele('div'); 
    attr(c_bod,'style',`display: grid; grid-template-columns: 95% 5%; grid-gap: 0%; justify-content: space-between; background: ${t_color.navyPurple}; color: ${t_color.navyPurple}; border: 1.2px solid ${t_color.purpleBlack}; padding: 6px;`);
    attr(c_bod,'id','saved_msg_content_container');
    cont.appendChild(c_bod);

    var r_bod = ele('div');
    attr(r_bod,'id','res_content_container');
    cont.appendChild(r_bod);

    var input_cont = ele('div');
    attr(input_cont,'style','width: 100%; height: 50px; display: grid; grid-template-columns: 95% 5%; grid-gap: 1px; justify-content: center; background: transparent; padding: 6px;');
    attr(input_cont,'id','saved_msg_input_container');
    c_bod.appendChild(input_cont);

        var s_input = ele('input');
        attr(s_input,'id','saved_msg_search_input');
        attr(s_input,'placeholder','Search chat');
        attr(s_input,'style',`background: ${t_color.navyPurple}; width: 100%; height: 35px; grid-area: 1 / 1; border: 1px solid ${t_color.purple}; border-radius: 0.25em; padding: 3px; color: #4d7828; font-size: 1.4em;`);
        input_cont.appendChild(s_input);
        s_input.onkeyup = search;

        var bool_sw = ele('div');
        attr(bool_sw,'style','grid-area: 1 / 2; padding 2px;');
        bool_sw.style.transform = 'rotate(90deg)';
        bool_sw.style.width = '150%';
        bool_sw.style.maxHeight = '110%';
        bool_sw.innerHTML = `<svg id="posicon_bool_switch" x="0px" y="0px" viewBox="0 0 58 26">
      <path style="fill:${t_color.purple};stroke:#7c7c7c;stroke-width:0.3;stroke-linecap:round;" d="M45,26H13C5.85,26,0,20.15,0,13v0C0,5.85,5.85,0,13,0h32c7.15,0,13,5.85,13,13v0  C58,20.15,52.15,26,45,26z" /><circle id="circleSwitchStatus" status="pos" style="fill:#88C057; stroke:#659C35; stroke-width:2; stroke-linecap:round; stroke-miterlimit:10;" cx="45" cy="13" r="9" />
    </svg>`;
        bool_sw.onclick = boolswitch;
        input_cont.appendChild(bool_sw);

}



function creatSearchResultsHTML(arr,users,ats){
  var parent = gi(document,'res_content_container');
  gi(document,'res_content_container').innerHTML = '';

  var resHead = {
    tag: 'div',
    attr: {style: `display: grid; grid-template-columns: 95% 5%; background: ${t_color.purpleBlack}; padding: 1px;`}
  };

  var resBod = {
    tag: 'div',
    attr: {
      style: arr.length > 7 ? `max-height: 600px; overflow-y: scroll;` : `height: 600px; overflow-y: hidden;`
    }
  };

  var reslabel = {
    tag: 'div',
 	attr: {style: 'text-align: center;'},
    text: 'search results'
  };

  var resClose = {
    tag: 'div',
    attr: {
      id: 'log_closer'
    },
    styles: {
      width: '20px',
      height: '20px',
      cursor: 'pointer',
      gridArea: '1/2'
    },
    innerHTML: svgs.close
  };

  var hd = createEle(resHead,parent);
  var lbl = createEle(reslabel,hd);
  var cls = createEle(resClose,hd);
  cls.onclick = ()=> parent.innerHTML = '';
  cls.onmouseenter = aninCloseBtn;
  cls.onmouseleave = anoutCloseBtn;


  var bod = createEle(resBod,parent);

  for(var i=0; i<arr.length; i++){
    var msg = arr[i].chat.trim();

    var searchResCont = ele('div'); 
    attr(searchResCont,'class','search-results-list');
    attr(searchResCont,'style',`width: 100%; background: ${t_color.navyPurple}; padding: 10px; border-bottom: 1px dashed ${t_color.purpleBlack};`);
    bod.appendChild(searchResCont);

    var userColor = users.filter(el=> arr[i].user == el.user)[0].chat;

    if(ats.length > 0) ats.forEach(el=> msg = msg.replace(new RegExp(el,'i'), `<span style="padding: 0px; background: ${t_color.darkPurple}; border-radius: .3em;">${reg(new RegExp(el,'i').exec(msg),0)}</span>`) );

      var user= ele('span');
      attr(user,'style',`font-weight: 700; padding 2px; color: ${userColor}`);
      user.innerText = arr[i].user+': ';
      searchResCont.appendChild(user);

      var chat= ele('span');
      attr(chat,'style',`padding 2px; color: ${t_color.purpleLightGrey}`);
      chat.innerHTML = msg;
      searchResCont.appendChild(chat);
    }
}

createChatSearchHTML()
