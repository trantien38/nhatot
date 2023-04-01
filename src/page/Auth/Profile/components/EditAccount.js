import { Box, Grid, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import Button from '~/components/Button/Button';
import styles from '../Profile.module.scss';

function EditAccount() {
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
            <h3>Thay đổi mật khẩu</h3>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField item id="outlined-basic" type="password" required label="Mật khẩu hiện tại" variant="outlined" fullWidth />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField item id="outlined-basic" type="password" required label="Mật khẩu mới" variant="outlined" fullWidth />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField item id="outlined-basic" type="password" required label="Xác nhận mật khẩu mới" variant="outlined" fullWidth />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Button type="submit" orange text={'Đổi mật khẩu'} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default EditAccount;
