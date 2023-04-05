import { Grid, Menu, MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

export default function Category({ icon, title, count, content }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  var url = '';
  switch (title) {
    case 'Cho thuê':
      url = 'cho-thue';
      break;
    case 'Mua bán':
      url = 'mua-ban';
      break;
    case 'Dự án':
      url = 'du-an';
      break;
  }
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          backgroundColor: '#fff',
          padding: '16px',
          '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#f4f4f4',
          },
        }}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Grid>
          <img className={styles.img} src={icon} />
        </Grid>
        <Grid sx={{ marginLeft: '12px' }}>
          <p className={styles.title}>{title}</p>
          <b>{count}&nbsp;</b>
          <span className={styles.content}>{content}</span>
        </Grid>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          sx={{
            '&>a': {
              margin: 0,
              padding: 0,
            },
          }}
          onClick={handleClose}
        >
          Căn hộ/chung cư
        </MenuItem>
        <MenuItem
          sx={{
            '&>a': {
              margin: 0,
              padding: 0,
            },
          }}
          onClick={handleClose}
        >
          Nhà ở
        </MenuItem>
        <MenuItem
          sx={{
            '&>a': {
              margin: 0,
              padding: 0,
            },
          }}
          onClick={handleClose}
        >
          Đất
        </MenuItem>
        <MenuItem
          sx={{
            '&>a': {
              margin: 0,
              padding: 0,
            },
          }}
          onClick={handleClose}
        >
          Văn phòng/mặt bằng kinh doanh
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          sx={{
            '&>a': {
              margin: 0,
              padding: 0,
            },
          }}
        >
          <Link to={`/${url}-phong-tro`}>Phòng trọ</Link>
        </MenuItem>
      </Menu>
    </Box>
  );
}
