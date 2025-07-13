// === CYBERPUNK PORTFOLIO JAVASCRIPT === //
// Author: NJP | Version: 2024.1.0 | Theme: Cybersecurity

document.addEventListener("DOMContentLoaded", function () {
    // Initialize all cyberpunk effects
    initMatrixBackground();
    initDarkModeToggle();
    initScrollAnimations();
    initSkillBars();
    initTerminalEffects();
    initGlitchEffects();
    initAudioEffects();
});

// === MATRIX BACKGROUND EFFECT === //
function initMatrixBackground() {
    const matrixBg = document.getElementById('matrix-bg');
    if (!matrixBg) return;

    // Create neural network rain effect
    const chars = '01αβγδεζηθικλμνξοπρστυφχψωΣΠΛΨΩ∞∑∫∂∇∆√≈≠≤≥±∓∈∉⊂⊃∩∪';
    const matrix = [];
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-2';
    canvas.style.opacity = '0.1';
    
    matrixBg.appendChild(canvas);

    const columns = canvas.width / 20;
    for (let i = 0; i < columns; i++) {
        matrix[i] = 1;
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00d4ff';
        ctx.font = '15px monospace';
        
        for (let i = 0; i < matrix.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * 20, matrix[i] * 20);
            
            if (matrix[i] * 20 > canvas.height && Math.random() > 0.975) {
                matrix[i] = 0;
            }
            matrix[i]++;
        }
    }

    setInterval(drawMatrix, 50);

    // Resize handler
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// === SYSTEM POWER TOGGLE === //
function initDarkModeToggle() {
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (!darkModeToggle) return;

    darkModeToggle.addEventListener("click", function () {
        // System shutdown/restart animation
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = '#000';
        overlay.style.zIndex = '9999';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.5s ease';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.flexDirection = 'column';
        
        overlay.innerHTML = `
            <div style="color: #00d4ff; font-family: monospace; text-align: center;">
                <h2 style="margin-bottom: 1rem;">NEURAL SYSTEM RESTART</h2>
                <div style="width: 300px; height: 4px; background: #333; border-radius: 2px; overflow: hidden;">
                    <div id="boot-progress" style="width: 0%; height: 100%; background: linear-gradient(90deg, #00d4ff, #7c3aed); transition: width 3s ease;"></div>
                </div>
                <p style="margin-top: 1rem; font-size: 14px;">Initializing AI consciousness...</p>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // Fade in overlay
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
        
        // Start progress bar
        setTimeout(() => {
            const progress = document.getElementById('boot-progress');
            if (progress) progress.style.width = '100%';
        }, 500);
        
        // Add cyber sound effect
        playClickSound();
        
        // Remove overlay and toggle theme
        setTimeout(() => {
            document.body.classList.toggle("dark-mode");
            overlay.style.opacity = '0';
            setTimeout(() => {
                if (overlay.parentNode) {
                    overlay.parentNode.removeChild(overlay);
                }
            }, 500);
        }, 3500);
        
        // Add button animation
        darkModeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            darkModeToggle.style.transform = 'scale(1)';
        }, 150);
    });
}

// === SCROLL ANIMATIONS === //
function initScrollAnimations() {
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.cyber-section, .cyber-box, .project-card, .blog-card');

        animatedElements.forEach(function (element) {
            if (isInViewport(element)) {
                element.classList.add('animate-fade-in-up');
            }
        });
    }

    handleScrollAnimations();
    window.addEventListener('scroll', handleScrollAnimations);

    // Parallax effect for header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.cyber-header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// === SKILL BARS ANIMATION === //
function initSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillProgress = entry.target.querySelector('.skill-progress');
                if (skillProgress) {
                    const skillLevel = skillProgress.getAttribute('data-skill');
                    setTimeout(() => {
                        skillProgress.style.width = skillLevel + '%';
                    }, 300);
                }
            }
        });
    });

    document.querySelectorAll('.skill-item').forEach(item => {
        observer.observe(item);
    });
}

// === TERMINAL EFFECTS === //
function initTerminalEffects() {
    // Typing effect for terminal commands
    const typingElements = document.querySelectorAll('.typing-effect');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });

    // Blinking cursor effect
    setInterval(() => {
        const cursors = document.querySelectorAll('.cursor');
        cursors.forEach(cursor => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        });
    }, 500);
}

// === GLITCH EFFECTS === //
function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animation = 'glitch-text 0.3s infinite';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.animation = 'glitch-text 2s infinite';
        });
    });

    // Random glitch effect on page load
    setTimeout(() => {
        glitchElements.forEach(element => {
            if (Math.random() > 0.7) {
                element.style.animation = 'glitch-text 0.5s ease-out';
                setTimeout(() => {
                    element.style.animation = 'glitch-text 2s infinite';
                }, 500);
            }
        });
    }, 2000);
}

// === AUDIO EFFECTS === //
function initAudioEffects() {
    // Create audio context for cyber sounds
    let audioContext;
    
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.log('Web Audio API not supported');
        return;
    }

    // Sound effect functions
    window.playClickSound = function() {
        if (!audioContext) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    };

    window.playHoverSound = function() {
        if (!audioContext) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
    };

    // Add hover sounds to interactive elements
    const interactiveElements = document.querySelectorAll('.nav-link, .cyber-btn-primary, .cyber-btn-secondary, .cyber-btn-outline, .social-link, .project-card, .blog-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (Math.random() > 0.7) { // Random chance for sound
                playHoverSound();
            }
        });
        
        element.addEventListener('click', () => {
            playClickSound();
        });
    });
}

// === SMOOTH SCROLLING === //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// === PERFORMANCE OPTIMIZATION === //
// Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    // Your scroll event code here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScroll);

// === EASTER EGGS === //
// Konami Code Easter Egg
let konamiCode = [];
const konamiPattern = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiPattern.length) {
        konamiCode.shift();
    }
    
    if (JSON.stringify(konamiCode) === JSON.stringify(konamiPattern)) {
        activateHackerMode();
        konamiCode = [];
    }
});

function activateHackerMode() {
    // Add special hacker mode effects
    document.body.style.filter = 'hue-rotate(120deg)';
    document.body.style.animation = 'glitch-text 0.1s infinite';
    
    // Show easter egg message
    const message = document.createElement('div');
    message.innerHTML = '<span style="color: #00ff41; font-family: monospace; font-size: 2rem;">HACKER MODE ACTIVATED</span>';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.zIndex = '10000';
    message.style.background = 'rgba(0, 0, 0, 0.9)';
    message.style.padding = '2rem';
    message.style.borderRadius = '8px';
    message.style.border = '2px solid #00ff41';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        document.body.removeChild(message);
        document.body.style.filter = '';
        document.body.style.animation = '';
    }, 3000);
}

// === UTILITY FUNCTIONS === //
function getRandomChar() {
    const chars = '0123456789ABCDEF';
    return chars[Math.floor(Math.random() * chars.length)];
}

function generateRandomHex(length = 8) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += getRandomChar();
    }
    return result;
}

// Add random hex codes to background for extra cyber effect
setInterval(() => {
    if (Math.random() > 0.95) { // Very rare occurrence
        const hex = document.createElement('div');
        hex.textContent = '0x' + generateRandomHex();
        hex.style.position = 'fixed';
        hex.style.top = Math.random() * window.innerHeight + 'px';
        hex.style.left = Math.random() * window.innerWidth + 'px';
        hex.style.color = 'rgba(0, 255, 65, 0.3)';
        hex.style.fontFamily = 'monospace';
        hex.style.fontSize = '12px';
        hex.style.pointerEvents = 'none';
        hex.style.zIndex = '-1';
        hex.style.animation = 'fadeInUp 2s ease-out forwards';
        
        document.body.appendChild(hex);
        
        setTimeout(() => {
            if (hex.parentNode) {
                hex.parentNode.removeChild(hex);
            }
        }, 2000);
    }
}, 1000);

// === CONSOLE SIGNATURE === //
console.log(`
%c
╔═══════════════════════════════════════╗
║         NEURAL NETWORK PORTFOLIO     ║
║              Version 2025.1.0         ║
║                                       ║
║  Author: Narasimha Pai - AI Researcher ║
║  Theme: Neural Networks/AI            ║
║  Status: All systems operational      ║
╚═══════════════════════════════════════╝
`, 'color: #00d4ff; font-family: monospace; font-size: 12px;');

console.log('%cWelcome to the neural network...', 'color: #00d4ff; font-family: monospace; font-size: 16px; font-weight: bold;');

// === END OF SCRIPT === //
