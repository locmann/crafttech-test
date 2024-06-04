import React, { createContext, useContext } from 'react';
import { Arrow, Circle, DrawAction, Rectangle } from 'types/figuresTypes.ts';

type ContextType = {
  drawAction: DrawAction | null;
  setDrawAction: (drawAction: DrawAction) => void;
  rect: Rectangle[];
  setRect: React.Dispatch<React.SetStateAction<Rectangle[]>>;
  arrow: Arrow[];
  setArrow: React.Dispatch<React.SetStateAction<Arrow[]>>;
  circle: Circle[];
  setCircle: React.Dispatch<React.SetStateAction<Circle[]>>;
};

export const AppContext = createContext<ContextType | undefined>(undefined);

export const useAppContext = () => {
  const contextData = useContext(AppContext);

  if (contextData === undefined) {
    throw new Error('Context is undefined');
  }

  return contextData;
};
