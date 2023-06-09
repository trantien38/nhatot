import {
  FeedOutlined,
  HelpOutline,
  Home,
  PersonPinCircleOutlined,
  VerifiedUserOutlined,
  ViewCarousel,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import styles from './Sidebar.module.scss';

function Sidebar() {
  return (
    <Box className={styles.sidebar}>
      <Link to="/">
        <Box sx={{ textAlign: 'center', cursor: 'pointer', height: '60px', fontSize: '14px' }}>
          <img height={'100%'} src={images.logo_app} />
        </Box>
      </Link>
      <Box className={styles.sidebar_scrollbar}>
        <nav>
          <ul>
            <li>
              <Link to="/admin/dashboard">
                <Home
                  sx={{
                    // color: 'blue',
                    color: '#16bfc6',
                  }}
                />
                <span>Thống kê</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/user/list">
                <PersonPinCircleOutlined
                  sx={{
                    // color: 'blue',
                    color: '#16bfc6',
                  }}
                />
                <span>Quản lý người dùng</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/question/list">
                <HelpOutline
                  sx={{
                    // color: 'blue',
                    color: '#16bfc6',
                  }}
                />
                <span>Quản lý questions</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/banner/list">
                <ViewCarousel
                  sx={{
                    // color: 'blue',
                    color: '#16bfc6',
                  }}
                />
                <span>Quản lý banners</span>
              </Link>
            </li>
            {/* <li>
              <Link to="/admin/question/list">
                <FeedOutlined
                  sx={{
                    // color: 'blue',
                    color: '#16bfc6'
                  }}
                />
                <span>Phê duyệt tin đăng</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/question/list">
                <VerifiedUserOutlined
                  sx={{
                    // color: 'blue',
                    color: '#16bfc6'
                  }}
                />
                <span>Phê duyệt tài khoản chủ trọ</span>
              </Link>
            </li> */}
          </ul>
        </nav>
      </Box>
    </Box>
  );
}

export default Sidebar;
