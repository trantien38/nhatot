import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import styles from './Home.module.scss';

export default function Category({ icon, title, count, content }) {
  return (
    <Box sx={{ display: 'flex', backgroundColor: '#fff', padding: '16px' }}>
      <Grid>
        <img className={styles.img} src={icon} />
      </Grid>
      <Grid sx={{ marginLeft: '12px' }}>
        <p className={styles.title}>{title}</p>
        <b>{count}&nbsp;</b>
        <span className={styles.content}>{content}</span>
      </Grid>
    </Box>
  );
}
