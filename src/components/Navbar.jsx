import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
    const navRef = useRef(null);

    useEffect(() => {
        // Scroll color intensify
        ScrollTrigger.create({
            start: 'top -80',
            onEnter: () => {
                gsap.to(navRef.current, {
                    background: 'rgba(10, 0, 4, 0.85)',
                    duration: 0.4,
                    ease: 'power2.out',
                });
            },
            onLeaveBack: () => {
                gsap.to(navRef.current, {
                    background: 'rgba(20, 0, 8, 0.4)',
                    duration: 0.4,
                    ease: 'power2.out',
                });
            },
        });

        // Entrance animation
        gsap.fromTo(
            navRef.current,
            { y: -80, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
        );
    }, []);

    return (
        <nav className="navbar" ref={navRef}>
            <div className="nav-logo">
                nano <span>banana</span>
            </div>
            <ul className="nav-links">
                <li><a href="#hero">Home</a></li>
                <li><a href="#ingredients">Flavors</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#store">Store</a></li>
            </ul>
            <button className="nav-cta">Order Now</button>
        </nav>
    );
}
