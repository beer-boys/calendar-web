import { Box, Button, FormItem, FormLayoutGroup, Input, Title } from '@vkontakte/vkui';
import { type ChangeEvent, memo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { defaultPeriod } from '@/modules/calendarEvent/calendarEvents.constants';
import { createHabit } from '@/modules/habit/habit.reducer';
import { closeModal } from '@/modules/modal/modal.reducer';
import {
  CreateHabitDataSchema,
  type CreateHabitErrorMessages,
  extractCreateHabitDataErrors,
} from '@/ui/Modals/CreateHabitModal/CreateHabitModal.schema';
import { PeriodInput } from '@/ui/PeriodInput/PeriodInput';
import { SmartRangeDateInput } from '@/ui/SmartRangeDateInput/SmartRangeDateInput';
import { useInputField } from '@/utils/formField';

export const CreateHabitModal = memo(function CreateHabitModal() {
  const [errors, setErrors] = useState<CreateHabitErrorMessages>();
  const { nameError, dateError } = errors || {};

  const [name, _, setName] = useInputField('');
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
    setErrors({ dateError: errors?.dateError, nameError: undefined });
  };

  const [date, setDate] = useState<Date>();
  const onDate = (date?: Date) => {
    setDate(date);
    setErrors({ nameError: errors?.nameError, dateError: undefined });
  };
  const [period, setPeriod] = useState(defaultPeriod);

  const dispatch = useDispatch();

  const onSubmitButton = () => {
    const result = CreateHabitDataSchema.safeParse({ name, date, period });
    if (!result.success) {
      setErrors(extractCreateHabitDataErrors(result.error));
    } else {
      setErrors(undefined);

      const { name, date, period } = result.data;
      dispatch(
        createHabit({
          habit: { title: name, date: date.getTime(), period, priority: 'minor' },
        }),
      );

      // Убрать, когда появятся походы в сеть
      dispatch(closeModal());
    }
  };

  return (
    <Box>
      <Box padding="2xl">
        <Title level="2">Создание привычки</Title>
      </Box>
      <FormLayoutGroup mode="vertical">
        <FormItem top="Название" htmlFor="name" bottom={nameError} status={nameError ? 'error' : 'default'} required>
          <Input name="name" id="name" value={name} onChange={onNameChange} />
        </FormItem>
        <FormItem top="Повторять" htmlFor="period">
          <PeriodInput name="period" id="period" value={period} onPeriodChange={setPeriod} />
        </FormItem>
        <SmartRangeDateInput date={date} error={dateError} onDateChanged={onDate} />
      </FormLayoutGroup>
      <Box padding="2xl">
        <Button type="submit" size="m" onClick={onSubmitButton}>
          Создать
        </Button>
      </Box>
    </Box>
  );
});
