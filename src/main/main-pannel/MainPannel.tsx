import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Icon24GearOutline } from '@vkontakte/icons';
import { Box, Calendar, Checkbox, Flex, FormLayoutGroup, Panel, type PanelProps, SplitCol, SplitLayout } from '@vkontakte/vkui';

type MainPannelProps = Pick<PanelProps, 'id'>;

export function MainPannel({ id }: MainPannelProps) {
  return (
    <Panel id={id}>
      <SplitLayout>
        <SplitCol width={470}>
          <Flex direction="column" gap="m">
            <div className="logo">X-Calendar</div>
            <Calendar />
            <FormLayoutGroup mode="vertical">
              <Checkbox name="meetings" defaultChecked>
                Встречи
              </Checkbox>
              <Checkbox name="habbits" defaultChecked>
                Привычки
              </Checkbox>
            </FormLayoutGroup>
            <Box>
              <Icon24GearOutline />
            </Box>
          </Flex>
        </SplitCol>
        <SplitCol minWidth={1100}>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={false}
            events={[
              { title: 'event 1', date: '2019-04-01' },
              { title: 'event 2', date: '2019-04-02' },
            ]}
          />
        </SplitCol>
      </SplitLayout>
    </Panel>
  );
}
