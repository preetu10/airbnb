"use client";
import { useEffect, useState } from "react";

export default function FloatingPopup() {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowPopup(false); 
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-xl px-4 py-2 flex items-center gap-2 animate-fade-in-up z-50">
      <span className="text-pink-600">🏷️</span>
      <span className="text-sm font-medium">Prices include all fees</span>
    </div>
  );
}
