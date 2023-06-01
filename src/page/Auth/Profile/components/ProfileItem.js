import styles from '../Profile.module.scss';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { EDIT_ICON } from '~/constants';

function ProfileItem(props) {
  const { title, content, connect, password, edit } = props;
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
        {password && (
          <Link to="/settings/account">
            <img src={EDIT_ICON} />
          </Link>
        )}
        {edit && (
          <Link to="/settings/profile">
            <img src={EDIT_ICON} />
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
