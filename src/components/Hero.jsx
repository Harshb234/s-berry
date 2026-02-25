import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BottleCanvas from './BottleCanvas';
import ParticleField from './ParticleField';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const scrollContainerRef = useRef(null);
    const overlayRef = useRef(null);
    const headlineRef = useRef(null);
    const subRef = useRef(null);
    const pill1Ref = useRef(null);
    const pill2Ref = useRef(null);
    const cornerTLRef = useRef(null);
    const cornerTRRef = useRef(null);
    const cornerBLRef = useRef(null);
    const cornerBRRef = useRef(null);
    const scrollHintRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entrance — stagger all hero text in
            const tl = gsap.timeline({ delay: 0.6 });
            tl.fromTo([cornerTLRef.current, cornerTRRef.current],
                { opacity: 0, y: -16 },
                { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
            )
                .fromTo([cornerBLRef.current, cornerBRRef.current],
                    { opacity: 0, y: 16 },
                    { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' },
                    '-=0.7'
                )
                .fromTo(headlineRef.current,
                    { opacity: 0, y: 60, scale: 0.94 },
                    { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power4.out' },
                    '-=0.8'
                )
                .fromTo(subRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
                    '-=0.6'
                )
                .fromTo([pill1Ref.current, pill2Ref.current],
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(1.5)' },
                    '-=0.5'
                )
                .fromTo(scrollHintRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 1 },
                    '-=0.3'
                );

            // Headline fades out as you scroll past the first section
            gsap.to([headlineRef.current, subRef.current, pill1Ref.current, pill2Ref.current],
                {
                    opacity: 0,
                    y: -40,
                    ease: 'power2.in',
                    scrollTrigger: {
                        trigger: scrollContainerRef.current,
                        start: '8% top',
                        end: '25% top',
                        scrub: true,
                    },
                }
            );

            // Corner labels parallax as scroll progresses
            gsap.to([cornerTLRef.current, cornerBLRef.current], {
                y: -80, ease: 'none',
                scrollTrigger: {
                    trigger: scrollContainerRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1.5,
                },
            });
            gsap.to([cornerTRRef.current, cornerBRRef.current], {
                y: -50, ease: 'none',
                scrollTrigger: {
                    trigger: scrollContainerRef.current,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1.5,
                },
            });

            // Scroll hint bobs
            gsap.to(scrollHintRef.current, {
                y: 10,
                duration: 1.4,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
            });

            // Scroll hint fades as user scrolls
            gsap.to(scrollHintRef.current, {
                opacity: 0,
                scrollTrigger: {
                    trigger: scrollContainerRef.current,
                    start: '3% top',
                    end: '10% top',
                    scrub: true,
                },
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section id="hero" className="scroll-container" ref={scrollContainerRef}>
            {/* The scroll-spacer gives height for 600vh of scroll */}
            <div className="scroll-spacer">
                <div className="canvas-sticky">

                    {/* === Full-screen frame canvas (IS the background) === */}
                    <BottleCanvas scrollContainerRef={scrollContainerRef} />

                    {/* Particle field on top of canvas */}
                    <ParticleField />

                    {/* ── Corner labels ── */}
                    <div className="corner-label top-left" ref={cornerTLRef}>
                        <span className="cl-micro">Premium Juice</span>
                        <span className="cl-main">S-Berry®</span>
                    </div>
                    <div className="corner-label top-right" ref={cornerTRRef}>
                        <span className="cl-micro">Net Volume</span>
                        <span className="cl-main">300 ml</span>
                    </div>
                    <div className="corner-label bottom-left" ref={cornerBLRef}>
                        <span className="cl-micro">Flavor Profile</span>
                        <span className="cl-main">Sweet &amp; Radiant</span>
                    </div>
                    <div className="corner-label bottom-right" ref={cornerBRRef}>
                        <span className="cl-micro">Available Now</span>
                        <span className="cl-main">₹ 120 /-</span>
                    </div>

                    {/* ── Central hero text ── */}
                    <div className="hero-center-text" ref={overlayRef}>
                        <h1 className="hero-main-headline" ref={headlineRef}>
                            Strawberry<br />Bliss.
                        </h1>
                        <p className="hero-main-sub" ref={subRef}>
                            <em>Sweet &amp; radiant.</em> Born from nature, crafted for you.
                        </p>
                        <div className="hero-pills">
                            <button className="hero-pill-btn" ref={pill1Ref}>Shop Now</button>
                            <button className="hero-pill-ghost" ref={pill2Ref}>Explore ↓</button>
                        </div>
                    </div>

                    {/* ── Scroll hint ── */}
                    <div className="scroll-hint" ref={scrollHintRef}>
                        <div className="scroll-hint-line" />
                        <span>scroll</span>
                    </div>

                    {/* Horizontal rule decorations */}
                    <div className="hr-left" />
                    <div className="hr-right" />
                </div>
            </div>
        </section>
    );
}
