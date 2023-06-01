import { KeyboardArrowRight, StyleSharp } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import MenuItem from './MenuItem';
import styles from './Home.module.scss';
import { STATIC_HOST } from '~/constants';

export default function Menu({ data, title }) {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        marginTop: '12px',
      }}
    >
      <h2 className={styles.menuTitle}>{title}</h2>
      <Grid sx={{}} container>
        {data?.map((motel) => (
          <MenuItem
            key={motel.IdMotel}
            img={`${STATIC_HOST}motels/${motel.srcMedia}`}
            model={motel}
            time={
              motel.month
                ? `Đăng ${motel.month} tháng trước`
                : motel.week
                ? `Đăng ${motel.week} tuần trước`
                : motel.day
                ? `Đăng ${motel.day} ngày trước`
                : motel.hour
                ? `Đăng ${motel.hour} giờ trước`
                : motel.minute
                ? `Đăng ${motel.minute} phút trước`
                : `Đăng ${motel.second} giây trước`
            }
          />
        ))}
      </Grid>
      {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button className={styles.btn} type="button">
          <h5 className={styles.h5}>{`Xem thêm ${count} tin khác`}</h5>
          <KeyboardArrowRight />
        </button>
      </Box> */}
    </Box>
  );
}
