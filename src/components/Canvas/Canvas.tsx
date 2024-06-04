import { Arrow, Layer, Rect, Stage } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { useAppContext } from 'services/context.ts';
import { DrawAction } from 'types/figuresTypes.ts';
import { useRef, useState } from 'react';
import Konva from 'konva';

const Canvas = () => {
  const [color, setColor] = useState('#000');
  const { arrow, setArrow, drawAction, rect, setRect } = useAppContext();
  const stageRef = useRef<Konva.Stage>(null);
  const isPaintRef = useRef(false);

  const onStageMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (drawAction === DrawAction.Select) return;
    isPaintRef.current = true;
    const stage = stageRef?.current;
    const pos = stage?.getPointerPosition();
    const x = pos?.x || 0;
    const y = pos?.y || 0;

    switch (drawAction) {
      case DrawAction.Arrow: {
        setArrow({ color, points: [x, y, x, y], id: '1' });
        break;
      }
      case DrawAction.Rectangle: {
        setRect({ color, x, y, height: 1, width: 1, id: '1' });
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
        setArrow((prevArrow) => {
          if (prevArrow) {
            return {
              ...prevArrow,
              points: [prevArrow.points[0] || 0, prevArrow.points[1] || 0, x, y],
            };
          } else {
            return {
              id: '1',
              color,
              points: [0, 0, x, y],
            };
          }
        });
        break;
      }
      case DrawAction.Rectangle: {
        setRect((prevRect) => {
          if (prevRect) {
            return {
              ...prevRect,
              height: y - prevRect.y,
              width: x - prevRect.x,
            };
          } else {
            return {
              id: '1',
              color,
              x,
              y,
              width: 1,
              height: 1,
            };
          }
        });
      }
    }
  };

  const onStageMouseUp = () => {
    isPaintRef.current = false;
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
        {arrow && (
          <Arrow
            points={arrow.points}
            id={arrow.id}
            key={arrow.id}
            fill={arrow.color}
            stroke={arrow.color}
            strokeWidth={4}
          />
        )}
        {rect && (
          <Rect
            key={rect.id}
            x={rect?.x}
            y={rect?.y}
            height={rect?.height}
            width={rect?.width}
            stroke={rect?.color}
            id={rect?.id}
            strokeWidth={4}
          />
        )}
      </Layer>
    </Stage>
  );
};

export default Canvas;
