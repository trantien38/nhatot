import { Box, Dialog, Slider } from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '~/components/Button/Button';
import ListMap from './ListMap';
function valuetext(value) {
  return `${value}°C`;
}

function DialogListMap({ open, Transition, handleClose, listMotel }) {
  const [value, setValue] = React.useState([0, 3000000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Dialog
      open={open}
      //   TransitionComponent={Transition}
      //   keepMounted
      onClose={handleClose}
      //   aria-describedby="alert-dialog-slide-description"
      sx={{
        '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
          maxWidth: '900px',
          margin: 0,
        },
      }}
    >
      <Box
        sx={{
          padding: '0 17px',
          backgroundColor: '#fff!important',
          boxShadow: 'inset 0 -1px 0 #e8e8e8',
          display: 'flex',
        }}
      >
        {/* <KeyboardArrowLeft /> */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            cursor: 'pointer',
          }}
          onClick={handleClose}
        >
          <img
            width={22}
            height={22}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/OOjs_UI_icon_close.svg/480px-OOjs_UI_icon_close.svg.png"
          />
        </Box>
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
          <p>Tìm quanh đây</p>
        </Box>
      </Box>
      <ListMap listMotel={listMotel} />
    </Dialog>
  );
}

export default DialogListMap;
