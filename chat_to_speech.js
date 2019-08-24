var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
function playLastChat(){
  var currentChats = Array.from(cn(document,'chat-line__message'));
  var selText = currentChats[currentChats.length-1].innerText;
  var synth = window.speechSynthesis;
  var utterThis = new SpeechSynthesisUtterance(selText ? selText : 'Nothing selected.');
  var voices = synth.getVoices();
  utterThis.voice = voices[3];
  utterThis.pitch = '1';
  utterThis.rate = '1.2';
  synth.speak(utterThis);
}
var chatObserver = new MutationObserver(() => {
  playLastChat();
});

chatObserver.observe(cn(document,'tw-flex-grow-1 tw-full-height tw-pd-b-1')[0], {
  childList: true,
  subtree: true
});
