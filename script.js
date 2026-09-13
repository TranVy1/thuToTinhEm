document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    setupDataFromConfig();
    setupParticlesCanvas();
    setupClickHeartEffect();
    setupMusicPlayer();
    setupEnvelopeInteraction();
    setupLetterInteraction();
    setupReasonsInteraction();
    setupProposalInteractions();
}

function setupDataFromConfig() {
    if (typeof CONFIG === 'undefined') return;

    document.title = `Gửi ${CONFIG.crushName} ❤️ | Lời Thổ Lộ Từ Trái Tim`;

    const envTitle = document.getElementById("env-title");
    const envSubtitle = document.getElementById("env-subtitle");
    const envBtnText = document.getElementById("env-btn-text");
    if (envTitle) envTitle.textContent = CONFIG.envelope.title || `Gửi ${CONFIG.crushName}`;
    if (envSubtitle) envSubtitle.textContent = CONFIG.envelope.subtitle;
    if (envBtnText) envBtnText.textContent = CONFIG.envelope.openBtn;

    const heroName = document.getElementById("hero-crush-name");
    if (heroName) heroName.textContent = CONFIG.crushName;

    const letterSender = document.getElementById("letter-sender-name");
    if (letterSender) letterSender.textContent = CONFIG.senderName;

    const proposalQ = document.getElementById("proposal-question");
    const btnYesText = document.getElementById("btn-yes-text");
    const btnNoText = document.getElementById("btn-no-text");
    if (proposalQ) proposalQ.textContent = CONFIG.proposal.question;
    if (btnYesText) btnYesText.textContent = CONFIG.proposal.yesBtn;
    if (btnNoText) btnNoText.textContent = CONFIG.proposal.noBtn;

    const modalBadge = document.getElementById("modal-badge");
    const modalTitle = document.getElementById("modal-title");
    const modalMsg = document.getElementById("modal-message");
    const certTitle = document.getElementById("cert-title");
    const certReceiver = document.getElementById("cert-receiver");
    const certPromisesContainer = document.getElementById("cert-promises");
    const certSender = document.getElementById("cert-sender-name");
    const certDate = document.getElementById("cert-date");

    if (modalBadge) modalBadge.textContent = CONFIG.celebration.badge;
    if (modalTitle) modalTitle.textContent = CONFIG.celebration.title;
    if (modalMsg) modalMsg.textContent = CONFIG.celebration.message;

    if (CONFIG.celebration && CONFIG.celebration.certificate) {
        const cert = CONFIG.celebration.certificate;
        if (certTitle) certTitle.textContent = cert.title;
        if (certReceiver) certReceiver.textContent = `${CONFIG.crushName} 💖`;
        if (certSender) certSender.textContent = CONFIG.senderName;
        if (certDate) certDate.textContent = CONFIG.date || "14/09/2026";

        if (certPromisesContainer && cert.promises) {
            certPromisesContainer.innerHTML = "";
            cert.promises.forEach(p => {
                const item = document.createElement("div");
                item.className = "cert-promise-item";
                item.innerHTML = `<i class="fa-solid fa-heart"></i> <span>${p}</span>`;
                certPromisesContainer.appendChild(item);
            });
        }
    }

    renderMemories();

    renderReasons();
}

function renderMemories() {
    const container = document.getElementById("universe-container");
    if (!container || !CONFIG.memories) return;

    container.innerHTML = "";
    CONFIG.memories.forEach((item) => {
        const card = document.createElement("div");
        card.className = "memory-card";
        card.innerHTML = `
            <div class="memory-icon-wrap">${item.icon}</div>
            <span class="memory-tag">${item.tag}</span>
            <h3 class="memory-title">${item.title}</h3>
            <p class="memory-desc">${item.desc}</p>
        `;

        card.addEventListener("click", () => {
            const rect = card.getBoundingClientRect();
            spawnClickHeart(rect.left + rect.width / 2, rect.top + rect.height / 2);
        });

        container.appendChild(card);
    });
}

function renderReasons() {
    const container = document.getElementById("reasons-container");
    if (!container || !CONFIG.reasons) return;

    container.innerHTML = "";
    CONFIG.reasons.forEach((reason) => {
        const card = document.createElement("div");
        card.className = "reason-card";
        card.innerHTML = `
            <span class="reason-icon">${reason.icon}</span>
            <h3 class="reason-title">${reason.title}</h3>
            <p class="reason-desc">${reason.desc}</p>
        `;
        container.appendChild(card);
    });
}

