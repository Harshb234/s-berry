import { useEffect, useRef } from 'react';

export default function ParticleField() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let raf;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Particles: 3 types
        const particles = [];

        // Floating seeds
        for (let i = 0; i < 30; i++) {
            particles.push({
                type: 'seed',
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.3,
                vy: -Math.random() * 0.4 - 0.1,
                r: Math.random() * 2.5 + 1,
                opacity: Math.random() * 0.6 + 0.2,
                hue: Math.random() * 30 + 350,
            });
        }

        // Micro droplets
        for (let i = 0; i < 50; i++) {
            particles.push({
                type: 'drop',
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                r: Math.random() * 3 + 1,
                opacity: Math.random() * 0.35 + 0.05,
                phase: Math.random() * Math.PI * 2,
                freq: Math.random() * 0.005 + 0.002,
            });
        }

        // Puree ribbon segments
        const ribbons = [];
        for (let i = 0; i < 6; i++) {
            ribbons.push({
                x: Math.random() * window.innerWidth,
                y: window.innerHeight + Math.random() * 200,
                points: [],
                vy: -Math.random() * 0.8 - 0.4,
                opacity: Math.random() * 0.15 + 0.05,
                width: Math.random() * 4 + 2,
            });
        }

        let frame = 0;

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            frame++;

            // Draw ribbons
            ribbons.forEach((r) => {
                r.y += r.vy;
                if (r.y < -200) {
                    r.y = canvas.height + 100;
                    r.x = Math.random() * canvas.width;
                }

                const grad = ctx.createLinearGradient(r.x - 20, r.y - 80, r.x + 20, r.y + 80);
                grad.addColorStop(0, `rgba(232,41,74,0)`);
                grad.addColorStop(0.5, `rgba(232,41,74,${r.opacity})`);
                grad.addColorStop(1, `rgba(232,41,74,0)`);

                ctx.beginPath();
                ctx.moveTo(r.x + Math.sin(frame * 0.01 + r.y * 0.01) * 30, r.y - 80);
                ctx.bezierCurveTo(
                    r.x + Math.sin(frame * 0.013 + r.y * 0.008) * 50, r.y - 40,
                    r.x - Math.sin(frame * 0.009) * 40, r.y + 20,
                    r.x + Math.sin(frame * 0.011) * 20, r.y + 80,
                );
                ctx.strokeStyle = grad;
                ctx.lineWidth = r.width;
                ctx.lineCap = 'round';
                ctx.stroke();
            });

            // Draw particles
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.y < -10) p.y = canvas.height + 10;
                if (p.y > canvas.height + 10) p.y = -10;
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;

                ctx.beginPath();

                if (p.type === 'seed') {
                    ctx.ellipse(p.x, p.y, p.r, p.r * 1.8, frame * 0.005, 0, Math.PI * 2);
                    ctx.fillStyle = `hsla(${p.hue}, 70%, 70%, ${p.opacity})`;
                    ctx.fill();
                } else {
                    const pulsedOpacity = p.opacity * (0.7 + 0.3 * Math.sin(frame * p.freq + p.phase));
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(248,164,176,${pulsedOpacity})`;
                    ctx.fill();
                }
            });

            raf = requestAnimationFrame(draw);
        }

        draw();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="particles-canvas" />;
}
