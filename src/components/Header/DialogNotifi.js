import { CloseOutlined } from '@mui/icons-material';
import { TabContext, TabPanel } from '@mui/lab';
import { Box } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import notifiApi from '~/api/NotifiApi';
import images from '~/assets/images';
import { STATIC_HOST } from '~/constants';
import { toastMessage } from '~/utils/toast';

function DialogNotifi({ handleCloseNotifi, infoUser, socket }) {
  const [notifis, setNotifis] = useState([]);
  const navigate = useNavigate();
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    socket?.on('follow', (data) => {
      if (data.IdFollowing === infoUser?.IdUser) {
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
      if (data.IdFollowing === infoUser?.IdUser) {
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
    if (infoUser?.IdUser) {
      fetchNotifi();
    }
  }, []);
  const handleDeleteNotifi = async (notifi) => {
    const deleteNotifi = await notifiApi.deleteNotifi({ IdNotifi: notifi.IdNotifi, IdUser: infoUser?.IdUser });
    console.log(deleteNotifi);
    setNotifis(deleteNotifi.notifi);
  };
  const handleNavigate = (notifi) => {
    handleCloseNotifi();
    const url = notifi?.IdMotel ? `/detail/${notifi?.IdMotel}` : `/user/${notifi?.IdSender}`;
    console.log(url);
    navigate(url);
  };
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Toaster />

      <TabContext value={value}>
        {/* <Box
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
                      <Tab sx={{ width: '100%' }} label="Tin mới" value="1" />
                      <Tab sx={{ width: '50%' }} label="Hoạt động" value="2" />
                    </TabList>
                  </Box> */}
        <TabPanel
          value="1"
          sx={{
            padding: 0,
            overflow: 'auto',
            maxHeight: '200px',
          }}
        >
          {notifis?.length > 0 ? (
            notifis.map((notifi, index) => (
              <Box
                key={index}
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
                onClick={() => handleNavigate(notifi)}
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
                    zIndex: 9,
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
        {/* <TabPanel value="2">Hiện tại chưa có thông báo nào</TabPanel> */}
      </TabContext>
    </Box>
  );
}

export default DialogNotifi;
