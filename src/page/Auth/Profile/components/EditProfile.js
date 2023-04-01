import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Slide, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '~/components/Button/Button';
import StorageKeys from '~/constants/storage-keys';

import styles from '../Profile.module.scss';
import DialogDetailAddress from './DialogDetailAddress';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function EditProfile() {
  const infoUser = JSON.parse(localStorage.getItem(StorageKeys.USER));
  console.log(infoUser);
  const {
    Name,
    Gender,
    Email,
    PhoneNumber,
    BirthDay,
    Address,
    WardPrefix,
    WardName,
    DistrictPrefix,
    DistrictName,
    ProvinceName,
  } = infoUser;
  const [gender, setGender] = useState(Gender);
  const [name, setName] = useState(Name);
  const [email, setEmail] = useState(Email);
  const [phoneNumber, setPhoneNumber] = useState(PhoneNumber);
  const detailedAddress = `${Address}, ${WardPrefix} ${WardName}, ${DistrictPrefix} ${DistrictName}, ${ProvinceName}`;
  const [address, setAddress] = useState(detailedAddress);
  const [birthDay, setBirthDay] = useState(BirthDay);
  const [idWardAddress, setIdWardAddress] = useState({});
  const [openAddress, setOpenAddress] = useState(false);

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  };
  const handleChangeBirthDat = (event) => {
    const birthDay = event.target.value;
    console.log(birthDay);
    setBirthDay(birthDay);
  };

  const handleClickOpenAddress = () => {
    setOpenAddress(true);
  };
  const handleCloseAddress = () => {
    setOpenAddress(false);
  };
  const formatBirthDay = (value) => {
    const arr = value.split('-');
    let year = arr[0];
    let month = arr[1];
    let day = arr[2];
    return day + '-' + month + '-' + year;
  };
  return (
    <Box sx={{ maxWidth: '960px', margin: 'auto' }}>
      <h2>Chỉnh sửa trang cá nhân</h2>
      <Grid container>
        <Grid item md={4}>
          <ul className={styles.sidebar}>
            <li>
              <Link to="/settings/profile">Thông tin cá nhân</Link>
            </li>
            <li>
              <Link to="/settings/social">Liên kết mạng xã hội</Link>
            </li>
            <li>
              <Link to="/settings/account">Cài đặt tài khoản</Link>
            </li>
          </ul>
        </Grid>
        <Grid
          sx={{
            backgroundColor: '#fff',
            marginTop: '0px',
            marginBottom: '12px',
            paddingRight: '16px',
            paddingBottom: '16px',
            '& h3': {
              margin: 0,
            },
          }}
          item
          md={8}
          container
          spacing={2}
        >
          <Grid item md={12} sm={12} xs={12}>
            <h3>Hồ sơ cá nhân</h3>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              item
              label="Họ và tên"
              id="outlined-basic"
              onChange={handleChangeName}
              value={name}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              item
              label="Email"
              id="outlined-basic"
              onChange={handleChangeEmail}
              value={email}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              item
              label="Số điện thoại"
              id="outlined-basic"
              onChange={handleChangePhoneNumber}
              value={phoneNumber}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12} onClick={handleClickOpenAddress}>
            <TextField
              item
              label="Địa chỉ"
              id="outlined-basic"
              onChange={handleChangeAddress}
              value={address}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <DialogDetailAddress
            Address={Address}
            WardName={WardName}
            DistrictName={DistrictName}
            ProvinceName={ProvinceName}
            open={openAddress}
            Transition={Transition}
            handleClose={handleCloseAddress}
          />
          <Grid item md={12} sm={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Giới tính</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Gender"
                onChange={handleChangeGender}
              >
                <MenuItem value={'Nam'}>Nam</MenuItem>
                <MenuItem value={'Nữ'}>Nữ</MenuItem>
                <MenuItem value={'Khác'}>Khác</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            item
            md={12}
            sm={12}
            xs={12}
            sx={{
              '& input': {
                width: 'calc(100% - 24px)',
                height: '52px',
                padding: '0 12px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                fontSize: '16px',
              },
              '& input:hover': {
                border: '1px solid #000',
                cursor: 'pointer',
              },
            }}
          >
            <input type="date" name="" id="customday" value={birthDay} onChange={handleChangeBirthDat} />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Button orange text={'Lưu thay đổi'} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditProfile;
