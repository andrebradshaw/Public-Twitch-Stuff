var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);

function reInit(){
async function initTwitcher() {
  function checker(elm, type) {
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

  var noHTML = (s) => s.replace(/<.+?>/g, '').replace(/\s+/g, ' ').replace(/&.+?;/g, '');
  var delay = (ms) => new Promise(res => setTimeout(res, ms));
  var cleanName = (s) => s.replace(/(?<=^.+?)\s+-\s+.+|(?<=^.+?)\s*[sSJj][Rr].+|(?<=^.+?)\s*(III|IV|II).*|(?<=^.+?)\b,.*|(?<=^.+?)\s*\(.*/, '');
  var fixCase = (s) => s.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  var timer = new Date().getTime().toString().replace(/\d{4}$/, '0000');
  var rando = (n) => Math.round(Math.random() * n);
  var fixDate = (s) => s ? s.replace(/[a-zA-Z]+/, s.replace(/(?<=[a-zA-Z]{3}).+/g, '')) : '';
  var formatNum = (n) => n ? '</td><td style="padding: 0.5px; border: 2px solid rgb(94, 47, 147); font-size: 1.1em; text-align: right;"> ' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '</td><td style="padding: 1px; border: 2px solid rgb(94, 47, 147); font-size: .9em; text-align: right;"> ' + 'FeelsBadMan';

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

  await delay(2000);

  function openChatAuthor() {
    var path = cn(this, 'chat-author__display-name')[0].getAttribute('data-a-user');
    window.open('https://www.twitch.tv/' + path);
  }

  cn(document, 'right-column tw-flex-shrink-0 tw-full-height tw-relative')[0].setAttribute('id', 'chat_window_ob');
  var chatArr = document.getElementById("pop_container") ? chatArr : [];

  function getCurrentLogs() {
    var arr = [];
    var chatLog = cn(document, 'chat-line__message');
    for (var i = 0; i < chatLog.length; i++) {
      var badges = Array.from(tn(tn(chatLog[i], 'span')[0], 'a')).map(elm => {
        return tn(elm, 'img')[0].getAttribute('alt')
      });
      var userName = checker(cn(chatLog[i], 'chat-author__display-name')[0], 'text');
      var mention = checker(cn(chatLog[i], 'mention-fragment')[0], 'text');
      var msgText = checker(cn(chatLog[i], 'text-fragment')[0], 'text');
      var timestamp = new Date().getTime();
      var htmlDat = chatLog[i].outerHTML;
      if (/omit_cat_shit/.test(htmlDat) === false) {
        arr.push([badges, userName, mention, msgText, timestamp, htmlDat]);
      }
    }
    return arr;
  }

  function quickRank(input) {
    var xs = /(\w+)\((\d+)/;
    var arrg = input.split(',').map(el => [reg(xs.exec(el), 1), parseInt(reg(xs.exec(el), 2))]).sort((a, b) => b[1] - a[1]);
    return createNextRank(arrg);
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

  var domo = new MutationObserver(() => {
    var chats = getCurrentLogs();
    for (c = 0; c < chats.length; c++) {
      chatArr.push(chats[c]);
    }
    var lastChat = chats[chats.length - 1];
    chatArr.push(lastChat);
    chatArr = unqObj(chatArr);
    var chatterText = cn(document, 'text-fragment');
    for (t = 0; t < chatterText.length; t++) {
      if (/omit_cat_shit/.test(chatterText[t].outerHTML) === false) {
        chatterText[t].addEventListener("click", atChat);
      }
    }
    if (/twitch\.tv\/imreallyimportant/.test(window.location.href)) switchRankText();
  });

  domo.observe(cn(document, 'tw-flex-grow-1 tw-full-height tw-pd-b-1')[0], {
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
  if (document.getElementById("pop_container")) document.body.removeChild(document.getElementById("pop_container"));
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

  function dlFileName() {
    var path = reg(/(?<=\.tv\/).+/.exec(window.location.href), 0);
    var tstamp = new Date().getTime();
    downloadr(chatArr, path + '_' + tstamp + '.json');
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

  function clearSearchRes() {
    if (document.getElementById('resultsBox') != null) {
      document.getElementById("pop_container").removeChild(document.getElementById('resultsBox'));
      cDiv.style.width = "16%";
    }
  }

  function atChat() {
    document.getElementsByTagName('textarea')[0].value = '@' + this.parentElement.innerText.replace(/:.+/g, '') + ' ';
    document.getElementsByTagName('textarea')[0].focus();
  }

  function atChatSearch() {
    document.getElementsByTagName('textarea')[0].value = '@' + this.innerText.replace(/:.+/g, '') + ' ';
    document.getElementsByTagName('textarea')[0].focus();
  }

  function searchChat() {
    clearSearchRes();
    createResDivs(textbox_1, 3);
    createResDivs(textbox_2, 1);
  }

  function createResDivs(obj, n) {
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
        var timer = reg(/\d+:\d+:\d+/.exec(new Date(elm[4]).toTimeString()), 0) + ' ';
        var styler = ' style="font-size: 0.7em; padding: 3px; border-bottom: 1px solid RebeccaPurple; color: RebeccaPurple"';
        resultsText = resultsText + elm[5].replace(/<\/span><\/div>$/, '') + '<b ' + styler + ' data="omit_cat_shit">' + timer + '</b></span></div>';
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
      resultsBox.innerHTML = resultsText ? resultsText : '<div style="padding: 10px;">no matches</div>';

      cDiv.style.width = "35%";

      resultsBox.addEventListener('keyup', () => {
        if (/^.{0}$/.test(document.getElementById('resultsBox').value) === true) {
          document.getElementById("pop_container").removeChild(document.getElementById('resultsBox'));
        }
      });

      var resText = cn(document, 'chat-line__message');
      for (t = 0; t < resText.length; t++) {
        if (/omit_cat_shit/.test(resText[t].outerHTML)) {
          cn(resText[t], "chat-line__username")[0].addEventListener("click", openChatAuthor);
          resText[t].addEventListener("click", atChatSearch);
        }
      }

    }
  }
  cDiv.addEventListener('mouseover', expander);
  mDiv.addEventListener('mouseout', nodrag);
  mDiv.addEventListener('mouseover', dragElement);
  evalBtn.addEventListener("click", searchChat);
  clsBtn.addEventListener("click", close);
  dlBtn.addEventListener("click", dlFileName);
  textbox_1.addEventListener("keyup", searchChat);
  textbox_2.addEventListener("keyup", searchChat);
}
if (/twitch.tv/.test(window.location.href) && cn(document, 'tw-flex-grow-1 tw-full-height tw-pd-b-1')[0]) initTwitcher()
}

  reInit();
