import { Box, Skeleton } from '@mui/material';
import React from 'react';

function SkeletonMessageItem() {
  return (
    <Box sx={{ display: 'flex', padding: '10px 7px' }}>
      <Box>
        <Skeleton width={48} height={48} variant="circular" />
      </Box>
      <Box sx={{ marginLeft: '12px' }}>
        <Skeleton width={150} height={18} />
        <Skeleton width={200} height={18} />
        <Skeleton width={20} height={18} />
      </Box>
    </Box>
  );
}

export default SkeletonMessageItem;
