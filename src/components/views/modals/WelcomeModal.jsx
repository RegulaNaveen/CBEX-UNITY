import React from 'react';
import Modal from 'apollo-react/components/Modal';
import Select from 'apollo-react/components/Select';
import MenuItem from 'apollo-react/components/MenuItem';
import PropTypes from 'prop-types';
import { PrimaryButton } from '../../common/atoms/Buttons';

const WelcomeModal = ({ roles, onRoleChange, id }) => {
  const rolesList = roles || [];
  const cls =
    '.MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-rounded > div > div:nth-child(2) > h3 > button';
  const selector = document.querySelector(cls);
  const [state, setState] = React.useState({
    image: true
  });
  const [role, setrole] = React.useState('');

  function handleClose(variant) {
    setState({ ...state, [variant]: false });
  }

  React.useEffect(() => {
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
      subtitle=""
      hideButtons
      message=""
      id={id}
      variant="default"
    >
      <section className="role-modal">
        <p className="para">
          Before you can use all of the features of the Unity platform, we need
          to setup the user role for your profile.
        </p>
      </section>
      <section className="role-modal">
        <p className="para">
          <b>Please select your user role below.</b> This role can be updated
          anytime in your profile dashboard.
        </p>
      </section>
      <section>
        <div style={{ maxWidth: 250 }}>
          <Select
            label="User Role"
            helperText=""
            value={role}
            onChange={e => setrole(e.target.value)}
            placeholder="Select a Role"
            fullWidth
          >
            {rolesList &&
              rolesList.map(rl => {
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
  onRoleChange: PropTypes.func,
  id: PropTypes.any
};
WelcomeModal.defaultProps = {
  roles: '',
  onRoleChange: () => {},
  id: ''
};
export default WelcomeModal;
