import { Box, Dialog } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function DialogEditUser({ open, Transition, handleClose }) {
  return (
    <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
      <Box
        sx={{
          padding: '0 12px',
          backgroundColor: '#fff!important',
          boxShadow: 'inset 0 -1px 0 #e8e8e8',
          display: 'flex',
        }}
      >
        <Link to="">
          <img onClick={handleClose} src="https://static.chotot.com/storage/chotot-icons/svg/back.svg" />
        </Link>
        <Box
          sx={{
            padding: '0 24px',
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            '& p': {
              color: '#222',
              fontWeight: '700',
              fontSize: '14px',
              lineHeight: '18px',
            },
          }}
        >
          <p>Chọn khu vực</p>
        </Box>
      </Box>
    </Dialog>
  );
}

export default DialogEditUser;
