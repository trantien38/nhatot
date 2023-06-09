import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Slide, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import userApi from '~/api/UserApi';
import Button from '~/components/Button/Button';
import StorageKeys from '~/constants/storage-keys';
import theme from '~/theme';
import { toastMessage } from '~/utils/toast';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import styles from '../Profile.module.scss';
import DialogDetailAddress from '../../../../components/DialogDetailAddress';
import Sidebar from './Sidebar';
import InputField from '~/components/HookForm/InputField';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const EditProfile = () => {
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
  } = JSON.parse(localStorage.getItem(StorageKeys.USER));

  const navigate = useNavigate();
  const [ward, setWard] = useState(WardName);
  const [province, setProvince] = useState(ProvinceName);
  const detailedAddress = `${Address}, ${WardPrefix} ${WardName}, ${DistrictPrefix} ${DistrictName}, ${ProvinceName}`;
  const [road, setRoad] = useState(Address);
  const [address, setAddress] = useState(detailedAddress);
  const [gender, setGender] = useState(Gender);
  const [birthDay, setBirthDay] = useState(BirthDay);
  const [openAddress, setOpenAddress] = useState(false);
  useEffect(() => {
    reset({
      name: Name,
      email: Email,
      phoneNumber: PhoneNumber,
    });
  }, []);
  const handleChangeGender = (event) => {
    setGender(event.target.value);
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
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object().shape({
    name: yup.string().required('Vui lòng nhập họ và tên').min(6, 'Mật khẩu tối thiểu 6 ký tự'),
    email: yup.string().required('Vui lòng nhập email').min(6, 'Mật khẩu tối thiểu 6 ký tự'),
    phoneNumber: yup
      .string()
      .required('Vui lòng nhập số điện thoại')
      .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
      .min(10, 'Số điện thoại phải đủ 10 số')
      .max(10, 'Số điện thoại vượt quá 10 số'),
  });
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = async (values) => {
    const { name, phoneNumber, email } = values;
    const result = await userApi.changeInfoUser({ IdUser, name, email, phoneNumber, road, gender, birthDay, ward, province });
    console.log(result.users);
    localStorage.removeItem(StorageKeys.USER);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(result.users));
    toastMessage.success('Cập nhật thông tin cá nhân thành công');
    setTimeout(() => {
      navigate('/profile');
    }, 2000);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleOnSubmit)}
      sx={{ maxWidth: theme.size.browser, margin: 'auto', '& h2': { paddingLeft: '12px' } }}
    >
      <Toaster />
      <h2>Chỉnh sửa trang cá nhân</h2>
      <Grid container>
        <Sidebar />
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
            '& p': {
              fontSize: '14px',
            },
          }}
          item
          md={8.5}
          container
          spacing={1}
        >
          <Grid item md={12} sm={12} xs={12}>
            <h3>Chỉnh sửa trang cá nhân</h3>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <InputField label="Họ và tên" name="name" type="text" errors={errors} required control={control} />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <InputField label="Email" name="email" type="text" errors={errors} required control={control} />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <InputField label="Số điện thoại" name="phoneNumber" type="text" errors={errors} required control={control} />
          </Grid>
          <Grid item md={12} sm={12} xs={12} onClick={handleClickOpenAddress} sx={{ margin: '4px 0' }}>
            <TextField item label="Địa chỉ" id="outlined-basic" value={address} variant="outlined" fullWidth readonly={true} />
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
          <Grid item md={12} sm={12} xs={12} sx={{ margin: '4px 0' }}>
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
              margin: '4px 0',
              '& input': {
                width: 'calc(100% - 26px)',
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
            <Button type="submit" orange text={'Lưu thay đổi'} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
