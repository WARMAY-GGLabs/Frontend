import type { CSSProperties } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  direction?: string;
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

declare const CountUp: (props: CountUpProps) => JSX.Element;
export default CountUp;
