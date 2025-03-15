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

        // Easter Egg 1: Car Rev Sound - Without audio file dependency
        // Click 3 times on the car for a visual effect instead
        let carClicks = 0;
        carImage.addEventListener('click', function() {
            carClicks++;
            if (carClicks === 3) {
                // Create visual "vroom" effect instead of sound
                this.classList.add('car-rev');
                
                const notification = document.createElement('div');
                notification.className = 'notification';
                notification.textContent = '🏎️ Vroom! Vroom! 🏎️';
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                    this.classList.remove('car-rev');
                }, 3000);
                
                carClicks = 0;
            }
        });
    }
    
    // Add a simple counter for page visits using localStorage
    let visits = localStorage.getItem('visits') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('visits', visits);
    
    const footer = document.createElement('footer');
    footer.innerHTML = `<p class="visit-counter">You've visited this page ${visits} time${visits !== 1 ? 's' : ''}.</p>`;
    document.querySelector('.container').appendChild(footer);
    
    // Easter Egg 2: Konami Code
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
    
    // Easter Egg 3: Secret Message in Console
    console.log("%cHey there, fellow developer! 👋", "color: #3498db; font-size: 20px; font-weight: bold;");
    console.log("%cYou found a secret message. Nice detective work!", "color: #2ecc71; font-size: 16px;");
    console.log("%cType 'secretFunction()' to reveal something cool.", "color: #e74c3c; font-size: 14px;");
    
    window.secretFunction = function() {
        console.log("%c🚀 You're awesome! Here's your secret code (this isn't the flag for the CTF so don't submit it): HAYDEN-SAAB-9-5", "color: #f39c12; font-size: 18px; font-weight: bold; background-color: #2c3e50; padding: 10px;");
        return "Secret activated! Check your JavaScript console.";
    };
    
    // Easter Egg 4: Shake Page when typing "saab"
    let typedKeys = [];
    document.addEventListener('keypress', function(e) {
        typedKeys.push(e.key.toLowerCase());
        if (typedKeys.length > 4) {
            typedKeys.shift();
        }
        
        const typed = typedKeys.join('');
        if (typed === 'saab') {
            document.querySelector('.container').classList.add('shake');
            setTimeout(() => {
                document.querySelector('.container').classList.remove('shake');
            }, 1000);
            
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = '🚗 Saab enthusiast detected! 🚗';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
    });
    
    // Easter Egg 5: Double-click header for matrix effect
    header.addEventListener('dblclick', function() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
        const originalText = header.textContent;
        let iteration = 0;
        
        const interval = setInterval(() => {
            header.textContent = originalText
                .split('')
                .map((letter, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return characters[Math.floor(Math.random() * characters.length)];
                })
                .join('');
            
            if (iteration >= originalText.length) {
                clearInterval(interval);
            }
            
            iteration += 1/3;
        }, 30);
    });
    
    // Easter Egg 6: Click-and-hold for secret message
    const ctfButton = document.querySelector('.btn.disabled');
    if (ctfButton) {
        let pressTimer;
        
        ctfButton.addEventListener('mousedown', function() {
            pressTimer = window.setTimeout(function() {
                const secret = document.createElement('div');
                secret.className = 'notification secret-message';
                secret.innerHTML = '🔐 CTF hint: Sometimes secrets are hidden in plain sight. Check the page source. 👀';
                document.body.appendChild(secret);
                
                setTimeout(() => {
                    secret.remove();
                }, 5000);
            }, 2000);
        });
        
        ctfButton.addEventListener('mouseup', function() {
            clearTimeout(pressTimer);
        });
        
        ctfButton.addEventListener('mouseleave', function() {
            clearTimeout(pressTimer);
        });
    }
    
    // Easter Egg 7: Hidden comment in HTML source
    const hiddenComment = document.createComment('🔎 Well done! You found me! Try typing "saab" or clicking the car image 3 times. And have you tried the Konami code? (↑↑↓↓←→←→BA)');
    document.body.appendChild(hiddenComment);
});
