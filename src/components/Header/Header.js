import { ArrowDropDown, Home } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import { Menu, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import userApi from '~/api/UserApi';
import images from '~/assets/images';
import StorageKeys from '~/constants/storage-keys';
import theme from '~/theme';
import DialogNotifi from './DialogNotifi';
import styles from './Header.module.scss';
import Item from './Item';

export default function Header({ socket }) {
  const [name, setName] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNotifi, setAnchorElNotifi] = useState(null);
  const open = Boolean(anchorEl);
  const openNotifi = Boolean(anchorElNotifi);
  const infoUser = JSON?.parse(localStorage?.getItem(StorageKeys?.USER));
  if (localStorage.getItem(StorageKeys.USER) != 'undefined') {
    var user = JSON.parse(localStorage?.getItem(StorageKeys?.USER));
    if (name != user?.Name) {
      setName(user?.Name);
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickNotifi = (event) => {
    console.log(event.currentTarget);
    setAnchorElNotifi(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseNotifi = () => {
    setAnchorElNotifi(null);
  };

  const logout = async () => {
    const phoneNumber = JSON.parse(localStorage.getItem(StorageKeys.USER))?.PhoneNumber;
    if (phoneNumber) {
      await userApi.logout({ phoneNumber });
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);
    }
    setName(null);
  };

  return (
    <Box sx={{ backgroundColor: theme.color.backgroundHeader, position: 'sticky', top: 0, zIndex: 9 }}>
      <Grid container spacing={2} className={styles.header}>
        <Grid item md={1.6} sm={12} xs={12} sx={{ height: '100%', padding: '6px 0' }}>
          <Link
            to="/"
            style={{ margin: 0, padding: 0, alignItems: 'center', height: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <img src={images.logo_app} style={{ height: '100%', cursor: 'pointer' }} />
          </Link>
        </Grid>
        <Grid item md={10.4} display={{ md: 'block', sm: 'none', xs: 'none' }} sx={{ padding: '0' }}>
          <Box
            sx={{
              right: 0,
              height: '100%',
              padding: '0',
              marginRight: '0px',
              display: 'flex',
              justifyContent: 'right',
            }}
          >
            <Link to="/cho-thue-phong-tro">
              <Item icon={<Home className={styles.item_icon} />} text={'Nhà trọ'} />
            </Link>
            <Link to={infoUser?.activeStatus === 1 ? `/message-${user?.IdUser}` : '/login'}>
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
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
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
              <DialogNotifi handleCloseNotifi={handleCloseNotifi} infoUser={infoUser} socket={socket} />
            </Menu>

            <Link
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              className={styles.account}
            >
              <Item icon={<AccountCircleIcon className={styles.item_icon} />} text={name ? name : 'Tài khoản'} />
              <span>
                <ArrowDropDown sx={{ height: '100%' }} />
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
              {user && (
                <div>
                  <MenuItem>
                    <Link to={infoUser?.activeStatus == 1 ? '/profile' : '/login'}>Trang cá nhân</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to={infoUser?.activeStatus == 1 ? '/favourite' : '/login'}>Tin yêu thích</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/settings/account">Thay đổi mật khẩu</Link>
                  </MenuItem>
                  {user.IdAuthority == 2 && (
                    <MenuItem>
                      <Link to="/manage-motel">Quản lý nhà trọ</Link>
                    </MenuItem>
                  )}
                  {user.IdAuthority == 1 && (
                    <MenuItem>
                      <Link to="/admin/dashboard">Trang admin</Link>
                    </MenuItem>
                  )}
                  <MenuItem onClick={logout}>
                    <Link to="/">Đăng xuất</Link>
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Box>
        </Grid>
      </Grid>
      {/* <Search /> */}
    </Box>
  );
}
