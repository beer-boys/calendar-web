import { renderWithStore } from '@/test/renderWithStore';
import { Logo } from '@/ui/Logo/Logo';

describe('Logo', () => {
  it('should render', () => {
    const rendered = renderWithStore(<Logo />);
    expect(rendered.asFragment()).toMatchSnapshot();
  });
});
