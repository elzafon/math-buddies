
import React from 'react';

interface HandVisualProps {
  count: number;
}

const HandVisual: React.FC<HandVisualProps> = ({ count }) => {
  // We'll use a simplified SVG approach for hands
  // For count > 5, we show two hands.
  const hands = count > 5 ? [5, count - 5] : [count];

  return (
    <div className="flex gap-2">
      {hands.map((fingers, idx) => (
        <div key={idx} className="relative w-16 h-20 md:w-20 md:h-24">
          <svg viewBox="0 0 100 120" className="w-full h-full text-orange-200 fill-current drop-shadow-md">
            {/* Palm */}
            <path d="M20,100 Q20,120 50,120 Q80,120 80,100 L80,60 Q80,40 50,40 Q20,40 20,60 Z" />
            
            {/* Thumb - Finger 1 */}
            {fingers >= 1 && <path d="M20,70 Q5,65 10,50 Q15,40 25,55 Z" className="text-orange-300" />}
            
            {/* Fingers */}
            {fingers >= 2 && <rect x="28" y="10" width="12" height="40" rx="6" className="text-orange-300" />}
            {fingers >= 3 && <rect x="44" y="5" width="12" height="45" rx="6" className="text-orange-300" />}
            {fingers >= 4 && <rect x="60" y="10" width="12" height="40" rx="6" className="text-orange-300" />}
            {fingers >= 5 && <rect x="76" y="25" width="12" height="30" rx="6" className="text-orange-300" />}

            {/* If fingers are less than 5, we still draw the "closed" finger base if we want, but for simplicity, 
                this logic just shows extended fingers based on the count. 
                In the image, the '4' hand has 4 fingers up. */}
          </svg>
        </div>
      ))}
    </div>
  );
};

export default HandVisual;
