interface ShapeBlurProps {
  variation?: number;
  pixelRatioProp?: number;
  shapeSize?: number;
  roundness?: number;
  borderSize?: number;
  circleSize?: number;
  circleEdge?: number;
}

declare const ShapeBlur: (props: ShapeBlurProps) => JSX.Element;
export default ShapeBlur;
