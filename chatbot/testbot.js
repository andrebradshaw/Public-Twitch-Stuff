const tmi = require('tmi.js');
// Define configuration options
const opts = {
    identity: {
      username: '_YOUR_USERNAME_',
      password: 'oauth:YOUR_AUTH_ID'
    },
    channels: [
      '_YOUR_Target_CHANNEL_'
    ]
  };




var reg = (o, n) => o ? o[n] : '';

var channels = [
    {
        channel_name: 'sourcingsupport',
        chatters: [],
    }
]


// {username: "27dollars", last_shout_timestamp: 0 },

var rando = (n) => Math.round(Math.random() * n);

var shout_out_list = [
    {username: "drbwinbwin", last_shout_timestamp: 0 },
    {username: "carpepax", last_shout_timestamp: 0 },
    {username: "marcmunky", last_shout_timestamp: 0 },
    {username: "thebattlelounge", last_shout_timestamp: 0 },
    {username: "masktchi", last_shout_timestamp: 0 },
    {username: "bmcmoo", last_shout_timestamp: 0 },
    {username: "touringnews", last_shout_timestamp: 0 },
    {username: "freemz", last_shout_timestamp: 0 },
    {username: "chudlogic", last_shout_timestamp: 0 },
    {username: "unrelatedthings", last_shout_timestamp: 0 },
    {username: "scuffeddario", last_shout_timestamp: 0 },
    {username: "kingfishergames", last_shout_timestamp: 0 },
    {username: "ragepope", last_shout_timestamp: 0 },
    {username: "theorblady", last_shout_timestamp: 0 },
    {username: "dootsnaps", last_shout_timestamp: 0 },
    {username: "actdottv", last_shout_timestamp: 0 },
    {username: "pragmaticanarchist", last_shout_timestamp: 0 },
    {username: "sbtv_", last_shout_timestamp: 0 },
    {username: "wildman_747", last_shout_timestamp: 0 },
    {username: "ahrelevant", last_shout_timestamp: 0 },
    {username: "freso", last_shout_timestamp: 0 },
];

var auth_commanders = ['sourcingsupport','donny_tinyhands','27dollars','carpepax','drbwinbwin'];


function addVIPstoShoutOutList(context){
  var target_index = shout_out_list.findIndex(r=> r.username == context.username); 
  if(target_index < 0 && context.badges && (context.badges.moderator || context.badges.vip) ){
    shout_out_list.push({username: context.username, last_shout_timestamp: new Date().getTime()});
    return true;
  }else{
    return false;
  }
}
// function commandAddShoutOutChannel(context,command,target_channel){
//     var commander = context['display-name'];
//    if (/add_channel:/i.test(command) && auth_commanders.some(itm=> itm.toLowerCase() == commander.toLowerCase()) ){
//      var channel_name = reg(/add_channel:\s*(\w+)/i.exec(command),1);
//      if(channel_name) {
//          addShoutoutChannel(channel_name,target_channel);
//          console.log(['adding',channel_name,target_channel]);
//          console.log(shout_out_list)
//         }
//    }
// }

// function addShoutoutChannel(channel, target_channel){
//     shout_out_list[`${channel.toLowerCase()}`] = {
//         target_channel: target_channel,
//         last_shout_timestamp: 0,
//     }
//     console.log(['shout_out_list',shout_out_list])
// }
/*  */

function shouldShoutOut(context){
    var target_index = shout_out_list.findIndex(r=> r.username == context.username); 
    var target_obj = target_index > -1 ? shout_out_list[target_index] : null;
    if(target_obj){
      if(target_obj.last_shout_timestamp < (new Date().getTime() - (3.6e+6 * 2))){
        shout_out_list[target_index].last_shout_timestamp = new Date().getTime();
        return true;
      }
    }else{
      return false;
    }  
}

var chat_logs = [];

function chatLogger(context,msg){
  var user_obj = {...context, ...{chat_message: msg}};
  chat_logs.push(user_obj);
  if(chat_logs.length > 250) chat_logs.shift();
}

function lastNMsgs(context,target){
  var user_logs = chat_logs.filter(r=> r.username == context.username);//.sort((a,b)=> a[`${context.username}`]['tmi-sent-ts'] - b[`${context.username}`]['tmi-sent-ts']);
  user_logs.reverse();
  if(user_logs[1]){
    client.say(target, `/delete ${user_logs[1].id}`);
  }
}

function clearUserMsg(context,msg,target){
  var reg = (o, n) => o ? o[n] : '';
  var do_clear = /\!edit/i.test(msg);
  if(do_clear){
    lastNMsgs(context,target);
  }
}
function isStreamer(user_obj){
  var is_streamer = user_obj.broadcaster_type == 'partner' || user_obj.broadcaster_type == 'affiliate';
  var high_view_count = user_obj.view_count > 2000;
// {
//   "data": [{
//     "id": "44322889",
//     "login": "dallas",
//     "display_name": "dallas",
//     "type": "staff",
//     "broadcaster_type": "",
//     "description": "Just a gamer playing games and chatting. :)",
//     "profile_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/dallas-profile_image-1a2c906ee2c35f12-300x300.png",
//     "offline_image_url": "https://static-cdn.jtvnw.net/jtv_user_pictures/dallas-channel_offline_image-1a2c906ee2c35f12-1920x1080.png",
//     "view_count": 191836881,
//     "email": "login@provider.com"
//   }]
}
// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot
  const chat_msg = msg.trim();

  console.log([target, context, msg, self]);

  chatLogger(context,chat_msg,target);

  clearUserMsg(context,chat_msg,target);

  var should_shout = shouldShoutOut(context);
  var badge_shout = addVIPstoShoutOutList(context);
  // commandAddShoutOutChannel(context,chat_msg,target);
  
  var msgArr = ['Click that link and go follow.', 'Follow them, or you will have regrets.', 'When you are on your death bed -- You will regret not having enjoyed their content.','Click the link. Do it now. We will wait.'];
  if(should_shout || badge_shout){
    client.say(target, `https://www.twitch.tv/${context.username} PogChamp say: ${context.username} is in our chat! ${msgArr[rando(3)]}`);
  }

}

function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
