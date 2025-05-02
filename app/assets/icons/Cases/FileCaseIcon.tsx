import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color?: string;
  size?: number;
}

const FileCaseIcon = ({color = '#fff', size = 24}: Props) => (
  <Svg width={size} height={size} viewBox="0 0 512 512" fill="none">
    <Path
      d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128z"
      fill={color}
    />
  </Svg>
);

export default FileCaseIcon;
