import React, { createContext, useContext } from 'react';
import { Arrow, Circle, DrawAction, Rectangle } from 'types/figuresTypes.ts';

type ContextType = {
  drawAction: DrawAction | null;
  setDrawAction: (drawAction: DrawAction) => void;
  rect: Rectangle | null;
  setRect: React.Dispatch<React.SetStateAction<Rectangle | null>>;
  arrow: Arrow | null;
  setArrow: React.Dispatch<React.SetStateAction<Arrow | null>>;
  circle: Circle | null;
  setCircle: React.Dispatch<React.SetStateAction<Circle | null>>;
};

export const AppContext = createContext<ContextType | undefined>(undefined);

export const useAppContext = () => {
  const contextData = useContext(AppContext);

  if (contextData === undefined) {
    throw new Error('Context is undefined');
  }

  return contextData;
};
