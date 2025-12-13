
        // --- 1. SCROLL REVEAL ANIMATION ---
        const observerOptions = { threshold: 0.2 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

        // --- 2. EASTER EGG: KONAMI CODE ---
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiPosition = 0;

        document.addEventListener('keydown', function(e) {
            if (e.key === konamiCode[konamiPosition]) {
                konamiPosition++;
                if (konamiPosition === konamiCode.length) {
                    activateKonamiMode();
                    konamiPosition = 0;
                }
            } else {
                konamiPosition = 0;
            }
        });

        function activateKonamiMode() {
            alert("CHEAT CODE ACTIVATED: GOD MODE ENABLED");
            document.body.style.transform = "rotate(180deg)";
            document.body.style.transition = "transform 1s";
            setTimeout(() => {
                document.body.style.transform = "rotate(0deg)";
            }, 3000);
        }

        // --- 3. EASTER EGG: LOGO CLICK ---
        let logoClicks = 0;
        function logoEasterEgg() {
            logoClicks++;
            if(logoClicks === 5) {
                document.documentElement.style.setProperty('--accent-green', '#f57dff');
                document.documentElement.style.setProperty('--accent-pink', '#64ffda');
                alert("THEME SWAPPED: CYBER-PUNK MODE");
                logoClicks = 0;
            }
        }

        // --- 4. THE MAIN EVENT: DO NOT PRESS ---
        function triggerChaosMode() {
            const canvas = document.getElementById('matrix-canvas');
            const ctx = canvas.getContext('2d');
            const terminal = document.getElementById('terminal-overlay');
            const terminalText = document.getElementById('terminal-text');

            // Start Matrix
            canvas.style.display = 'block';
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const chars = '01';
            const fontSize = 14;
            const columns = canvas.width / fontSize;
            const drops = [];
            for (let x = 0; x < columns; x++) drops[x] = 1;

            function drawMatrix() {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#0F0';
                ctx.font = fontSize + 'px monospace';

                for (let i = 0; i < drops.length; i++) {
                    const text = chars.charAt(Math.floor(Math.random() * chars.length));
                    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                    drops[i]++;
                }
            }
            const matrixInterval = setInterval(drawMatrix, 33);

            // Open Terminal
            terminal.style.display = 'flex';
            terminalText.innerHTML = '';
            
            const logs = [
                "ESTABLISHING CONNECTION...",
                "BYPASSING FIREWALL...",
                "DOWNLOADING SENSITIVE DATA...",
                "DELETING SYSTEM32...",
                "UPLOADING RESUME TO NASA...",
                "ACCESS GRANTED."
            ];

            let logIndex = 0;
            function typeLog() {
                if(logIndex < logs.length) {
                    const p = document.createElement('div');
                    p.innerHTML = `> ${logs[logIndex]}`;
                    p.style.marginBottom = "5px";
                    terminalText.appendChild(p);
                    logIndex++;
                    setTimeout(typeLog, 800);
                } else {
                    setTimeout(() => {
                        alert("Just kidding! nah, but seriously, don't press that button.");
                        location.reload(); 
                    }, 1000);
                }
            }
            typeLog();
        }

        // --- 5. CONSOLE EASTER EGG ---
        console.log("%c STOP! ", "color: red; font-size: 30px; font-weight: bold;");
        console.log("%c If you're reading this, you're probably a developer. Hire me: mikelokinz@gmail.com", "color: #64ffda; font-size: 14px;");
