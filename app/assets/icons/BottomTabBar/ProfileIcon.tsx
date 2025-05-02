// src/assets/icons/ProfileIcon.tsx

import React from 'react';
import Svg, {Circle, Path} from 'react-native-svg';

interface ProfileIconProps {
  color?: string;
  size?: number;
}

const ProfileIcon = ({color = '#FFFFFF', size = 24}: ProfileIconProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" />
      <Path
        d="M4 21C4 17.6863 6.68629 15 10 15H14C17.3137 15 20 17.6863 20 21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default ProfileIcon;
