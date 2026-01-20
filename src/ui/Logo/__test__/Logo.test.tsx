import { renderWithStore } from '@/test/renderWithStore';
import { Logo } from '@/ui/Logo/Logo';

describe('Logo', () => {
  it('should render', () => {
    const { container } = renderWithStore(<Logo />);
    expect(container).toMatchSnapshot();
  });
});
