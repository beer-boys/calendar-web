import { Box, Button, DateInput, Flex, FormItem, FormLayoutGroup, Input, Text, Textarea, Title } from '@vkontakte/vkui';
import { type ChangeEvent, type InputEvent, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { defaultPeriod } from '@/modules/calendarEvent/calendarEvent.constants';
import { createHabit } from '@/modules/calendarEvent/calendarEvent.reducer';
import { getError, getLoadingState } from '@/modules/calendarEvent/calendarEvent.selectors';
import {
  CreateHabitDataSchema,
  type CreateHabitErrorMessages,
  extractCreateHabitDataErrors,
} from '@/ui/Modals/CreateHabitModal/CreateHabitModal.schema';
import { PeriodInput } from '@/ui/PeriodInput/PeriodInput';
import { getFieldStatus, useInputField } from '@/utils/formField';

import styles from './CreateHabitModal.module.css';

export const CreateHabitModal = memo(function CreateHabitModal() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<CreateHabitErrorMessages>();

  const { nameError, startDateError, durationError, startError, endError } = errors || {};

  const [name, setName] = useInputField('');
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);

    if (errors) {
      setErrors({ ...errors, nameError: undefined });
    }
  };

  const [description, _, onDescriptionChange] = useInputField('');

  const [period, setPeriod] = useState(defaultPeriod);

  const [startDate, setStartDate] = useState<Date>();
  const onStartDateChange = (startDate?: Date) => {
    setStartDate(startDate);

    if (errors) {
      setErrors({ ...errors, startDateError: undefined });
    }
  };

  const [duration, setDuration] = useInputField('');
  const onDurationChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDuration(e.currentTarget.value);

    if (errors) {
      setErrors({ ...errors, durationError: undefined });
    }
  };

  const [start, setStart] = useInputField('');
  const onStartInput = (e: InputEvent<HTMLInputElement>) => {
    setStart(e.currentTarget.value);

    if (errors) {
      setErrors({ ...errors, startError: undefined });
    }
  };

  const [end, setEnd] = useInputField('');
  const onEndInput = (e: InputEvent<HTMLInputElement>) => {
    setEnd(e.currentTarget.value);

    if (errors) {
      setErrors({ ...errors, endError: undefined });
    }
  };

  const dispatch = useDispatch();

  const isLoading = useSelector(getLoadingState);
  const error = useSelector(getError);

  const onSubmitButton = () => {
    setIsSubmitted(true);

    const result = CreateHabitDataSchema.safeParse({ name, description, duration, startDate, period, start, end });
    if (!result.success) {
      setErrors(extractCreateHabitDataErrors(result.error));
    } else {
      setErrors(undefined);

      const { name, startDate, period, start, end, duration, description } = result.data;

      dispatch(
        // @ts-expect-error
        createHabit({
          name: name,
          description,
          startDate: startDate.getTime(),
          period,
          durationMinutes: parseInt(duration),
          earliestTime: start,
          latestTime: end,
        }),
      );
    }
  };

  return (
    <Box>
      <Box padding="2xl">
        <Title level="2">Создание привычки</Title>
      </Box>
      <FormLayoutGroup mode="vertical">
        <FormItem top="Название" htmlFor="name" bottom={nameError} status={getFieldStatus(isSubmitted, nameError)} required>
          <Input name="name" id="name" value={name} onChange={onNameChange} />
        </FormItem>
        <FormItem top="Описание" htmlFor="description">
          <Textarea name="description" id="description" value={description} onChange={onDescriptionChange} />
        </FormItem>
        <FormItem top="Повторять" htmlFor="period" required>
          <PeriodInput name="period" id="period" value={period} onPeriodChange={setPeriod} />
        </FormItem>
        <FormItem top="Дата" htmlFor="date" bottom={startDateError} status={getFieldStatus(isSubmitted, startDateError)} required>
          <DateInput name="date" id="date" value={startDate} onChange={onStartDateChange} accessible />
        </FormItem>
        <FormItem
          top="Длительность в минутах"
          htmlFor="duration"
          bottom={durationError}
          status={getFieldStatus(isSubmitted, durationError)}
          required
        >
          <Input name="duration" id="duration" type="number" min={0} value={duration} onChange={onDurationChange} />
        </FormItem>
        <FormLayoutGroup mode="horizontal" segmented>
          <FormItem top="Начало диапазона" htmlFor="begin" bottom={startError} status={getFieldStatus(isSubmitted, startError)} required>
            <Input name="begin" id="begin" type="time" value={start} onInput={onStartInput} />
          </FormItem>
          <FormItem top="Конец диапазона" htmlFor="end" bottom={endError} status={getFieldStatus(isSubmitted, endError)} required>
            <Input name="end" id="end" type="time" value={end} onInput={onEndInput} />
          </FormItem>
        </FormLayoutGroup>
      </FormLayoutGroup>
      <Box padding="2xl">
        <Flex align="center" gap="2xl">
          <Button type="submit" size="m" onClick={onSubmitButton} loading={isLoading} disabled={isLoading}>
            Создать
          </Button>
          {error && <Text className={styles.errorText}>{error}</Text>}
        </Flex>
      </Box>
    </Box>
  );
});