let audioEl = null;
let isAudioPlaying = false;
let isUsingSynthMusic = false;
let synthInterval = null;

function setupMusicPlayer() {
    audioEl = document.getElementById("bg-music");
    const musicPlayerWidget = document.getElementById("music-player");
    const musicTitle = document.getElementById("music-title");

    if (!audioEl) return;

    if (CONFIG.music && CONFIG.music.url) {
        audioEl.src = CONFIG.music.url;
    }
    if (musicTitle) musicTitle.textContent = (CONFIG.music && CONFIG.music.title) || "Giai Điệu Tình Yêu";

    audioEl.addEventListener("error", () => {
        console.warn("Không tải được file mp3 ngoài, kích hoạt Hộp Nhạc Piano Tình Yêu tích hợp sẵn!");
        isUsingSynthMusic = true;
        if (musicTitle) musicTitle.textContent = "Hộp Nhạc Tình Yêu 🎵";
        if (isAudioPlaying) {
            startMusicBoxMelody();
        }
    });

    if (musicPlayerWidget) {
        musicPlayerWidget.addEventListener("click", toggleMusic);
    }
}

function toggleMusic() {
    const widget = document.getElementById("music-player");

    if (isUsingSynthMusic) {
        if (isAudioPlaying) {
            stopMusicBoxMelody();
            isAudioPlaying = false;
            widget.classList.remove("playing");
        } else {
            startMusicBoxMelody();
            isAudioPlaying = true;
            widget.classList.add("playing");
        }
        return;
    }

    if (!audioEl) return;

    if (audioEl.paused) {
        audioEl.play().then(() => {
            isAudioPlaying = true;
            widget.classList.add("playing");
        }).catch(err => {
            console.log("Audio play error, fallback to synth: ", err);
            isUsingSynthMusic = true;
            startMusicBoxMelody();
            isAudioPlaying = true;
            widget.classList.add("playing");
        });
    } else {
        audioEl.pause();
        isAudioPlaying = false;
        widget.classList.remove("playing");
    }
}

function playMusicAfterEnvelope() {
    const widget = document.getElementById("music-player");
    widget.classList.remove("hidden");

    if (isUsingSynthMusic) {
        startMusicBoxMelody();
        isAudioPlaying = true;
        widget.classList.add("playing");
        return;
    }

    if (!audioEl) return;

    audioEl.play().then(() => {
        isAudioPlaying = true;
        widget.classList.add("playing");
    }).catch(err => {
        console.log("External audio blocked or failed, switching to Music Box: ", err);
        isUsingSynthMusic = true;
        startMusicBoxMelody();
        isAudioPlaying = true;
        widget.classList.add("playing");
    });
}

let synthCtx = null;
function startMusicBoxMelody() {
    stopMusicBoxMelody();
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        synthCtx = new AudioCtx();

        const melody = [
            523.25, 659.25, 783.99, 659.25,
            440.00, 523.25, 659.25, 523.25,
            349.23, 440.00, 523.25, 440.00,
            392.00, 493.88, 587.33, 493.88,
            440.00, 554.37, 659.25, 554.37,
            523.25, 659.25, 783.99, 1046.50
        ];

        let noteIndex = 0;
        synthInterval = setInterval(() => {
            if (!synthCtx || synthCtx.state === 'suspended') {
                synthCtx?.resume();
            }
            const freq = melody[noteIndex % melody.length];
            playBellNote(synthCtx, freq);
            noteIndex++;
        }, 420);
    } catch (e) {
        console.log("Synth error: ", e);
    }
}

function playBellNote(ctx, freq) {
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.2);
}

function stopMusicBoxMelody() {
    if (synthInterval) {
        clearInterval(synthInterval);
        synthInterval = null;
    }
    if (synthCtx) {
        synthCtx.close().catch(() => {});
        synthCtx = null;
    }
}

