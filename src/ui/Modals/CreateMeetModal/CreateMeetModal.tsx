import { Box, Button, FormItem, FormLayoutGroup, Input, Title } from '@vkontakte/vkui';
import { type ChangeEvent, memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { defaultPriority } from '@/modules/calendarEvent/calendarEvent.constants';
import { getContactsList } from '@/modules/contact/contact.selectors';
import type { Contact } from '@/modules/contact/contact.type';
import { closeModal } from '@/modules/modal/modal.reducer';
import { AttendeesInput } from '@/ui/AttendeesInput/AttendeesInput';
import {
  CreateMeetDataSchema,
  type CreateMeetErrorMessages,
  extractCreateMeetDataErrors,
} from '@/ui/Modals/CreateMeetModal/CreateMeetModal.schema';
import { PriorityInput } from '@/ui/PriorityInput/PriorityInput';
import { SmartRangeDateInput } from '@/ui/SmartRangeDateInput/SmartRangeDateInput';
import { useInputField } from '@/utils/formField';

export const CreateItemModal = memo(function CreateItemModal() {
  const [errors, setErrors] = useState<CreateMeetErrorMessages>();
  const { nameError, dateError } = errors || {};

  const [name, setName] = useInputField('');
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
    setErrors({ dateError: errors?.dateError, nameError: undefined });
  };

  const [date, setDate] = useState<Date>();
  const onDate = (date?: Date) => {
    setDate(date);
    setErrors({ nameError: errors?.nameError, dateError: undefined });
  };

  const [attendees, setAttendes] = useState<Contact[]>([]);
  const contacts = useSelector(getContactsList);
  const [priority, setPriority] = useState(defaultPriority);

  const dispatch = useDispatch();

  const onSubmitButton = () => {
    const result = CreateMeetDataSchema.safeParse({ name, date, attendees, priority });
    if (!result.success) {
      setErrors(extractCreateMeetDataErrors(result.error));
    } else {
      setErrors(undefined);

      // const { name, date, attendees, priority } = result.data;
      // dispatch(
      //   createMeet({
      //     meet: { title: name, date: date.getTime(), priority, attendees, period: defaultPeriod },
      //   }),
      // );

      // Убрать, когда появятся походы в сеть
      dispatch(closeModal());
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
        <FormItem top="Приоритет" htmlFor="priority">
          <PriorityInput name="priority" id="priority" value={priority} onPriorityChange={setPriority} />
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
