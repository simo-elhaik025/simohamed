import React, { useState } from 'react';

interface AnimatedCardProps {
  message: string;
  emoji: string;
  delay: number;
  position: {
    x: number;
    y: number;
  };
  hoverImageUrl: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ message, emoji, delay, position, hoverImageUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 burst-from-center z-20"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        animationDelay: `${delay}ms`,
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-32 h-40 rounded-2xl shadow-2xl transform transition-all duration-300 breathe hover:scale-110 overflow-hidden"
        style={{
          backgroundImage: `url(${isHovered ? hoverImageUrl : 'https://i.imgur.com/0gqnEaY.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '2px solid white',
        }}
      >
        <div className="p-2 h-full flex flex-col items-center justify-end text-center bg-black/50 text-white">
          <div className="text-xl mb-1">{isHovered ? emoji : '🎁'}</div>
          <p className="text-xs leading-tight">{isHovered ? message : 'Survole-moi !'}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCard;
