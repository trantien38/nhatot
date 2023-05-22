import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Grid, Tab } from '@mui/material';
import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import userApi from '~/api/UserApi';
import Button from '~/components/Button/Button';
import { AVATAR_DEFAULT, STATIC_HOST } from '~/constants';
import StorageKeys from '~/constants/storage-keys';
import { toastMessage } from '~/utils/toast';
import ItemMotel from './ItemMotel';

function UserProfile({ socket }) {
  const [user, setUser] = useState({});
  const [motel, setMotel] = useState([]);
  const [follow, setFollow] = useState();
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const infoUser = JSON?.parse(localStorage?.getItem(StorageKeys?.USER));
  const { IdUser } = useParams();
  const fetchUser = async () => {
    const users = await userApi.getUser({ IdUser, IdFollowers: infoUser?.IdUser });
    setUser(users.user[0]);
    setMotel(users.motel);
    setFollow(users.follow);
    setFollowers(users.followers);
    setFollowing(users.following);
    console.log(users);
  };
  useEffect(() => {
    fetchUser();
  }, [IdUser]);

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFollow = async (e) => {
    console.log({ IdFollowing: IdUser, IdFollowers: infoUser?.IdUser });
    const follow = await userApi.follow({ IdFollowing: IdUser, IdFollowers: infoUser?.IdUser });
    if (e.target.innerText == 'Theo dõi') {
      socket.on('connect', () => {
        console.log('Connected to server!');
      });

      socket.emit('new_follow', { msg: `${infoUser.Name} vừa theo dõi bạn`, IdFollowing: IdUser });

      setFollow('Đang theo dõi');
      setFollowers(followers + 1);
      toastMessage.success(follow.msg);
    }
    if (e.target.innerText == 'Đang theo dõi') {
      socket.emit('un_follow', { msg: `${infoUser.Name} hủy theo dõi bạn`, IdFollowing: IdUser });
      setFollow('Theo dõi');
      setFollowers(followers - 1);
      toastMessage.success(follow.msg);
    }
  };

  return (
    <Grid container sx={{ justifyContent: 'space-between', margin: '10px 0' }}>
      <Toaster />
      <Grid item md={4} xs={12} sm={5} sx={{ backgroundColor: '#fff', padding: '12px', borderRadius: '8px' }}>
        <Box
          sx={{
            '& img': {
              width: '92px',
              height: '92px',
              borderRadius: '50%',
            },
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img src={user?.Avatar ? `${STATIC_HOST}avatars/${user?.Avatar}` : AVATAR_DEFAULT} />
        </Box>
        <Box
          sx={{
            '& span': {
              borderRightWidth: '1px',
              margin: '0 12px',
              border: '0 solid silver',
            },
            '& h2': {
              textAlign: 'center',
            },
            '& p': {
              textAlign: 'center',
            },
          }}
        >
          <h2>{user.Name}</h2>
          <p>
            Người theo dõi:&nbsp;
            <b>{followers}</b>
            <span></span>
            Đang theo dõi:&nbsp;
            <b>{following}</b>
          </p>
          <Box onClick={handleFollow}>
            <Button orange text={follow} />
          </Box>
        </Box>
        <Box
          sx={{
            '& svg': {
              width: '24px',
              height: '24px',
              marginRight: '4px',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', margin: '12px 0' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M3.644 4.392a.15.15 0 01.106-.044h12a.15.15 0 01.15.15v8.25a.15.15 0 01-.15.15H6.712a.6.6 0 00-.377.134L3.6 15.242V4.498a.15.15 0 01.044-.106zM6.9 14.118l-3.523 2.847a.6.6 0 01-.977-.467v-12a1.35 1.35 0 011.35-1.35h12a1.35 1.35 0 011.35 1.35v3.15h3.15a1.35 1.35 0 011.35 1.35v12a.6.6 0 01-.977.467l-3.548-2.867H8.25a1.35 1.35 0 01-1.35-1.35v-3.13zm10.2-5.27h3.15a.15.15 0 01.15.15v10.744l-2.735-2.21a.6.6 0 00-.378-.134H8.25a.15.15 0 01-.15-.15v-3.15h7.65a1.35 1.35 0 001.35-1.35v-3.9zM6.8 7.23c0-.276.192-.5.428-.5h5.143c.237 0 .429.224.429.5 0 .277-.192.5-.429.5H7.228c-.236 0-.428-.223-.428-.5zm.428 2.5c-.236 0-.428.224-.428.5 0 .277.192.5.428.5h5.143c.237 0 .429-.223.429-.5 0-.276-.192-.5-.429-.5H7.228z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span>phản hồi chat: 82% (Trong 6 giờ)</span>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', margin: '12px 0' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25" aria-hidden="true" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M4.5 5.377a1.55 1.55 0 00-1.55 1.55v13.5c0 .856.694 1.55 1.55 1.55h15a1.55 1.55 0 001.55-1.55v-13.5a1.55 1.55 0 00-1.55-1.55h-15zm-2.95 1.55a2.95 2.95 0 012.95-2.95h15a2.95 2.95 0 012.95 2.95v13.5a2.95 2.95 0 01-2.95 2.95h-15a2.95 2.95 0 01-2.95-2.95v-13.5z"
                clip-rule="evenodd"
              ></path>
              <path d="M13.875 12.926a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM17.625 12.926a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM13.875 16.676a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM17.625 16.676a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM6.375 16.676a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM10.125 16.676a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM6.375 20.426a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM10.125 20.426a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25zM13.875 20.426a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"></path>
              <path
                fill-rule="evenodd"
                d="M6 2.477a.7.7 0 01.7.7v1.5a.7.7 0 11-1.4 0v-1.5a.7.7 0 01.7-.7zm12 0a.7.7 0 01.7.7v1.5a.7.7 0 11-1.4 0v-1.5a.7.7 0 01.7-.7zM2.25 7.727h19.5v1.4H2.25v-1.4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Đã tham gia: 2 năm 8 tháng
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', margin: '12px 0' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25" aria-hidden="true" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M16.704 9.271a.8.8 0 01-.027 1.131l-5.503 5.25a.8.8 0 01-1.105 0l-2.747-2.625a.8.8 0 111.106-1.157l2.194 2.097 4.951-4.722a.8.8 0 011.131.026z"
                clip-rule="evenodd"
              ></path>
              <path
                fill-rule="evenodd"
                d="M12 3.873a8.2 8.2 0 100 16.4 8.2 8.2 0 000-16.4zm-9.8 8.2c0-5.412 4.388-9.8 9.8-9.8 5.413 0 9.8 4.388 9.8 9.8 0 5.413-4.387 9.8-9.8 9.8-5.412 0-9.8-4.387-9.8-9.8z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Đã xác thực
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', margin: '12px 0' }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
              <g fill-rule="evenodd" clip-path="url(#clip0_8440_50966)" clip-rule="evenodd">
                <path d="M12 7.45a2.3 2.3 0 100 4.6 2.3 2.3 0 000-4.6zm-3.7 2.3a3.7 3.7 0 117.4 0 3.7 3.7 0 01-7.4 0z"></path>
                <path d="M12 2.95a6.8 6.8 0 00-6.8 6.8c0 3.124 1.743 5.963 3.578 8.073A23.683 23.683 0 0012 20.877a23.672 23.672 0 003.222-3.054c1.835-2.11 3.578-4.95 3.578-8.072a6.8 6.8 0 00-6.8-6.8zm0 18.8l-.402.574-.002-.002-.006-.003-.019-.014a19.876 19.876 0 01-.319-.237 25.097 25.097 0 01-3.53-3.327C5.807 16.54 3.8 13.378 3.8 9.751a8.2 8.2 0 0116.4 0c0 3.627-2.007 6.788-3.922 8.99a25.095 25.095 0 01-3.53 3.327 14.959 14.959 0 01-.32.237l-.019.014-.005.003-.002.002L12 21.75zm0 0l.401.574a.7.7 0 01-.803 0L12 21.75z"></path>
              </g>
              <defs>
                <clipPath id="clip0_8440_50966">
                  <path d="M0 0h24v24H0z"></path>
                </clipPath>
              </defs>
            </svg>
            Địa chỉ: {user.Address}
          </Box>
        </Box>
      </Grid>
      <Grid item md={7.9} xs={11.9} sm={6.9} sx={{ backgroundColor: '#fff', borderRadius: '8px' }}>
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
                <Tab sx={{ width: '50%' }} label="Đang cho thuê" value="1" />
                <Tab sx={{ width: '50%' }} label="Đã cho thuê" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <Grid container>
                {motel.map((result) => {
                  return result.Active == 1 && <ItemMotel result={result} />;
                })}
              </Grid>
            </TabPanel>
            <TabPanel value="2">
              <Grid container>
                {motel.map((result) => {
                  return result.Active == 0 && <ItemMotel result={result} />;
                })}
              </Grid>
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
    </Grid>
  );
}

export default UserProfile;
