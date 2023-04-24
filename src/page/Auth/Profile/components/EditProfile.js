import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Slide, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import userApi from '~/api/UserApi';
import Button from '~/components/Button/Button';
import StorageKeys from '~/constants/storage-keys';
import { toastMessage } from '~/utils/toast';

import styles from '../Profile.module.scss';
import DialogDetailAddress from './DialogDetailAddress';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const EditProfile = () => {
  const infoUser = JSON.parse(localStorage.getItem(StorageKeys.USER));
  const {
    Name,
    Gender,
    Email,
    PhoneNumber,
    BirthDay,
    Address,
    WardPrefix,
    WardName,
    IdUser,
    DistrictPrefix,
    DistrictName,
    ProvinceName,
  } = infoUser;
  const navigate = useNavigate();
  const [ward, setWard] = useState(WardName);
  const [province, setProvince] = useState(ProvinceName);
  const [name, setName] = useState(Name);
  const [email, setEmail] = useState(Email);
  const [phoneNumber, setPhoneNumber] = useState(PhoneNumber);
  const detailedAddress = `${Address}, ${WardPrefix} ${WardName}, ${DistrictPrefix} ${DistrictName}, ${ProvinceName}`;
  const [road, setRoad] = useState(Address);
  const [address, setAddress] = useState(detailedAddress);
  const [gender, setGender] = useState(Gender);
  const [birthDay, setBirthDay] = useState(BirthDay);
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
    setBirthDay(birthDay);
  };

  const handleClickOpenAddress = () => {
    setOpenAddress(true);
  };
  const handleCloseAddress = () => {
    setOpenAddress(false);
  };

  const callbackParent = (value) => {
    console.log(value);
    setRoad(value.detailAddress);
    setWard(value.ward);
    setProvince(value.province);
    setAddress(`${value.detailAddress}, ${value.ward}, ${value.district}, ${value.province}`);
  };
  const handleSubmit = async () => {
    const result = await userApi.changeInfoUser({ IdUser, name, email, phoneNumber, road, gender, birthDay, ward, province });
    console.log(result.users);
    localStorage.removeItem(StorageKeys.USER);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(result.users));
    toastMessage.success('Cập nhật thông tin cá nhân thành công');
    // alert(123)

    setTimeout(() => {
      navigate('/profile');
    }, 2000);
  };

  return (
    <Box sx={{ maxWidth: '960px', margin: 'auto' }}>
      <Toaster />
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
              <Link to="/settings/account">Thay đổi mật khẩu</Link>
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
            callbackParent={callbackParent}
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
          <Grid item md={12} sm={12} xs={12} onClick={handleSubmit}>
            <Button orange text={'Lưu thay đổi'} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
