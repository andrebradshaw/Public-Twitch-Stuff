var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);

var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);

var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);

async function getChatters(channel) {
  var res = await fetch("https://tmi.twitch.tv/group/user/" + channel + "/chatters");
  var j = await res.json();
  return j.chatters.viewers;
}
async function viewChatters() {
  var chan = reg(/(?<=twitch\.tv\/).+/.exec(window.location.href), 0);
  var res = await getChatters(chan);
  console.log(res);
}
viewChatters()
