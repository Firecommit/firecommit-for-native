import { useEffect, useState } from 'react';

export const useInjectedJS = (key: string, value: any) => {
  const [code, setCode] = useState<string>();

  useEffect(() => {
    setCode(`
      const target = document.getElementById('${key}');
      target.value = '${value}';
    `);
  }, [key, value]);

  return code;
};
