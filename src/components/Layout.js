import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import theme from '~/theme';
import Footer from './Footer';
import Header from './Header';

export default function Layout() {
  return (
    <>
      <Header />
      <Box
        sx={{
          maxWidth: theme.size.browser,
          margin: 'auto',
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}
