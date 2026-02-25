import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 192;

function padNum(n) {
    return String(n).padStart(3, '0');
}

export default function BottleCanvas({ scrollContainerRef }) {
    const canvasRef = useRef(null);
    const imagesRef = useRef([]);
    const frameRef = useRef({ current: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Enable high quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        function setupCanvas() {
            const dpr = window.devicePixelRatio || 1;
            const cssW = window.innerWidth;
            const cssH = window.innerHeight;

            // Physical pixels = CSS pixels × DPR (this is the fix for blur)
            canvas.width = cssW * dpr;
            canvas.height = cssH * dpr;

            // CSS size stays at viewport
            canvas.style.width = cssW + 'px';
            canvas.style.height = cssH + 'px';

            // Scale context so all drawing coords are in CSS pixels
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
        }

        function renderFrame(index) {
            const img = imagesRef.current[Math.min(index, TOTAL_FRAMES - 1)];
            if (!img || !img.complete || img.naturalWidth === 0) return;

            const cw = window.innerWidth;   // draw in CSS px — DPR already handled via context transform
            const ch = window.innerHeight;
            const iw = img.naturalWidth;
            const ih = img.naturalHeight;

            // ── Background gradient (always fills screen) ──
            const bg = ctx.createRadialGradient(
                cw * 0.5, ch * 0.55, 0,
                cw * 0.5, ch * 0.55, Math.max(cw, ch) * 0.75
            );
            bg.addColorStop(0, '#6b0a1e');
            bg.addColorStop(0.45, '#3d0010');
            bg.addColorStop(1, '#0d0004');
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, cw, ch);

            // ── CONTAIN scaling — never upscale beyond natural resolution ──
            // Scale to best fit the viewport, but cap at 1× natural size
            const fitScale = Math.min(cw / iw, ch / ih);
            const scale = Math.min(fitScale, 1.0); // never upscale
            const sw = iw * scale;
            const sh = ih * scale;
            const sx = (cw - sw) / 2;
            const sy = (ch - sh) / 2;

            ctx.drawImage(img, sx, sy, sw, sh);

            // ── Vignette for cinematic depth ──
            const vignette = ctx.createRadialGradient(
                cw / 2, ch / 2, Math.min(cw, ch) * 0.25,
                cw / 2, ch / 2, Math.max(cw, ch) * 0.78
            );
            vignette.addColorStop(0, 'rgba(0,0,0,0)');
            vignette.addColorStop(1, 'rgba(5,0,2,0.78)');
            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, cw, ch);

            // ── Bottom gradient so text stays readable ──
            const bottomGrad = ctx.createLinearGradient(0, ch * 0.55, 0, ch);
            bottomGrad.addColorStop(0, 'rgba(5,0,2,0)');
            bottomGrad.addColorStop(1, 'rgba(5,0,2,0.92)');
            ctx.fillStyle = bottomGrad;
            ctx.fillRect(0, 0, cw, ch);

            // ── Top gradient for navbar readability ──
            const topGrad = ctx.createLinearGradient(0, 0, 0, ch * 0.2);
            topGrad.addColorStop(0, 'rgba(5,0,2,0.6)');
            topGrad.addColorStop(1, 'rgba(5,0,2,0)');
            ctx.fillStyle = topGrad;
            ctx.fillRect(0, 0, cw, ch);
        }

        const resize = () => {
            setupCanvas();
            renderFrame(Math.round(frameRef.current.current));
        };

        // Preload all frames
        const images = new Array(TOTAL_FRAMES);
        let loaded = 0;

        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = `/frames/ezgif-frame-${padNum(i + 1)}.jpg`;
            img.onload = () => {
                loaded++;
                if (loaded === 1) {
                    setupCanvas();
                    renderFrame(0);
                }
            };
            images[i] = img;
        }

        imagesRef.current = images;
        window.addEventListener('resize', resize);

        // GSAP scroll-driven frame sequencing
        gsap.to(frameRef.current, {
            current: TOTAL_FRAMES - 1,
            ease: 'none',
            scrollTrigger: {
                trigger: scrollContainerRef.current,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.5,
                onUpdate: () => {
                    renderFrame(Math.round(frameRef.current.current));
                },
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
            window.removeEventListener('resize', resize);
        };
    }, [scrollContainerRef]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                display: 'block',
                zIndex: 3,
            }}
        />
    );
}
