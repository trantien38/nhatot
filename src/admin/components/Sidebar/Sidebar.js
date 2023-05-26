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
import { LOGO_APP } from '~/constants';
import styles from './Sidebar.module.scss';

function Sidebar() {
  return (
    <Box className={styles.sidebar}>
      <Box sx={{ margin: '0 80px', cursor: 'pointer', height: '60px', fontSize: '14px' }}>
        <img width={'100%'} src={LOGO_APP} />
      </Box>
      <Box className={styles.sidebar_scrollbar}>
        <nav>
          <ul>
            <li>
              <Link to="/admin/dashboard">
                <Home />
                <span>Thống kê</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/user/list">
                <PersonPinCircleOutlined />
                <span>Quản lý người dùng</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/question/list">
                <HelpOutline />
                <span>Quản lý questions</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/banner/list">
                <ViewCarousel />
                <span>Quản lý banners</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/question/list">
                <FeedOutlined />
                <span>Phê duyệt tin đăng</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/question/list">
                <VerifiedUserOutlined />
                <span>Phê duyệt tài khoản chủ trọ</span>
              </Link>
            </li>
          </ul>
        </nav>
      </Box>
    </Box>
  );
}

export default Sidebar;
