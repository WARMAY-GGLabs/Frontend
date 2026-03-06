import type { ReactNode, ElementType, CSSProperties } from 'react';

interface StarBorderProps {
  as?: ElementType;
  className?: string;
  innerClassName?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children?: ReactNode;
  style?: CSSProperties;
  [key: string]: unknown;
}

declare const StarBorder: (props: StarBorderProps) => JSX.Element;
export default StarBorder;
