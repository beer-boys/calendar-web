import { Box, Button, FormItem, FormLayoutGroup, Input, Textarea, Title } from '@vkontakte/vkui';
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { defaultPeriod } from '@/modules/calendarEvent/calendarEvents.constants';
import { closeModal } from '@/modules/modal/modal.reducer';
import { PeriodInput } from '@/ui/PeriodInput/PeriodInput';
import { SmartRangeDateInput } from '@/ui/SmartRangeDateInput/SmartRangeDateInput';
import { useInputField } from '@/utils/formField';
import { createHabitAPICall } from '@/api/calls/habit';

export const CreateHabitModal = memo(function CreateHabitModal() {
  const [name, onNameChange] = useInputField('');
  const [description, onDescriptionChange] = useInputField('');

  const [startDate, setStartDate] = useState<Date>();
  const onStartDate = (date?: Date) => {
    setStartDate(date);
  };

  const [endDate, setEndDate] = useState<Date>();
  const onEndDate = (date?: Date) => {
    setEndDate(date);
  };

  const [period, setPeriod] = useState(defaultPeriod);

  const dispatch = useDispatch();

  const onSubmitButton = () => {
    function pad(value: any) {
      return String(value).padStart(2, '0');
    }

    if (!startDate || !endDate) {
      return;
    }

    // startDate
    const year = startDate.getFullYear();
    const month = pad(startDate.getMonth() + 1); // месяцы с 0
    const day = pad(startDate.getDate());

    const startDateFormatted = `${year}-${month}-${day}`;
    const earliestTime = `${pad(startDate.getHours())}:${pad(startDate.getMinutes())}`;
    const latestTime = `${pad(endDate.getHours())}:${pad(endDate.getMinutes())}`;

    createHabitAPICall({
      title: name,
      description,
      durationMinutes: 30,
      recurrence: { frequency: period, startDate: startDateFormatted },
      flexibility: { earliestTime, latestTime },
    }).then(() => {
      const startDate = new Date(2025, 11, 1).toISOString(); // 1 декабря 2025
      const endDate = new Date(2025, 11, 12).toISOString(); // 31 декабря 2025
      // @ts-expect-error
      dispatch(getHabits({ startDate, endDate }));
    });

    // Убрать, когда появятся походы в сеть
    dispatch(closeModal());
  };

  return (
    <Box>
      <Box padding="2xl">
        <Title level="2">Создание привычки</Title>
      </Box>
      <FormLayoutGroup mode="vertical">
        <FormItem top="Название" htmlFor="name" required>
          <Input name="name" id="name" value={name} onChange={onNameChange} />
        </FormItem>
        <FormItem top="Описание" htmlFor="description" required>
          <Textarea name="description" id="description" value={description} onChange={onDescriptionChange} />
        </FormItem>
        <FormItem top="Повторять" htmlFor="period">
          <PeriodInput name="period" id="period" value={period} onPeriodChange={setPeriod} />
        </FormItem>
        <SmartRangeDateInput onStartDateChanged={onStartDate} onEndDateChanged={onEndDate} />
      </FormLayoutGroup>
      <Box padding="2xl">
        <Button type="submit" size="m" onClick={onSubmitButton}>
          Создать
        </Button>
      </Box>
    </Box>
  );
});
