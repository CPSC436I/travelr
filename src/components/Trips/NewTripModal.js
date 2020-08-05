import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Modal,
  Backdrop,
  Fade,
  Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NewTripForm from './NewTripForm';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    borderRadius: 10
  },
  modalContainer: {
    margin: '0 16px'
  }
}));

export default function NewTripModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.modalContainer}>
      <Button
        variant="contained"
        endIcon={<AddIcon/>}
        onClick={handleOpen}
        >
        New Trip
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <NewTripForm handleClose={handleClose} addTrip={props.addTrip}/>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
