import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';

export default function LayoutAdmin() {
  return (
    <Box>
      <Sidebar />
      <Box sx={{ overflow: 'hidden' }}>
        <Navbar />
        <Box sx={{ marginTop: '86px', marginLeft: '260px', padding: '0 30px' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
