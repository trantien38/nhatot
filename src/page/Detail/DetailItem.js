import { Box } from '@mui/material';
import { display } from '@mui/system';

function DetailItem({ icon, title, sdt }) {
  return (
    <Box sx={{ display: 'flex', marginBottom: '8px' }}>
      <img width={'18px'} height={'18px'} src={icon} />
      <Box
        sx={{
          marginLeft: '8px',
          display: 'flex',
          width: '100%',
          alignItems: 'center',
        }}
      >
        {sdt ? `${sdt}` : ''}
        <span>{title}&nbsp;</span>
      </Box>
    </Box>
  );
}

export default DetailItem;
