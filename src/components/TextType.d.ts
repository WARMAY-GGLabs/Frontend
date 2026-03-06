import type { CSSProperties, ElementType } from 'react';

interface VariableSpeed {
  min: number;
  max: number;
}

interface TextTypeProps {
  text: string | string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  className?: string;
  style?: CSSProperties;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string;
  cursorClassName?: string;
  cursorBlinkDuration?: number;
  textColors?: string[];
  variableSpeed?: VariableSpeed;
  onSentenceComplete?: () => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
}

declare const TextType: (props: TextTypeProps) => JSX.Element;
export default TextType;
