interface CurvedLoopProps {
  marqueeText?: string;
  speed?: number;
  className?: string;
  curveAmount?: number;
  direction?: 'left' | 'right';
  interactive?: boolean;
}

declare const CurvedLoop: (props: CurvedLoopProps) => JSX.Element;
export default CurvedLoop;
