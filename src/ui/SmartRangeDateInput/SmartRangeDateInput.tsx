import { Accordion, Button, DateInput, Flex, FormItem, FormLayoutGroup, Switch, Text } from '@vkontakte/vkui';

import { useCheckField } from '@/utils/useFormFields';

interface SmartRangeDateInputProps {
  date?: Date;
  onDateChanged: (date?: Date) => void;
}

export function SmartRangeDateInput({ date, onDateChanged }: SmartRangeDateInputProps) {
  const [showRange, setShowRange] = useCheckField(false);

  return (
    <FormLayoutGroup mode="vertical">
      <Accordion expanded={showRange} disabled>
        <Accordion.Summary ExpandIcon={() => null} CollapseIcon={() => null} hasActive={false} hasHover={false}>
          <Flex gap="l">
            <Text>Подобрать слот</Text>
            <Switch checked={showRange} onChange={setShowRange} />
          </Flex>
        </Accordion.Summary>
        <Accordion.Content>
          <FormLayoutGroup mode="horizontal" segmented>
            <FormItem top="Начало" htmlFor="date-range-start">
              <DateInput name="date-range-start" id="date-range-start" enableTime accessible />
            </FormItem>
            <FormItem top="Конец" htmlFor="date-range-end">
              <DateInput name="date-range-end" id="date-range-end" enableTime accessible />
            </FormItem>
          </FormLayoutGroup>
          <FormItem>
            <Button mode="outline" size="m">
              Подобрать
            </Button>
          </FormItem>
        </Accordion.Content>
      </Accordion>
      <FormItem top="Дата и время" htmlFor="date">
        <DateInput name="date" id="date" value={date} onChange={onDateChanged} enableTime accessible />
      </FormItem>
    </FormLayoutGroup>
  );
}
