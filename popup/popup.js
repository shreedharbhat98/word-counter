
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

listenButton.addEventListener('click', sayWords)

function sayWords() {
    responsiveVoice.speak(input.value)
};
