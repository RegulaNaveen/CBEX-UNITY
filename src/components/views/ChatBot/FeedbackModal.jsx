import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import Loader from 'apollo-react/components/Loader';
import CustomModal from '../../common/CustomModal';
import TextField from 'apollo-react/components/TextField';
import Typography from 'apollo-react/components/Typography';
import { submitFeedback } from '../../../redux/actions/chatbot-actions';

export function FeedbackSubmitModal({ open, onClose }) {
  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title="BidAssist Feedback"
      subtitle="Feedback sent succeesfully!"
      buttonProps={[
        { className: 'display-none' },
        {
          label: 'OK',
          'data-testid': 'ok-button',
          onClick: () => onClose()
        }
      ]}
      className="feedback-submit-modal"
    >
      <Typography>
        We recieve your comments and will use that information to further
        improve our model.
      </Typography>
    </CustomModal>
  );
}

function FeedbackModal({ open, onClose, answer, setShowSubmitModal }) {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(true);

  function handleFeedbackSubmit() {
    try {
      const payload = {
        id: 'f202f76f-9f58-420d-8d76-e23d12af8e2d',
        feedback: value
      };
      dispatch(submitFeedback(payload)).then(res => {
        if (res.status === 200) {
          setTimeout(() => {
            setShowSubmitModal(false);
          }, 4000);
          setLoader(false);
          setShowSubmitModal(true);
          onClose();
        } else {
          setLoader(false);
          setError(true);
        }
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  }

  const handleTextChange = useCallback(value => {
    setValue(value);
    if (value.length > 0) {
      setSubmitDisable(false);
    } else {
      setSubmitDisable(true);
    }
  }, []);

  return (
    <>
      <CustomModal
        open={open}
        onClose={onClose}
        title="BidAssist Feedback"
        buttonProps={[
          {
            label: 'Cancel',
            variant: 'secondary',
            'data-testid': 'cancel-button',
            onClick: () => onClose()
          },
          {
            label: 'Submit',
            'data-testid': 'submit-button',
            onClick: () => {
              handleFeedbackSubmit();
              setLoader(true);
            },
            disabled: submitDisable
          }
        ]}
        className="feedback-modal"
      >
        {loader && <Loader isInner />}
        <TextField
          fullWidth
          value={value}
          sizeAdjustable
          label="What went wrong?"
          placeholder="Please give all the details you can"
          onChange={e => handleTextChange(e.target.value)}
          minHeight={125}
        />
        <Typography>The answer you mark is the following:</Typography>
        <div className="feedback-answer">{answer}</div>
      </CustomModal>
      {/* Error Modal */}
      {error && (
        <CustomModal
          open={error}
          title="Something went wrong!"
          message="Unable to process your query. Please rephrase and try again."
          variant="error"
          onClose={() => setError(false)}
          buttonProps={[{ className: 'hidden' }, { label: 'Close' }]}
        />
      )}
    </>
  );
}

FeedbackModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  answer: PropTypes.string.isRequired
};

FeedbackModal.defaultProps = {
  answer: '',
  open: false,
  onClose: () => {}
};

export default FeedbackModal;
