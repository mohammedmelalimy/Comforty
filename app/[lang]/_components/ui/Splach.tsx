'use client';
import { useState, useEffect } from 'react';

// This stays true as long as the tab isn't refreshed
let alreadySeenInSession = false;

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    const seenInStorage = localStorage.getItem('seenSplash');

    // If seen in this session OR in localStorage, don't show it
    if (seenInStorage || alreadySeenInSession) {
      return;
    }

    // Otherwise, make it visible
    setIsVisible(true);

    // Timer 1: Start the "fade out" animation
    const animationTimer = setTimeout(() => {
      setAnimateOut(true);

      // Timer 2: Completely remove component after animation ends
      const removeTimer = setTimeout(() => {
        setIsVisible(false);
        localStorage.setItem('seenSplash', 'true');
        alreadySeenInSession = true;
      }, 600); // Animation duration

      return () => clearTimeout(removeTimer);
    }, 2000); // Display duration

    return () => clearTimeout(animationTimer);
  }, []);

  // If not visible, render nothing
  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-between bg-white transition-opacity duration-500
        ${animateOut ? 'opacity-0' : 'opacity-100'}
      `}
    >
      <div className="flex-1 flex items-center justify-center">
        <div
          className={`flex flex-col items-center font-bold text-gray-800 transition-transform duration-500 animate-pulse
            ${animateOut ? 'scale-50' : 'scale-100'}
          `}
        >
          <img src="/assets/Logo.svg" alt="logo" className="h-24 w-24" />
          <span className="text-4xl mt-2">Comforty</span>
        </div>
      </div>

      <div className="pb-8 text-lg text-gray-600 font-semibold">
        Powered by: <span className="text-gray-800">Mohammed Elalimy</span>
      </div>
    </div>
  );
}
