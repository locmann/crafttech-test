export const calculateRadius = (x: number, x1: number, y: number, y1: number) => {
  return Math.sqrt((x - x1) ** 2 + (y - y1) ** 2);
};
