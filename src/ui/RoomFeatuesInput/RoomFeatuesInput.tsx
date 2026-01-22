import { ChipsSelect, type ChipsSelectProps } from '@vkontakte/vkui';

import { roomFeatures } from '@/modules/room/room.constants';
import type { RoomFeature } from '@/modules/room/room.type';

interface RoomFeatuesChipOption {
  value: number;
  label: string;
}

interface RoomFeatuesInputProps extends Omit<ChipsSelectProps<RoomFeatuesChipOption>, 'onChange' | 'options' | 'placeholder'> {
  onRoomsFeaturesChange: (roomsFeatures: RoomFeature[]) => void;
}

export function RoomFeatuesInput({ onRoomsFeaturesChange, ...rest }: RoomFeatuesInputProps) {
  const options: RoomFeatuesChipOption[] = roomFeatures.map(({ label }, idx) => ({ label, value: idx }));

  const handleChange = (selectedOptions: RoomFeatuesChipOption[]) => {
    const selectedContacts = selectedOptions.map(({ value }) => roomFeatures[value]);
    onRoomsFeaturesChange(selectedContacts);
  };

  return <ChipsSelect placeholder="Выберите содержание переговорной" options={options} onChange={handleChange} {...rest} />;
}
