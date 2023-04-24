import { MoreHoriz } from '@mui/icons-material';
import { Box } from '@mui/material';
import styles from '../Message.module.scss';

function ChatBox({ chat, IdUser }) {
  console.log(chat)
  return (
    <Box sx={{ overflowX: 'hidden', '& ul': { padding: '13px' } }}>
      <ul>
        {chat.map((result) => {
          if (result.IdUser == IdUser) {
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
                  <Box></Box>
                  <Box
                    sx={{
                      position: 'relative',
                      backgroundColor: '#fff4d6',
                      color: '#000',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      '& p': { margin: 0 },
                      '& strong': {
                        margin: 0,
                        textAlign: 'right',
                        color: '#bdc1c9',
                        fontWeight: 380,
                        display: 'none',
                        position: 'absolute',
                        top: '20%',
                        right: '108%',
                      },
                      '& p:hover ~ strong': {
                        display: 'block',
                      },
                    }}
                  >
                    <p>{result.Content}</p>
                    <strong>{`${result?.hour}:${result?.minute}`}</strong>
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
                      position: 'relative',
                      backgroundColor: '#f4f4f4',
                      color: '#000',
                      padding: '6px 12px',
                      borderRadius: '8px',
                      maxWidth: '68%',
                      '& strong': {
                        margin: 0,
                        textAlign: 'left',
                        color: '#bdc1c9',
                        display: 'none',
                        position: 'absolute',
                        fontWeight: 380,
                        top: '20%',
                        left: '102%',
                      },
                      '& p': {
                        margin: 0,
                      },
                      '& p:hover ~ strong': {
                        display: 'block',
                      },
                    }}
                  >
                    <p>{result.Content}</p>
                    <strong>{`${result?.hour}:${result?.minute}`}</strong>
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
