import React, { useEffect } from 'react';
import Modal from 'apollo-react/components/Modal';
import {actionChannel, UI_ACTION} from '../../../uiActions/ui-actions';

const UserInputModal = ({initExport}) => {
    const [state, setState] = React.useState({
      open: true,
    });
  
    useEffect(()=>{
      actionChannel.subscribe({
        next: (event) => {
          if(event.name === UI_ACTION.openGenerateModal)
            handleOpen();
        }
      });
    }, [])
  
    const handleClose = ()=> setState({...state, ...{open:false}});
    const handleOpen = ()=> setState({...state, ...{open:true}});
    const handleToggle = ()=> setState({...state, ...{open:!state.open}});
  
    return(
    <Modal
      open={state.open}
      onClose={() => handleClose()}
      title="Export Opportunity"
      subtitle="For internal communication only"
      message="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor"
      buttonProps={[{}, { label: 'Next' }]}
      id="neutral"
    >
      <button onClick={initExport}> Export </button>
    </Modal>
    )
  }

  export default UserInputModal;