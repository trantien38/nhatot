import { Box, Grid } from '@mui/material';
import React from 'react';
import styles from '../Message.module.scss';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

export default function MessageItem({ link, active, img, name, messageTime, title, content, stylePrice }) {
  return (
    <Link
      to={link}
      style={{
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
        <span className={styles.messageTime}>{messageTime ? ` - ${messageTime}` : ''}</span>
        <p className={styles.title}>{title}</p>
        <p className={clsx(styles.content, stylePrice ? styles.price : '')}>
          {content == 'Đang hoạt động' && (
            <img
              width={'10px'}
              height={'10px'}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Location_dot_green.svg/768px-Location_dot_green.svg.png"
            />
          )}{' '}
          {content}
        </p>
      </Grid>
    </Link>
  );
}
