import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import userApi from '~/api/UserApi';

import { AVATAR_DEFAULT, RED_HEART, SAVEAD_ICON } from '~/constants';
import StorageKeys from '~/constants/storage-keys';
import { toastMessage } from '~/utils/toast';

function MotelItem(props) {
  const { time, avatar, name, title, acreage, price, img, address, IdMotel, isLove } = props;
  const infoUser = JSON.parse(localStorage.getItem(StorageKeys.USER));
  const [icon, setIcon] = useState(isLove ? RED_HEART : SAVEAD_ICON);
  const handleChangeIcon = async (e) => {
    if (e.target.src == SAVEAD_ICON) {
      console.log({ IdMotel, IdUser: infoUser.IdUser });
      const addFavourite = await userApi.addFavourite({ IdMotel, IdUser: infoUser.IdUser });
      console.log(addFavourite);
      toastMessage.success(addFavourite.msg);
      setIcon(RED_HEART);
      // setIcon('https://cdn.icon-icons.com/icons2/1661/PNG/512/12138redheart_110427.png');
    } else {
      const deleteFavourite = await userApi.deleteFavourite({ IdMotel, IdUser: infoUser.IdUser });
      toastMessage.success(deleteFavourite.msg);
      setIcon(SAVEAD_ICON);
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderTop: '1px solid #f4f4f4',
        '&:hover': {
          zIndex: 1,
          boxShadow: '0 1px 8px 0 rgb(0 0 0 / 30%)',
        },
        position: 'relative',
        padding: '8px 12px',
      }}
    >
      <Toaster />
      <Link to={`/detail/${IdMotel}`}>
        <Grid container>
          <Grid item>
            <img style={{ width: '110px', height: '110px' }} src={img || AVATAR_DEFAULT} />
          </Grid>
          <Grid item>
            <Box
              sx={{
                flex: '1 1',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '55px',
                height: '100%',
                paddingLeft: '12px',
                '& > h3,p': {
                  margin: 0,
                  color: '#222222',
                  fontWeight: 'normal',
                },
                '& >p': {
                  color: '#c90927',
                  fontWeight: 700,
                  fontSize: '14px',
                  paddingBottom: '4px',
                },
                '&>span': {
                  fontSize: '14px',
                  padding: '6px 0',
                },
                '& span': {
                  color: '#9B9B9B',
                },
              }}
            >
              <h3>{title || 'Cho thuê phòng trọ đầy đủ nội thất'}</h3>
              <span>{acreage}m2</span>
              <p>{price} triệu/tháng</p>
              <Box sx={{ flex: '1 1' }} />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  '& span': { fontSize: '14px', display: 'flex', alignItems: 'center' },
                }}
              >
                <span>
                  <img
                    style={{ width: '16px', height: '16px', borderRadius: '50%', marginRight: '4px' }}
                    src={avatar || AVATAR_DEFAULT}
                  />
                </span>
                <span>{name || 'Môi giới'}</span>&nbsp; - &nbsp;
                <span>
                  {time.month
                    ? `Đăng ${time.month} tháng trước`
                    : time.week
                    ? `Đăng ${time.week} tuần trước`
                    : time.day
                    ? `Đăng ${time.day} ngày trước`
                    : time.hour
                    ? `Đăng ${time.hour} giờ trước`
                    : time.minute
                    ? `Đăng ${time.minute} phút trước`
                    : `Đăng ${time.second} giây trước`}
                </span>
                &nbsp; - &nbsp;<span> {address}</span>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Link>
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          padding: '12px',
          '&:hover': {
            cursor: 'pointer',
          },
        }}
      >
        <img width={22} onClick={handleChangeIcon} src={icon} />
      </Box>
    </Box>
  );
}

export default MotelItem;
