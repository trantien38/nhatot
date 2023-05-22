import { Box } from '@mui/material';
import React from 'react';
import Button from '../Button/Button';

function NoMessage() {
  return (
    <Box
      sx={{
        padding: '0 20px',
        textAlign: 'center',
        '& h5': {
          textAlign: 'center',
          fontSize: '16px',
          color: '#222',
          margin: '20px 0 8px 0',
        },
      }}
    >
      <img src="https://chat.chotot.com/emptyState.svg" alt="image" />
      <h5>Bạn chưa có cuộc trò chuyện nào!</h5>
      <p>Trải nghiệm chat để làm rõ thông tin về nhà trọ trước khi bắt đầu thực hiện thuê trọ</p>
      <Box sx={{ width: '50%', margin: 'auto' }}>
        <Button linkTo="/" orange text="Về trang chủ" sx={{ width: '100px !important' }} />
      </Box>
    </Box>
  );
}

export default NoMessage;
