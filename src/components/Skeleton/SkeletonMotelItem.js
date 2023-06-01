import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';

function SkeletonMotelItem() {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderTop: '1px solid #f4f4f4',
        '&:hover': {
          zIndex: 1,
          boxShadow: '0 1px 8px 0 rgb(0 0 0 / 30%)',
        },
        position: 'relative',
        padding: '8px 12px',
      }}
    >
      <Grid container sx={{ width: '100%', height: '130px' }}>
        <Grid item>
          <Skeleton variant="rectangular" width={110} height={110} />
        </Grid>
        <Grid item>
          <Box
            sx={{
              flex: '1 1',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '55px',
              height: '100%',
              paddingLeft: '12px',
              '& > h3,p': {
                margin: 0,
              },
              '& >p': {
                color: '#c90927',
                fontWeight: 700,
                fontSize: '14px',
                paddingBottom: '4px',
              },
              '&>span': {
                fontSize: '14px',
                padding: '6px 0',
              },
            }}
          >
            <h3>
              <Skeleton variant="rectangular" width={210} height={20} />
            </h3>
            <span>
              <Skeleton variant="rectangular" width={110} height={20} />
            </span>
            <br />
            <br />
            <Box sx={{ display: 'flex', alignItems: 'center', '& span': { fontSize: '14px' } }}>
              <Skeleton variant="rectangular" width={210} height={20} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          position: 'absolute',
          right: 4,
          bottom: 20,
          padding: '12px 8px 8px 12px',
          '&:hover': {
            cursor: 'pointer',
          },
        }}
      >
        <Skeleton variant="circular" width={20} height={20} />
      </Box>
    </Box>
  );
}

export default SkeletonMotelItem;
