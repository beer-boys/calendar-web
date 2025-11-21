import { Box, Button, DateInput, FormItem, FormLayoutGroup, Input, Title } from '@vkontakte/vkui';
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { createMeet } from '@/modules/meet/meet.reducer';
import { closeModal } from '@/modules/modal/modal.reducer';
import { useFormField } from '@/utils/useFormField';

export const CreateItemModal = memo(function CreateItemModal() {
  const [name, onNameChange] = useFormField('');
  const [date, setDate] = useState<Date>();

  const dispatch = useDispatch();

  const onSubmitButton = () => {
    if (!date) {
      alert(1);
      return;
    }

    dispatch(
      createMeet({
        meet: { title: name, date: date.getTime() },
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
        <FormItem top="Дата и время" htmlFor="date">
          <DateInput name="date" id="date" value={date} onChange={setDate} enableTime accessible />
        </FormItem>
      </FormLayoutGroup>
      <Box padding="2xl">
        <Button type="submit" size="m" onClick={onSubmitButton}>
          Создать
        </Button>
      </Box>
    </Box>
  );
});