function setupEnvelopeInteraction() {
    const envelopeBox = document.getElementById("envelope-box");
    const waxSealBtn = document.getElementById("wax-seal-btn");
    const openBtn = document.getElementById("btn-open-env");
    const envelopeScreen = document.getElementById("envelope-screen");
    const mainContent = document.getElementById("main-content");

    let isOpened = false;

    const handleOpen = () => {
        if (isOpened) return;
        isOpened = true;

        playMusicAfterEnvelope();

        envelopeBox.classList.add("opened");

        triggerMiniCelebration();

        setTimeout(() => {
            envelopeScreen.classList.add("fade-out");
            mainContent.classList.remove("hidden-initial");
            mainContent.style.opacity = "0";

            setTimeout(() => {
                envelopeScreen.style.display = "none";
                mainContent.style.opacity = "1";
            }, 600);
        }, 1100);
    };

    if (waxSealBtn) waxSealBtn.addEventListener("click", handleOpen);
    if (openBtn) openBtn.addEventListener("click", handleOpen);
    if (envelopeBox) envelopeBox.addEventListener("click", (e) => {
        if (e.target !== openBtn) handleOpen();
    });
}

function triggerMiniCelebration() {
    if (typeof confetti === "function") {
        confetti({
            particleCount: 45,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#ff477e', '#ff7096', '#f7d070', '#ffffff']
        });
    }
}

let typewriterStarted = false;

