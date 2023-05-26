
import { Box } from '@mui/material';
import React from 'react';

function ToolTip({icon, toolTipText}) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        borderBottom: '1px dotted black',
        '& .tooltiptext': {
          visibility: 'hidden',
          width: '120px',
          backgroundColor: 'black',
          color: '#fff',
          textAlign: 'center',
          borderRadius: '6px',
          padding: '5px 0',
          position: 'absolute',
          zIndex: '1',
          top: '150%',
          left: '50%',
          marginLeft: '-60px',
        },
        '& .tooltiptext::after': {
          content: '""',
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          marginLeft: '-5px',
          borderWidth: '5px',
          borderStyle: 'solid',
          borderColor: 'transparent transparent black transparent',
        },
        '&:hover .tooltiptext': {
          visibility: 'visible',
        },
      }}
    >
      {icon}
      <span class="tooltiptext">{toolTipText}</span>
    </Box>
  );
}

export default ToolTip;
