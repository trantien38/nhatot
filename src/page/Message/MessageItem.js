import { Box, Grid } from '@mui/material';
import React from 'react';
import styles from './Message.module.scss';
import clsx from 'clsx';

export default function MessageItem({
  active,
  img,
  name,
  messageTime,
  title,
  content,
  stylePrice,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        borderBottom: '1px solid #ececec',
        padding: '10px 7px',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#ececec',
        },
      }}
      className={active ? styles.messageActive : ''}
    >
      <Grid>
        <img src={img} className={styles.img} />
      </Grid>
      <Grid>
        <b className={styles.name}>{name}</b>
        <span className={styles.messageTime}>
          {messageTime ? ` - ${messageTime}` : ''}
        </span>
        <p className={styles.title}>{title}</p>
        <p className={clsx(styles.content, stylePrice ? styles.price : '')}>
          {content}
        </p>
      </Grid>
    </Box>
  );
}
