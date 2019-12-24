async function banUser(){

var res = await fetch("https://gql.twitch.tv/gql", {"credentials":"include","headers":{"accept":"*/*","accept-language":"en-US","authorization":"OAuth 3u1zrlt5xlsv8kym6kgwbkhadq2j56","client-id":"kimne78kx3ncx6brgo4mv6wki5h1ko","content-type":"text/plain;charset=UTF-8","sec-fetch-mode":"cors","sec-fetch-site":"same-site","x-device-id":"112cc38c25d59fd1"},"referrer":"https://dashboard.twitch.tv/u/sourcingsupport/settings/moderation/banned-chatters","referrerPolicy":"no-referrer-when-downgrade","body":"[{\"operationName\":\"BanUserFromChatRoom\",\"variables\":{\"input\":{\"bannedUserLogin\":\"obeseafricanman69\",\"channelID\":\"266239346\"}},\"extensions\":{\"persistedQuery\":{\"version\":1,\"sha256Hash\":\"a7bc8d9d609f9e1505b6196b67dfb11a0ef9c9e80795afaf15e5e21f723509e8\"}}}]","method":"POST","mode":"cors"});

console.log(res) 

}
banUser()
