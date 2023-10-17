import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { DialogTitle, Stack, IconButton, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const DeleteDialog = ({ open, onClose, onConfirm }) => {
  const handleDelete = () => {
    // Call the onDelete function to perform the deletion
    onConfirm();
    onClose(); // Close the dialog after deletion
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <div style={{ width: 474 }}>
          <Stack className='popupHeader'>
            <DialogTitle>Delete Customer </DialogTitle>
            <IconButton disableRipple type="button" onClick={onClose} sx={{ p: '0px', color: '#000' }}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </IconButton>
          </Stack>
          <DialogContent>
            <p className='dialog-msg'>Are You Sure, You Want To Delete this customer?</p>
            <Grid container component="main" sx={{ mt: 7, justifyContent: 'space-between' }}>
              <Grid item xs={false} sm={5} md={5} >
                <Button className='buttonOutline medium uppercase' variant="contained" fullWidth sx={{ mb: '25px' }} onClick={onClose}>
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={12} sm={5} md={5} >
                <Button className='buttonPrimary medium uppercase' variant="contained" fullWidth sx={{ mb: '25px' }} onClick={handleDelete}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

export default DeleteDialog;
