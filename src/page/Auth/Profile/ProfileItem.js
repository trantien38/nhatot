import styles from './Profile.module.scss';
import { Box } from '@mui/material';

function ProfileItem(props) {
  const { title, content, connect, edit } = props;
  return (
    <Box
      sx={{
        '& b ': {
          fontWeight: 700,
        },
      }}
    >
      <b>{title}</b>
      <Box className={styles.content_icon}>
        <span>{content}</span>
        {edit && (
          <img src="https://st.chotot.com/storage/chotot-icons/svg/edit.svg" />
        )}
        {connect&&(
            <button>{connect}</button>
        )}
      </Box>
    </Box>
  );
}

export default ProfileItem;
