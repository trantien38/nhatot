import { Box, Grid, Skeleton } from '@mui/material';
import React from 'react';

function DetailSkeleton() {
  return (
    <Grid container>
      <Grid item md={8} sx={{ padding: '0 15px' }}>
        <Box sx={{ backgroundColor: '#eee' }}>
          <Box sx={{ padding: '0 120px' }}>
            <Skeleton variant="rectangular" width={450} height={500} />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Skeleton variant="rectangular" width={120} height={120} />
            <Skeleton variant="rectangular" width={120} height={120} sx={{ margin: '0 10px' }} />
            <Skeleton variant="rectangular" width={120} height={120} />
          </Box>
        </Box>
        <Skeleton variant="rectangular" width="100%" height={180} />
        <Skeleton variant="rectangular" width="100%" height={120} sx={{ margin: '10px 0' }} />
        <Skeleton variant="rectangular" width="100%" height={80} />
      </Grid>
      <Grid item md={4} sx={{}}>
        <Skeleton variant="rectangular" width="100%" height={100} sx={{ margin: '8px 0' }} />
        <Skeleton variant="rectangular" width="100%" height={220} sx={{ margin: '8px 0' }} />
        <Skeleton variant="rectangular" width="100%" height={80} sx={{ margin: '8px 0' }} />
      </Grid>
    </Grid>
  );
}

export default DetailSkeleton;
