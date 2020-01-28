//This doesnt work because we need to get the autho tokens, and presently I am only able to get the information manually from grabbing the gql fetch params. 
// TODO: find a non-DOM method for grabbing the POST data we need. It may be happening through a series of network request -- intially calling the cookies with this mess:

// for (var entries = document.cookie.split("; "), cookies = {}, i = entries.length - 1; 0 <= i; i--) {
//           var entry = entries[i].split("=", 2);
//           cookies[entry[0]] = entry[1]
//         }


async function getFollows(){
  var res = await fetch("https://gql.twitch.tv/gql", {"credentials":"include","headers":{"accept-language":"en-US","authorization":"OAuth j800v07qrzpvbdli78cjx8vbk7a3wb","client-id":"kimne78kx3ncx6brgo4mv6wki5h1ko","content-type":"text/plain;charset=UTF-8","sec-fetch-mode":"cors","x-device-id":"6ac4f47276ce23ef"},"referrer":"https://www.twitch.tv/touringnews/following","referrerPolicy":"no-referrer-when-downgrade","body":"[{\"operationName\":\"ChannelFollows\",\"variables\":{\"limit\":50,\"login\":\"touringnews\",\"order\":\"DESC\"},\"extensions\":{\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"4820aebc27595788fa5706403e083c616a854eff33ec8e90b078eaf7f2682b49\"}}}]","method":"POST","mode":"cors"});
  var d = await res.json();
  var follows = d[0].data.user.follows.edges.map(el=> el.node.displayName)
  console.log(follows);
}

getFollows()



var reg = (o, n) => o ? o[n] : '';

async function getFollows(){
  var inputData = prompt("Paste the link to the user's profile here");
  var path = reg(/\btwitch\.tv\/(.+)/i.exec(inputData),0) ? reg(/\btwitch\.tv\/(.+)/i.exec(inputData),0) : inputData ? inputData : '';
  if(path){
    var res = await fetch("https://gql.twitch.tv/gql", {"credentials":"include","headers":{"accept-language":"en-US","authorization":"OAuth j800v07qrzpvbdli78cjx8vbk7a3wb","client-id":"kimne78kx3ncx6brgo4mv6wki5h1ko","content-type":"text/plain;charset=UTF-8","sec-fetch-mode":"cors","x-device-id":"6ac4f47276ce23ef"},"referrer":"https://www.twitch.tv/"+path+"/following","referrerPolicy":"no-referrer-when-downgrade","body":"[{\"operationName\":\"ChannelFollows\",\"variables\":{\"limit\":50,\"login\":\""+path+"\",\"order\":\"DESC\"},\"extensions\":{\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"4820aebc27595788fa5706403e083c616a854eff33ec8e90b078eaf7f2682b49\"}}}]","method":"POST","mode":"cors"});
    var d = await res.json();
    var follows = d[0].data.user.follows.edges.map(el=> el.node.displayName);
    document.body.innerHTML = '<div style="padding: 50px;">'+ follows.reduce((a,b)=> a+'<br>'+b) +'</div>'
  }
}
getFollows();
