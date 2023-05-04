import { Box, Grid } from '@mui/material';
import React from 'react';

function ItemLink({ title, icon, content }) {
  return (
    <Grid item md={12} sm={12} xs={12}>
      <p>{title}</p>
      <Box
        sx={{
          width: '224px',
          border: '1px solid silver',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          '& > span': {
            marginLeft: '8px',
          },
        }}
      >
        {icon}
        <span>{content}</span>
      </Box>
    </Grid>
  );
}

export default ItemLink;
