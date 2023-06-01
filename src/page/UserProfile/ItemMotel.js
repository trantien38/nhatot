import { Box, Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { STATIC_HOST, TIMER_ICON } from '~/constants';
import DetailItem from '../Detail/components/DetailItem';

function ItemMotel({ result }) {
  console.log(result);
  return (
    <Grid
      item
      md={4}
      sm={6}
      xs={12}
      sx={{
        padding: '12px',
        '&:hover': {
          cursor: 'pointer',
          transition: 'all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) 0s',
          transform: 'translate(0px, -3px) !important',
          boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0.125rem 0.375rem, rgba(0, 0, 0, 0.15) 0px 0.625rem 1.5rem !important',
        },
        '& a': {
          margin: 0,
          padding: 0,
        },
      }}
    >
      <Link to={`/detail/${result.IdMotel}`}>
        <img width={'100%'} height={200} alt="image motel" src={`${STATIC_HOST}motels/${result.srcMedia}`} />
        <Box
          sx={{
            '& p': {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: '#222222',
            },
            '& b': {
              color: '#e5193b',
              fontWeight: 700,
            },
            '& > .css-15pjl2w': {
              marginTop: '6px',
            },
          }}
        >
          <p>{result.Title}</p>
          <b>{result.Price} triệu/tháng</b>
          <DetailItem
            icon={TIMER_ICON}
            title={
              result.monthCreateDay
                ? `Đăng ${result.monthCreateDay} tháng trước`
                : result.weekCreateDay
                ? `Đăng ${result.weekCreateDay} tuần trước`
                : result.dayCreateDay
                ? `Đăng ${result.dayCreateDay} ngày trước`
                : result.hourCreateDay
                ? `Đăng ${result.hourCreateDay} giờ trước`
                : result.minuteCreateDay
                ? `Đăng ${result.minuteCreateDay} phút trước`
                : `Đăng ${result.secondCreateDay} giây trước`
            }
          />
        </Box>
      </Link>
    </Grid>
  );
}

export default ItemMotel;
