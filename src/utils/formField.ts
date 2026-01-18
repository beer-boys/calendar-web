import { type ChangeEvent, useCallback, useState } from 'react';

export type OnFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;

export const useInputField = (initialValue: string) => {
  const [field, setField] = useState(initialValue);

  const onFieldChange = useCallback<OnFieldChange>(
    (e) => {
      setField(e.currentTarget.value);
    },
    [setField],
  );

  return [field, setField, onFieldChange] as const;
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

export const getFieldStatus = (isSubmitted: boolean, error?: string): 'default' | 'error' | 'valid' => {
  if (error) {
    return 'error';
  } else if (isSubmitted) {
    return 'valid';
  } else {
    return 'default';
  }
};
