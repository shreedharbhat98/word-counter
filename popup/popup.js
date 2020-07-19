var synth = window.speechSynthesis;
var input = document.querySelector("#input-val")
var countButton = document.querySelector("#count-button")
var listenButton = document.querySelector("#listen-button")
var container = document.querySelector("#data")
var errorMsg = document.querySelector("#error-msg")
var chars = document.querySelector("#chars")
var wordDiv = document.querySelector("#words")
var sentencesDiv = document.querySelector("#sentences")
var paragraph = document.querySelector("#paragraph")
var readingTime = document.querySelector("#readability")
var list = document.querySelector("#list")
countButton.addEventListener('click', countWords)
function countWords() {
  if (input.value.length === 0) {
    errorMsg.setAttribute("style", "display:block")
    errorMsg.setAttribute("style", "margin:auto")
    errorMsg.setAttribute("style", "color:red")
    chars.setAttribute("style", "display:none")
    wordDiv.setAttribute("style", "display:none")
    sentencesDiv.setAttribute("style", "display:none")
    paragraph.setAttribute("style", "display:none")
    readingTime.setAttribute("style", "display:none")
    errorMsg.textContent = "Enter a valid input!!"
    return;
  }
  else {
    errorMsg.textContent = ""
    errorMsg.setAttribute("style", "display:none")
    chars.setAttribute("style", "display:block")
    wordDiv.setAttribute("style", "display:block")
    sentencesDiv.setAttribute("style", "display:block")
    paragraph.setAttribute("style", "display:block")
    readingTime.setAttribute("style", "display:block")
    chars.textContent = "Characters : " + (input.value.length)
    var words = input.value.match(/\b[-?(\w+)?]+\b/gi);
    if (words) {
      wordDiv.textContent = "Words length : " + words.length;
    } else {
      wordDiv.textContent = "Words length : " + 0;
    } if (words) {
      var sentences = input.value.split(/[.|!|?]+/g);
      sentencesDiv.textContent = "Sentence Length : " + (sentences.length - 1);
    } else {
      sentencesDiv.textContent = "Sentence Length : " + 0
    } if (words) {
      var paragraphs = input.value.replace(/\n$/gm, '').split(/\n/);
      paragraph.textContent = "Paragraphs : " + paragraphs.length;
    } else {
      paragraph.textContent = "Paragraphs : " + 0
    } if (words) {
      var seconds = Math.floor(words.length * 60 / 200);
      if (seconds > 59) {
        var minutes = Math.floor(seconds / 60);
        seconds = seconds - minutes * 60;
        readingTime.textContent = minutes + " m " + seconds + " s" + " Reading";
      } else {
        readingTime.textContent = seconds + " s" + " Reading";
      }
    }
  }
} listenButton.addEventListener('click', listenText)
function listenText() {
  speak();
} var voices = []
function populateVoiceList() {
  voices = synth.getVoices()
} populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
} function speak() {
  if (synth.speaking) {
    return;
  }
  if (input.value !== '') {
    var utterThis = new SpeechSynthesisUtterance(input.value);
    var selectedOption = "English_(Great_Britain) "
    for (i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
        break;
      }
    }
    utterThis.pitch = 0.9;
    utterThis.rate = 0.9;
    synth.speak(utterThis);
  }
}
input.addEventListener('dblclick', getWord)
function getWord() {
  list.innerHTML = ""
  var ans = getSelectionText()
  fetch("http://api.urbandictionary.com/v0/define?term=" + ans)
    .then(res => res.json())
    .then(res => res.list.map(item => {
      var li = document.createElement("li")
      li.textContent = item.definition
      list.appendChild(li)
    }))
    .catch(err => console.log(err))
} function getSelectionText() {
  var text = "";
  var activeEl = document.activeElement;
  var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
  if (
    (activeElTagName == "textarea") || (activeElTagName == "input" &&
      /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
    (typeof activeEl.selectionStart == "number")
  ) {
    text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
  } else if (window.getSelection) {
    text = window.getSelection().toString();
  }
  return text;
}