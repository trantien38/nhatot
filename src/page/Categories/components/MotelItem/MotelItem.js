import { Grid } from '@mui/material';
import { useState } from 'react';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { AVATAR_DEFAULT, RED_HEART, SAVEAD_ICON } from '~/constants';
import StorageKeys from '~/constants/storage-keys';
import styles from './MotelItem.module.scss';
import { toastMessage } from '~/utils/toast';
import { Toaster } from 'react-hot-toast';
import userApi from '~/api/UserApi';

function MotelItem(props) {
  const { time, avatar, name, title, acreage, price, img, address, IdMotel, isLove } = props;
  const infoUser = JSON.parse(localStorage.getItem(StorageKeys.USER));
  const [icon, setIcon] = useState(isLove ? RED_HEART : SAVEAD_ICON);
  const handleChangeIcon = async (e) => {
    console.log(123);
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
    <Box className={styles.motelItem}>
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
                },
                '& >p': {
                  color: '#c90927',
                  fontWeight: 700,
                  fontSize: '14px',
                  paddingBottom: '4px',
                },
                '&>span': {
                  fontSize: '14px',
                  padding: '4px 0',
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
                  '& span': { fontSize: '14px' },
                  '& img': { marginRight: '6px', display: 'flex', alignItems: 'center' },
                }}
              >
                <span>
                  <img
                    style={{ width: '16px', height: '16px', borderRadius: '50%' }}
                    src={avatar || AVATAR_DEFAULT}
                    alt="avatar"
                  />
                </span>
                <span>{name || 'Môi giới'}</span>&nbsp; - &nbsp;
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
