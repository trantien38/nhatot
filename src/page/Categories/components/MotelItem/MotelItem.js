import { Grid } from '@mui/material';
import { useState } from 'react';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { AVATAR_DEFAULT, RED_HEART, SAVEAD_ICON, STATIC_HOST } from '~/constants';
import StorageKeys from '~/constants/storage-keys';
import styles from './MotelItem.module.scss';
import { toastMessage } from '~/utils/toast';
import { Toaster } from 'react-hot-toast';

function MotelItem(props) {
  const {
    time,
    isLove,
    address,
    onChangeFavourite,
    model: { Name, Title, Acreage, Price, srcMedia, Avatar, IdMotel },
  } = props;

  console.log(isLove);
  const infoUser = JSON.parse(localStorage.getItem(StorageKeys.USER));
  const handleChangeIcon = async (e) => {
    if (!infoUser?.IdUser) {
      toastMessage.error('Hãy đăng nhập để lưu tin');
    } else {
      onChangeFavourite({ src: e.target.src, IdMotel });
    }
  };
  return (
    <Box className={styles.motelItem}>
      <Toaster />
      <Link to={`/detail/${IdMotel}`}>
        <Grid container>
          <Grid item>
            <img
              style={{ width: '110px', height: '110px' }}
              src={!srcMedia ? AVATAR_DEFAULT : `${STATIC_HOST}motels/${srcMedia}`}
            />
          </Grid>
          <Grid item>
            <Box className={styles.item}>
              <h3>{Title || 'Cho thuê phòng trọ'}</h3>
              <span>{Acreage}m2</span>
              <p>{Price} triệu/tháng</p>
              <Box sx={{ flex: '1 1' }} />
              <Box
                sx={{
                  display: 'flex',
                  '& span': { fontSize: '14px' },
                  '& img': { marginRight: '6px', display: 'flex', alignItems: 'center' },
                }}
              >
                <span>
                  <img
                    style={{ width: '16px', height: '16px', borderRadius: '50%' }}
                    src={!Avatar ? AVATAR_DEFAULT : `${STATIC_HOST}avatars/${Avatar}`}
                    alt="avatar"
                  />
                </span>
                <span>{Name || 'Môi giới'}</span>&nbsp; - &nbsp;
                <span>
                  {time.month
                    ? ` ${time.month} tháng trước`
                    : time.week
                    ? ` ${time.week} tuần trước`
                    : time.day
                    ? ` ${time.day} ngày trước`
                    : time.hour
                    ? ` ${time.hour} giờ trước`
                    : time.minute
                    ? `${time.minute} phút trước`
                    : `${time.second} giây trước`}
                </span>
                &nbsp;-&nbsp;
                <span> {address}</span>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Link>
      <Box className={styles.heart}>
        <img width={22} onClick={handleChangeIcon} src={isLove} />
      </Box>
    </Box>
  );
}

export default MotelItem;
