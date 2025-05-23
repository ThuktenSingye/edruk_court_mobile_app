import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {COLORS} from '../../../constant/designTokens';

interface Props {
  size?: number;
  color?: string;
}

export default function CardIcon({
  size = 24,
  color = COLORS.textPrimary,
}: Props) {
  return (
    <Svg
      width={size * 1.6}
      height={size * 2.2}
      viewBox="0 0 576 512"
      fill="none">
      <Path
        d="M0 96h576c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96zm0 32v288c0 35.3 28.7 64 64 64h448c35.3 0 64-28.7 64-64V128H0zm64 277.3c0-29.5 23.9-53.3 53.3-53.3h117.3c29.5 0 53.3 23.9 53.3 53.3 0 5.9-4.8 10.7-10.7 10.7H74.7c-5.9 0-10.7-4.8-10.7-10.7zM176 192a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm176 16c0-8.8 7.2-16 16-16h128c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h128c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h128c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16z"
        fill={color}
      />
    </Svg>
  );
}
