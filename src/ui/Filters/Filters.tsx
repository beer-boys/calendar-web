import { Checkbox, FormLayoutGroup } from '@vkontakte/vkui';

export function Filters() {
  return (
    <FormLayoutGroup mode="vertical">
      <Checkbox name="meetings" defaultChecked>
        Встречи
      </Checkbox>
      <Checkbox name="habbits" defaultChecked>
        Привычки
      </Checkbox>
    </FormLayoutGroup>
  );
}
