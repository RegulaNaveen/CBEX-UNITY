// import React from 'react';
// import { render, waitFor, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import { Provider } from 'react-redux';
// import ActionButtons from '../ActionButtons';
// import { store } from '../../../../store';
// import Sinon from 'sinon';
// import { ApprovalContext } from '../Section';
// import {
//   setAllApprovals,
//   setCanSendEmailInApprovals
// } from '../../../../redux/actions/approval-actions';
// import * as emailUtils from '../../../../utils/emailUtils';

// const RenderWithStore = props => (
//   <Provider store={store}>{props.children}</Provider>
// );

// describe.skip('Send Email Button tests', () => {
//   let sinonSandbox;
//   beforeAll(() => {
//     sinonSandbox = Sinon.createSandbox();
//   });

//   afterEach(() => {
//     sinonSandbox.restore();
//   });

//   it('should display email button when approvalsSendEmailFlag enabled', async () => {
//     const props = { sectionId: 'test-id' };
//     store.dispatch(
//       setAllApprovals([
//         {
//           ApprovalSectionId: 'test-id',
//           ArchivedData: []
//         }
//       ])
//     );
//     store.dispatch(setCanSendEmailInApprovals(true));
//     const loadingEventMock = sinonSandbox.stub();
//     const { findByText, debug } = render(
//       <RenderWithStore>
//         <ApprovalContext.Provider
//           value={{
//             sectionLoading: false,
//             dispatchLoadingEvent: loadingEventMock
//           }}
//         >
//           <ActionButtons {...props} />
//         </ApprovalContext.Provider>
//       </RenderWithStore>
//     );
//     await waitFor(async () => {
//       expect(await findByText('Email')).toBeInTheDocument();
//     });
//   });

//   it('should not display email button when approvalsSendEmailFlag disabled', async () => {
//     const props = { sectionId: 'test-id' };
//     store.dispatch(
//       setAllApprovals([
//         {
//           ApprovalSectionId: 'test-id',
//           ArchivedData: []
//         }
//       ])
//     );
//     store.dispatch(setCanSendEmailInApprovals(true));
//     const loadingEventMock = sinonSandbox.stub();
//     const { queryByText, findByText } = render(
//       <RenderWithStore>
//         <ApprovalContext.Provider
//           value={{
//             sectionLoading: false,
//             dispatchLoadingEvent: loadingEventMock
//           }}
//         >
//           <ActionButtons {...props} />
//         </ApprovalContext.Provider>
//       </RenderWithStore>
//     );
//     await waitFor(async () => {
//       expect(await findByText('Email')).toBeInTheDocument();
//     });
//     store.dispatch(setCanSendEmailInApprovals(false));
//     await waitFor(async () => {
//       expect(await queryByText('Email')).not.toBeInTheDocument();
//     });
//   });

//   it('should call click handler on clicking email button', async () => {
//     const props = { sectionId: 'test-id' };
//     store.dispatch(
//       setAllApprovals([
//         {
//           ApprovalSectionId: 'test-id',
//           ArchivedData: []
//         }
//       ])
//     );
//     store.dispatch(setCanSendEmailInApprovals(true));
//     const loadingEventMock = sinonSandbox.stub();
//     sinonSandbox.stub(emailUtils, 'generateApprovalEmailInfo').returns({
//       subject: 'test subject',
//       to: ['johndoe@noone.himself'],
//       cc: ['janedoe@noone.himself'],
//       body: '<html><body>test html content</body></html>'
//     });
//     const windowSpy = jest.spyOn(window, 'open').mockImplementation(() => {});
//     const { findByText } = render(
//       <RenderWithStore>
//         <ApprovalContext.Provider
//           value={{
//             sectionLoading: false,
//             dispatchLoadingEvent: loadingEventMock
//           }}
//         >
//           <ActionButtons {...props} />
//         </ApprovalContext.Provider>
//       </RenderWithStore>
//     );
//     await waitFor(async () => {
//       expect(await findByText('Email')).toBeInTheDocument();
//       fireEvent.click(await findByText('Email'));
//     });
//     await waitFor(async () => {
//       expect(await findByText('Email')).toBeInTheDocument();
//       expect(windowSpy).toHaveBeenCalledWith(
//         'https://outlook.office.com/?path=/mail/action/compose&to=johndoe@noone.himself&subject=test subject&cc=janedoe@noone.himself&body=Unity%20has%20copied%20the%20approval%20section%20details%20to%20your%20clipboard.%20Press%20Control%20%2B%20V%20to%20paste%20the%20content%20to%20include%20it%20in%20your%20mail%20and%20share%20it%20with%20your%20team.&online=1'
//       );
//     });
//   });
// });
