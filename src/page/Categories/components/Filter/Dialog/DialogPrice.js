import { Box, Dialog, Slider } from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '~/components/Button/Button';
import { BACK_ICON } from '~/constants';
function valuetext(value) {
  return `${value}°C`;
}
function DialogPrice({ open, Transition, handleClose, handleDeleteFilter }) {
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
          onClick={handleDeleteFilter}
        >
          <img width={22} height={22} src={BACK_ICON} />
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
          <p>Giá thuê</p>
        </Box>
      </Box>

      <Box
        sx={{
          padding: '0 17px',
          margin: '10px 0 30px 0',
        }}
      >
        <Box
          sx={{
            fontWeight: 400,
            color: '#222',
          }}
        >{`Giá từ ${value[0].toLocaleString('vi', {
          style: 'currency',
          currency: 'VND',
        })} đến ${value[1].toLocaleString('vi', {
          style: 'currency',
          currency: 'VND',
        })}`}</Box>
        <Box sx={{ width: 480 }}>
          <Slider
            min={0}
            max={20000000}
            step={500000}
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </Box>
      </Box>
      <Box
        sx={{
          width: '100%',
          '& a': {
            margin: 0,
            padding: 0,
          },
        }}
        onClick={handleClose}
      >
        <Link to={`?price=${value[0]}-${value[1]}`}>
          <Button orange text="Áp dụng" />
        </Link>
      </Box>
    </Dialog>
  );
}

export default DialogPrice;
