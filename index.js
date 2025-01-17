document.addEventListener('DOMContentLoaded', () => {
    // Dark/Light theme handling
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check if there's a saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.checked = savedTheme === 'dark';
    }

    // Listen for switch changes
    themeToggle.addEventListener('change', (e) => {
        const theme = e.target.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    });

    // Function to send email
    window.sendEmail = function(e) {
        e.preventDefault();
        const form = document.getElementById('linkForm');
        const input = form.querySelector('input[name="link"]');
        const submitBtn = form.querySelector('.submit-btn');
        const loadCommentsBtn = document.querySelector('.load-comments-btn');

        // Validar que el link sea de Instagram
        if (!input.value.trim().toLowerCase().startsWith('https://www.instagram.com/')) {
            input.classList.add('error');
            setTimeout(() => input.classList.remove('error'), 1000);
            return false;
        }

        if (input.value.trim()) {
            submitBtn.textContent = 'Searching...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // Configuración para enviar email usando EmailJS
            const templateParams = {
                link: input.value.trim(),
                date: new Date().toLocaleString()
            };

            // Reemplaza 'YOUR_SERVICE_ID' y 'YOUR_TEMPLATE_ID' con tus IDs de EmailJS
            emailjs.send('service_c1y1f9g', 'template_iyjwjwj', templateParams)
                .then(function(response) {
                    submitBtn.textContent = 'Found ✓';
                    submitBtn.style.background = 'var(--success-color)';
                    submitBtn.style.opacity = '1';
                    loadCommentsBtn.style.pointerEvents = 'auto'; // Habilitar el botón
                    loadCommentsBtn.style.opacity = '1';
                }, function(error) {
                    submitBtn.textContent = 'Try again';
                    submitBtn.style.background = 'var(--error-color)';
                    submitBtn.disabled = false;
                    loadCommentsBtn.style.pointerEvents = 'none'; // Mantener deshabilitado
                    loadCommentsBtn.style.opacity = '0.5';
                });
        }
        return false;
    };

    // Modal and button handling
    const paymentModal = document.getElementById('paymentModal');
    const loadCommentsBtn = document.querySelector('.load-comments-btn');
    const closeModal = document.querySelector('.close-modal');
    const validateCodeBtn = document.getElementById('validateCode');
    const paymentBtn = document.querySelector('.payment-btn');

    // Agregar el nuevo manejador de eventos para el botón de pago
    paymentBtn.addEventListener('click', function() {
        const originalText = this.textContent;
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        this.disabled = true;
        this.style.opacity = '0.7';
        this.style.cursor = 'not-allowed';
    });

    // Open modal - This is the main functionality we need
    loadCommentsBtn.addEventListener('click', () => {
        paymentModal.style.display = 'block';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        paymentModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === paymentModal) {
            paymentModal.style.display = 'none';
        }
    });

    // Winners count handling - Only if elements exist
    const winnersCount = document.getElementById('winnersCount');
    if (winnersCount) {
        const minusBtn = document.querySelector('.winner-btn.minus');
        const plusBtn = document.querySelector('.winner-btn.plus');

        if (minusBtn && plusBtn) {
            minusBtn.addEventListener('click', () => {
                const currentValue = parseInt(winnersCount.value);
                if (currentValue > 1) {
                    winnersCount.value = currentValue - 1;
                    // Guardar la nueva cantidad en localStorage
                    localStorage.setItem('winnersCount', winnersCount.value);
                }
            });

            plusBtn.addEventListener('click', () => {
                const currentValue = parseInt(winnersCount.value);
                if (currentValue < 10) {
                    winnersCount.value = currentValue + 1;
                    // Guardar la nueva cantidad en localStorage
                    localStorage.setItem('winnersCount', winnersCount.value);
                }
            });
        }
    }

    // Modal handling and code validation
    validateCodeBtn.addEventListener('click', () => {
        const codeInput = document.getElementById('promoCode');
        const code = codeInput.value.trim().toUpperCase();
        
        // Array de códigos válidos
        const validCodes = [
            'ALLISON',
            'WINNER50', // Este código redirigirá a loading2.html
        ];
        
        if (validCodes.includes(code)) { // Verificar si el código está en el array
            if (code === 'WINNER50') {
                // Redirigir a loading2.html
                window.location.href = 'loadingg.html';
                return; // Salir de la función
            }

            // Collect filter data
            const filters = {
                mentions: document.getElementById('filterMentions').checked,
                mentionsCount: document.querySelector('.mentions-count input').value,
                followers: document.getElementById('filterFollowers').checked,
                likes: document.getElementById('filterLikes').checked,
                winnersCount: document.getElementById('winnersCount').value
            };

            // Save filters in localStorage
            localStorage.setItem('giveawayFilters', JSON.stringify(filters));

            // Update UI and redirect
            paymentModal.style.display = 'none';
            loadCommentsBtn.textContent = 'Loading...';
            loadCommentsBtn.disabled = true;
            
            setTimeout(() => {
                window.location.href = 'loading.html';
            }, 1500);
        } else {
            codeInput.classList.add('error');
            setTimeout(() => codeInput.classList.remove('error'), 1000);
        }
    });

    // Filter handling
    const filterMentions = document.getElementById('filterMentions');
    const mentionsConfig = document.querySelector('.mentions-config');
    const mentionsCountInput = document.getElementById('mentionsCount');

    filterMentions.addEventListener('change', () => {
        mentionsConfig.style.display = filterMentions.checked ? 'block' : 'none';
        if (filterMentions.checked) {
            mentionsConfig.style.opacity = '0';
            setTimeout(() => {
                mentionsConfig.style.opacity = '1';
            }, 50);
        }
    });

    // Function to handle counters
    function setupCounter(input, minusBtn, plusBtn) {
        const min = parseInt(input.getAttribute('min'));
        const max = parseInt(input.getAttribute('max'));

        minusBtn.addEventListener('click', () => {
            let currentValue = parseInt(input.value);
            if (currentValue > min) {
                input.value = currentValue - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            let currentValue = parseInt(input.value);
            if (currentValue < max) {
                input.value = currentValue + 1;
            }
        });

        input.addEventListener('change', () => {
            let value = parseInt(input.value);
            if (value < min) input.value = min;
            if (value > max) input.value = max;
            if (isNaN(value)) input.value = min;
        });
    }

    // Set up mentions counter
    const mentionsInput = document.getElementById('mentionsCount');
    const mentionsMinusBtn = mentionsInput.parentElement.querySelector('.minus');
    const mentionsPlusBtn = mentionsInput.parentElement.querySelector('.plus');
    setupCounter(mentionsInput, mentionsMinusBtn, mentionsPlusBtn);

    // Set up winners counter
    const winnersInput = document.getElementById('winnersCount');
    const winnersMinusBtn = winnersInput.parentElement.querySelector('.minus');
    const winnersPlusBtn = winnersInput.parentElement.querySelector('.plus');

    // Función para actualizar localStorage
    function actualizarWinnersCount() {
        localStorage.setItem('winnersCount', winnersInput.value);
    }

    // Agregar eventos a los botones de incremento y decremento
    winnersMinusBtn.addEventListener('click', () => {
        let currentValue = parseInt(winnersInput.value);
        if (currentValue > 1) {
            winnersInput.value = currentValue - 1;
            actualizarWinnersCount(); // Actualizar localStorage
        }
    });

    winnersPlusBtn.addEventListener('click', () => {
        let currentValue = parseInt(winnersInput.value);
        if (currentValue < 10) {
            winnersInput.value = currentValue + 1;
            actualizarWinnersCount(); // Actualizar localStorage
        }
    });

    // Asegúrate de que el input sea un número al cambiar
    winnersInput.addEventListener('input', () => {
        let value = parseInt(winnersInput.value);
        if (isNaN(value) || value < 1) {
            winnersInput.value = 1; // Establecer a 1 si no es un número válido
        } else if (value > 10) {
            winnersInput.value = 10; // Limitar a 10
        }
        actualizarWinnersCount(); // Actualizar localStorage
    });

    // Al cargar la página, establecer el valor del input desde localStorage
    const savedWinnersCount = localStorage.getItem('winnersCount');
    if (savedWinnersCount) {
        winnersInput.value = savedWinnersCount;
    }

    // Al inicio del documento, deshabilitar el botón de cargar comentarios
    loadCommentsBtn.style.pointerEvents = 'none';
    loadCommentsBtn.style.opacity = '0.5';
});
