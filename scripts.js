// Hacker reveal effect
const h2 = document.querySelector('h2');
const originalText = h2.textContent.trim();

// Glitch characters pool
const glitchChars = '}[]{}|\\/~`!@#$%^&*()_+-=[]{}|;:\'",.<>?/';

// Clear h2 content
h2.textContent = '';

const startDelay = 20; // Delay between starting each character (ms)
const glitchCycles = 5; // Number of glitch characters before real char
const glitchIntervalTime = 20; // Time between glitch character changes (ms)

// Create a reveal function for each character
function revealChar(charIndex, charSpan) {
    const targetChar = originalText[charIndex];

    // Skip spaces - reveal them immediately
    if (targetChar === ' ') {
        charSpan.textContent = ' ';
        return;
    }

    // Show glitch characters before revealing the real one
    let glitchIndex = 0;
    const glitchInterval = setInterval(() => {
        if (glitchIndex < glitchCycles) {
            // Show glitch char
            charSpan.className = 'glitch';
            charSpan.textContent = glitchChars[Math.floor(Math.random() * glitchChars.length)];
            glitchIndex++;
        } else {
            clearInterval(glitchInterval);

            // Reveal real character
            charSpan.className = 'char';
            charSpan.textContent = targetChar;
        }
    }, glitchIntervalTime);
}

// Split text into words and spaces, wrap words in spans
const words = originalText.split(/(\s+)/); // Split but keep spaces
let charIndex = 0;

words.forEach((wordOrSpace) => {
    if (wordOrSpace.trim() === '') {
        // It's a space - add it directly and count it
        h2.appendChild(document.createTextNode(wordOrSpace));
        charIndex += wordOrSpace.length; // Count spaces for timing
    } else {
        // It's a word - wrap in a word span
        const wordSpan = document.createElement('span');
        wordSpan.style.display = 'inline-block';
        wordSpan.style.whiteSpace = 'nowrap';

        // Create character spans within the word
        const chars = wordOrSpace.split('');
        chars.forEach((char) => {
            const charSpan = document.createElement('span');
            charSpan.className = 'glitch';
            charSpan.textContent = '';
            wordSpan.appendChild(charSpan);

            const currentCharIndex = charIndex++;
            // Start revealing this character after a delay
            setTimeout(() => {
                revealChar(currentCharIndex, charSpan);
            }, 300 + (currentCharIndex * startDelay));
        });

        h2.appendChild(wordSpan);
    }
});


// Handle X.com intent link (Chrome may block direct intent URLs)
const xLink = document.querySelector('a[href*="x.com/muxi_ai"]');
if (xLink) {
    xLink.addEventListener('click', (e) => {
        e.preventDefault();
        // Try to open intent URL, fallback to profile if blocked
        const intentUrl = 'https://x.com/intent/follow?screen_name=muxi_ai';
        const profileUrl = 'https://x.com/muxi_ai';
        const newWindow = window.open(intentUrl, '_blank', 'noopener,noreferrer');
        // If popup was blocked, fallback to profile
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            window.open(profileUrl, '_blank', 'noopener,noreferrer');
        }
    });
}