function setupLetterInteraction() {
    const promptEl = document.getElementById("letter-start-prompt");
    const btnStart = document.getElementById("btn-start-typewriter");

    if (!promptEl) return;

    const handleStart = (e) => {
        if (typewriterStarted) return;

        promptEl.classList.add("fade-out-prompt");
        const cursor = document.getElementById("typewriter-cursor");
        if (cursor) cursor.classList.remove("hidden");

        if (e && e.clientX) {
            spawnClickHeart(e.clientX, e.clientY);
        } else {
            const rect = promptEl.getBoundingClientRect();
            spawnClickHeart(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }

        startTypewriter();
    };

    if (btnStart) btnStart.addEventListener("click", handleStart);
    if (promptEl) promptEl.addEventListener("click", handleStart);
}

function startTypewriter() {
    if (typewriterStarted) return;
    typewriterStarted = true;

    const typewriterEl = document.getElementById("typewriter-text");
    const cursor = document.getElementById("typewriter-cursor");
    const footer = document.getElementById("letter-footer");
    if (!typewriterEl || !CONFIG.letter || CONFIG.letter.length === 0) return;

    if (cursor) cursor.classList.remove("hidden");
    typewriterEl.innerHTML = "";
    let paragraphIndex = 0;
    let charIndex = 0;

    let currentP = document.createElement("p");
    typewriterEl.appendChild(currentP);

    function typeNextChar() {
        if (paragraphIndex < CONFIG.letter.length) {
            const currentSentence = CONFIG.letter[paragraphIndex];

            if (charIndex < currentSentence.length) {
                currentP.textContent += currentSentence.charAt(charIndex);
                charIndex++;

                const char = currentSentence.charAt(charIndex - 1);
                let speed = 35;
                if (char === '.' || char === '!' || char === '?') speed = 260;
                else if (char === ',') speed = 130;

                setTimeout(typeNextChar, speed);
            } else {

                paragraphIndex++;
                charIndex = 0;
                if (paragraphIndex < CONFIG.letter.length) {
                    currentP = document.createElement("p");
                    typewriterEl.appendChild(currentP);
                    setTimeout(typeNextChar, 350);
                } else {

                    if (cursor) cursor.classList.add("hidden");
                    if (footer) {
                        footer.classList.remove("hidden");
                        footer.style.opacity = "0";
                        footer.style.transition = "opacity 1.2s ease, transform 1.2s ease";
                        footer.style.transform = "translateY(12px)";
                        setTimeout(() => {
                            footer.style.opacity = "1";
                            footer.style.transform = "translateY(0)";
                        }, 100);
                    }
                }
            }
        }
    }

    typeNextChar();
}

function setupReasonsInteraction() {
    const cards = document.querySelectorAll(".reason-card");
    cards.forEach(card => {
        card.addEventListener("click", (e) => {
            card.style.transform = "scale(1.05) translateY(-8px)";
            setTimeout(() => {
                card.style.transform = "";
            }, 300);

            const rect = card.getBoundingClientRect();
            spawnClickHeart(rect.left + rect.width / 2, rect.top + rect.height / 2);
        });
    });
}

function setupProposalInteractions() {
    const btnYes = document.getElementById("btn-yes");
    const btnNo = document.getElementById("btn-no");
    const runawayContainer = document.getElementById("runaway-container");
    const runawayBubble = document.getElementById("runaway-bubble");
    const celebrationModal = document.getElementById("celebration-modal");
    const btnFireworksAgain = document.getElementById("btn-fireworks-again");
    const btnCloseModal = document.getElementById("btn-close-modal");

    let noClickCount = 0;
    let yesScale = 1.0;

    const dialogues = (CONFIG.proposal && CONFIG.proposal.noDialogues) || [
        "Ơ kìa, em bấm nhầm rồi! 😜",
        "Nút này bị kẹt rồi nè! 🥺",
        "Bấm nút đỏ bên kia đi công chúa! ❤️",
        "Anh chuẩn bị hoa đẹp lắm đó! 💐",
        "Không cho bấm nút này đâu nha! 😘"
    ];

    function evadeButton() {
        noClickCount++;

        const randomMsg = dialogues[Math.floor(Math.random() * dialogues.length)];
        if (runawayBubble) {
            runawayBubble.textContent = randomMsg;
            runawayBubble.classList.remove("hidden");
        }

        const maxX = 130;
        const maxY = 65;
        const randomX = (Math.random() - 0.5) * 2 * maxX;
        const randomY = (Math.random() - 0.5) * 2 * maxY;

        runawayContainer.style.transform = `translate(${randomX}px, ${randomY}px)`;

        yesScale += 0.12;
        if (yesScale > 1.8) yesScale = 1.8;
        btnYes.style.transform = `scale(${yesScale})`;

        if (noClickCount >= 2) {
            btnYes.innerHTML = `<i class="fa-solid fa-heart-pulse"></i> Bấm Em Đồng Ý Nè! 🥰`;
        }
    }

    if (btnNo) {

        btnNo.addEventListener("mouseenter", evadeButton);

        btnNo.addEventListener("touchstart", (e) => {
            e.preventDefault();
            evadeButton();
        }, { passive: false });

        btnNo.addEventListener("click", (e) => {
            e.preventDefault();
            evadeButton();
        });
    }

    if (btnYes) {
        btnYes.addEventListener("click", () => {

            launchGrandFireworks();
            playSweetHarpSound();

            setTimeout(() => {
                celebrationModal.classList.remove("hidden");
            }, 300);
        });
    }

    if (btnFireworksAgain) {
        btnFireworksAgain.addEventListener("click", () => {
            launchGrandFireworks();
            playSweetHarpSound();
        });
    }

    if (btnCloseModal) {
        btnCloseModal.addEventListener("click", () => {
            celebrationModal.classList.add("hidden");
        });
    }

    const btnSaveCert = document.getElementById("btn-save-cert");
    if (btnSaveCert) {
        btnSaveCert.addEventListener("click", () => {
            const cert = document.getElementById("love-certificate");
            if (!cert || typeof html2canvas !== "function") {
                alert("Vui lòng chụp ảnh màn hình bản cam kết này để lưu kỷ niệm nhé! ❤️");
                return;
            }

            btnSaveCert.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Đang Tạo Ảnh...`;

            const sandbox = document.createElement("div");
            sandbox.style.position = "fixed";
            sandbox.style.left = "-9999px";
            sandbox.style.top = "0";
            sandbox.style.width = "560px";
            sandbox.style.padding = "24px";
            sandbox.style.background = "radial-gradient(circle, #2d0e31 0%, #1f0b24 60%, #0d0614 100%)";
            sandbox.style.borderRadius = "20px";
            sandbox.style.zIndex = "-9999";

            const clone = cert.cloneNode(true);
            clone.style.margin = "0";
            clone.style.width = "100%";
            clone.style.boxShadow = "0 12px 35px rgba(0,0,0,0.6)";

            sandbox.appendChild(clone);
            document.body.appendChild(sandbox);

            html2canvas(sandbox, {
                scale: 2,
                useCORS: true,
                backgroundColor: "#17071c",
                logging: false,
                scrollX: 0,
                scrollY: 0
            }).then(canvas => {
                sandbox.remove();
                const link = document.createElement("a");
                const safeName = (CONFIG.crushName || 'Thao').replace(/\s+/g, '-');
                link.download = `chung-nhan-tinh-yeu-${safeName}.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
                btnSaveCert.innerHTML = `<i class="fa-solid fa-check"></i> Đã Lưu Ảnh! 📸`;
                setTimeout(() => {
                    btnSaveCert.innerHTML = `<i class="fa-solid fa-download"></i> Lưu Bản Cam Kết Kỷ Niệm 📸`;
                }, 2500);
            }).catch(err => {
                sandbox.remove();
                console.log("Canvas capture error:", err);
                btnSaveCert.innerHTML = `<i class="fa-solid fa-download"></i> Lưu Bản Cam Kết Kỷ Niệm 📸`;
                alert("Bạn có thể chụp màn hình bản cam kết này để lưu lại kỷ niệm nhé! ❤️");
            });
        });
    }
}

