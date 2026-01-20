import { renderWithStore } from '@/test/renderWithStore';
import { CreateButton } from '@/ui/CreateButton/CreateButton';

describe('CreateButton', () => {
  it('should render', () => {
    const { container } = renderWithStore(<CreateButton />);
    expect(container).toMatchSnapshot();
  });
});
