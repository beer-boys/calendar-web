import { Box, Button, FormItem, FormLayoutGroup, Input, Title } from '@vkontakte/vkui';
import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { defaultPeriod, defaultPriority } from '@/modules/calendarEvent/calendarEvents.constants';
import { getContactsList } from '@/modules/contact/contact.selectors';
import type { Contact } from '@/modules/contact/contact.type';
import { createMeet } from '@/modules/meet/meet.reducer';
import { closeModal } from '@/modules/modal/modal.reducer';
import { AttendeesInput } from '@/ui/AttendeesInput/AttendeesInput';
import { PriorityInput } from '@/ui/PriorityInput/PriorityInput';
import { SmartRangeDateInput } from '@/ui/SmartRangeDateInput/SmartRangeDateInput';
import { useInputField } from '@/utils/useFormFields';

export const CreateItemModal = memo(function CreateItemModal() {
  const [name, onNameChange] = useInputField('');
  const [date, setDate] = useState<Date>();

  const [attendees, setAttendes] = useState<Contact[]>([]);
  const contacts = useSelector(getContactsList);

  const [priority, setPriority] = useState(defaultPriority);

  const dispatch = useDispatch();

  const onSubmitButton = () => {
    if (!date) {
      return;
    }

    dispatch(
      createMeet({
        meet: { title: name, date: date.getTime(), priority, attendees, period: defaultPeriod },
      }),
    );

    // Убрать, когда появятся походы в сеть
    dispatch(closeModal());
  };

  return (
    <Box>
      <Box padding="2xl">
        <Title level="2">Создание встречи</Title>
      </Box>
      <FormLayoutGroup mode="vertical">
        <FormItem top="Название" htmlFor="name">
          <Input name="name" id="name" value={name} onChange={onNameChange} />
        </FormItem>
        <FormItem top="Участники" htmlFor="attendees">
          <AttendeesInput name="attendees" id="attendees" contacts={contacts} onAttendeesChange={setAttendes} />
        </FormItem>
        <FormItem top="Приоритет" htmlFor="priority">
          <PriorityInput name="priority" id="priority" value={priority} onPriorityChange={setPriority} />
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
