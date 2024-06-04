import { Arrow, Circle, Layer, Rect, Stage, Transformer } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { useAppContext } from 'services/context.ts';
import { DrawAction } from 'types/figuresTypes.ts';
import { useRef, useState } from 'react';
import Konva from 'konva';
import { calculateRadius } from 'utils/calculateRadius.ts';
import { v4 as uuidv4 } from 'uuid';

const Canvas = () => {
  const [color] = useState('#000');
  const { arrow, setArrow, drawAction, rect, setRect, circle, setCircle } = useAppContext();
  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const isPaintRef = useRef(false);
  const currentShapeRef = useRef<string>();
  const onStageMouseDown = () => {
    if (drawAction === DrawAction.Select) return;
    isPaintRef.current = true;
    const stage = stageRef?.current;
    const pos = stage?.getPointerPosition();
    const x = pos?.x || 0;
    const y = pos?.y || 0;
    const id = uuidv4();
    currentShapeRef.current = id;

    switch (drawAction) {
      case DrawAction.Arrow: {
        setArrow((prevArrows) => [...prevArrows, { color, points: [x, y, x, y], id }]);
        break;
      }
      case DrawAction.Rectangle: {
        setRect((prevRects) => [...prevRects, { color, x, y, height: 1, width: 1, id }]);
        break;
      }
      case DrawAction.Circle: {
        setCircle((prevCircles) => [...prevCircles, { id, color, x, y, radius: 1 }]);
        break;
      }
    }
  };

  const onStageMouseMove = () => {
    if (drawAction === DrawAction.Select || !isPaintRef.current) return;
    const stage = stageRef?.current;
    const pos = stage?.getPointerPosition();
    const x = pos?.x || 0;
    const y = pos?.y || 0;

    switch (drawAction) {
      case DrawAction.Arrow: {
        setArrow((prevArrows) =>
          prevArrows.map((prevArrow) =>
            prevArrow.id === currentShapeRef.current
              ? {
                  ...prevArrow,
                  points: [prevArrow.points[0] || 0, prevArrow.points[1] || 0, x, y],
                }
              : prevArrow,
          ),
        );

        break;
      }
      case DrawAction.Rectangle: {
        setRect((prevRects) =>
          prevRects.map((prevRect) =>
            prevRect.id === currentShapeRef.current
              ? {
                  ...prevRect,
                  height: y - prevRect.y,
                  width: x - prevRect.x,
                }
              : prevRect,
          ),
        );
        break;
      }
      case DrawAction.Circle: {
        setCircle((prevCircles) =>
          prevCircles.map((prevCircle) =>
            prevCircle.id === currentShapeRef.current
              ? {
                  ...prevCircle,
                  radius: calculateRadius(x, prevCircle.x, y, prevCircle.y),
                }
              : prevCircle,
          ),
        );
        break;
      }
    }
  };

  const onStageMouseUp = () => {
    isPaintRef.current = false;
  };

  const onShapeClick = (e: KonvaEventObject<MouseEvent>) => {
    if (drawAction !== DrawAction.Select) return;
    const currentTarget = e.currentTarget;
    transformerRef?.current?.nodes([currentTarget]);
  };

  const isDraggable = drawAction === DrawAction.Select;

  const onBgClick = () => {
    transformerRef?.current?.nodes([]);
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseMove={onStageMouseMove}
      onMouseDown={onStageMouseDown}
      onMouseUp={onStageMouseUp}
      ref={stageRef}
    >
      <Layer>
        <Rect
          x={0}
          y={0}
          height={window.innerHeight}
          width={window.innerWidth}
          fill="white"
          id="bg"
          onClick={onBgClick}
        />
        {arrow.map((figure) => (
          <Arrow
            points={figure.points}
            id={figure.id}
            key={figure.id}
            fill={figure.color}
            stroke={figure.color}
            strokeWidth={4}
            onClick={onShapeClick}
            draggable={isDraggable}
          />
        ))}
        {rect.map((figure) => (
          <Rect
            key={figure.id}
            x={figure?.x}
            y={figure?.y}
            height={figure?.height}
            width={figure?.width}
            stroke={figure?.color}
            id={figure?.id}
            strokeWidth={4}
            onClick={onShapeClick}
            draggable={isDraggable}
          />
        ))}
        {circle.map((figure) => (
          <Circle
            key={figure.id}
            id={figure.id}
            x={figure?.x}
            y={figure?.y}
            radius={figure?.radius}
            stroke={figure?.color}
            strokeWidth={4}
            onClick={onShapeClick}
            draggable={isDraggable}
          />
        ))}
        <Transformer ref={transformerRef} />
      </Layer>
    </Stage>
  );
};

export default Canvas;
