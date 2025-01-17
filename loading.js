document.addEventListener('DOMContentLoaded', () => {
    const progress = document.querySelector('.progress');
    const statusText = document.querySelector('.status-text');
    const participantCount = document.getElementById('participantCount');
    const steps = document.querySelectorAll('.step');
    
    let currentProgress = 0;
    let currentParticipants = 0;
    const totalParticipants = 1500; // Simulated total number of participants
    
    const messages = [
        'Connecting to Instagram...',
        'Getting comments list...',
        'Verifying participants...',
        'Validating requirements...',
        'Preparing giveaway...'
    ];

    function updateProgress() {
        if (currentProgress < 100) {
            currentProgress += Math.random() * 2;
            progress.style.width = `${currentProgress}%`;
            
            // Actualizar el contador para mostrar porcentaje en lugar de participantes
            participantCount.textContent = `${Math.floor(currentProgress)}%`;
            
            // Update status message
            const messageIndex = Math.floor((currentProgress / 100) * messages.length);
            statusText.textContent = messages[Math.min(messageIndex, messages.length - 1)];
            
            // Update steps
            updateSteps(messageIndex);
            
            setTimeout(updateProgress, 100);
        } else {
            // Redirect to main page when finished
            setTimeout(() => {
                window.location.href = 'draw.html';
            }, 1000);
        }
    }

    function updateSteps(currentStep) {
        steps.forEach((step, index) => {
            if (index < currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
                step.querySelector('i').className = 'fas fa-check-circle';
            } else if (index === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
                step.querySelector('i').className = 'fas fa-sync fa-spin';
            } else {
                step.classList.remove('completed', 'active');
                step.querySelector('i').className = 'fas fa-circle';
            }
        });
    }

    // Start animation after a small delay
    setTimeout(updateProgress, 1000);
}); 