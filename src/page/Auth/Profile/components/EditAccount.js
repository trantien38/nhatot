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

export const EditAccount = () => {
  const navigate = useNavigate();
  const IdUser = JSON.parse(localStorage.getItem(StorageKeys.USER))?.IdUser;
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleChangePassword = (e) => {
    setOldPassword(e.target.value);
  };
  const handleChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = async () => {
    if (newPassword == confirmPassword) {
      const result = await userApi.changePassword({ IdUser, oldPassword, newPassword });
      console.log(result);
      toastMessage.success(result.msg);
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
    }
  };
  return (
    <Box sx={{ maxWidth: theme.size.browser, margin: 'auto', '& h2': { paddingLeft: '12px' } }}>
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
          spacing={2}
        >
          <Grid item md={12} sm={12} xs={12}>
            <h3>Thay đổi mật khẩu</h3>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            {/* <InputField
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
              label="Mật khẩu hiện tại"
              name="password"
              type="password"
              // errors={errors}
              required
              // control={control}
            /> */}
            <TextField
              item
              id="outlined-basic"
              type="password"
              required
              label="Mật khẩu hiện tại"
              variant="outlined"
              fullWidth
              value={oldPassword}
              onChange={handleChangePassword}
              // helperText={oldPassword.split('').length < 6 ? 'Mật khẩu tối thiểu 6 ký tự' : ''}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              item
              id="outlined-basic"
              type="password"
              required
              label="Mật khẩu mới"
              variant="outlined"
              fullWidth
              value={newPassword}
              onChange={handleChangeNewPassword}
              // helperText={newPassword.split('').length < 6 ? 'Mật khẩu tối thiểu 6 ký tự' : ''}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              item
              id="outlined-basic"
              type="password"
              required
              label="Xác nhận mật khẩu mới"
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              helperText={newPassword == confirmPassword ? '' : 'Mật khẩu không khớp'}
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
