import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import theme from '~/theme';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ socket }) {
  return (
    <Box sx={{ margin: '0' }}>
      <Header socket={socket} />
      <Box
        sx={{
          maxWidth: theme.size.browser,
          margin: 'auto',
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
