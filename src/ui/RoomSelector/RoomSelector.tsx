import { Accordion, Button, Flex, FormItem, FormLayoutGroup, Input, Select, Switch, Text } from '@vkontakte/vkui';
import { type ChangeEvent, type RefObject, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getRooms } from '@/modules/room/room.reducer';
import { getActiveRoomsForInput, getLoadingState } from '@/modules/room/room.selectos';
import type { RoomFeature } from '@/modules/room/room.type';
import { RoomFeatuesInput } from '@/ui/RoomFeatuesInput/RoomFeatuesInput';
import { extractRoomSelectorErrors, type RoomSelectorErrors, RoomSelectorSchema } from '@/ui/RoomSelector/RoomSelector.schema';
import { getFieldStatus, useCheckField, useInputField } from '@/utils/formField';

interface RoomSelectorProps {
  ref?: RefObject<HTMLDivElement>;
  onActiveRoomId: (roomId: string) => void;
}

export function RoomSelector({ ref, onActiveRoomId }: RoomSelectorProps) {
  const [showRange, setShowRange] = useCheckField(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<RoomSelectorErrors>();
  const { capacityError } = errors || {};

  const [capacity, setCapacity] = useInputField('');
  const onCapacityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCapacity(e.currentTarget.value);

    if (errors) {
      setErrors({ ...errors, capacityError: undefined });
    }
  };

  const [roomFeatures, setRoomFeatures] = useState<RoomFeature[]>([]);

  const dispatch = useDispatch();

  const onFindClick = () => {
    setIsSubmitted(true);

    const result = RoomSelectorSchema.safeParse({ capacity, roomFeatures });
    if (!result.success) {
      setErrors(extractRoomSelectorErrors(result.error));
    } else {
      setErrors(undefined);

      const { capacity, roomFeatures } = result.data;

      dispatch(
        //@ts-expect-error
        getRooms({
          minCapacity: capacity,
          features: roomFeatures.map(({ id }) => id),
        }),
      );
    }
  };

  const isRoomsLoading = useSelector(getLoadingState);
  const options = useSelector(getActiveRoomsForInput);

  const [activeRoomId, setActiveRoomId] = useState<string>('');
  const onChange = (_: ChangeEvent<HTMLSelectElement>, roomId: unknown) => {
    setActiveRoomId(roomId as string);
    onActiveRoomId(roomId as string);
  };

  return (
    <FormLayoutGroup getRootRef={ref} mode="vertical">
      <Accordion expanded={showRange} disabled>
        <Accordion.Summary ExpandIcon={() => null} CollapseIcon={() => null} hasActive={false} hasHover={false}>
          <Flex gap="l">
            <Text>Нужна переговорная</Text>
            <Switch checked={showRange} onChange={setShowRange} />
          </Flex>
        </Accordion.Summary>
        <Accordion.Content>
          <FormLayoutGroup mode="vertical">
            <FormItem top="Вместимость" htmlFor="capacity" bottom={capacityError} status={getFieldStatus(isSubmitted, capacityError)}>
              <Input name="capacity" id="capacity" value={capacity} onChange={onCapacityChange} />
            </FormItem>
            <FormItem top="Участники" htmlFor="room-features">
              <RoomFeatuesInput name="room-features" id="room-features" onRoomsFeaturesChange={setRoomFeatures} />
            </FormItem>
          </FormLayoutGroup>
          <FormItem>
            <Button mode="outline" size="m" onClick={onFindClick} loading={isRoomsLoading} disabled={isRoomsLoading}>
              Найти
            </Button>
          </FormItem>
          <FormItem top="Переговорные" htmlFor="rooms">
            <Select name="rooms" id="rooms" options={options} value={activeRoomId} defaultValue={options[0].value} onChange={onChange} />
          </FormItem>
        </Accordion.Content>
      </Accordion>
    </FormLayoutGroup>
  );
}
