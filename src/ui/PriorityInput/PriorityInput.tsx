import { Select, type SelectProps } from '@vkontakte/vkui';

import type { EventPriority } from '@/modules/calendarEvent/calendarEvent.types';
import { defaultPriority, priorityNames } from '@/modules/calendarEvent/calendarEvents.constants';

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
