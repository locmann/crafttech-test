import { useState } from 'react';
import RectIcon from 'assets/rectangle.svg';
import ArrowIcon from 'assets/arrow.svg';
import styles from './Menu.module.scss';
import { useAppContext } from 'services/context.ts';
import { DrawAction } from 'types/figuresTypes.ts';

const Menu = () => {
  const [showFig, setShowFig] = useState(false);
  const { setDrawAction } = useAppContext();

  return (
    <div className={styles.menu}>
      <button onClick={() => setShowFig(!showFig)}>1</button>
      <button>2</button>
      {showFig && (
        <div className={styles.modal}>
          <button onClick={() => setDrawAction(DrawAction.Arrow)}>
            <img src={ArrowIcon} />
          </button>
          <button onClick={() => setDrawAction(DrawAction.Rectangle)}>
            <img src={RectIcon} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
