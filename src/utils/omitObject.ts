export const omitObject = <T, K extends keyof T>(obj: T, keys: Array<K>) => {
  const res = obj;
  keys.forEach(key => {
    delete res[key];
  });
  return res as Omit<T, K>;
};
