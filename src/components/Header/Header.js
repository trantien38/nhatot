import { ArrowDropDown, Home } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import Face4Icon from '@mui/icons-material/Face4';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import { Box } from '@mui/system';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Menu, MenuItem, Tab } from '@mui/material';
import StorageKeys from '~/constants/storage-keys';
import Search from '../Search/Search';
import styles from './Header.module.scss';
import Item from './Item';
import userApi from '~/api/UserApi';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNotifi, setAnchorElNotifi] = useState(null);
  const open = Boolean(anchorEl);
  const openNotifi = Boolean(anchorElNotifi);
  const activeStatus = JSON.parse(localStorage.getItem(StorageKeys?.USER))?.activeStatus == 1;
  if (localStorage.getItem(StorageKeys.USER) != 'undefined') {
    var user = JSON.parse(localStorage?.getItem(StorageKeys?.USER));
  }
  // const [name, setName] = useState(user?.Name);
  // console.log(user?.Name);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickNotifi = (event) => {
    setAnchorElNotifi(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseNotifi = () => {
    setAnchorElNotifi(null);
  };

  const logout = () => {
    const phoneNumber = JSON.parse(localStorage.getItem(StorageKeys.USER))?.PhoneNumber;
    if (phoneNumber) {
      userApi.logout({ phoneNumber });
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);
    }
  };

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 9 }}>
      <Grid container spacing={2} className={styles.header}>
        <Grid sx={{ height: '100%', padding: '8px 0' }}>
          <Link to="/" style={{ margin: 0, padding: 0 }}>
            <img
              src="https://static.chotot.com/storage/default_images/pty/nhatot-logo.png"
              style={{ height: '100%', cursor: 'pointer' }}
            />
          </Link>
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            right: 0,
            height: '100%',
            padding: '0',
            marginRight: '0px',
          }}
        >
          <Link to="/">
            <Item icon={<Home className={styles.item_icon} />} text={'Trang chủ'} />
          </Link>
          <Link to="/news">
            <Item icon={<Face4Icon className={styles.item_icon} />} text={'Quản lý tin'} />
          </Link>
          <Link to={activeStatus ? `/message-${user?.IdUser}` : '/login'}>
            <Item icon={<MarkUnreadChatAltIcon className={styles.item_icon} />} text={'Chat'} />
          </Link>
          <Link
            id="basic-button"
            aria-controls={openNotifi ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openNotifi ? 'true' : undefined}
            onClick={handleClickNotifi}
          >
            <Item icon={<AddAlertIcon className={styles.item_icon} />} text={'Thông báo'} />
          </Link>
          <Menu
            id="basic-menu"
            anchorEl={anchorElNotifi}
            open={openNotifi}
            onClose={handleCloseNotifi}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            sx={{
              '& li': { padding: 0 },
              '& a': { margin: 0, padding: '6px 68px 6px 12px', width: '100%' },
            }}
          >
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: '#C0C0C0',
                    '& .Mui-selected': { color: '#222222 !important' },
                    '& .css-1aquho2-MuiTabs-indicator': {
                      backgroundColor: '#FF8800',
                    },
                  }}
                >
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab sx={{ width: '50%' }} label="Hoạt động" value="1" />
                    <Tab sx={{ width: '50%' }} label="Tin mới" value="2" />
                  </TabList>
                </Box>
                <TabPanel value="1">Chúng tôi không có cập nhật nào. Vui lòng kiểm tra lại sau</TabPanel>
                <TabPanel value="2">Chúng tôi không có cập nhật nào. Vui lòng kiểm tra lại sau</TabPanel>
              </TabContext>
            </Box>
          </Menu>

          <Link
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className={styles.account}
          >
            <Item icon={<AccountCircleIcon className={styles.item_icon} />} text={user ? user?.Name : 'Tài khoản'} />
            <span>
              <ArrowDropDown />
            </span>
          </Link>
          <Menu
            id="basic-menu"
            // onBlur={setAnchorEl(null)}
            onClick={handleClose}
            anchorEl={anchorEl}
            open={open}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            sx={{
              '& li': { padding: 0 },
              '& a': { margin: 0, padding: '6px 68px 6px 12px', width: '100%' },
            }}
          >
            {user ? (
              ''
            ) : (
              <>
                <MenuItem>
                  <Link to="/login">Đăng nhập</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/register">Đăng ký</Link>
                </MenuItem>
              </>
            )}
            <MenuItem>
              <Link to={activeStatus ? '/profile' : '/login'}>Trang cá nhân</Link>
            </MenuItem>
            <MenuItem>
              <Link to="/">Cài đặt</Link>
            </MenuItem>
            <MenuItem onClick={logout}>
              <Link to="/">Đăng xuất</Link>
            </MenuItem>
          </Menu>
        </Grid>
      </Grid>
      <Search />
    </Box>
  );
}
