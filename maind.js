// Add at the beginning of the file
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  
  // Check if there's a saved preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      themeToggle.checked = savedTheme === 'dark';
  }

  // Listen for switch changes
  themeToggle.addEventListener('change', (e) => {
      if (e.target.checked) {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('theme', 'dark');
      } else {
          document.documentElement.setAttribute('data-theme', 'light');
          localStorage.setItem('theme', 'light');
      }
  });
});

// Example participants bank
const participantNames = [
    '@Mary',
    '@John',
    '@Anna',
    '@Charles', 
    '@Laura',
    '@Peter',
    '@Sophie',
    '@David',
    '@Valentine',
    '@Alexander',
    '@Isabella',
    '@Luke',
    '@Camila',
    '@Matthew',
    '@Daniela',
    '@Sebastian',
    '@Victoria',
    '@Nicholas',
    '@Emma',
    '@Thomas'
];

// Function to get a random name
function getRandomName() {
    const index = Math.floor(Math.random() * participantNames.length);
    return participantNames[index];
}

// List to store winners
let winners = [];

function cambiarNombre() {
    const button = document.getElementById('miBoton');
    button.disabled = true;
    
    // Random names animation
    let counter = 0;
    const interval = setInterval(() => {
        document.getElementById('nombreMostrado').textContent = getRandomName();
        counter++;
        
        if (counter >= 20) {
            clearInterval(interval);
            const winner = getRandomName();
            document.getElementById('nombreMostrado').textContent = winner;
            
            // Add to the end of winners list
            winners.push(winner);
            updateWinnersList();
            
            // Scroll to last winner
            const list = document.getElementById('winnersList');
            list.scrollTop = list.scrollHeight;
            
            createConfetti();
        }
    }, 100);
}

function iniciarTemporizador() {
    setTimeout(() => {
        document.getElementById('miBoton').disabled = false;
    }, 3000);
}

function updateWinnersList() {
    const list = document.getElementById('winnersList');
    list.innerHTML = '';
    winners.forEach(winner => {
        const li = document.createElement('li');
        li.textContent = winner;
        list.appendChild(li);
    });
}

// Function to create confetti effect (keep existing)
function createConfetti() {
    const confettiColors = ['#405DE6', '#5851DB', '#833AB4', '#C13584', '#E1306C', '#FD1D1D'];
    const confettiShapes = ['circle', 'square', 'triangle'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        const randomColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        const randomShape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
        
        confetti.className = 'confetti';
        confetti.classList.add(`confetti--animation-${['slow', 'medium', 'fast'][Math.floor(Math.random() * 3)]}`);
        
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = randomColor;
        confetti.style.width = (Math.random() * 10 + 5) + 'px';
        confetti.style.height = (Math.random() * 10 + 5) + 'px';
        
        if (randomShape === 'triangle') {
            confetti.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
        } else if (randomShape === 'circle') {
            confetti.style.borderRadius = '50%';
        }
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
    }
}
