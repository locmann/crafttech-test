import { useState } from 'react';
import RectIcon from 'assets/rectangle.svg';
import ArrowIcon from 'assets/arrow.svg';
import CircleIcon from 'assets/circle.svg';
import PointerIcon from 'assets/pointer.svg';
import styles from './Menu.module.scss';
import { useAppContext } from 'services/context.ts';
import { DrawAction } from 'types/figuresTypes.ts';

const Menu = () => {
  const [showFig, setShowFig] = useState(false);
  const { setDrawAction, setRect, setArrow, setCircle } = useAppContext();

  const clear = () => {
    setArrow([]);
    setCircle([]);
    setRect([]);
  };

  return (
    <div className={styles.menu}>
      <button onClick={() => setShowFig(!showFig)}>Фигуры</button>
      <button onClick={() => setDrawAction(DrawAction.Select)}>
        <img
          src={PointerIcon}
          alt="Pointer"
        />
      </button>
      {showFig && (
        <div className={styles.modal}>
          <button onClick={() => setDrawAction(DrawAction.Arrow)}>
            <img
              alt="Arrow"
              src={ArrowIcon}
            />
          </button>
          <button onClick={() => setDrawAction(DrawAction.Rectangle)}>
            <img
              alt="Rectangle"
              src={RectIcon}
            />
          </button>
          <button onClick={() => setDrawAction(DrawAction.Circle)}>
            <img
              alt="Circle"
              src={CircleIcon}
            />
          </button>
          <button onClick={clear}>Стереть</button>
        </div>
      )}
    </div>
  );
};

export default Menu;
