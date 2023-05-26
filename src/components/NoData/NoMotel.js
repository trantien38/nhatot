import { Box } from '@mui/material';
import React from 'react';
import Button from '../Button/Button';

function NoMotel({ handleChangeMotel }) {
  const handleResetFilter = () => {
    handleChangeMotel();
  };
  return (
    <Box
      sx={{
        marginTop: '16px',
        backgroundColor: '#fff',
        textAlign: 'center',
        padding: '30px 15px',
        '& img': {
          maxWidth: '200px',
          marginBottom: '16px',
        },
        '& b': {
          fontSize: '20px',
          fontWeight: 700,
        },
        '& p': {},
      }}
    >
      <img
        src="https://static.chotot.com/storage/empty_state/desktop/search_no_found_filter.png"
        alt="không tìm thấy nhà trọ phù hợp"
      />
      <br />
      <b>Không có kết quả cho bộ lọc đã chọn</b>
      <p>
        Không tìm thấy tin đăng cho những gì bạn đã lọc. Hãy thay đổi <br /> tiêu chí Lọc hoặc Bỏ lọc.
      </p>
      <Box sx={{ width: '80px', margin: 'auto' }}>
        <Button onClickButton={() => handleResetFilter()} orange text="Bỏ lọc" />
      </Box>
    </Box>
  );
}

export default NoMotel;
