async function getChatters(){
var res = await fetch("https://tmi.twitch.tv/group/user/mathisonprojects/chatters");
var j = await res.json();
console.log(j.chatters.viewers);
}


getChatters()
