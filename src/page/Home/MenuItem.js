import { Grid, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RED_HEART, TIMER_ICON } from '~/constants';
import DetailItem from '../Detail/components/DetailItem';
import styles from './Home.module.scss';
export default function MenuItem(props) {
  const {
    img,
    time,
    model: { Title, Price, Acreage, IdMotel, count },
  } = props;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const hoverItem = {
    padding: '8px',
    '&:hover': {
      cursor: 'pointer',
      opacity: '0.6',
    },
  };
  const handleNavigate = (IdMotel) => {
    navigate(`/detail/${IdMotel}`);
  };
  return (
    <Grid className={styles.menuItem} item md={2.4} sm={3} xs={6} sx={hoverItem} onClick={() => handleNavigate(IdMotel)}>
      {!loading ? (
        <>
          <img src={img} width="100%" alt="motel" height={200} />
          <p className={styles.menuItemTitle}>{Title}</p>
          <span className={styles.menuItemSpan}>
            {`${Acreage}m2 - `}
            <b className={styles.menuItemPrice}>{Price} triệu/tháng</b>
          </span>
          <br />
          <br />
          <DetailItem icon={TIMER_ICON} title={time} />
          {count && (
            <span className={styles.menuItemHeart}>
              {count} <img alt="heart" width={18} src={RED_HEART} />
            </span>
          )}
        </>
      ) : (
        <>
          <Skeleton variant="rectangular" width={176} height={132} />
          <Skeleton />
          <Skeleton width="40%" />
          <Skeleton width="20%" />
        </>
      )}
    </Grid>
  );
}
