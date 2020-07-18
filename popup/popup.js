
var input = document.querySelector("#input-val")
var countButton = document.querySelector("#count-button")
var listenButton = document.querySelector("#listen-button")
var container = document.querySelector("#data")

var chars = document.querySelector("#chars")
var wordDiv = document.querySelector("#words")
var sentencesDiv = document.querySelector("#sentences")
var paragraph = document.querySelector("#paragraph")
var readingTime = document.querySelector("#readability")

countButton.addEventListener('click', countWords)

function countWords() {
    chars.textContent = "Characters : " + (input.value.length)
    var words = input.value.match(/\b[-?(\w+)?]+\b/gi);
    if (words) {
        wordDiv.textContent = "Words length : " + words.length;
    } else {
        wordDiv.textContent = "Words length : " + 0;
    }


    if (words) {
        var sentences = input.value.split(/[.|!|?]+/g);
        sentencesDiv.textContent = "Sentence Length :" + (sentences.length - 1);
    } else {
        sentencesDiv.textContent = "Sentence Length :" + 0
    }


    if (words) {
        var paragraphs = input.value.replace(/\n$/gm, '').split(/\n/);
        paragraph.textContent = "Paragraphs : " + paragraphs.length;
    } else {
        paragraph.textContent = "Paragraphs : " + 0
    }


    if (words) {
        var seconds = Math.floor(words.length * 60 / 200);
        if (seconds > 59) {
            var minutes = Math.floor(seconds / 60);
            seconds = seconds - minutes * 60;
            readingTime.textContent = minutes + "m " + seconds + "s" + " Reading";
        } else {
            readingTime.textContent = "Esitmated Reading time : " + seconds + "s";
        }
    }

}

listenButton.addEventListener('click', listenText)


var synth = window.speechSynthesis;

function listenText() {
    speak();
}

var voices = []

function populateVoiceList() {
    voices = synth.getVoices().sort(function (a, b) {
        const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
        if ( aname < bname ) return -1;
        else if ( aname == bname ) return 0;
        else return +1;
    });
    for(i = 0; i < voices.length ; i++) {
      var option = document.createElement('option');
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

      if(voices[i].default) {
        option.textContent += ' -- DEFAULT';
      }

      option.setAttribute('data-lang', voices[i].lang);
      option.setAttribute('data-name', voices[i].name);
    }
  }

  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }



function speak(){
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (input.value !== '') {
    var utterThis = new SpeechSynthesisUtterance(input.value);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }
    var selectedOption = "English_(Great_Britain) "
  for(i = 0; i < voices.length ; i++) {
    if(voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
      break;
    }
  }
    utterThis.pitch = 0.9;
    utterThis.rate = 0.9;
    synth.speak(utterThis);
  }
}

