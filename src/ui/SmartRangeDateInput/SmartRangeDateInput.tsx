import { Accordion, Button, DateInput, Flex, FormItem, FormLayoutGroup, Switch, Text } from '@vkontakte/vkui';
import { type RefObject, useState } from 'react';

import { DateRangeSchema, extractDateRangeError } from '@/ui/SmartRangeDateInput/SmartRangeDateInput.schema';
import { useCheckField } from '@/utils/formField';

interface SmartRangeDateInputProps {
  ref?: RefObject<HTMLDivElement>;
  date?: Date;
  error?: string;
  onDateChanged: (date?: Date) => void;
}

export function SmartRangeDateInput({ ref, date, error, onDateChanged }: SmartRangeDateInputProps) {
  const [showRange, setShowRange] = useCheckField(false);

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const [dateRangeError, setDateRangeError] = useState<string>();
  const onStartDateChange = (date?: Date) => {
    const result = DateRangeSchema.safeParse({ startDate: date, endDate });
    if (!result.success) {
      setDateRangeError(extractDateRangeError(result.error));
    } else {
      setStartDate(result.data.startDate);
      setDateRangeError(undefined);
    }
  };

  const onEndDateChange = (date?: Date) => {
    const result = DateRangeSchema.safeParse({ startDate, endDate: date });
    if (!result.success) {
      setDateRangeError(extractDateRangeError(result.error));
    } else {
      setEndDate(result.data.endDate);
      setDateRangeError(undefined);
    }
  };

  return (
    <FormLayoutGroup getRootRef={ref} mode="vertical">
      <Accordion expanded={showRange} disabled>
        <Accordion.Summary ExpandIcon={() => null} CollapseIcon={() => null} hasActive={false} hasHover={false}>
          <Flex gap="l">
            <Text>Подобрать слот</Text>
            <Switch checked={showRange} onChange={setShowRange} />
          </Flex>
        </Accordion.Summary>
        <Accordion.Content>
          <FormLayoutGroup mode="vertical">
            <FormItem top="Начало" htmlFor="date-range-start">
              <DateInput
                name="date-range-start"
                id="date-range-start"
                value={startDate}
                onChange={onStartDateChange}
                enableTime
                accessible
              />
            </FormItem>
            <FormItem top="Конец" htmlFor="date-range-end" bottom={dateRangeError} status={dateRangeError ? 'error' : 'default'}>
              <DateInput name="date-range-end" id="date-range-end" value={endDate} onChange={onEndDateChange} enableTime accessible />
            </FormItem>
          </FormLayoutGroup>
          <FormItem>
            <Button mode="outline" size="m">
              Подобрать
            </Button>
          </FormItem>
        </Accordion.Content>
      </Accordion>
      <FormItem top="Дата и время" htmlFor="date" bottom={error} status={error ? 'error' : 'default'}>
        <DateInput name="date" id="date" value={date} onChange={onDateChanged} enableTime accessible />
      </FormItem>
    </FormLayoutGroup>
  );
}
