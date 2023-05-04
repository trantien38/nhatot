import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import styles from './MotelItem.module.scss';

function MotelItem(props) {
  const { time, avatar, name, title, acreage, price, img, address, IdMotel } = props;
  return (
    <Box className={styles.motelItem}>
      <Box>
        <Link to={`/detail/${IdMotel}`}>
          <Grid container>
            <Grid item >
              <img
                style={{ width: '110px', height: '110px' }}
                src={img || 'https://static.chotot.com/storage/chat/member-profile-avatar_140x140.png'}
              />
            </Grid>
            <Grid item >
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
                <Box sx={{ '& span': { fontSize: '14px' } }}>
                  <span>
                    <img
                      style={{ width: '16px', height: '16px', borderRadius: '50%' }}
                      src={avatar || 'https://static.chotot.com/storage/chotot-icons/svg/user.svg'}
                    />
                  </span>
                  <span>{name || 'Môi giới'}</span> - &nbsp;
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
                  </span>{' '}
                  -<span> {address}</span>
                </Box>
              </Box>
            </Grid>
            <Box
              sx={{
                position: 'absolute',
                right: '12px',
                bottom: '2px',
              }}
            >
              <img src="https://static.chotot.com/storage/icons/saveAd/save-ad.svg" />
            </Box>
          </Grid>
        </Link>
      </Box>
    </Box>
  );
}

export default MotelItem;
