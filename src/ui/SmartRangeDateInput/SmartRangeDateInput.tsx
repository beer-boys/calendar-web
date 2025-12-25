import { DateInput, FormItem, FormLayoutGroup } from '@vkontakte/vkui';
import { useState } from 'react';

import { DateRangeSchema, extractDateRangeError } from '@/ui/SmartRangeDateInput/SmartRangeDateInput.schema';

interface SmartRangeDateInputProps {
  onStartDateChanged: (date?: Date) => void;
  onEndDateChanged: (date?: Date) => void;
}

export function SmartRangeDateInput({ onEndDateChanged, onStartDateChanged }: SmartRangeDateInputProps) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [dateRangeError, setDateRangeError] = useState<string>();
  const handleStartDateChange = (date?: Date) => {
    const result = DateRangeSchema.safeParse({ startDate: date, endDate });
    if (!result.success) {
      setDateRangeError(extractDateRangeError(result.error));
    } else {
      setStartDate(result.data.startDate);
      onStartDateChanged(result.data.startDate);
      setDateRangeError(undefined);
    }
  };

  const handleEndDateChange = (date?: Date) => {
    const result = DateRangeSchema.safeParse({ startDate, endDate: date });
    if (!result.success) {
      setDateRangeError(extractDateRangeError(result.error));
    } else {
      setEndDate(result.data.endDate);
      onEndDateChanged(result.data.endDate);
      setDateRangeError(undefined);
    }
  };

  return (
    <FormLayoutGroup mode="vertical">
      <FormItem top="Начало" htmlFor="date-range-start">
        <DateInput name="date-range-start" id="date-range-start" value={startDate} onChange={handleStartDateChange} enableTime accessible />
      </FormItem>
      <FormItem top="Конец" htmlFor="date-range-end" bottom={dateRangeError} status={dateRangeError ? 'error' : 'default'}>
        <DateInput name="date-range-end" id="date-range-end" value={endDate} onChange={handleEndDateChange} enableTime accessible />
      </FormItem>
    </FormLayoutGroup>
  );
}
