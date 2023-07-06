import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Sinon from 'sinon';

import Favourite from '../Favourite';

describe('<Favourite /> unit tests', () => {
  let sinonSandbox;
  beforeAll(() => {
    sinonSandbox = Sinon.createSandbox();
  });

  beforeEach(() => {
    sinonSandbox.restore();
  });

  afterAll(() => {
    sinonSandbox.restore();
  });

  it('should call onToggle on click', async () => {
    const toggleMock = sinonSandbox.stub();
    const { container, rerender } = render(
      <Favourite value={false} onToggle={toggleMock} />
    );
    fireEvent.click(container.querySelector('.fav-icon-button'));
    expect(toggleMock.callCount).toBe(1);
    rerender(<Favourite value onToggle={toggleMock} />);
    fireEvent.click(container.querySelector('.fav-icon-button'));
    expect(toggleMock.callCount).toBe(2);
  });

  it('should render with default props', async () => {
    const { container } = render(<Favourite />);
    fireEvent.click(container.querySelector('.fav-icon-button'));
    expect(container.querySelector('.MuiSvgIcon-root')).toBeInTheDocument();
  });
});
