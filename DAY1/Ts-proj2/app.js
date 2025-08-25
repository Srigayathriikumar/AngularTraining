var sampleTexts = [
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet.",
    "Technology has revolutionized the way we communicate and work in the modern world.",
    "Practice makes perfect when it comes to improving your typing speed and accuracy.",
    "JavaScript is a versatile programming language used for web development."
];
var currentText = "";
var startTime = 0;
var testDuration = 60;
var timerInterval = null;
var isTestActive = false;
var sampleTextEl = document.getElementById("sample-text");
var typingInput = document.getElementById("typing-input");
var wpmEl = document.getElementById("wpm");
var accuracyEl = document.getElementById("accuracy");
var timeEl = document.getElementById("time");
var startBtn = document.getElementById("start-btn");
var resetBtn = document.getElementById("reset-btn");
function startTest() {
    currentText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    sampleTextEl.textContent = currentText;
    typingInput.disabled = false;
    typingInput.value = "";
    typingInput.focus();
    startTime = Date.now();
    isTestActive = true;
    testDuration = 60;
    startBtn.disabled = true;
    startBtn.textContent = "Testing...";
    timerInterval = setInterval(updateTimer, 1000);
}
function updateTimer() {
    testDuration--;
    timeEl.textContent = testDuration.toString();
    if (testDuration <= 0) {
        endTest();
    }
}
function endTest() {
    isTestActive = false;
    typingInput.disabled = true;
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    startBtn.disabled = false;
    startBtn.textContent = "Start Test";
    calculateResults();
}
function calculateResults() {
    var typedText = typingInput.value;
    var timeElapsed = (Date.now() - startTime) / 1000 / 60;
    var wordsTyped = typedText.trim().split(/\s+/).length;
    var wpm = Math.round(wordsTyped / timeElapsed);
    var correctChars = 0;
    for (var i = 0; i < Math.min(typedText.length, currentText.length); i++) {
        if (typedText[i] === currentText[i]) {
            correctChars++;
        }
    }
    var accuracy = typedText.length > 0 ? Math.round((correctChars / typedText.length) * 100) : 100;
    wpmEl.textContent = wpm.toString();
    accuracyEl.textContent = accuracy.toString();
}
function resetTest() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    isTestActive = false;
    typingInput.disabled = true;
    typingInput.value = "";
    sampleTextEl.textContent = "Click Start to begin the typing test";
    wpmEl.textContent = "0";
    accuracyEl.textContent = "100";
    timeEl.textContent = "60";
    startBtn.disabled = false;
    startBtn.textContent = "Start Test";
}
typingInput.addEventListener("input", function () {
    if (isTestActive) {
        calculateResults();
    }
});
startBtn.addEventListener("click", startTest);
resetBtn.addEventListener("click", resetTest);
resetTest();