function launchGrandFireworks() {
    if (typeof confetti !== "function") return;

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = Math.floor(45 * (timeLeft / duration));

        confetti({
            particleCount,
            angle: 60,
            spread: 70,
            origin: { x: 0, y: 0.8 },
            colors: ['#ff477e', '#ff7096', '#f7d070', '#ffe6a7', '#ff0a54'],
            zIndex: 999999
        });

        confetti({
            particleCount,
            angle: 120,
            spread: 70,
            origin: { x: 1, y: 0.8 },
            colors: ['#ff477e', '#ff7096', '#f7d070', '#ffe6a7', '#ff0a54'],
            zIndex: 999999
        });
    }, 260);

    setTimeout(() => {
        confetti({
            particleCount: 120,
            spread: 100,
            origin: { x: 0.5, y: 0.45 },
            shapes: ['heart'],
            colors: ['#ff2a6d', '#ff7096', '#ffd166', '#ffffff'],
            zIndex: 999999
        });
    }, 600);
}

function playSweetHarpSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();

        const notes = [523.25, 659.25, 783.99, 987.77, 1046.50];
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.12);

            gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.12);
            gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + i * 0.12 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 1.2);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime + i * 0.12);
            osc.stop(ctx.currentTime + i * 0.12 + 1.3);
        });
    } catch (e) {
        console.log("Web Audio not supported or blocked");
    }
}

function setupParticlesCanvas() {
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const petalCount = Math.min(Math.floor(width / 25), 38);
    const starCount = Math.min(Math.floor(width / 18), 50);

    const petals = [];
    const stars = [];

    for (let i = 0; i < petalCount; i++) {
        petals.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 8 + 6,
            speedY: Math.random() * 1.2 + 0.8,
            speedX: Math.random() * 1 - 0.5,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 1.5,
            opacity: Math.random() * 0.5 + 0.35,
            color: ['#ff758c', '#ff7eb3', '#f78ca0', '#ffccd5'][Math.floor(Math.random() * 4)]
        });
    }

    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.8 + 0.5,
            opacity: Math.random(),
            pulseSpeed: Math.random() * 0.02 + 0.01,
            color: Math.random() > 0.4 ? '#ffffff' : '#ffd166'
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        stars.forEach(star => {
            star.opacity += star.pulseSpeed;
            if (star.opacity > 1 || star.opacity < 0.2) {
                star.pulseSpeed = -star.pulseSpeed;
            }
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.globalAlpha = star.opacity;
            ctx.shadowBlur = 8;
            ctx.shadowColor = star.color;
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        petals.forEach(p => {
            p.y += p.speedY;
            p.x += Math.sin(p.y * 0.01) * 0.8 + p.speedX;
            p.rotation += p.rotationSpeed;

            if (p.y > height + 20) {
                p.y = -20;
                p.x = Math.random() * width;
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = p.opacity;

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size / 2, p.size, 0, p.size * 1.3);
            ctx.bezierCurveTo(p.size / 2, p.size, p.size / 2, -p.size / 2, 0, 0);
            ctx.fillStyle = p.color;
            ctx.fill();

            ctx.restore();
        });

        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }

    animate();
}

function setupClickHeartEffect() {
    window.addEventListener("click", (e) => {

        if (e.target.closest("button") || e.target.closest(".wax-seal")) return;
        spawnClickHeart(e.clientX, e.clientY);
    });
}

function spawnClickHeart(x, y) {
    const container = document.getElementById("click-hearts-container");
    if (!container) return;

    const heart = document.createElement("span");
    heart.className = "floating-click-heart";
    const heartsList = ["💖", "🌸", "✨", "💕", "🌹", "💐"];
    heart.textContent = heartsList[Math.floor(Math.random() * heartsList.length)];
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1200);
}
