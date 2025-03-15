// Main JavaScript file for the About Me page
document.addEventListener('DOMContentLoaded', function() {
    // Typing effect for the header
    const header = document.querySelector('h1');
    const originalText = header.textContent;
    header.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            header.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    typeWriter();
    
    // Add skill badges with animation
    const skills = document.querySelector('.info-item:nth-last-child(2)');
    if (skills) {
        const skillsText = skills.innerHTML;
        const skillsList = skillsText.split('Skills:</strong> ')[1].split(', ');
        
        let skillsHTML = '<strong>Skills:</strong> <div class="skills-container">';
        skillsList.forEach(skill => {
            if (skill !== 'and more') {
                skillsHTML += `<span class="skill-badge">${skill}</span>`;
            }
        });
        skillsHTML += '</div>';
        skills.innerHTML = skillsHTML;
    }
    
    // Add a theme toggle
    const body = document.body;
    const container = document.querySelector('.container');
    
    // Create the theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.title = 'Toggle dark mode';
    document.querySelector('.container').appendChild(themeToggle);
    
    // Toggle dark/light theme
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '☀️';
        } else {
            themeToggle.innerHTML = '🌙';
        }
    });
    
    // Add hover effect to car image
    const carImage = document.querySelector('.car-image img');
    if (carImage) {
        carImage.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        carImage.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Add a simple counter for page visits using localStorage
    let visits = localStorage.getItem('visits') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('visits', visits);
    
    const footer = document.createElement('footer');
    footer.innerHTML = `<p class="visit-counter">You've visited this page ${visits} time${visits !== 1 ? 's' : ''}.</p>`;
    document.querySelector('.container').appendChild(footer);
    
    // Add a simple easter egg
    const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === konami[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konami.length) {
                // Easter egg triggered!
                document.body.style.transition = 'all 1s';
                document.body.style.background = 'linear-gradient(45deg, #ff0000, #ff7700, #ffff00, #00ff00, #0000ff, #8b00ff)';
                document.body.style.backgroundSize = '1000% 1000%';
                
                // Create animation
                const keyframes = `
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }`;
                
                const style = document.createElement('style');
                style.innerHTML = keyframes;
                document.head.appendChild(style);
                
                document.body.style.animation = 'gradient 15s ease infinite';
                
                // Add a message
                const easterEgg = document.createElement('div');
                easterEgg.className = 'easter-egg';
                easterEgg.textContent = '🎮 Konami Code Activated! 🎮';
                document.querySelector('.container').appendChild(easterEgg);
                
                // Reset
                konamiIndex = 0;
                
                // Remove after 10 seconds
                setTimeout(() => {
                    document.body.style.background = '';
                    document.body.style.animation = '';
                    easterEgg.remove();
                }, 10000);
            }
        } else {
            konamiIndex = 0;
        }
    });
});
