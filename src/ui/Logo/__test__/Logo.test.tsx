import { render } from '@testing-library/react';

import { Logo } from '@/ui/Logo/Logo';

describe('Logo', () => {
  it('should render', () => {
    const { container } = render(<Logo />);
    expect(container).toMatchSnapshot();
  });
});
