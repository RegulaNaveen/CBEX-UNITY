import React, { useState, useEffect } from 'react';
import Modal from 'apollo-react/components/Modal';
import Select from 'apollo-react/components/Select';
import MenuItem from 'apollo-react/components/MenuItem';
import Step from 'apollo-react/components/Step';
import StepLabel from 'apollo-react/components/StepLabel';
import Stepper from 'apollo-react/components/Stepper';
import PropTypes from 'prop-types';
import { PrimaryButton } from '../../common/atoms/Buttons';

const steps = ['Select Role', 'Accept Tracking'];

const WelcomeModal = ({ roles, onRoleChange, id, roleName, onUserAcknowledged }) => {
  const rolesList = roles || [];
  const cls =
    '.MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-rounded > div > div:nth-child(2) > h3 > button';
  const selector = document.querySelector(cls);
  const [state, setState] = useState({
    image: true
  });
  const [role, setrole] = useState('');
  const [activeStep, setActiveStep] = useState(0);


  function handleClose(variant) {
    setState({ ...state, [variant]: false });
  }

  /** Set default user role */
  useEffect(() => {
    if (roleName) {
      setrole(roleName);
    }
  }, [roleName]);

  useEffect(() => {
    if (selector) {
      selector.addEventListener('click', () => {
        handleClose('image');
      });
    }
    return () => {
      if (selector) {
        selector.removeEventListener('click', () => {
          handleClose('image');
        });
      }
    };
  }, [selector]);

  return (
    <Modal
      open={state.image}
      image=""
      alt="Welcome to Unity!"
      title="Welcome to Unity!"
      subtitle="Setting up your account"
      hideButtons
      message=""
      id={id}
      variant="default"
    >
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && (
        <div>
          <section className="role-modal">
            <p className="para">
              Before you can use all the features of the Unity platform, we need
              to set up the role for your profile.
            </p>
          </section>
          <section className="role-modal">
            <p className="para">
              <b>Please select your user role.</b> This role can always be changed
              in your profile.
            </p>
          </section>
          <section>
            <div>
              <Select
                label="User Role"
                helperText=""
                value={role}
                onChange={e => setrole(e.target.value)}
                placeholder="Select Role"
                fullWidth
              >
                {rolesList &&
                  rolesList.sort().map(rl => {
                    return (
                      <MenuItem key={rl} value={rl}>
                        {rl}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
            <PrimaryButton
              disabled={!role}
              className="saverole-button"
              id="saverole-button"
              onClick={() => {
                onRoleChange(role);
                setActiveStep(1);
              }}
            >
              Save And Next
            </PrimaryButton>
          </section>
        </div>
      )}
      {activeStep === 1 && (
        <div>
          <section className="role-modal">
            <p className="para">
              In order for most features to work within Unity, your
              name, any data inputs you provide, as well as certain
              activities will be captured. For any questions about the
              data we track and how it's used, please reach out to
              <br />
              <a href="mailto:CBEX_Unity@iqvia.com"><b>CBEX_Unity@iqvia.com</b></a>.
            </p>
          </section>
          <section className="role-modal" style={{ paddingBottom: "50px" }}>
            <p className="para">
              By clicking "Acknowledge", you agree to have your usage 
              captured.
            </p>
          </section>
          <section>
            <PrimaryButton
                className="saverole-button"
                id="saverole-button"
                onClick={() => {
                  onUserAcknowledged();
                  handleClose('image');
                }}
              >
                Acknowledge
            </PrimaryButton>
          </section>
        </div>
      )}
    </Modal>
  );
};

WelcomeModal.propTypes = {
  roles: PropTypes.any,
  onRoleChange: PropTypes.func,
  id: PropTypes.any,
  onUserAcknowledged: PropTypes.func
};
WelcomeModal.defaultProps = {
  roles: '',
  onRoleChange: () => {},
  id: '',
  onUserAcknowledged: () => {}
};
export default WelcomeModal;
