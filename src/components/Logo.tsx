import React from 'react';
import img from '../public/logo.svg';

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
      {/* Logo */}
      <div>
      <img src={img} alt="Logo" className="mx-auto w-24 h-24 md:w-32 md:h-32" />
    </div>
      
      {/* Text */}
      <div className={`font-light ${textSize} ${textColor}`}>
        The Aggie Pantry
      </div>
    </div>
      );
};

export default Logo;