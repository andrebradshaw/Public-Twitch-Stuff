async function getFollows(){
  var res = await fetch("https://gql.twitch.tv/gql", {"credentials":"include","headers":{"accept-language":"en-US","authorization":"OAuth j800v07qrzpvbdli78cjx8vbk7a3wb","client-id":"kimne78kx3ncx6brgo4mv6wki5h1ko","content-type":"text/plain;charset=UTF-8","sec-fetch-mode":"cors","x-device-id":"6ac4f47276ce23ef"},"referrer":"https://www.twitch.tv/touringnews/following","referrerPolicy":"no-referrer-when-downgrade","body":"[{\"operationName\":\"ChannelFollows\",\"variables\":{\"limit\":15,\"login\":\"touringnews\",\"order\":\"DESC\"},\"extensions\":{\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"4820aebc27595788fa5706403e083c616a854eff33ec8e90b078eaf7f2682b49\"}}}]","method":"POST","mode":"cors"});
  var d = await res.json();
  console.log(d);
}

getFollows()
