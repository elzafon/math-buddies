
import React from 'react';
import { ObjectType } from '../types';
import { 
  Cake, 
  Gamepad2, 
  Apple, 
  Star
} from 'lucide-react';
import HandVisual from './HandVisual';

interface ObjectVisualProps {
  type: ObjectType;
  count: number;
}

const ObjectVisual: React.FC<ObjectVisualProps> = ({ type, count }) => {
  if (type === 'fingers') {
    return <HandVisual count={count} />;
  }

  const renderIcon = () => {
    switch (type) {
      case 'cake': return <Cake className="text-pink-100" size={24} />;
      case 'toy': return <Gamepad2 className="text-blue-100" size={24} />;
      case 'apple': return <Apple className="text-red-200" size={24} />;
      case 'star': return <Star className="text-yellow-100 fill-current" size={24} />;
      default: return null;
    }
  };

  return (
    <div className={`grid ${count > 5 ? 'grid-cols-4 sm:grid-cols-5' : 'grid-cols-3'} gap-1.5 sm:gap-2`}>
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm border border-white/30 shadow-sm flex items-center justify-center"
        >
          {renderIcon()}
        </div>
      ))}
    </div>
  );
};

export default ObjectVisual;
