import React from 'react';
import { Leaf } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  textColor?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', textColor = 'text-primary' }) => {
  const sizes = {
    small: {
      iconSize: 20,
      textSize: 'text-lg',
      spacing: 'space-x-1'
    },
    medium: {
      iconSize: 28,
      textSize: 'text-2xl',
      spacing: 'space-x-2'
    },
    large: {
      iconSize: 36,
      textSize: 'text-3xl',
      spacing: 'space-x-3'
    }
  };

  const { iconSize, textSize, spacing } = sizes[size];

  return (
    <div className={`flex items-center ${spacing}`}>
      <div className="bg-accent-green rounded-full p-2">
        <Leaf size={iconSize} className="text-white" />
      </div>
      <div className={`font-bold ${textSize} ${textColor}`}>
        UC Davis Food Resources
      </div>
    </div>
  );
};

export default Logo;