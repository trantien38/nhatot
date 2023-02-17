import { Box, CircularProgress, IconButton, InputBase } from '@mui/material';
import React from 'react';
import styles from './Search.module.scss';
import globalStyles from '~/components/GlobalStyles/GlobalStyles.module.scss';
import { DropDown, OutlineCloseCircle, PostIcon, SearchIcon } from '../Icon';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function Search({
  onChangeSearch,
  focused,
  valueSearch,
  showLoading,
  placeholder,
}) {
  const handleOnChangeSearch = (e) => {
    onChangeSearch(e.target.value);
  };
  return (
    <Box className={cx('search')}>
      <IconButton className={cx('drop_down')}>
        Mua bán
        <DropDown />
      </IconButton>
      <Box sx={{ width: '666px', backgroundColor: '#f4f4f4', borderRadius:'0 4px 4px 0' }}>
        <InputBase
          className={cx('input')}
          placeholder={placeholder || 'Nhập từ khóa...'}
          inputProps={{ 'aria-label': 'Search...' }}
          onChange={(e) => handleOnChangeSearch(e)}
        />
        <IconButton
          type="submit"
          aria-label="search"
          className={globalStyles.btn}
          sx={{marginBottom:'6px', padding: ' 6px 12px'}}
        >
          {focused && !!valueSearch ? (
            <>
              {showLoading ? (
                <CircularProgress
                  sx={{ width: '2rem!important', height: '2rem!important' }}
                />
              ) : (
                <OutlineCloseCircle />
              )}
            </>
          ) : (
            <SearchIcon />
          )}
        </IconButton>
      </Box>
      <IconButton className={globalStyles.btn} sx={{ marginLeft: '20px' }}>
        <PostIcon />
        &nbsp;Đăng tin
      </IconButton>
    </Box>
  );
}
