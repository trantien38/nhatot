import { CircularProgress, LinearProgress, Stack } from '@mui/material';
import { Box } from '@mui/system';

export default function Loading() {
  return (
    <>
      <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
        <CircularProgress color="secondary" />
        {/* <CircularProgress color="success" />
        <CircularProgress color="inherit" /> */}
      </Stack>
      <Box
        sx={{
          width: '100%',
          height: '2rem',
          position: 'fixed',
          top: '6rem',
          right: 0,
          left: 0,
          zIndex: 1,
        }}
      >
        <LinearProgress />
      </Box>
    </>
  );
}
