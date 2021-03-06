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

input.addEventListener("focus", getCopiedText);

function getCopiedText(){
  navigator.clipboard.readText().then(res=> input.value = res).catch(err=>console.log(err))
}

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

    //Characters length
    chars.textContent = "Characters : " + (input.value.length)
    var words = input.value.match(/\b[-?(\w+)?]+\b/gi);

    // Calculate the words length
    if (words) {
      wordDiv.textContent = "Words : " + words.length;
    } else {
      wordDiv.textContent = "Words : " + 0;
    }

    // Calculate the sentence length
    if (words) {
      var sentences = input.value.split(/[.|!|?]+/g);
      sentencesDiv.textContent = "Sentences : " + (sentences.length - 1);
    } else {
      sentencesDiv.textContent = "Sentences : " + 0
    }

    //calculate the nnumber of paragraphs
    if (words) {
      var paragraphs = input.value.replace(/\n$/gm, '').split(/\n/);
      paragraph.textContent = "Paragraphs : " + paragraphs.length;
    } else {
      paragraph.textContent = "Paragraphs : " + 0
    }

    //Calculate the estimated reading time
    if (words) {
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
}

// text to speech function start
listenButton.addEventListener('click', listenText)
function listenText() {
  speak();
}

var voices = []
function populateVoiceList() {
  voices = synth.getVoices()
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

function speak() {
  if (synth.speaking) {
    return;
  }
  if (input.value !== '') {
    var utterThis = new SpeechSynthesisUtterance(input.value);
    var selectedOption = "English_(America) "
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
// text to speech function end


// Getting the word definitions from dictionary

input.addEventListener('dblclick', getWord)

function getWord() {
  list.innerHTML = ""
  var ans = getSelectionText()

  var li = document.createElement("li")
  li.innerHTML = "<span>Wiki Link &nbsp;  <a href=" + 'https://en.wikipedia.org/wiki/' + ans + ">Click here</a></span> "
  list.appendChild(li)

  fetch("http://api.urbandictionary.com/v0/define?term=" + ans)
    .then(res => res.json())
    .then(res => res.list.map(item => {
      var li = document.createElement("li")
      li.textContent = item.definition
      list.appendChild(li)
    }))
    .catch(err => console.log(err))
}

function getSelectionText() {
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