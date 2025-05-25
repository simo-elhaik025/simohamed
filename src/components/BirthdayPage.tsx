
import React, { useState, useEffect,useRef} from 'react';
import Fireworks from './Fireworks';
import AnimatedCard from './AnimatedCard';

const BirthdayPage: React.FC = () => {
  const [showFireworks, setShowFireworks] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [showCards, setShowCards] = useState(false);

  const messages = [
    { text: "Je t'aime ma nièce", emoji: "❤️" },
    { text: "Tu es une étoile brillante", emoji: "🌟" },
    { text: "Un bisou magique", emoji: "😘" },
    { text: "Tu es un cadeau pour le monde", emoji: "🎁" },
    { text: "Toujours dans mon cœur", emoji: "💖" },
    { text: "Petit ange joyeux", emoji: "👼" },
  ];

  const cardPositions = [
    { x: 10, y: 10 },
    { x: 80, y: 20 },
    { x: 15, y: 70 },
    { x: 75, y: 60 },
    { x: 50, y: 20 },
    { x: 40, y: 70 },
  ];

  const handleFireworksComplete = () => {
    setShowFireworks(false);
    setTimeout(() => setShowMessage(true), 500);
    setTimeout(() => setShowCards(true), 2000);
  };
  const bgMusic = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = bgMusic.current;
    if (audio) {
      audio.play().catch(() => {
        console.log("Audio bloqué (interaction requise).");
      });
    }
  }, []);
  


  return (

    <div className="min-h-screen bg-black relative overflow-hidden">
      {showFireworks && <Fireworks onComplete={handleFireworksComplete} />}
     
      {/* Background sparkles */}
      {!showFireworks && (
        <div className="fixed inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3000}ms`,
              }}
            />
          ))}
         <audio ref={bgMusic}  src="/son/happy_birthday.mp3"  preload="auto" autoPlay loop/>
        </div>
        
      )}

      {/* Main birthday message */}
      {showMessage && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center bounce-in">
            <h1 className="font-birthday text-6xl md:text-8xl lg:text-9xl rainbow-text text-shadow-glow mb-4">
              Happy Birthday
            </h1>
            <h2 className="font-birthday text-4xl md:text-6xl lg:text-7xl text-pink-300 text-shadow-glow float">
              Ibtihal
            </h2>
            <div className="mt-8 flex justify-center space-x-4">
              {['🎂', '🎈', '🎉', '🌟', '💖'].map((emoji, i) => (
                <span
                  key={i}
                  className="text-4xl md:text-5xl float"
                  style={{ animationDelay: `${i * 200}ms` }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Animated cards */}
      {showCards && (
        <div className="absolute inset-0">
          {messages.map((message, index) => (
            <AnimatedCard
              key={index}
              message={message.text}
              emoji={message.emoji}
              delay={index * 300}
              hoverImageUrl={`/ibtihal/ibt${index + 1}.jpeg`}
              position={cardPositions[index]}
            />
          ))}
        </div>
      )}

      {/* Floating hearts */}
      {showCards && (
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={`heart-${i}`}
              className="absolute text-pink-400 text-2xl float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4000}ms`,
                animationDuration: `${4 + Math.random() * 2}s`,
              }}
            >
              💕
            </div>
          ))}
        </div>
      )}

      {/* Replay button */}
      {showCards && (
        <button
          onClick={() => window.location.reload()}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-3 rounded-full font-birthday text-lg shadow-2xl hover:scale-110 transition-transform duration-300 z-20"
        >
          🎪 Rejouer la magie!
        </button>
      )}
    </div>
  );
};

export default BirthdayPage;
