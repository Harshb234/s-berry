import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ITEMS = [
    'Strawberry Bliss', 'Cold Pressed', 'Zero Preservatives',
    'Sweet & Radiant', 'Premium Juice', '100% Natural',
    'S-Berry', 'Crafted for Greatness', '300ml',
];

export default function TaglineSection() {
    const sectionRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Word-by-word reveal
            const words = textRef.current?.querySelectorAll('.word');
            if (words) {
                gsap.fromTo(words,
                    { opacity: 0, y: 40, rotateX: -30 },
                    {
                        opacity: 1, y: 0, rotateX: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: 'back.out(1.5)',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 75%',
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* Marquee ticker */}
            <div className="marquee-section">
                <div className="marquee-track">
                    {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                        <span className="marquee-item" key={i}>
                            {item}
                            <span className="marquee-dot" />
                        </span>
                    ))}
                </div>
            </div>

            {/* Tagline */}
            <section className="tagline-section" ref={sectionRef} id="about">
                <p className="tagline-text" ref={textRef} style={{ perspective: 800 }}>
                    {['Not', 'just', 'a', 'juice.', 'A', 'feeling.'].map((word, i) => (
                        <span className="word" key={i} style={{ display: 'inline-block', marginRight: '0.25em' }}>
                            {word === 'feeling.' ? (
                                <span className="highlight">{word}</span>
                            ) : word}
                        </span>
                    ))}
                </p>
            </section>
        </>
    );
}
