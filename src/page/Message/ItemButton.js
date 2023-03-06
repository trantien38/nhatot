import { Box } from '@mui/material';
import styles from './Message.module.scss';

function ItemButton({ content, active }) {
  return (
    <Box
      sx={{
        marginLeft: '6px',
        color: 'inherit',
        borderRadius: '9999px',
        border: 'none',
        padding: '8px 10px',
        cursor: 'pointer',
        backgroundColor: '#f4f4f4',
        '&:hover': {
          backgroundColor: '#ffe9c2',
          color: '#f80 !important',
        },
      }}
      className={active ? styles.btnActive : ''}
    >
      {content}
    </Box>
  );
}

export default ItemButton;
