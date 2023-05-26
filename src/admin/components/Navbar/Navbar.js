import styles from './Navbar.module.scss';

import { Box, IconButton, InputBase } from '@mui/material';
import classNames from 'classnames/bind';
import globalStyles from '~/components/GlobalStyles/GlobalStyles.module.scss';
import { SearchIcon } from '~/components/Icon';
const cx = classNames.bind(styles);
function Navbar() {
  return (
    <Box className={styles.navbar}>
      <Box>
        <h1>Trang quản lý hệ thống nhà trọ</h1>
      </Box>
      <Box
        sx={{
          width: '40%',
        }}
      >
        <Box className={cx('search')}>
          <Box
            sx={{
              backgroundColor: '#fff',
              borderRadius: '8px',
            }}
          >
            <InputBase
              className={cx('input')}
              placeholder={'Nhập từ khóa...'}
              inputProps={{ 'aria-label': 'Search...' }}
              // onChange={(e) => handleOnChangeSearch(e)}
            />
            <IconButton
              type="submit"
              aria-label="search"
              className={globalStyles.btn}
              sx={{
                margin: '6px 0',
                // padding: ' 8px 16px',
                '& svg': {
                  width: '30px',
                  height: '16px',
                },
              }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
