import { useState, useEffect } from 'react';
import Svg, { Circle } from 'react-native-svg';

type CircleProps = {
  percentage: number;
};

export const CircleSvg = ({ percentage }: CircleProps) => {
  const [strokeValue, setStokeValue] = useState<number>(0);

  useEffect(() => {
    // The 90 is the 'r' or radius of the circle
    const c = Math.PI * (90 * 2);
    setStokeValue(((100 - percentage) / 100) * c);
  }, [percentage]);

  return (
    <Svg width={80} height={80} viewBox="0 0 200 200">
      <Circle
        r="90"
        cx="100"
        cy="100"
        fill="transparent"
        strokeDasharray="565.48"
        strokeDashoffset="0"
        stroke="#E4E4E7"
        strokeWidth="1em"
      />
      <Circle
        r="90"
        cx="100"
        cy="100"
        fill="transparent"
        strokeDasharray="565.48"
        strokeDashoffset={strokeValue.toString()}
        stroke="#333D55"
        strokeWidth="1em"
        // transition: 'stroke-dashoffset 1s linear'
      />
    </Svg>
  );
};
