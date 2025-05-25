
import React, { useEffect, useState } from 'react';

interface FireworkParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  delay: number;
}

const Fireworks: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [particles, setParticles] = useState<FireworkParticle[]>([]);
  const [showFireworks, setShowFireworks] = useState(true);

  const colors = ['#ff6b9d', '#ffa726', '#ffeb3b', '#66bb6a', '#42a5f5', '#ab47bc'];

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: FireworkParticle[] = [];
      
      // Generate multiple firework bursts
      for (let burst = 0; burst < 8; burst++) {
        const centerX = Math.random() * window.innerWidth;
        const centerY = Math.random() * (window.innerHeight * 0.6) + 50;
        
        for (let i = 0; i < 12; i++) {
          const angle = (i * 30) * (Math.PI / 180);
          const distance = 80 + Math.random() * 40;
          const x = centerX + Math.cos(angle) * distance;
          const y = centerY + Math.sin(angle) * distance;
          
          newParticles.push({
            id: burst * 12 + i,
            x,
            y,
            color: colors[Math.floor(Math.random() * colors.length)],
            delay: burst * 300 + Math.random() * 200
          });
        }
      }
      
      setParticles(newParticles);
    };

    generateParticles();

    // Complete fireworks after 4 seconds
    const timer = setTimeout(() => {
      setShowFireworks(false);
      onComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!showFireworks) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-3 h-3 rounded-full firework"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}ms`,
            boxShadow: `0 0 15px ${particle.color}`,
          }}
        />
      ))}
      
      {/* Sparkle effects */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full sparkle"
          style={{
            left: Math.random() * window.innerWidth,
            top: Math.random() * window.innerHeight,
            animationDelay: `${Math.random() * 3000}ms`,
          }}
        />
      ))}
    </div>
  );
};

export default Fireworks;
