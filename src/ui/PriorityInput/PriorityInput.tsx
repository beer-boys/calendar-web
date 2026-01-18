import { Select, type SelectProps } from '@vkontakte/vkui';

import { defaultPriority, priorityNames } from '@/modules/calendarEvent/calendarEvent.constants';
import type { EventPriority } from '@/modules/calendarEvent/calendarEvent.types';

interface PriorityInputProps extends Omit<SelectProps, 'onChange' | 'options' | 'placeholder'> {
  onPriorityChange: (priority: EventPriority) => void;
}

const options = Object.entries(priorityNames).map(([value, label]) => ({ value, label }));

export function PriorityInput({ onPriorityChange, value = defaultPriority, ...rest }: PriorityInputProps) {
  return (
    <Select
      options={options}
      value={value}
      onChange={(_, priority) => {
        onPriorityChange(priority as EventPriority);
      }}
      {...rest}
    />
  );
}
