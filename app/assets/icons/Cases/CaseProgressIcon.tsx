import React from 'react';
import Svg, {Path} from 'react-native-svg';

interface Props {
  color?: string;
  size?: number;
}

const CaseProgressIcon = ({color = '#fff', size = 24}: Props) => (
  <Svg width={size} height={size} viewBox="0 0 512 512" fill="none">
    <Path
      d="M13.5 28C20.956 28 27 21.7322 27 14C27 6.2678 20.956 0 13.5 0C6.04395 0 0 6.2678 0 14C0 21.7322 6.04395 28 13.5 28ZM21.6 14C21.6002 15.6615 21.1252 17.2858 20.2352 18.6673C19.3452 20.0489 18.0801 21.1257 16.5999 21.7615C15.1197 22.3974 13.4909 22.5637 11.9195 22.2395C10.3481 21.9153 8.90476 21.1152 7.77195 19.9402L13.5 14V5.6C15.6483 5.6 17.7085 6.485 19.2276 8.0603C20.7466 9.63561 21.6 11.7722 21.6 14Z"
      fill={color}
    />
  </Svg>
);

export default CaseProgressIcon;
