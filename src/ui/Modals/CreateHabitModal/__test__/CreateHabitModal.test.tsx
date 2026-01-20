import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithStore } from '@/test/renderWithStore';
import { CreateHabitModal } from '@/ui/Modals/CreateHabitModal/CreateHabitModal';

describe('CreateHabitModal', () => {
  it('should render', () => {
    const rendered = renderWithStore(<CreateHabitModal />);
    expect(rendered.asFragment()).toMatchSnapshot();
  });

  const errorMessages = [
    'Укажите название привычки',
    'Укажите длительность привычки',
    'Укажите дату начала привычки',
    'Укажите время начала диапазона',
    'Укажите время конца диапазона',
  ];
  it('should show errors on submit empty form', async () => {
    const user = userEvent.setup();

    const { container } = renderWithStore(<CreateHabitModal />);

    const submitBttn = container.querySelector('[data-qa-id="create-habit-submit"]');
    expect(submitBttn).not.toBeNull();

    await user.click(submitBttn!);
    for (const errorMessage of errorMessages) {
      expect(await screen.findByText(errorMessage)).toBeInTheDocument();
    }
  });
});
