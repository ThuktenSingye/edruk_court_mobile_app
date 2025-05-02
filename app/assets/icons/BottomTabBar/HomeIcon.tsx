import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color?: string;
}

const HomeIcon = ({color = 'white'}: Props) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H4C3.45 21 3 20.55 3 20V9.5Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default HomeIcon;
