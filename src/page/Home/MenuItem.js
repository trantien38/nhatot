import { Grid, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import styles from './Home.module.scss';
export default function MenuItem({ img, title, acreage, count, price }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const hoverItem = {
    '&:hover': {
      cursor: 'pointer',
      opacity: '0.6',
    },
  };
  return (
    <Grid
      className={styles.menuItem}
      item
      md={2.4}
      sm={3}
      xs={6}
      sx={{ hoverItem, padding: '8px' }}
    >
      {!loading ? (
        <>
          <img src={img} width="100%" />
          <p className={styles.menuItemTitle}>{title}</p>
          <span
            className={styles.menuItemSpan}
          >{`${acreage} - ${count} PN`}</span>
          <br />
          <b className={styles.menuItemPrice}>{price}</b>
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
