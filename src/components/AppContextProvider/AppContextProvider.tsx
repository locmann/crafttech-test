import { FC, PropsWithChildren, useState } from 'react';
import { AppContext } from 'services/context.ts';
import { Arrow, Circle, DrawAction, Rectangle } from 'types/figuresTypes.ts';

const AppContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [rect, setRect] = useState<Rectangle | null>(null);
  const [arrow, setArrow] = useState<Arrow | null>(null);
  const [circle, setCircle] = useState<Circle | null>(null);
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
