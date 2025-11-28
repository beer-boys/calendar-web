import { Box, Button, FormItem, FormLayoutGroup, Input, Title } from '@vkontakte/vkui';
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { defaultPeriod } from '@/modules/calendarEvent/calendarEvents.constants';
import { createHabit } from '@/modules/habit/habit.reducer';
import { closeModal } from '@/modules/modal/modal.reducer';
import { PeriodInput } from '@/ui/PeriodInput/PeriodInput';
import { SmartRangeDateInput } from '@/ui/SmartRangeDateInput/SmartRangeDateInput';
import { useInputField } from '@/utils/useFormFields';

export const CreateHabitModal = memo(function CreateHabitModal() {
  const [name, onNameChange] = useInputField('');
  const [date, setDate] = useState<Date>();
  const [period, setPeriod] = useState(defaultPeriod);

  const dispatch = useDispatch();

  const onSubmitButton = () => {
    if (!date) {
      return;
    }

    dispatch(
      createHabit({
        habit: { title: name, date: date.getTime(), period, priority: 'minor' },
      }),
    );

    // Убрать, когда появятся походы в сеть
    dispatch(closeModal());
  };

  return (
    <Box>
      <Box padding="2xl">
        <Title level="2">Создание привычки</Title>
      </Box>
      <FormLayoutGroup mode="vertical">
        <FormItem top="Название" htmlFor="name">
          <Input name="name" id="name" value={name} onChange={onNameChange} />
        </FormItem>
        <FormItem top="Повторять" htmlFor="period">
          <PeriodInput name="period" id="period" value={period} onPeriodChange={setPeriod} />
        </FormItem>
        <SmartRangeDateInput date={date} onDateChanged={setDate} />
      </FormLayoutGroup>
      <Box padding="2xl">
        <Button type="submit" size="m" onClick={onSubmitButton}>
          Создать
        </Button>
      </Box>
    </Box>
  );
});
