import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '~/components/Button/Button';
import InputField from '~/components/HookForm/InputField';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import * as yup from 'yup';
import adminApi from '~/api/AdminApi';
import { toastMessage } from '~/utils/toast';

export const AddUser = () => {
  const navigate = useNavigate();
  const [permission, setPermission] = useState('');
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Vui lòng nhập họ và tên')
      .test('Họ và tên nên có ít nhất 2 tư', 'Vui lòng nhập ít nhất hai từ', (value) => {
        return value.split(' ').length >= 2;
      }),
    phoneNumber: yup
      .string()
      .required('Vui lòng nhập số điện thoại')
      .matches(phoneRegExp, 'Số điện thoại không hợp lệ')
      .min(10, 'Số điện thoại phải đủ 10 số')
      .max(10, 'Số điện thoại vượt quá 10 số'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu tối thiểu 6 ký tự'),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });
  const handleChangePermission = (e) => {
    setPermission(e.target.value);
  };
  const handleOnSubmit = async (values) => {
    console.log(values.fullName);
    console.log(values.phoneNumber);
    console.log(values.password);
    console.log(permission);
    const adminAddUser = await adminApi.adminAddUser({
      fullName: values.fullName,
      phoneNumber: values.phoneNumber,
      password: values.password,
      permission,
    });
    toastMessage.success(adminAddUser.msg);
    if (adminAddUser.msg == 'Thêm người dùng thành công') {
      setTimeout(() => {
        navigate('/admin/user/list');
      }, 1500);
    }
  };

  return (
    <Grid
      component="form"
      onSubmit={handleSubmit(handleOnSubmit)}
      sx={{
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
        '& input': {
          fontSize: '14px',
        },
        '& label': {
          fontSize: '14px',
        },
        '& p': {
          fontSize: '14px',
        },
      }}
      container
      spacing={1}
    >
      <Toaster />
      <Grid item md={12} sm={12} xs={12}>
        <InputField
          sx={{
            fontSize: 2,
            color: 'red',
            '& label': {
              fontSize: 14,
            },
            '& svg': {
              fontSize: 18,
            },
          }}
          label="Họ và tên"
          name="fullName"
          type="text"
          errors={errors}
          required
          control={control}
        />
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <InputField
          sx={{
            fontSize: 2,
            color: 'red',
            '& label': {
              fontSize: 14,
            },
            '& svg': {
              fontSize: 18,
            },
          }}
          label="Số điện thoại"
          name="phoneNumber"
          type="text"
          errors={errors}
          required
          control={control}
        />
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <InputField
          sx={{
            fontSize: 2,
            color: 'red',
            '& label': {
              fontSize: 14,
            },
            '& svg': {
              fontSize: 18,
            },
          }}
          label="Mật khẩu"
          name="password"
          type="password"
          errors={errors}
          required
          control={control}
        />
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Quyền</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={permission}
            label="Quyền hạn"
            onChange={handleChangePermission}
          >
            <MenuItem value={2}>Chủ trọ</MenuItem>
            <MenuItem value={3}>Người dùng</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item sx={{ width: '100px', '& button': { borderRadius: '10px' } }}>
        <Button type="submit" orange text={'Thêm'} />
      </Grid>
      <Grid item sx={{ width: '100px', '& button': { borderRadius: '10px' } }}>
        <Link to="/admin/user/list">
          <Button danger text={'Hủy bỏ'} />
        </Link>
      </Grid>
    </Grid>
  );
};
