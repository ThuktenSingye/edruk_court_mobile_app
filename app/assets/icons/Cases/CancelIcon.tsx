import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color?: string;
  size?: number;
}

const CancelIcon = ({color = '#fff', size = 24}: Props) => (
  <Svg width={size} height={size} viewBox="0 0 512 512" fill="none">
    <Path
      d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"
      fill={color}
    />
  </Svg>
);

export default CancelIcon;
