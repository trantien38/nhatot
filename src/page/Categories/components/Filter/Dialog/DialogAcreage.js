import { Box, Dialog, Slider } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '~/components/Button/Button';
import { BACK_ICON } from '~/constants';
function valuetext(value) {
  return `${value}°C`;
}
function DialogAcreage({ open, Transition, handleClose, handleDeleteFilter, onChangeFilters, filters }) {
  const { acreage } = filters;
  const [acreageSlide, setAcreageSlide] = useState(acreage);

  const handleChangeFilters = () => {
    onChangeFilters({
      ...filters,
      acreage: acreageSlide,
    });
    handleClose();
  };

  const handleChange = (e) => {
    setAcreageSlide(e.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
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
          <p>Chọn diện tích</p>
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
        >{`Diện tích từ ${acreageSlide[0]} m2 đến ${acreageSlide[1]} m2`}</Box>
        <Box sx={{ width: 480 }}>
          <Slider
            min={0}
            max={100}
            step={5}
            getAriaLabel={() => 'Temperature range'}
            value={acreageSlide}
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
      >
        <Button orange text="Áp dụng" onClickButton={() => handleChangeFilters()} />
      </Box>
    </Dialog>
  );
}

export default DialogAcreage;
