import { Box } from '@mui/material';
import React from 'react';
import styles from './Message.module.scss';
export default function Questions() {
  return (
    <Box>
      <ul className={styles.questionList}>
        <li className={styles.question}>Phòng này còn cho thuê không ạ?</li>
        <li className={styles.question}>Giờ giấc tự do đúng không ạ?</li>
        <li className={styles.question}>Có nấu ăn trong phòng được không ạ?</li>
        <li className={styles.question}>Phòng ở được mấy người ạ?</li>
        <li className={styles.question}>Có ở chung với chủ nhà không ạ?</li>
        <li className={styles.question}>Thời gian thuê tối đa là bao lâu?</li>
        <li className={styles.question}>Phòng này còn cho thuê không ạ?</li>
        <li className={styles.question}>Giờ giấc tự do đúng không ạ?</li>
        <li className={styles.question}>Có nấu ăn trong phòng được không ạ?</li>
        <li className={styles.question}>Phòng ở được mấy người ạ?</li>
        <li className={styles.question}>Có ở chung với chủ nhà không ạ?</li>
        <li className={styles.question}>Thời gian thuê tối đa là bao lâu?</li>
      </ul>
    </Box>
  );
}
