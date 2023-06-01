import { Box, Grid } from '@mui/material';
import React from 'react';
import styles from '../Message.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { GREEN_DOT } from '~/constants';

export default function MessageItem({ IdRoom, link, active, img, name, messageTime, title, content, stylePrice }) {
  return (
      <Link to={link} className={clsx(styles.messageItem, active ? styles.messageActive : '')}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={img} className={styles.img} alt='image' />
        </Box>
        <Box>
          <b className={styles.name}>{name}</b>
          <span className={styles.messageTime}>{messageTime ? ` - ${messageTime}` : ''}</span>
          <p className={styles.title}>{title}</p>
          <p className={clsx(styles.content, stylePrice ? styles.price : '')}>
            {content == 'Đang hoạt động' && <img width={'10px'} height={'10px'} src={GREEN_DOT} />} {content}
          </p>
        </Box>
      </Link>
    // <Box
    //   sx={{
    //     display: 'flex',
    //     '& input': {
    //       width: '20px',
    //       cursor: 'pointer',
    //       margin: '0 12px',
    //     },
    //   }}
    // >
    
      // {/* {messageTime && <input type="checkbox" value={IdRoom}/>} */}
    // </Box>
  );
}
