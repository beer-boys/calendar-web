import { Select, type SelectProps } from '@vkontakte/vkui';

import { defaultPeriod, periodNames } from '@/modules/calendarEvent/calendarEvent.constants';
import type { EventPeriod } from '@/modules/calendarEvent/calendarEvent.types';

interface PeriodInputProps extends Omit<SelectProps, 'onChange' | 'options' | 'placeholder'> {
  onPeriodChange: (priority: EventPeriod) => void;
}

const options = Object.entries(periodNames).map(([value, label]) => ({ value, label }));

export function PeriodInput({ onPeriodChange, value = defaultPeriod, ...rest }: PeriodInputProps) {
  return (
    <Select
      options={options}
      value={value}
      onChange={(_, priority) => {
        onPeriodChange(priority as EventPeriod);
      }}
      {...rest}
    />
  );
}
