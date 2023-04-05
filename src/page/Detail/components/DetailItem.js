import { Box } from '@mui/material';

function DetailItem({ icon, title, sdt }) {
  return (
    <Box sx={{ display: 'flex', margin: ' 0 20px 10px 0' }}>
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