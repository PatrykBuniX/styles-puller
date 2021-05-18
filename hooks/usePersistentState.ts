import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const usePersistentState = <T>(
  initialValue: (() => T) | T,
  key: string
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const item = window.localStorage.getItem(key);
    if (item !== null) {
      setValue(JSON.parse(item));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
