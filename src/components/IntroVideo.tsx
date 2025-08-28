import React, { useState, useEffect } from 'react';
import { Shield, Zap, Play, SkipForward } from 'lucide-react';

interface IntroVideoProps {
  onComplete: () => void;
}

export const IntroVideo: React.FC<IntroVideoProps> = ({ onComplete }) => {
  const [currentScene, setCurrentScene] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  const scenes = [
    {
      title: "En un mundo digital lleno de amenazas...",
      subtitle: "Rootkits, bootkits y malware acechan en cada USB",
      animation: "🦠💻🔥"
    },
    {
      title: "Un héroe emerge de las cenizas...",
      subtitle: "Forjado por la experiencia, templado por la adversidad",
      animation: "⚡🛡️✨"
    },
    {
      title: "GREEMLS nace para proteger",
      subtitle: "Tu guardián digital contra las amenazas más peligrosas",
      animation: "🚀🔒💚"
    },
    {
      title: "¡Bienvenido a la revolución de la seguridad USB!",
      subtitle: "Donde cada dispositivo se convierte en una fortaleza",
      animation: "🏰⚔️🌟"
    }
  ];

  useEffect(() => {
    setShowSkip(true);
    const timer = setInterval(() => {
      setCurrentScene(prev => {
        if (prev >= scenes.length - 1) {
          setTimeout(onComplete, 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [onComplete, scenes.length]);

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-green-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Skip Button */}
      {showSkip && (
        <button
          onClick={handleSkip}
          className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 bg-gray-800/80 hover:bg-gray-700/80 border border-green-400/50 rounded-lg text-green-400 transition-all duration-300 z-10"
        >
          <SkipForward className="w-4 h-4" />
          Saltar
        </button>
      )}

      {/* Main Content */}
      <div className="text-center max-w-4xl px-8">
        {/* Logo Animation */}
        <div className="mb-12 relative">
          <h1 
            className="text-8xl font-bold bg-gradient-to-r from-green-400 via-green-300 to-orange-400 bg-clip-text text-transparent tracking-wider transform transition-all duration-1000"
            style={{ 
              fontFamily: 'serif',
              textShadow: '0 0 50px #00ff41',
              transform: currentScene >= 2 ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            ⚡ GREEMLS ⚡
          </h1>
          <div className="absolute -inset-4 bg-gradient-to-r from-green-400/20 to-orange-400/20 blur-xl rounded-full animate-pulse" />
        </div>

        {/* Scene Content */}
        <div className="space-y-8 min-h-[200px] flex flex-col justify-center">
          <div className="text-6xl mb-6 animate-bounce">
            {scenes[currentScene]?.animation}
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4 animate-fade-in">
            {scenes[currentScene]?.title}
          </h2>
          
          <p className="text-xl text-gray-300 animate-fade-in-delay">
            {scenes[currentScene]?.subtitle}
          </p>

          {/* Progress Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {scenes.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  index <= currentScene 
                    ? 'bg-green-400 shadow-lg shadow-green-400/50' 
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Hero Message */}
        {currentScene >= 3 && (
          <div className="mt-12 p-6 bg-gradient-to-r from-green-400/10 to-orange-400/10 border border-green-400/30 rounded-2xl animate-fade-in-up">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-green-400" />
              <span className="text-2xl font-bold text-green-400">Antivirus Humano</span>
              <Shield className="w-8 h-8 text-green-400" />
            </div>
            <p className="text-gray-300 text-lg">
              "De víctima a protector. Tu experiencia es tu mayor fortaleza."
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-delay {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in-delay 1s ease-out 0.5s both;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
      `}</style>
    </div>
  );
};