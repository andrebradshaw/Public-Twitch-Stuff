async function whisperTo(msg, user_id){
  var res = await fetch("https://gql.twitch.tv/gql", {"credentials":"include","headers":{"accept":"*/*","accept-language":"en-US","authorization":"OAuth kvbtbyktpvmo6vsu812pcnztk1pzcw","client-id":"kimne78kx3ncx6brgo4mv6wki5h1ko","content-type":"text/plain;charset=UTF-8","sec-fetch-dest":"empty","sec-fetch-mode":"cors","sec-fetch-site":"same-site","x-device-id":"5937f6c0181c7672"},"referrer":"https://www.twitch.tv/touringnews/followers","referrerPolicy":"no-referrer-when-downgrade","body":"[{\"operationName\":\"SendWhisper\",\"variables\":{\"input\":{\"message\":\""+msg+"\",\"nonce\":\"ba8b0ef693c5f8f848ea051d7f38182c\",\"recipientUserID\":\""+user_id+"\"}},\"extensions\":{\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"3bbd599e7891aaf3ab6a4f5788fd008f21ad0d64f6c47ea6081979f87e406c08\"}}}]","method":"POST","mode":"cors"});
  var d = await res.json();
  console.log(d);
}

whisperTo('Hey Donny', '477405442');
