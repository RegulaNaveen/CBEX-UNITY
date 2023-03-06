import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSnackbarKey,
  selectSnackbarMessage,
  selectSnackbarOpen,
  selectSnackbarOptions
} from '../../../redux/selectors/ui';
import MuiAlert from '@material-ui/lab/Alert';
import './styles.scss';
import { UI } from '../../../constants/types';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ReduxSnackbar() {
  const open = useSelector(selectSnackbarOpen);
  const message = useSelector(selectSnackbarMessage);
  const key = useSelector(selectSnackbarKey);
  const restProps = useSelector(selectSnackbarOptions);
  const dispatch = useDispatch();

  function handleClose() {
    dispatch({ type: UI.HIDE_SNACKBAR });
  }

  return (
    <Snackbar
      className="redux-snackbar-container"
      open={open}
      autoHideDuration={restProps?.autoHideDuration || 3000}
      anchorOrigin={
        restProps?.anchorOrigin || { vertical: 'top', horizontal: 'right' }
      }
      onClose={handleClose}
      key={key}
    >
      <Alert severity="success" onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}
