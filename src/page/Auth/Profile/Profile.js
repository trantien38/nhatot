import { Box } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Profile.module.scss';
import ProfileItem from './components/ProfileItem';
import StorageKeys from '~/constants/storage-keys';
import userApi from '~/api/UserApi';

export const Profile = () => {
  const [authenticated, setauthenticated] = useState({});
  const [avatar, setAvatar] = useState('');
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem(StorageKeys.USER));
    // if (loggedInUser) {
    console.log(loggedInUser);
    setAvatar(loggedInUser.Avatar);
    setauthenticated(loggedInUser);
    // }
  }, []);

  const handleChangeAvatar = (e) => {
    console.log(e.target.files[0].name);
    console.log(123);
    setAvatar(e.target.files[0].name);
    userApi.changeAvatar({ srcImg: e.target.files[0].name, IdUser: authenticated.IdUser });
    localStorage.removeItem(StorageKeys.USER);
    localStorage.setItem(StorageKeys.USER, JSON.stringify({ ...authenticated, Avatar: e.target.files[0].name }));
  };

  if (!authenticated) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <Box
        sx={{
          maxWidth: '960px',
          margin: 'auto',
          background: '#fff',
        }}
      >
        <Box
          sx={{
            padding: '0 10px',
            '& ol': {
              padding: '8px 0',
              margin: 0,
            },
            '& ol>li': {
              display: 'inline-block',
              color: '#33659c',
            },
            '& ol>li+li:before': {
              content: '"\\BB"',
              fontSize: '18px',
              position: 'relative',
              bottom: '1px',
              color: '#33659c',
            },
            '& ol a': {
              margin: 0,
              padding: 0,
            },
          }}
        >
          <ol>
            <li>
              <Link to="/">nhatot.vn</Link>
              &nbsp;
            </li>
            <li>&nbsp;Thông tin cá nhân</li>
          </ol>
          <h3>Thông tin cá nhân</h3>
        </Box>
        <hr />
        <Box>
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
              }}
              src={
                avatar
                  ? `assets/images/avatars/${avatar}`
                  : 'https://static.chotot.com/storage/CT_WEB_UNI_PRIVATE_DASHBOARD/a37e405294c593b0493765d71c6b78df682f66b3/dist/32ea486819346b666d9e012fea3f5be0.png'
              }
            />
            <label htmlFor="avatar">
              <Box className={styles.changeAvatar}>
                <i></i>
                <input type="file" id="avatar" onChange={handleChangeAvatar} />
              </Box>
            </label>
          </Box>
          <Box sx={{ padding: '12px 28px' }}>
            <Box>
              <ProfileItem title="Họ và tên" content={`${authenticated?.Name}` || 'Tên chưa cung cấp'} edit={true} />
              <ProfileItem title="Số điện thoại" content={`${authenticated?.PhoneNumber}` || 'Tên chưa cung cấp'} edit={true} />
              <ProfileItem title="Facebook" content="Chưa kết nối Facebook" connect="Kết nối" />
              <ProfileItem title="Google" content="Chưa kết nối Google" connect="Kết nối" />
              <ProfileItem title="Apple" content="Chưa kết nối Apple" connect="Kết nối" />
              <ProfileItem title="Email" content={`${authenticated?.Email}` || 'Chưa có thông tin'} edit={true} />
              <ProfileItem title="Địa chỉ" content={`${authenticated?.Address}` || 'Chưa có thông tin'} edit={true} />
              <ProfileItem title="CMND/CCCD/Hộ chiếu" content="Chưa có thông tin" edit={true} />
              <ProfileItem title="Ngày cấp" content="Chưa có thông tin" edit={true} />
              <ProfileItem title="Nơi cấp" content="Chưa có thông tin" edit={true} />
              <ProfileItem title="Giới tính" content={`${authenticated?.Gender}` || 'Chưa có thông tin'} edit={true} />
              <ProfileItem title="Ngày sinh" content={authenticated?.BirthDay || 'Chưa có thông tin'} edit={true} />
              <ProfileItem title="Mã số thuế" content="Chưa có thông tin" edit={true} />
              <ProfileItem title="Danh mục yêu thích" content={authenticated.favorites || 'Chưa có thông tin'} edit={true} />
              <ProfileItem title="Mật khẩu" content={authenticated.password || '********'} edit={true} />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
};
