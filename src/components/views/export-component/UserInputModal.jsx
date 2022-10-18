import React, { useEffect } from 'react';
import Modal from 'apollo-react/components/Modal';
import Checkbox from 'apollo-react/components/Checkbox';
import {actionChannel, UI_ACTION} from '../../../uiActions/ui-actions';
import MenuItem from 'apollo-react/components/MenuItem';
import Select from 'apollo-react/components/Select';
import Button from 'apollo-react/components/Button';
import _ from 'lodash'
import { defaultOption, docType } from './GenerateDocs';
import {getSelectedBid} from '../../../redux/selectors/proposal';
import { useSelector } from 'react-redux';

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

    const selectedBid = useSelector(getSelectedBid);
    const [state, setState] = React.useState({
      open: false
    });
  
    let roles = roleList
    let milestoneOptionsWithDefault = milestoneOptions
    try{
      roles = roles.sort((a,b)=>{
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      milestoneOptionsWithDefault = milestoneOptionsWithDefault.sort((a,b)=>{
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      roles = (roleList.includes(defaultOption)) ? roleList : [...[defaultOption], ...roleList]
      milestoneOptionsWithDefault = (milestoneOptions.includes(defaultOption)) ? milestoneOptions : [...[defaultOption], ...milestoneOptions];
    }catch(error){
      console.log(error);
    }

    useEffect(()=>{
      const subscription = actionChannel.subscribe({
        next: (event) => {
          if(event.name === UI_ACTION.openGenerateModal){
            handleOpen();
            fetchLatestNotes();
          }   
        }
      });
      return ()=>{
        if(subscription)
          subscription.unsubscribe();
          
        handleClose();
      }
    }, [selectedBid])
  
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

    const handleMileStoneChange = (e) => {
      let newValue = e.target.value;
      if(milestones.includes(defaultOption) && newValue.includes(defaultOption) && newValue.length != milestoneOptionsWithDefault.length){
        newValue = newValue.filter((selected)=>selected!=defaultOption)
      }else if(!milestones.includes(defaultOption) && newValue.includes(defaultOption)){
        newValue = milestoneOptionsWithDefault
      }else if(!milestones.includes(defaultOption) && !newValue.includes(defaultOption) && (newValue.length == milestoneOptionsWithDefault.length-1)){
        newValue = milestoneOptionsWithDefault
      }else if(milestones.includes(defaultOption) && !newValue.includes(defaultOption)){
        newValue = []
      }
      filterStateUpdate({
        ...filterState,
        ...{[e.target.name] : newValue}
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
              canDeselect={false}
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
              onChange={handleMileStoneChange}
              fullWidth
              name="milestones"
              multiple
            >
              {milestoneOptionsWithDefault.map((milestone)=> 
                <MenuItem 
                  key={milestone}
                  value={milestone}
                  className={
                    milestone === defaultOption &&
                    milestones.length && 
                    !milestones.includes(defaultOption)
                    ? 'all-not-selected' : ''}
                >
                  {milestone}
                </MenuItem>
              )}
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