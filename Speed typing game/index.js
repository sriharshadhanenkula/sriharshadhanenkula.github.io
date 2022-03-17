let timerEl = document.getElementById('timer');
let quoteDisplayEl = document.getElementById("quoteDisplay");
let quoteInputEl = document.getElementById("quoteInput");
let resultEl = document.getElementById("result");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let spinnerEl = document.getElementById("spinner");
let startBtnEl = document.getElementById("startBtn");
let uniqueId = null;
let counter = null;

startBtnEl.addEventListener("click", function() {
    timerEl.textContent = "0";
    clearInterval(uniqueId);
    resultEl.textContent = "";
    getTheText();
})

function getTheText() {
    spinnerEl.classList.remove("d-none");
    let options = {
        method: "GET"
    }

    fetch("https://apis.ccbp.in/random-quote", options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            quoteDisplayEl.textContent = jsonData.content;
            spinnerEl.classList.add("d-none");
        })


    counter = 0
    uniqueId = setInterval(function() {
        counter = counter + 1;
        timerEl.textContent = counter
    }, 1000);
}

function WordCount(str) {
    return str.split(" ").length;
}

submitBtn.addEventListener("click", function() {
    if (quoteDisplayEl.textContent === quoteInputEl.value) {
        let x = WordCount(quoteDisplayEl.textContent);
        let val = parseInt((60*x)/counter);
        resultEl.textContent = "You typed " + x + " words in " + counter + " seconds and your speed is " + val + " words per minute.";
        
        clearInterval(uniqueId);
    } else {
        resultEl.textContent = "You typed incorrect sentence";
    }
})




resetBtn.addEventListener("click", function() {
    clearInterval(uniqueId);
    timerEl.textContent = "0";
    resultEl.textContent = "";
    getTheText();
})