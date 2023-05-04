import { CloseOutlined } from '@mui/icons-material';
import { Box } from '@mui/material';
import React from 'react';

function HeaderDialog({ title, handleClose }) {
  return (
    <Box
      sx={{
        backgroundColor: '#f26622 !important',
        display: 'flex',
        '& > p ': {
          color: '#000',
          fontSize: '16px',
          fontWeight: 600,
          textAlign: 'center',
          width: '100%',
          padding: '14px',
          margin: '0 auto',
        },
        '& > span': {
          position: 'absolute',
          width: '20px',
          height: '20px',
          right: '15px',
          top: '15px',
          backgroundSize: 'cover',
          cursor: 'pointer',
        },
        '& > span > svg': {
          fontSize: '20px',
        },
      }}
    >
      <p>{title}</p>
      <span onClick={handleClose}>
        <CloseOutlined />
      </span>
    </Box>
  );
}

export default HeaderDialog;
