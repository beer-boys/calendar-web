import { ChipsSelect, type ChipsSelectProps } from '@vkontakte/vkui';

import type { Contact } from '@/modules/contact/contact.type';

interface AttendeesChipOption {
  value: number;
  label: string;
}

interface AttendeesInputProps extends Omit<ChipsSelectProps<AttendeesChipOption>, 'onChange' | 'options' | 'placeholder'> {
  contacts: Contact[];
  onAttendeesChange: (attendees: Contact[]) => void;
}

export function AttendeesInput({ contacts, onAttendeesChange, ...rest }: AttendeesInputProps) {
  const options: AttendeesChipOption[] = contacts.map(({ name }, idx) => ({ label: name, value: idx }));

  const handleChange = (selectedOptions: AttendeesChipOption[]) => {
    const selectedContacts = selectedOptions.map(({ value: email }) => contacts[email]);
    onAttendeesChange(selectedContacts);
  };

  return <ChipsSelect placeholder="Выберите участников" options={options} onChange={handleChange} {...rest} />;
}
