import { Box } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Profile.module.scss';
import ProfileItem from './components/ProfileItem';
import StorageKeys from '~/constants/storage-keys';
import userApi from '~/api/UserApi';
import { AVATAR_DEFAULT, STATIC_HOST } from '~/constants';
import { toastMessage } from '~/utils/toast';
import { Toaster } from 'react-hot-toast';
import theme from '~/theme';

export const Profile = () => {
  const [authenticated, setauthenticated] = useState({});
  const [avatar, setAvatar] = useState('');
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem(StorageKeys?.USER));
    // if (loggedInUser) {
    setAvatar(loggedInUser.Avatar);
    setauthenticated(loggedInUser);
    // }
  }, []);
  const formatBirthDay = (value) => {
    if (value) {
      const arr = value?.split('-');
      let year = arr[0];
      let month = arr[1];
      let day = arr[2];
      return day + '-' + month + '-' + year;
    }
  };

  const handleChangeAvatar = async (e) => {
    const formData = new FormData();
    formData.append('avatar', e.target.files[0], e.target.files[0].name);
    formData.append('IdUser', authenticated.IdUser);
    //{ srcImg: e.target.files[0].name, IdUser: authenticated.IdUser }

    const { file } = await userApi.changeAvatar(formData);
    setAvatar(file);
    localStorage.removeItem(StorageKeys.USER);
    localStorage.setItem(StorageKeys.USER, JSON.stringify({ ...authenticated, Avatar: file }));
    toastMessage.success('Thay đổi avatar thành công');
  };

  if (!authenticated) {
    return <Navigate replace to="/login" />;
  } else {
    return (
      <Box
        sx={{
          maxWidth: theme.size.browser,
          margin: 'auto',
          background: '#fff',
        }}
      >
        <Toaster />
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
              src={avatar ? `${STATIC_HOST}/avatars/${avatar}` : AVATAR_DEFAULT}
            />
            <label htmlFor="avatar">
              <Box className={styles.changeAvatar}>
                <i></i>
                <input type="file" name="avatar" id="avatar" onChange={handleChangeAvatar} />
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
              {/* <ProfileItem title="CMND/CCCD/Hộ chiếu" content="Chưa có thông tin" edit={true} />
              <ProfileItem title="Ngày cấp" content="Chưa có thông tin" edit={true} />
              <ProfileItem title="Nơi cấp" content="Chưa có thông tin" edit={true} /> */}
              <ProfileItem title="Giới tính" content={`${authenticated?.Gender}` || 'Chưa có thông tin'} edit={true} />
              <ProfileItem
                title="Ngày sinh"
                content={formatBirthDay(authenticated?.BirthDay) || 'Chưa có thông tin'}
                edit={true}
              />
              {/* <ProfileItem title="Mã số thuế" content="Chưa có thông tin" edit={true} />
              <ProfileItem title="Danh mục yêu thích" content={authenticated.favorites || 'Chưa có thông tin'} edit={true} /> */}
              <ProfileItem title="Mật khẩu" content={authenticated.password || '********'} edit={true} />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
};
