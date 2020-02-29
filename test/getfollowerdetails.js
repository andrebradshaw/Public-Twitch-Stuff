var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var reChar = (s) => s.match(/&#.+?;/g) && s.match(/&#.+?;/g).length > 0 ? s.match(/&#.+?;/g).map(el=> [el,String.fromCharCode(/d+/.exec(el)[0])]).map(m=> s = s.replace(new RegExp(m[0], 'i'), m[1])).pop() : s;

function parseReadableDate(t){
  var d = new Date(t);
  return `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()} ${d.getHours()}:${(d.getMinutes() > 9 ? d.getMinutes() : '0'+d.getMinutes())}`;
}
async function getFollowerDetail(user){
  var res = await fetch("https://gql.twitch.tv/gql", {"credentials":"include","headers":{"accept":"*/*","accept-language":"en-US","authorization":"OAuth kvbtbyktpvmo6vsu812pcnztk1pzcw","client-id":"kimne78kx3ncx6brgo4mv6wki5h1ko","content-type":"text/plain;charset=UTF-8","sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-site","x-device-id":"5937f6c0181c7672"},"referrer":"https://www.twitch.tv/touringnews/followers","referrerPolicy":"no-referrer-when-downgrade","body":"[{\"operationName\":\"ViewerCard\",\"variables\":{\"channelID\":\"212959091\",\"channelLogin\":\"touringnews\",\"hasChannelID\":true,\"targetLogin\":\""+user+"\"},\"extensions\":{\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"34bbb6d307d991c79319d95b5f11db539f646507bfcb77e975300555dd1d5d21\"}}}]","method":"POST","mode":"cors"});
  var d = await res.json();
  console.log(d);
  var ob = parseOb(d);

  return ob;
}

function parseOb(d){
  var target = d[0] && d[0].data && d[0].data.targetUser && d[0].data.targetUser ? d[0].data.targetUser : null;
  return [(target && target.displayName ? target.displayName : ''), (target && target.id ? target.id : ''), (target && target.relationship && target.relationship.followedAt ? parseReadableDate(target.relationship.followedAt) : '')];
}

var all_users = [];
var containArr = [];
async function looper(arr){
  
  for(var i=0; i<arr.length; i++){
    var res = await getFollowerDetail(arr[i]);
    containArr.push(res);
    await delay(rando(111))
  }

}

looper(all_users)

/////////////
var reg = (o, n) => o ? o[n] : '';
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));

async function getFollowerAPI(cursor){
  var res = await fetch("https://gql.twitch.tv/gql", {"credentials":"include","headers":{"accept":"*/*","accept-language":"en-US","authorization":"OAuth kvbtbyktpvmo6vsu812pcnztk1pzcw","client-id":"kimne78kx3ncx6brgo4mv6wki5h1ko","content-type":"text/plain;charset=UTF-8","sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-site","x-device-id":"5937f6c0181c7672"},"referrer":"https://www.twitch.tv/touringnews/followers","referrerPolicy":"no-referrer-when-downgrade","body":"[{\"operationName\":\"ChannelFollowers\",\"variables\":{\"cursor\":\""+cursor+"\",\"limit\":100,\"login\":\"touringnews\",\"order\":\"DESC\"},\"extensions\":{\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"74600e2be97dd9431dd195f1010f2c161ae48ce53556b545ce7665b27d91ad07\"}}}]","method":"POST","mode":"cors"});
  var d = await res.json();
  console.log(d);
  return d;
}

async function looper(){
  
  var one = await getFollowerAPI(1582820539443266252);
  var edges = one[0].data.user.followers.edges ? one[0].data.user.followers.edges : null;
  var names = edges ? edges.map(el=> el.node && el.node.displayName ? el.node.displayName : '') : [];
  var cursors = edges.map(el=> el.cursor);

  for(var i=0; i<30; i++){
    var two = await getFollowerAPI(cursors[(cursors.length-1)]);
    var edges2 = two[0].data.user.followers.edges ? two[0].data.user.followers.edges : null;
    var names2 = edges2 ? edges2.map(el=> el.node && el.node.displayName ? el.node.displayName : '') : [];
    cursors = edges2.map(el=> el.cursor);
    names2.forEach(el=> {if(names.every(ii=> ii != el)) {names.push(el)} });
    await delay(rando(555)+111);
   console.log(i);
  }
console.log(names)
}

looper()





///not_mod_version

async function looper(){
  
  var one = await getFollowerAPI(1581758991710889039);
  var edges = one[0].data.user.followers.edges ? one[0].data.user.followers.edges : null;
  var names = edges ? edges.map(el=> [(el.node && el.node.displayName ? el.node.displayName : ''),(el.node && el.node.id ? el.node.id : '')]) : [];
  var cursors = edges.map(el=> el.cursor);

  for(var i=0; i<30; i++){
    var two = await getFollowerAPI(cursors[(cursors.length-1)]);
    var edges2 = two[0].data.user.followers.edges ? two[0].data.user.followers.edges : null;
    var names2 = edges2 ? edges2.map(el=> [(el.node && el.node.displayName ? el.node.displayName : ''),(el.node && el.node.id ?  el.node.id  : '')]) : [];
    cursors = edges2.map(el=> el.cursor);
    names2.forEach(el=> {if(names.every(ii=> ii[0] != el[0])) {names.push(el)} });
    await delay(rando(555)+111);
   console.log(i);
  }
console.log(names)
}

//.map(el=> el.reduce((a,b)=> a+'\t'+b)).reduce((a,b)=> a+'\n'+b)
