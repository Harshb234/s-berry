import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ingredients = [
    { icon: '🍓', name: 'Fresh Strawberries', desc: 'Hand-picked, sun-ripened' },
    { icon: '💧', name: 'Cold-Pressed Juice', desc: 'No heat, full nutrients' },
    { icon: '✨', name: 'Zero Preservatives', desc: '100% clean label' },
    { icon: '🌿', name: 'Organic Cane Sugar', desc: 'Lightly sweetened' },
];

export default function IngredientsSection() {
    const sectionRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(leftRef.current,
                { opacity: 0, x: -60 },
                {
                    opacity: 1, x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                }
            );

            gsap.fromTo(rightRef.current,
                { opacity: 0, x: 60 },
                {
                    opacity: 1, x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                }
            );

            gsap.fromTo('.ingredient-item',
                { opacity: 0, x: 30 },
                {
                    opacity: 1, x: 0,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                    },
                }
            );

            gsap.fromTo('.stat-card',
                { opacity: 0, y: 30 },
                {
                    opacity: 1, y: 0,
                    duration: 0.7,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="ingredients" className="ingredients-section" ref={sectionRef}>
            <div className="ing-left" ref={leftRef}>
                <p className="section-label">What&apos;s Inside</p>
                <h2 className="section-title">
                    Crafted from<br />
                    <span style={{ color: '#f8a4b0' }}>pure nature.</span>
                </h2>
                <p className="section-desc">
                    Every drop of S-Berry Strawberry Bliss is made from
                    hand-picked, farm-fresh strawberries — cold pressed for
                    maximum nutrition and minimum intervention.
                </p>

                <div className="stats-grid">
                    {[
                        { num: '100%', label: 'Natural Ingredients' },
                        { num: '0g', label: 'Artificial Additives' },
                        { num: '180+', label: 'mg Vitamin C per bottle' },
                        { num: '4×', label: 'More antioxidants' },
                    ].map((s) => (
                        <div className="stat-card" key={s.label}>
                            <div className="stat-number">{s.num}</div>
                            <div className="stat-label">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="ing-right" ref={rightRef}>
                <p className="section-label">Ingredients</p>
                <h2 className="section-title" style={{ marginBottom: 40 }}>
                    Pure. <em style={{ fontStyle: 'italic', fontWeight: 300 }}>Always.</em>
                </h2>

                <div className="ingredient-list">
                    {ingredients.map((ing) => (
                        <div className="ingredient-item" key={ing.name}>
                            <div className="ing-icon">{ing.icon}</div>
                            <div className="ing-info">
                                <h4>{ing.name}</h4>
                                <p>{ing.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
