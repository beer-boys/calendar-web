import { Box, Button, DateInput, FormItem, FormLayoutGroup, Input, Title } from '@vkontakte/vkui';
import { type ChangeEvent, type InputEvent, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { createMeet } from '@/modules/calendarEvent/calendarEvent.reducer';
import { getContactsList } from '@/modules/contact/contact.selectors';
import type { Contact } from '@/modules/contact/contact.type';
import { bookRoom } from '@/modules/room/room.reducer';
import { AttendeesInput } from '@/ui/AttendeesInput/AttendeesInput';
import {
  CreateMeetDataSchema,
  type CreateMeetErrorMessages,
  extractCreateMeetDataErrors,
} from '@/ui/Modals/CreateMeetModal/CreateMeetModal.schema';
import { RoomSelector } from '@/ui/RoomSelector/RoomSelector';
import { getFieldStatus, useInputField } from '@/utils/formField';

export const CreateItemModal = memo(function CreateItemModal() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<CreateMeetErrorMessages>();
  const { nameError, dateError, startError, endError } = errors || {};

  const [name, setName] = useInputField('');
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);

    if (errors) {
      setErrors({ ...errors, nameError: undefined });
    }
  };

  const [date, setDate] = useState<Date>();
  const onDateChange = (date?: Date) => {
    setDate(date);

    if (errors) {
      setErrors({ ...errors, dateError: undefined });
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

  const [roomId, setRoomId] = useState('');

  const [attendees, setAttendes] = useState<Contact[]>([]);
  const contacts = useSelector(getContactsList);

  const dispatch = useDispatch();

  const onSubmitButton = () => {
    setIsSubmitted(true);

    const result = CreateMeetDataSchema.safeParse({ name, date, attendees, start, end });
    if (!result.success) {
      setErrors(extractCreateMeetDataErrors(result.error));
    } else {
      setErrors(undefined);

      const { name, date, attendees, start, end } = result.data;
      dispatch(
        //@ts-expect-error
        createMeet({
          name,
          date: date.getTime(),
          attendees: attendees.map(({ email }) => email),
          start,
          end,
        }),
      );

      dispatch(
        //@ts-expect-error
        bookRoom({
          start,
          end,
          date: date.getTime(),
          roomId,
        }),
      );
    }
  };

  return (
    <Box>
      <Box padding="2xl">
        <Title level="2">Создание встречи</Title>
      </Box>
      <FormLayoutGroup mode="vertical">
        <FormItem top="Название" htmlFor="name" bottom={nameError} status={nameError ? 'error' : 'default'} required>
          <Input name="name" id="name" value={name} onChange={onNameChange} />
        </FormItem>
        <FormItem top="Участники" htmlFor="attendees">
          <AttendeesInput name="attendees" id="attendees" contacts={contacts} onAttendeesChange={setAttendes} />
        </FormItem>
        <FormItem top="Дата" htmlFor="date" bottom={dateError} status={getFieldStatus(isSubmitted, dateError)} required>
          <DateInput name="date" id="date" value={date} onChange={onDateChange} accessible />
        </FormItem>
        <FormLayoutGroup mode="horizontal" segmented>
          <FormItem top="Начало" htmlFor="begin" bottom={startError} status={getFieldStatus(isSubmitted, startError)} required>
            <Input name="begin" id="begin" type="time" value={start} onInput={onStartInput} />
          </FormItem>
          <FormItem top="Конец" htmlFor="end" bottom={endError} status={getFieldStatus(isSubmitted, endError)} required>
            <Input name="end" id="end" type="time" value={end} onInput={onEndInput} />
          </FormItem>
        </FormLayoutGroup>
        <RoomSelector onActiveRoomId={setRoomId} />
      </FormLayoutGroup>
      <Box padding="2xl">
        <Button type="submit" size="m" onClick={onSubmitButton}>
          Создать
        </Button>
      </Box>
    </Box>
  );
});
