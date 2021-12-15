import React from 'react';
import Modal from 'apollo-react/components/Modal';
import Select from 'apollo-react/components/Select';
import MenuItem from 'apollo-react/components/MenuItem';
import { PrimaryButton } from '../../common/atoms/Buttons';
import PropTypes from 'prop-types';


const WelcomeModal = ({roles,onRoleChange,id}) => {
    let rolesList = roles ? roles : [];
    let cls = '.MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-rounded > div > div:nth-child(2) > h3 > button'
    let selector = document.querySelector(cls);
    const [state, setState] = React.useState({
        image: true
    });
    const [role, setrole] = React.useState('')
    function handleClose(variant){
        setState({ ...state, [variant]: false });
    };
 
    React.useEffect(() => {
        if(selector){
            selector.addEventListener('click', ()=>{
                handleClose('image');
            })
        }
        return () => {
            if(selector){
                selector.removeEventListener('click', ()=>{
                    handleClose('image');
                })
            } 
        }
    },[selector])
    return (
        <Modal
            open={state.image}
            image=""
            alt="Welcome to Unity!"
            title="Welcome to Unity!"
            subtitle=""
            hideButtons={true}
            message={``}
            // onClose={() => handleClose('image')}
            id={id}
            variant="default"
        >
            <section className="role-modal">
            <p className="para">Before you can use all the feature of the Unity platform, we need to setup the role for your profile.
            </p>
            </section>
            <section className="role-modal">
               <b>Please select your user role.</b><p className="para"> This role can always be changed in your profile.</p>
            </section>
            <section >
                <div style={{ maxWidth: 250 }}>
                    <Select
                        label="User Role"
                        helperText=""
                        value={role}
                        onChange={(e)=>setrole(e.target.value)}
                        placeholder="Select a Role"
                        fullWidth
                        >
                            {
                                rolesList && rolesList.map(rl=>{
                                    return(
                                        <MenuItem key={rl} value={rl}>{rl}</MenuItem>
                                    )
                                })
                            }
                        
                    </Select>
                </div>
                <PrimaryButton
                        disabled={role ? false : true}
                        className="saverole-button"
                        id="saverole-button"
                        onClick={()=>{
                            onRoleChange(role)
                            handleClose('image');
                        }}
                    >
                        Save Role
                </PrimaryButton>
            </section>
            
        </Modal>
    );
};

WelcomeModal.propTypes = {
    roles: PropTypes.any,
    onRoleChange: PropTypes.func
  };
WelcomeModal.defaultProps = {
    roles: ''
  };
export default WelcomeModal;
