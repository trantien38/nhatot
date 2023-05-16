import { ArrowDropDown, Home } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import Face4Icon from '@mui/icons-material/Face4';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import { Box } from '@mui/system';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Menu, MenuItem, Tab } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { CloseOutlined } from '@mui/icons-material';

import images from '~/assets/images';
import userApi from '~/api/UserApi';
import StorageKeys from '~/constants/storage-keys';
import { toastMessage } from '~/utils/toast';
import Search from '../Search/Search';
import styles from './Header.module.scss';
import Item from './Item';
import theme from '~/theme';
import notifiApi from '~/api/NotifiApi';
import { LOGO_APP, STATIC_HOST } from '~/constants';

export default function Header({ socket }) {
  const [name, setName] = useState('');
  const [notifis, setNotifis] = useState([]);
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

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    socket?.on('follow', (data) => {
      if (data.IdFollowing == infoUser?.IdUser) {
        console.log(data, infoUser?.IdUser);
        toastMessage.success(data.msg);
        // setTimeout(() => {
        //   setNotifis([...notifis, data]);
        //   console.log([...notifis, data]);
        // }, 1000);
        fetchNotifi();
      }
    });
    socket?.on('unfollow', (data) => {
      console.log(data, infoUser?.IdUser);
      if (data.IdFollowing == infoUser?.IdUser) {
        // const newNotifis = notifis.filter((notifi) => {
        //   console.log(notifi.nameFollow);
        //   console.log(data.nameFollow);
        //   console.log(notifi.nameFollow != data.nameFollow);
        //   return notifi.nameFollow != data.nameFollow;
        // });
        // console.log(newNotifis);
        // setNotifis(newNotifis);
        fetchNotifi();
      }
    });

    socket?.on('post_motel', (data) => {
      console.log(data);
      data.followers.map((item) => {
        if (infoUser?.IdUser == item.IdFollowers) {
          toastMessage.success(data.notifi);

          fetchNotifi();
        }
      });
    });
  }, []);

  const fetchNotifi = async () => {
    const listNotifi = await notifiApi.getAllNotifiByIdUser(infoUser?.IdUser);
    console.log(listNotifi);
    setNotifis(listNotifi.notifi);
  };
  useEffect(() => {
    fetchNotifi();
  }, []);

  const handleDeleteNotifi = async (notifi) => {
    const deleteNotifi = await notifiApi.deleteNotifi({ IdNotifi: notifi.IdNotifi, IdUser: infoUser?.IdUser });
    console.log(deleteNotifi);
    setNotifis(deleteNotifi.notifi);
  };
  return (
    <Box sx={{ backgroundColor: theme.color.backgroundHeader, position: 'sticky', top: 0, zIndex: 9 }}>
      <Toaster />
      <Grid container spacing={2} className={styles.header}>
        <Grid item md={1.6} sm={12} xs={12} sx={{ height: '100%', padding: '6px 0' }}>
          <Link
            to="/"
            style={{ margin: 0, padding: 0, alignItems: 'center', height: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <img
              src={LOGO_APP}
              style={{ height: '100%', cursor: 'pointer' }}
            />
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
            {/* <Link to="/">
              <Item icon={<Home className={styles.item_icon} />} text={'Trang chủ'} />
            </Link> */}
            <Link to="/cho-thue-phong-tro">
              <Item icon={<Home className={styles.item_icon} />} text={'Nhà trọ'} />
              {/* <Item icon={<Face4Icon className={styles.item_icon} />} text={'Nhà trọ'} /> */}
            </Link>
            <Link to={infoUser?.activeStatus == 1 ? `/message-${user?.IdUser}` : '/login'}>
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
                      <Tab sx={{ width: '50%' }} label="Tin mới" value="1" />
                      <Tab sx={{ width: '50%' }} label="Hoạt động" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel
                    value="1"
                    sx={{
                      padding: 0,
                      overflow: 'auto',
                      maxHeight: '200px',
                    }}
                  >
                    {notifis?.length > 0 ? (
                      notifis.map((notifi) => (
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '6px 12px',
                            '&:hover': {
                              backgroundColor: '#f4f4f4',
                              cursor: 'pointer',
                            },
                            '&:hover > span': {
                              visibility: 'visible !important',
                            },
                            '& p': {
                              margin: 0,
                            },
                          }}
                        >
                          <img
                            style={{ borderRadius: '50%', width: '38px', height: '38px' }}
                            src={notifi?.Avatar ? `${STATIC_HOST}avatars/${notifi.Avatar}` : images.avatar}
                          />
                          <Box sx={{ marginLeft: '8px', width: '100%' }}>
                            <b>{notifi.Content}</b>
                            <br />
                            <span>
                              {notifi?.month
                                ? `${notifi?.month} tháng trước`
                                : notifi?.week
                                ? `${notifi?.week} tuần trước`
                                : notifi?.day
                                ? `${notifi?.day} ngày trước`
                                : notifi?.hour
                                ? `${notifi?.hour} giờ trước`
                                : notifi?.minute
                                ? `${notifi?.minute} phút trước`
                                : `vài giây trước`}
                            </span>
                          </Box>
                          <span
                            style={{
                              visibility: 'hidden',
                            }}
                            onClick={() => handleDeleteNotifi(notifi)}
                          >
                            <CloseOutlined
                              sx={{
                                marginLeft: '8px',
                                padding: '10px',
                                '&:hover': {
                                  backgroundColor: '#e1ece1',
                                  borderRadius: '50%',
                                },
                              }}
                            />
                          </span>
                        </Box>
                      ))
                    ) : (
                      <Box
                        sx={{
                          padding: '24px',
                        }}
                      >
                        Hiện tại chưa có thông báo nào
                      </Box>
                    )}
                  </TabPanel>
                  <TabPanel value="2">Hiện tại chưa có thông báo nào</TabPanel>
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
