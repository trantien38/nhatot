import { Dialog } from '@mui/material';
import React from 'react';
import HeaderDialog from '~/components/HeaderDialog';
import ListMap from './ListMap';

function DialogListMap({ open, Transition, handleClose, listMotel }) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      //   aria-describedby="alert-dialog-slide-description"
      sx={{
        '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
          maxWidth: '900px',
          margin: 0,
        },
      }}
    >
      <HeaderDialog title="Tìm quanh đây" handleClose={handleClose} />
      <ListMap listMotel={listMotel} />
    </Dialog>
  );
}

export default DialogListMap;
