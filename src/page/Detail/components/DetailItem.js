import { Box } from '@mui/material';

function DetailItem({ icon, title, sdt }) {
  return (
    <>
      {sdt ? (
        <Box sx={{ display: 'flex', margin: ' 2px 20px 8px 0', cursor: 'pointer' }}>
          {sdt && sdt.includes('**') ? (
            <>
              <img id="heart" width={'18px'} height={'18px'} src={icon}/>
              <Box
                sx={{
                  marginLeft: '8px',
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  // '& span': {
                  //   color: '#8c8c8c',
                  // },
                }}
              >
                {sdt ? `${sdt}` : ''}
                <span>{title}&nbsp;</span>
              </Box>
            </>
          ) : (
            <p style={{ textAlign: 'center', width: '100%', margin: 0 }}>{sdt}&nbsp;</p>
          )}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', margin: ' 0 20px 6px 0', cursor: 'pointer' }}>
          <img width={'18px'} height={'18px'} src={icon} />
          <Box
            sx={{
              marginLeft: '8px',
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              // '& span': {
              //   color: '#8c8c8c',
              // },
            }}
          >
            {sdt ? `${sdt}` : ''}
            <span>{title}&nbsp;</span>
          </Box>
        </Box>
      )}
    </>
  );
}

export default DetailItem;
