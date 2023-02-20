import { DeleteForever } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import clsx from 'clsx';
import { useState } from 'react';
import Header from '~/components/Header';
import ItemButton from './ItemButton';
import styles from './Message.module.scss';
import MessageItem from './MessageItem';
import MessageList from './MessageList';
import Questions from './Questions';

export default function Message() {
  const [state, setState] = useState([]);

  const avatar =
    'https://static.chotot.com/storage/chat/member-profile-avatar_140x140.png';
  const imgRoom =
    'https://cdn.chotot.com/5bmc0aGA85_stXnY33AWkQrDhQlp_iGRyDa1WW-NIpQ/preset:listing/plain/40489371e66627a7da396aa506eb3640-2812770810323125887.jpg';
  const handleChangeIcon = () => {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);
    if ($('.addIcon').alt == 'open') {
      $('.addIcon').alt = 'close';
      $('.addIcon').style = 'transform: rotate(45deg)';
      $$('.threeIcon').style = 'display: block, width: 100px';
    } else {
      $('.addIcon').alt = 'open';
      $('.addIcon').style = 'transform: rotate(0deg)';
      $$('.threeIcon').style = 'display: none';
    }
  };
  return (
    <>
      <Header />
      <Box
        sx={{
          maxWidth: '960px',
          margin: 'auto',
        }}
      >
        <Grid
          container
          sx={{
            backgroundColor: '#fff',
            maxWidth: '960px',
            // height: '100%',
            position: 'absolute',
            bottom: 0,
            top: '112px',
            // paddingTop:'112px',
            // width: 'inherit',
            zIndex: -1,
          }}
        >
          <Grid
            md={4}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderLeft: '1px solid #e8e8e8',
              color: '#000',
              borderRight: '1px solid #e8e8e8',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                padding: '12px',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h5 style={{ fontSize: '1rem', margin: 0, paddingLeft: '2px' }}>
                Chat
              </h5>
              <Box>
                <ItemButton active content={'Tất cả'} />
                <ItemButton content={'Tôi mua'} />
                <ItemButton content={'Tôi bán'} />
              </Box>
            </Box>
            <Box
              sx={{
                overflowX: 'hidden',
                overflowY: 'auto',
                flex: '1 1',
              }}
            >
              <MessageList state={state} setState={setState} />
            </Box>
            <Box
              sx={{
                borderRadius: 0,
                height: '40px',
                padding: '0 10px',
                borderTop: '1px solid rgba(0,0,0,.1)',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  backgroundColor: '#e6e6e6',
                  cursor: 'pointer',
                },
              }}
            >
              <DeleteForever />
              <p>Xóa cuộc trò chuyện</p>
            </Box>
          </Grid>
          <Grid
            md={8}
            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <Box>
              <MessageItem
                img={avatar}
                name={'Trần tiến'}
                content={'Hoạt động 2 giờ trước'}
              />
              <MessageItem
                img={imgRoom}
                name={'Phòng trọ cho thuê'}
                content={'800.000 đ/tháng'}
                stylePrice={'price'}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                overflowX: 'hidden',
                overflowY: 'auto',
                flex: '1 1',
              }}
            >
              <Box
                sx={{
                  overflowX: 'hidden',

                }}
                >
                  
              </Box>
              <Box sx={{}}>
                <Questions />
                <Box sx={{ display: 'flex', backgroundColor: '#fff' }}>
                  <input type="file" style={{ display: 'none' }} />

                  <img
                    className={clsx(styles.messageIcon, 'addIcon')}
                    onClick={handleChangeIcon}
                    alt="open"
                    src="https://chat.chotot.com/icons/plusCircle.svg"
                  />
                  <img
                    className={clsx(styles.messageIcon, 'threeIcon')}
                    src="https://chat.chotot.com/icons/message.svg"
                  />
                  <img
                    className={clsx(styles.messageIcon, 'threeIcon')}
                    src="https://chat.chotot.com/icons/gallery.svg"
                  />
                  <img
                    className={clsx(styles.messageIcon, 'threeIcon')}
                    src="https://chat.chotot.com/icons/location.svg"
                  />
                  <textarea
                    className={styles.inputMessage}
                    placeholder="Nhập tin nhắn..."
                    rows="1"
                  />
                  <div className={styles.messageSubmit}></div>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
