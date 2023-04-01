import styles from '../Profile.module.scss';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';

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
          <Link to="/settings/profile">
            <img src="https://st.chotot.com/storage/chotot-icons/svg/edit.svg" />
          </Link>
        )}
        {connect && (
          <Link to="/settings/social">
            <button>{connect}</button>
          </Link>
        )}
      </Box>
    </Box>
  );
}

export default ProfileItem;
