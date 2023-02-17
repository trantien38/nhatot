import { KeyboardArrowRight, StyleSharp } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import React from 'react';
import MenuItem from './MenuItem';
import styles from './Home.module.scss';
export default function Menu({ title, count }) {
  return (
    <Box sx={{ backgroundColor: '#fff', marginTop:'12px' }}>
      <h2 className={styles.menuTitle}>{title}</h2>
      <Grid sx={{}} container>
        <MenuItem
          img={
            'https://cdn.chotot.com/4tCjIdk-vVl5n3HE1UVk3ETELqKIM7u_L6tdQw2EylU/preset:listing/plain/b2bde8c5002d5d1ca7c4575577cd9b69-2812758271214020532.jpg'
          }
          title={'bán nhà 3 tầng kiệt ông ích khiêm kiệt 3m5'}
          acreage={'75m²'}
          count={'2'}
          price={'2 tỷ'}
        />
        <MenuItem
          img={
            'https://cdn.chotot.com/4tCjIdk-vVl5n3HE1UVk3ETELqKIM7u_L6tdQw2EylU/preset:listing/plain/b2bde8c5002d5d1ca7c4575577cd9b69-2812758271214020532.jpg'
          }
          title={'bán nhà 3 tầng kiệt ông ích khiêm kiệt 3m5'}
          acreage={'75m²'}
          count={'2'}
          price={'2 tỷ'}
        />
        <MenuItem
          img={
            'https://cdn.chotot.com/4tCjIdk-vVl5n3HE1UVk3ETELqKIM7u_L6tdQw2EylU/preset:listing/plain/b2bde8c5002d5d1ca7c4575577cd9b69-2812758271214020532.jpg'
          }
          title={'bán nhà 3 tầng kiệt ông ích khiêm kiệt 3m5'}
          acreage={'75m²'}
          count={'2'}
          price={'2 tỷ'}
        />
        <MenuItem
          img={
            'https://cdn.chotot.com/4tCjIdk-vVl5n3HE1UVk3ETELqKIM7u_L6tdQw2EylU/preset:listing/plain/b2bde8c5002d5d1ca7c4575577cd9b69-2812758271214020532.jpg'
          }
          title={'bán nhà 3 tầng kiệt ông ích khiêm kiệt 3m5'}
          acreage={'75m²'}
          count={'2'}
          price={'2 tỷ'}
        />
        <MenuItem
          img={
            'https://cdn.chotot.com/4tCjIdk-vVl5n3HE1UVk3ETELqKIM7u_L6tdQw2EylU/preset:listing/plain/b2bde8c5002d5d1ca7c4575577cd9b69-2812758271214020532.jpg'
          }
          title={'bán nhà 3 tầng kiệt ông ích khiêm kiệt 3m5'}
          acreage={'75m²'}
          count={'2'}
          price={'2 tỷ'}
        />
      </Grid>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <button className={styles.btn} type="button">
          <h5 className={styles.h5}>{`Xem thêm ${count} tin khác`}</h5>
          <KeyboardArrowRight />
        </button>
      </Box>
    </Box>
  );
}
