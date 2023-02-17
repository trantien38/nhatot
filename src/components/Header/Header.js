import { ArrowDropDown, Home } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import Face4Icon from '@mui/icons-material/Face4';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import { Box } from '@mui/system';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { Link } from 'react-router-dom';
import { DropDown } from '../Icon';
import Search from '../Search/Search';

import styles from './Header.module.scss';
import Item from './Item';
export default function Header() {
  return (
    <Box sx={{ backgroundColor: '#fff', position: 'sticky', top: 0 }}>
      <Grid container spacing={2} className={styles.header}>
        <Grid sx={{ height: '100%', padding: '6px' }}>
          <Link to="/">
            <img
              src="https://static.chotot.com/storage/default_images/pty/nhatot-logo.png"
              style={{
                height: '100%',
                cursor: 'pointer',
              }}
            />
          </Link>
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            right: 0,
            height: '100%',
            padding: '0',
            marginRight: '0px',
          }}
        >
          <Link to="/">
            <Item
              icon={<Home className={styles.item_icon} />}
              text={'Trang chủ'}
            />
          </Link>
          <Link to="/news">
            <Item
              icon={<Face4Icon className={styles.item_icon} />}
              text={'Quản lý tin'}
            />
          </Link>
          <Link to="messages">
            <Item
              icon={<MarkUnreadChatAltIcon className={styles.item_icon} />}
              text={'Chat'}
            />
          </Link>
          <Link to="/">
            <Item
              icon={<AddAlertIcon className={styles.item_icon} />}
              text={'Thông báo'}
            />
          </Link>
          <Link to="/" className={styles.account}>
            <Item
              icon={<AccountCircleIcon className={styles.item_icon} />}
              text={'Tài khoản'}
            />
            <span>
              <ArrowDropDown />
            </span>
          </Link>
          {/* <DropDown/> */}
        </Grid>
      </Grid>
      <Search />
    </Box>
  );
}
