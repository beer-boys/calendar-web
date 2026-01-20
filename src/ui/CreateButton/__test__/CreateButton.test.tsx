import { renderWithStore } from '@/test/renderWithStore';
import { CreateButton } from '@/ui/CreateButton/CreateButton';

describe('CreateButton', () => {
  it('should render', () => {
    const rendered = renderWithStore(<CreateButton />);
    expect(rendered.asFragment()).toMatchSnapshot();
  });
});
