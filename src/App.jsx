import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HeadlineSection from './components/HeadlineSection';
import IngredientsSection from './components/IngredientsSection';
import TaglineSection from './components/TaglineSection';

gsap.registerPlugin(ScrollTrigger);

function CustomCursor() {
  const dotRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const follower = followerRef.current;
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.05 });
    };

    let raf;
    const followMouse = () => {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      raf = requestAnimationFrame(followMouse);
    };

    window.addEventListener('mousemove', onMove);
    followMouse();

    // Hover effect on interactive elements
    const links = document.querySelectorAll('a, button');
    links.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(follower, { width: 60, height: 60, borderColor: 'rgba(248,164,176,0.8)', duration: 0.3 });
        gsap.to(dot, { scale: 0.5, duration: 0.3 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(follower, { width: 36, height: 36, borderColor: 'rgba(255,255,255,0.5)', duration: 0.3 });
        gsap.to(dot, { scale: 1, duration: 0.3 });
      });
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={dotRef} />
      <div className="cursor-follower" ref={followerRef} />
    </>
  );
}

function ProgressBar() {
  const barRef = useRef(null);
  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTop / docHeight;
      if (barRef.current) {
        barRef.current.style.width = `${progress * 100}%`;
      }
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return <div className="progress-bar" ref={barRef} />;
}

function FloatingBadge() {
  return (
    <div className="floating-badge">
      <div className="badge-inner">
        <span style={{ display: 'block' }}>NEW</span>
        <span style={{ display: 'block', fontSize: '0.65rem' }}>LAUNCH</span>
        <span style={{ display: 'block' }}>2025</span>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">s-berry</div>
      <div className="footer-copy">© 2025 S-Berry. All rights reserved.</div>
      <div style={{ display: 'flex', gap: 24 }}>
        {['Privacy', 'Terms', 'Contact'].map((item) => (
          <a
            key={item}
            href="#"
            style={{
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              fontSize: '0.8rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => e.target.style.color = '#fff'}
            onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.4)'}
          >
            {item}
          </a>
        ))}
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <CustomCursor />
      <ProgressBar />
      <FloatingBadge />
      <Navbar />
      <main>
        <Hero />
        <HeadlineSection />
        <TaglineSection />
        <IngredientsSection />
      </main>
      <Footer />
    </>
  );
}
