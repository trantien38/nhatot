import { MoreHoriz } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import messageApi from '~/api/MessageApi';
import styles from '../Message.module.scss';

function ChatBox({chat}) {

  return (
    <Box sx={{ overflowX: 'hidden', '& ul': { padding: '13px' } }}>
      <ul>
        {chat.map((result) => {
          if (result.IdAuthority == 3) {
            return (
              <li key={result.IdMessage} className={styles.messageRenter}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    marginRight: '20px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      '& svg': { opacity: 0, paddingRight: '10px' },
                      '& svg:hover': { opacity: 1, cursor: 'pointer' },
                    }}
                  >
                    <MoreHoriz />
                  </Box>
                  <Box
                    sx={{
                      '& p': {
                        margin: 0,
                        textAlign: 'right',
                        color: '#bdc1c9',
                      },
                      backgroundColor: '#fff4d6',
                      color: '#000',
                      padding: '6px 12px',
                      borderRadius: '8px',
                    }}
                  >
                    {result.Content}
                    <p>8:43</p>
                  </Box>
                </Box>
                <Box></Box>
              </li>
            );
          } else {
            return (
              <li key={result.IdMessage} className={styles.messageHost}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    marginRight: '20px',
                  }}
                >
                  <Box
                    sx={{
                      '& p': { margin: 0, textAlign: 'left', color: '#bdc1c9' },
                      backgroundColor: '#f4f4f4',
                      color: '#000',
                      padding: '6px 12px',
                      borderRadius: '8px',
                    }}
                  >
                    {result.Content}
                    <p>8:43</p>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      '& svg': { opacity: 0, paddingLeft: '10px' },
                      '& svg:hover': { opacity: 1, cursor: 'pointer' },
                    }}
                  >
                    <MoreHoriz />
                  </Box>
                </Box>
                <Box></Box>
              </li>
            );
          }
        })}
      </ul>
    </Box>
  );
}

export default ChatBox;
