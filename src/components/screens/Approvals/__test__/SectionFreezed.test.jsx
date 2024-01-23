import React from 'react';
import { render } from '@testing-library/react';
import SectionFreezed from '../SectionFreezed';
import { Provider } from 'react-redux';
import { store } from '../../../../store';
import { SocketContext } from '../../../../context/SocketContext';

const props = {
  id: '1',
  section_left_questions: [],
  section_right_questions: [],
  section_title: 'new section',
  archiveIndex: 0,
  section_id: '123'
};
describe('SectionFreezed', () => {
  test('render the component without crashing without props', async () => {
    const { container } = await render(
      <Provider store={store}>
        <SectionFreezed />
      </Provider>
    );
    expect(container).toBeInTheDocument();
  });
  test('render the component without crashing with props', async () => {
    const { container, getByTestId } = await render(
      <Provider store={store}>
        <SocketContext.Provider
          value={{
            questionLockWrapper: jest.fn(),
            questionUnlockWrapper: jest.fn()
          }}
        >
          <SectionFreezed {...props} />
        </SocketContext.Provider>
      </Provider>
    );
  });
});
