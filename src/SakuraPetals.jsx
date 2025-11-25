import React, { useEffect, useState } from 'react';
import './App.css'

const SakuraPetals = () => {
  const [petals, setPetals] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const createPetal = () => {
      const petalTypes = ['petal-1', 'petal-2', 'petal-3', 'petal-4', 'heart', 'golden'];
      const blowAnimations = ['blow-soft-left', 'blow-soft-right', 'blow-medium-left', 'blow-medium-right'];
      const swayAnimations = ['sway-0', 'sway-1', 'sway-2', 'sway-3', 'sway-4', 'sway-5'];

      const petal = {
        id: Math.random(),
        type: petalTypes[Math.floor(Math.random() * petalTypes.length)],
        left: Math.random() * 100,
        fallDuration: 15 + Math.random() * 20,
        blowAnimation: blowAnimations[Math.floor(Math.random() * blowAnimations.length)],
        swayAnimation: swayAnimations[Math.floor(Math.random() * swayAnimations.length)],
        blowDuration: 20 + Math.random() * 15,
        swayDuration: 8 + Math.random() * 12
      };

      setPetals(prev => {
        if (prev.length >= (isMobile ? 20 : 28)) {
          return [...prev.slice(1), petal];
        }
        return [...prev, petal];
      });

      setTimeout(() => {
        setPetals(prev => prev.filter(p => p.id !== petal.id));
      }, petal.fallDuration * 1000);
    };

    const initialPetals = isMobile ? 15 : 20;
    for (let i = 0; i < initialPetals; i++) {
      setTimeout(() => createPetal(), Math.random() * 2000);
    }

    const interval = setInterval(() => {
      if (petals.length < (isMobile ? 15 : 20)) {
        createPetal();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, [petals.length, isMobile]);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden"> {/* Changed from fixed to absolute */}
      {petals.map((petal) => (
        <div
          key={petal.id}
          className={`sakura ${petal.type}`}
          style={{
            left: `${petal.left}vw`,
            animation: `
              fall ${petal.fallDuration}s linear infinite,
              ${petal.blowAnimation} ${petal.blowDuration}s ease-in-out infinite alternate,
              ${petal.swayAnimation} ${petal.swayDuration}s ease-in-out infinite alternate
            `,
            opacity: 0.7
          }}
        />
      ))}
    </div>
  );
};

export default SakuraPetals;