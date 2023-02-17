import { Box } from '@mui/system';
import styles from './Header.module.scss';

export default function Item({ icon, text }) {
  return (
    <Box className={styles.item}>
      <span className={styles.icon}>{icon}</span>
      <p>{text}</p>
    </Box>
  );
}
