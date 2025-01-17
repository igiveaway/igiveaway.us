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

const nombres = ['🏆@a', '🥈@b', '🥉@c'];
let contador = 0;
let contadorTocadas = 0;
let contadorTemporizador = 0; // Contador para el número de reinicios del temporizador

// Agregar esta línea para obtener la cantidad de ganadores seleccionados
const ganadoresSeleccionados = parseInt(localStorage.getItem('winnersCount')) || 1; // Valor por defecto 1

function cambiarNombre() {
    const nombreMostrado = document.getElementById('nombreMostrado');
    const miBoton = document.getElementById('miBoton');

    if (contador < ganadoresSeleccionados) { // Cambiar a ganadoresSeleccionados
        miBoton.disabled = true;
        
        nombreMostrado.textContent = 'Selecting...';
        nombreMostrado.style.opacity = '0.7';

        setTimeout(() => {
            nombreMostrado.style.opacity = '1';
            nombreMostrado.textContent = nombres[contador];
            contador++;
            miBoton.disabled = false;
            updateWinnersList(nombreMostrado.textContent);
            createConfetti();
        }, 6000);
    } else {
        miBoton.disabled = true;
    }
}

function iniciarTemporizador() {
    let tiempoRestante = 5;
    const btn = document.getElementById('miBoton');
    
    // Incrementar el contador de reinicios
    contadorTemporizador++;

    // Verificar si se ha alcanzado el límite de reinicios según la cantidad de ganadores
    if (contadorTemporizador > ganadoresSeleccionados) { // Cambiar a ganadoresSeleccionados
        btn.disabled = true; // Deshabilitar el botón si se alcanzó el límite
        return;
    }

    btn.disabled = true;

    // Crear elemento para el contador
    const contadorElement = document.createElement('div');
    contadorElement.className = 'contador-circular';
    btn.innerHTML = '';
    btn.appendChild(contadorElement);

    const temporizadorVisual = setInterval(() => {
        contadorElement.textContent = tiempoRestante;
        contadorElement.style.setProperty('--progress', (tiempoRestante / 5) * 100 + '%');

        if (tiempoRestante <= 0) {
            btn.innerHTML = '<i class="fas fa-gift"></i> Draw';
            btn.disabled = false;
            clearInterval(temporizadorVisual);
        } else {
            tiempoRestante--;
        }
    }, 1000);
}

const updateWinnersList = (winner) => {
    const listItem = document.createElement('li');
    listItem.textContent = winner;
    document.getElementById('winnersList').appendChild(listItem);
};

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
