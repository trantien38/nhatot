import { Box, Grid, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import userApi from '~/api/UserApi';
import Button from '~/components/Button/Button';
import InputField from '~/components/HookForm/InputField';
import StorageKeys from '~/constants/storage-keys';
import theme from '~/theme';
import { toastMessage } from '~/utils/toast';
import styles from '../Profile.module.scss';
import Sidebar from './Sidebar';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export const EditAccount = () => {
  const navigate = useNavigate();
  const IdUser = JSON.parse(localStorage.getItem(StorageKeys.USER))?.IdUser;

  const schema = yup.object().shape({
    password: yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu tối thiểu 6 ký tự'),
    newPassword: yup.string().required('Vui lòng nhập mật khẩu mới').min(6, 'Mật khẩu tối thiểu 6 ký tự'),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Mật khẩu nhập lại chưa khớp'),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = async (values) => {
    const { password, newPassword, confirmPassword } = values;
    console.log({ password, newPassword, confirmPassword, IdUser });

    const result = await userApi.changePassword({ IdUser, oldPassword: password, newPassword });
    console.log(result);

    if (result.msg == 'Thay đổi mật khẩu thành công') {
      toastMessage.success(result.msg);
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    } else {
      toastMessage.error(result.msg);
    }
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
              fontSize: '16px',
              color: 'red',
            },
          }}
          item
          md={8}
          container
          spacing={1}
        >
          <Grid item md={12} sm={12} xs={12}>
            <h3>Thay đổi mật khẩu</h3>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <InputField label="Mật khẩu hiện tại" name="password" type="password" errors={errors} required control={control} />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <InputField label="Mật khẩu mới" name="newPassword" type="password" errors={errors} required control={control} />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <InputField
              label="Xác nhận mật khẩu mới"
              name="confirmPassword"
              type="password"
              errors={errors}
              required
              control={control}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12} onClick={handleSubmit}>
            <Button type="submit" orange text={'Đổi mật khẩu'} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
