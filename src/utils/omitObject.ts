export const omitObject = <T>(obj: T, keys: Array<keyof T>) => {
  const result = {...obj};
  keys.forEach(key => {
    delete result[key];
  });
  return result;
};
