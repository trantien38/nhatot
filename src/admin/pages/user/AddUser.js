import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Slide, TextField } from '@mui/material';
import React, { useState } from 'react';
import Button from '~/components/Button/Button';
import DialogDetailAddress from '~/page/Auth/Profile/components/DialogDetailAddress';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const AddUser = () => {
  const [openAddress, setOpenAddress] = useState(false);
  const [gender, setGender] = useState('');

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const handleClickOpenAddress = () => {
    setOpenAddress(true);
  };
  const handleCloseAddress = () => {
    setOpenAddress(false);
  };
  return (
    <Box sx={{ margin: '0 30px 0 46px' }}>
      <Grid
        sx={{
          // marginRight: '10px',
          boxShadow: '0 .15rem 1.75rem 0 rgba(58,59,69,.15)',
          border: '1px solid #e3e6f0',
          borderRadius: '0.35rem',

          backgroundColor: '#fff',
          marginTop: '0px',
          marginBottom: '12px',
          padding: '0 16px 16px 0 ',
          '& h3': {
            margin: 0,
          },
        }}
        container
        spacing={2}
      >
        <Grid item md={12} sm={12} xs={12}>
          <TextField item label="Full name" id="outlined-basic" variant="outlined" fullWidth />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <TextField item label="Phone number" id="outlined-basic" variant="outlined" fullWidth />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <TextField item label="Password" type="password" id="outlined-basic" variant="outlined" fullWidth />
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <TextField item label="Email" id="outlined-basic" variant="outlined" fullWidth />
        </Grid>
        <Grid item md={12} sm={12} xs={12} onClick={handleClickOpenAddress}>
          <TextField
            item
            label="Address"
            id="outlined-basic"
            // onChange={handleChangeAddress}
            // value={address}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <DialogDetailAddress
          // Address={Address}
          // WardName={WardName}
          // DistrictName={DistrictName}
          // ProvinceName={ProvinceName}
          open={openAddress}
          Transition={Transition}
          handleClose={handleCloseAddress}
        />
        <Grid item md={12} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={gender} label="Gender" onChange={handleChangeGender}>
              <MenuItem value={'Nam'}>Nam</MenuItem>
              <MenuItem value={'Nữ'}>Nữ</MenuItem>
              <MenuItem value={'Khác'}>Khác</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={1} sm={1} xs={1}>
          <Button orange text={'Save'} />
        </Grid>
      </Grid>
    </Box>
  );
};
