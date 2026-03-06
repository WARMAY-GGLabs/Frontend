import type { ReactNode, RefObject } from 'react';

interface ScrollRevealProps {
  children?: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

declare const ScrollReveal: (props: ScrollRevealProps) => JSX.Element;
export default ScrollReveal;
