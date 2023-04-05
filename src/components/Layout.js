import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function Layout() {
  return (
    <>
      <Header />
      <Box sx={{ maxWidth: '960px', margin: 'auto', backgroundColor:'#fff' }}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}
