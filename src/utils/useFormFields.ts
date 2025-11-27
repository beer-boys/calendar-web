import { type ChangeEvent, useCallback, useState } from 'react';

export const useInputField = (initialValue: string) => {
  const [field, setField] = useState(initialValue);

  const onFieldChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setField(e.currentTarget.value);
    },
    [setField],
  );

  return [field, onFieldChange, setField] as const;
};

export const useCheckField = (initialValue: boolean) => {
  const [field, setField] = useState(initialValue);

  const onFieldChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setField(e.currentTarget.checked);
    },
    [setField],
  );

  return [field, onFieldChange, setField] as const;
};
