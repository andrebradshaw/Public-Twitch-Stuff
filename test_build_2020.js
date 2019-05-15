  var reg = (o, n) => o ? o[n] : '';
  var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
  var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
  var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
  var noHTML = (s) => s.replace(/<.+?>/g, '').replace(/\s+/g, ' ').replace(/&.+?;/g, '');
  var delay = (ms) => new Promise(res => setTimeout(res, ms));
  var cleanName = (s) => s.replace(/(?<=^.+?)\s+-\s+.+|(?<=^.+?)\s*[sSJj][Rr].+|(?<=^.+?)\s*(III|IV|II).*|(?<=^.+?)\b,.*|(?<=^.+?)\s*\(.*/, '');
  var fixCase = (s) => s.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  var timer = new Date().getTime().toString().replace(/\d{4}$/, '0000');
  var rando = (n) => Math.round(Math.random() * n);
  var fixDate = (s) => s ? s.replace(/[a-zA-Z]+/, s.replace(/(?<=[a-zA-Z]{3}).+/g, '')) : '';
  var formatNum = (n) => n ? '</td><td style="padding: 0.5px; border: 2px solid rgb(94, 47, 147); font-size: 1.1em; text-align: right;"> ' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '</td><td style="padding: 1px; border: 2px solid rgb(94, 47, 147); font-size: .9em; text-align: right;"> ' + 'FeelsBadMan';

function indexOfLowestRanked (arr,start) {
 for(var i=(start-2); i>0; i--){
   if(arr[i][1]>0) return i;
 }
}

function createNextRank(arr){
  var temp = [];
  for(var i=0; i<arr.length; i++){
    var name = arr[i][0];
    var bits = arr[i][1];
    if(i == 0){
      temp.push([name,bits,'0']);
    }else{
      var nextRank = arr[i-1][1]-bits ? arr[i-1][1]-bits : arr[indexOfLowestRanked(arr,i)][1]-bits;
      temp.push([name,bits,nextRank]);
    }
  }
  return temp;
}

function quickRank(){
  var input = `You can vote with bits or tips for the following options: bernie(26870), trump(112), beto(100), warren(26000), yang(333), pete(921), kamala(3402), amy(100), inslee(222), kirsten(1), cory(0), delaney(0), tulsi(333), hickenlooper(0), messam(0), ryan(0), biden(2630), swalwell(0), weld(101), marianne(50), gravel(92), bennet(0), castro(401)`;
  var xs = /(\w+)\((\d+)/;
  var array = input.split(',').map(el=> [reg(xs.exec(el),1),parseInt(reg(xs.exec(el),2))]).sort((a,b)=>b[1]-a[1]);
  console.log(array);
  return createNextRank(array);
}

function switchRankText(){
  if(gi(document, 'rank_table2020')) gi(document, 'rank_table2020').outerHTML = '';
  var chatbox = document.createElement('div');
  chatbox.setAttribute('id','rank_table2020');
  document.body.appendChild(chatbox);
  var updated = '<table><tr style="border: 2px solid rgb(94, 47, 147)"><td style="padding: 0.5px; border: 2px solid rgb(94, 47, 147); font-size: 1em; text-align: center;">Candidate</td><td style="padding: 0.5px; border: 2px solid rgb(94, 47, 147); font-size: 1em; text-align: center;">Bit Rank</td><td style="padding: 0.5px; border: 2px solid rgb(94, 47, 147); font-size: 1em; text-align: center;">Needed</td></tr>';
  var ranked = quickRank();
  ranked.forEach(el=> {updated = updated + '<tr style="border: 2px solid rgb(94, 47, 147)"><td style="padding: 0.5px; border: 2px solid rgb(94, 47, 147); font-size: 1.1em; text-align: left;">'+fixCase(el[0])+formatNum(el[1])+formatNum(el[2]) +'</td></tr>'});
  chatbox.innerHTML = updated+'</table>';
}
switchRankText()
