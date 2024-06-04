import { FC, PropsWithChildren, useState } from 'react';
import { AppContext } from 'services/context.ts';
import { Arrow, Circle, DrawAction, Rectangle } from 'types/figuresTypes.ts';

const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [rect, setRect] = useState<Rectangle[]>([]);
  const [arrow, setArrow] = useState<Arrow[]>([]);
  const [circle, setCircle] = useState<Circle[]>([]);
  const [drawAction, setDrawAction] = useState<DrawAction | null>(null);

  return (
    <AppContext.Provider
      value={{ rect, setRect, arrow, setArrow, drawAction, setDrawAction, circle, setCircle }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppContextProvider;
