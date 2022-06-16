import React, { useEffect } from 'react';
import Modal from 'apollo-react/components/Modal';
import Checkbox from 'apollo-react/components/Checkbox';
import {actionChannel, UI_ACTION} from '../../../uiActions/ui-actions';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';
import Button from 'apollo-react/components/Button';
import _ from 'lodash'
import { docType } from './GenerateDocs';

const UserInputModal = ({initExport, filterState, filterStateUpdate, roleList, fetchLatestNotes}) => {
    const  {
      answered, 
      unanswered,
      myRole, 
      includesNotes, 
      fileName, 
      fileType, 
      interestedParties,
      milestoneOptions,
      milestones
    } = filterState;

    const [state, setState] = React.useState({
      open: false
    });
  
    let roles = roleList
    let milestoneOptionsWithDefault = milestoneOptions
    try{
      roles = (roleList.includes('All')) ? roleList : [...['All'], ...roleList]
      milestoneOptionsWithDefault = (milestoneOptions.includes('All')) ? milestoneOptions : [...['All'], ...milestoneOptions]
    }catch(error){

    }

    useEffect(()=>{
      actionChannel.subscribe({
        next: (event) => {
          if(event.name === UI_ACTION.openGenerateModal){
            handleOpen();
            fetchLatestNotes();
          }
            
        }
      });
    }, [])
  
    const handleClose = ()=> setState({...state, ...{open:false}});
    const handleOpen = ()=> setState({...state, ...{open:true}});
    
    const handleBooleanChange = (e) => {
      filterStateUpdate({
        ...filterState,
        ...{[e.target.name] : !filterState[e.target.name]}
      });
    };
    
    const handleTextChange = (e) => {
      filterStateUpdate({
        ...filterState,
        ...{[e.target.name] : e.target.value}
      });
    }

    const disable = ()=>{
      return  (answered || unanswered || myRole || includesNotes) && fileName
    }
    return(
    <Modal
      open={state.open}
      onClose={() => handleClose()}
      title="Export Opportunity"
      subtitle="For internal communication only"
      hideButtons={true}
      id="neutral"
    >
      <div className='exportOptionsWrapper'>
        <div className='exportOptionsRow exportOptionsRow-first flex-dir-col'>
          <label> File Name</label>
          <input className="exportFileName" name="fileName" value={fileName} onChange={handleTextChange} required></input>
          <span className='fileNameAlert'>File Name is required.</span>
        </div>
        <div className='exportOptionsRow exportOptionsRow-second flex-dir-col'>
          <div className='exportOptionsCell'>
            <Select
              label="File Type"
              value={fileType}
              onChange={handleTextChange}
              fullWidth
              name="fileType"
            >
              <MenuItem value={docType.pdf}>{`${docType.pdf} (Default)`}</MenuItem>
              <MenuItem value={docType.doc}>{docType.doc}</MenuItem>
            </Select>
          </div>
        </div>
        <h4> Select any required filters</h4>
        <div className='exportOptionsRow exportOptionsRow-third'>
          <div className='exportOptionsCell'>
            <Checkbox  value={answered} checked={answered} name="answered" label="Answered" onChange={handleBooleanChange} />
          </div>
          <div className='exportOptionsCell'>
            <Checkbox  value={myRole} checked={myRole} name="myRole" label="My user role" onChange={handleBooleanChange}/>
          </div>
        </div>
        <div className='exportOptionsRow exportOptionsRow-fourth'>
        <div className='exportOptionsCell'>
            <Checkbox value={unanswered} checked={unanswered}  name="unanswered" label="Unanswered" onChange={handleBooleanChange}/>
          </div>
          <div className='exportOptionsCell'>
            <Checkbox value={includesNotes} checked={includesNotes} name="includesNotes" label="Include Notes Section" onChange={handleBooleanChange}/>
          </div>
        </div>
        <div className='exportOptionsRow exportOptionsRow-second-last'>
          <div className='exportOptionsCell'>
            <Select
              label="Select by interested parties"
              value={interestedParties}
              onChange={handleTextChange}
              fullWidth
              name="interestedParties"
            >
              {roles.map((role)=>  <MenuItem key={role} value={role}>{role}</MenuItem>)}
            </Select>
          </div>
          <div className='exportOptionsCell'>
            <Select
              label="Select by Milestones"
              value={milestones}
              onChange={handleTextChange}
              fullWidth
              name="milestones"
              canDeselect={false}
              multiple
            >
              {milestoneOptionsWithDefault.map((milestone)=> <MenuItem key={milestone} value={milestone}>{milestone}</MenuItem>)}
            </Select>
          </div>
        </div>
        <div className='exportOptionsRow exportOptionsRow-last button-group'>
          <Button variant="text" style={{ marginRight: 10 }} onClick={()=>handleClose()}>
            Cancel
          </Button>
          <Button variant="primary" disabled={!disable()} style={{ marginRight: 0 }} onClick={()=>initExport()}>
            Ok
          </Button>
        </div>
      </div>  
    </Modal>
    )
  }

  export default UserInputModal;