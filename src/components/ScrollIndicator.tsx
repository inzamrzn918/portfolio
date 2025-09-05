import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate scroll progress
      const progress = Math.min((scrollY / (documentHeight - windowHeight)) * 100, 100);
      setScrollProgress(progress);
      
      // Hide indicator after scrolling down a bit
      if (scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="flex flex-col items-center gap-4 animate-bounce">
      {/* Scroll text */}
      <span className="text-sm text-gray-400 dark:text-gray-500 font-medium animate-pulse">
        Scroll Down
      </span>
      
      {/* Scroll indicator */}
      <div className="relative">
        {/* Background circle */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 flex items-center justify-center backdrop-blur-sm">
          {/* Progress ring */}
          <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 56 56">
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-blue-500/30"
            />
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="text-blue-500"
              strokeDasharray={`${2 * Math.PI * 24}`}
              strokeDashoffset={`${2 * Math.PI * 24 * (1 - scrollProgress / 100)}`}
              style={{ transition: 'stroke-dashoffset 0.3s ease' }}
            />
          </svg>
          
          {/* Arrow icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <ChevronDown className="w-6 h-6 text-blue-500 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator;