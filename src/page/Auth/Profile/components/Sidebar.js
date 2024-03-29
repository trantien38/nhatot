import { Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../Profile.module.scss';

function Sidebar() {
  return (
    <Grid item md={3.5}>
      <ul className={styles.sidebar}>
        <li>
          <Link to="/settings/profile">Chỉnh sửa trang cá nhân</Link>
        </li>
        {/* <li>
          <Link to="/settings/social">Liên kết mạng xã hội</Link>
        </li> */}
        <li>
          <Link to="/settings/account">Thay đổi mật khẩu</Link>
        </li>
      </ul>
    </Grid>
  );
}

export default Sidebar;
