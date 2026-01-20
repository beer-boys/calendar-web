import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithStore } from '@/test/renderWithStore';
import { CreateButton } from '@/ui/CreateButton/CreateButton';

describe('CreateButton', () => {
  it('should render', () => {
    const rendered = renderWithStore(<CreateButton />);
    expect(rendered.asFragment()).toMatchSnapshot();
  });

  const creatableItems = ['Встречу', 'Привычку'];
  it('should expand', async () => {
    const user = userEvent.setup();
    const { container } = renderWithStore(<CreateButton />);

    const createBtn = container.querySelector('[data-qa-id="event-create-bttn"]');
    expect(createBtn).not.toBeNull();

    await user.click(createBtn!);
    for (const item of creatableItems) {
      expect(await screen.findByText(item)).toBeInTheDocument();
    }
  });
});
