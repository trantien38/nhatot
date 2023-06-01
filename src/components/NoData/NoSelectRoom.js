import { Box } from '@mui/material';
import React from 'react';

function NoSelectRoom() {
  return (
    <Box sx={{ padding: '50px', height: 'calc(100% - 100px)' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img alt="icon" style={{ width: '70%' }} src="https://chat.chotot.com/emptyRoom.png" />
      </Box>
      <p style={{ textAlign: 'center', color: '#333', fontWeight: 700 }}>Liên hệ để biết thêm thông tin chi tiết</p>
    </Box>
  );
}

export default NoSelectRoom;
