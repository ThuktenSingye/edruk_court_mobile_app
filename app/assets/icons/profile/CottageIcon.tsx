import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {COLORS} from '../../../constant/designTokens';

interface Props {
  size?: number;
  color?: string;
}

export default function CottageIcon({
  size = 4,
  color = COLORS.textPrimary,
}: Props) {
  return (
    <Svg width={size * 2} height={size * 1.7} viewBox="1 1 22 20.4" fill="none">
      <Path
        d="M12 3 6 7.58V6H4v3.11L1 11.4l1.21 1.59L4 11.62V21h16v-9.38l1.79 1.36L23 11.4 12 3zm-2 16v-6h4v6h-4z"
        fill={color}
      />
    </Svg>
  );
}
