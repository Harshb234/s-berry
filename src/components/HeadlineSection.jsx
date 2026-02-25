import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeadlineSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.eyebrow',
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                }
            );
            gsap.fromTo('.mega-headline',
                { opacity: 0, y: 50 },
                {
                    opacity: 1, y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    delay: 0.15,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                }
            );
            gsap.fromTo('.sub-headline',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: 0.3,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                }
            );
            gsap.fromTo('.cta-group',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    duration: 0.8,
                    ease: 'power3.out',
                    delay: 0.45,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="headline-section" ref={sectionRef}>
            <div className="hs-bg" />
            <div className="hs-bg-glow" />
            <div className="content">
                <p className="eyebrow">The New Standard of Premium Juice</p>
                <h1 className="mega-headline">
                    Strawberry<br />Bliss.
                </h1>
                <p className="sub-headline">
                    <em>Sweet & radiant.</em> Crafted for those who demand the extraordinary.
                </p>
                <div className="cta-group">
                    <button className="btn-primary">Shop Now</button>
                    <button className="btn-ghost">Explore Flavors</button>
                </div>
            </div>
        </section>
    );
}
