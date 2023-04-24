import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';

function Sidebar() {
  return (
    <Box className={styles.sidebar}>
      <Box sx={{ margin: ' 0 80px', cursor: 'pointer', height: '60px' }}>
        <img width={'100%'} src="https://static.chotot.com/storage/default_images/pty/nhatot-logo.png" />
      </Box>
      <Box className={styles.sidebar_scrollbar}>
        <nav>
          <ul>
            <li>
              <Link to="/admin">Thống kê</Link>
            </li>
            <li>
              <Link to="/admin/user/list">Quản lý tài khoản</Link>
              {/* <ul className="ul-1">
                <li>
                  <Link to="/admin/user/list">User list</Link>
                </li>
                <li>
                  <Link to="/admin/user/add">User add</Link>
                </li>
                <li>
                  <Link to="/admin/user/edit">User edit</Link>
                </li>
              </ul> */}
            </li>
            <li>
              <Link to="/admin/question/list">Quản lý questions</Link>
              {/* <ul className="ul-2">
                <li>
                  <Link to="/admin/question/list">Question list</Link>
                </li>
                <li>
                  <Link to="/admin/question/add">Question add</Link>
                </li>
                <li>
                  <Link to="/admin/question/edit">Question edit</Link>
                </li>
              </ul> */}
            </li>
            <li>
              <Link to="/admin/banner/list">Quản lý banners</Link>
              {/* <ul className="ul-3">
                <li>
                  <Link to="/admin/banner/list">Banner list</Link>
                </li>
                <li>
                  <Link to="/admin/banner/add">Banner add</Link>
                </li>
                <li>
                  <Link to="/admin/banner/edit">Banner edit</Link>
                </li>
              </ul> */}
            </li>
          </ul>
        </nav>
      </Box>
    </Box>
  );
}

export default Sidebar;
