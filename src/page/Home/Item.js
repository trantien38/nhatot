import { Box, Grid } from '@mui/material';
import React from 'react';

function Item({ src, title, content }) {
  return (
    <Grid
      item
      md={4}
      sx={{
        display: 'flex',
        '& > img': {
          marginRight: '12px',
          width: '80px',
          height: '80px',
        },
      }}
    >
      <img src={src} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          '& span': {
            color: '#ff833f',
            fontSize: '16px',
            fontWeight: 700,
            margin: '4px 0',
          },
          '& p': {
            color: '#222',
            fontWeight: 700,
            margin: 0,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>{title}</span>
          <p>{content}</p>
        </Box>
      </Box>
    </Grid>
  );
}

export default Item;
