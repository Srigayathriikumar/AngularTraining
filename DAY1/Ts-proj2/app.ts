const sampleTexts: string[] = [
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet.",
    "Technology has revolutionized the way we communicate and work in the modern world.",
    "Practice makes perfect when it comes to improving your typing speed and accuracy.",
    "JavaScript is a versatile programming language used for web development."
];

let currentText: string = "";
let startTime: number = 0;
let testDuration: number = 60;
let timerInterval: any = null;
let isTestActive: boolean = false;

const sampleTextEl = document.getElementById("sample-text") as HTMLElement;
const typingInput = document.getElementById("typing-input") as HTMLTextAreaElement;
const wpmEl = document.getElementById("wpm") as HTMLElement;
const accuracyEl = document.getElementById("accuracy") as HTMLElement;
const timeEl = document.getElementById("time") as HTMLElement;
const startBtn = document.getElementById("start-btn") as HTMLButtonElement;
const resetBtn = document.getElementById("reset-btn") as HTMLButtonElement;

function startTest(): void {
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

function updateTimer(): void {
    testDuration--;
    timeEl.textContent = testDuration.toString();
    
    if (testDuration <= 0) {
        endTest();
    }
}

function endTest(): void {
    isTestActive = false;
    typingInput.disabled = true;
    
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    startBtn.disabled = false;
    startBtn.textContent = "Start Test";
    
    calculateResults();
}

function calculateResults(): void {
    const typedText = typingInput.value;
    const timeElapsed = (Date.now() - startTime) / 1000 / 60;
    
    const wordsTyped = typedText.trim().split(/\s+/).length;
    const wpm = Math.round(wordsTyped / timeElapsed);
    
    let correctChars = 0;
    for (let i = 0; i < Math.min(typedText.length, currentText.length); i++) {
        if (typedText[i] === currentText[i]) {
            correctChars++;
        }
    }
    
    const accuracy = typedText.length > 0 ? Math.round((correctChars / typedText.length) * 100) : 100;
    
    wpmEl.textContent = wpm.toString();
    accuracyEl.textContent = accuracy.toString();
}

function resetTest(): void {
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

typingInput.addEventListener("input", () => {
    if (isTestActive) {
        calculateResults();
    }
});

startBtn.addEventListener("click", startTest);
resetBtn.addEventListener("click", resetTest);

resetTest();