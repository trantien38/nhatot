import { Box } from '@mui/material';
import React from 'react';
import { SAVEAD_ICON } from '~/constants';
import Button from '../Button/Button';

function NoFavourite() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& span': {
          color: 'rgb(155, 155, 155)',
          display: 'flex',
          alignItems: 'center',
        },
      }}
    >
      <p>Bạn chưa yêu thích nhà trọ nào!</p>
      <span>
        Hãy bấm nút &nbsp;
        <img alt="icon" src={SAVEAD_ICON} /> &nbsp; ở tin đăng để lưu và xem lại sau.
      </span>
      <p>
        <Button linkTo="/cho-thue-phong-tro" orange text="Bắt đầu tìm kiếm" />
      </p>
    </Box>
  );
}

export default NoFavourite;
