export const getCSSVariable = (name: string) => {
  return window.getComputedStyle(document.documentElement).getPropertyValue(name);
};

export const getCSSPxVariableAsInt = (name: string) => {
  const value = getCSSVariable(name);
  return parseInt(value.slice(0, -2));
};
