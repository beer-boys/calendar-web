import * as z from 'zod';

export const RoomSelectorSchema = z.object({
  capacity: z.string('Укажите минимальную вместимость переговорной').regex(/^\d+$/, 'Укажите минимальную вместимость переговорной'),
  roomFeatures: z.array(z.object({ id: z.string(), label: z.string() })),
});

export type RoomSelector = z.infer<typeof RoomSelectorSchema>;

export const extractRoomSelectorErrors = (error: z.ZodError<RoomSelector>) => {
  const treeError = z.flattenError(error);
  return {
    capacityError: treeError.fieldErrors.capacity?.[0],
  };
};

export type RoomSelectorErrors = ReturnType<typeof extractRoomSelectorErrors>;
