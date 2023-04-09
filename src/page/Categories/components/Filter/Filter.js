import { ArrowDropDown } from '@mui/icons-material';
import { Slide } from '@mui/material';
import { Box } from '@mui/system';
import Button from '~/components/Button/Button';
import DialogAddress from './Dialog/DialogAddress';
import styles from './Filter.module.scss';
import React from 'react';
import DialogPrice from './Dialog/DialogPrice';
import theme from '~/theme';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function Filter({ address }) {
  const [openAddress, setOpenAddress] = React.useState(false);
  const [openPrice, setOpenPrice] = React.useState(false);

  const handleClickOpenAddress = () => {
    setOpenAddress(true);
  };

  const handleCloseAddress = () => {
    setOpenAddress(false);
  };

  const handleClickOpenPrice = () => {
    setOpenPrice(true);
  };

  const handleClosePrice = () => {
    setOpenPrice(false);
  };

  return (
    <Box sx={{ backgroundColor: '#fff', padding: '10px 0' }}>
      <Box
        sx={{
          margin: 'auto',
          maxWidth: theme.size.browser,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box className={styles.filter}>
          <span className={styles.filter_span}></span>
          <span style={{ paddingBottom: '3px' }}>Lọc</span>
        </Box>

        <Box className={styles.filter} onClick={handleClickOpenAddress}>
          <img src="https://static.chotot.com/storage/chotot-icons/svg/new-location.svg" />
          <span style={{ paddingBottom: '3px' }}>
            &nbsp;{address || 'Toàn quốc'}
          </span>
          <ArrowDropDown />
        </Box>
        <DialogAddress
          open={openAddress}
          Transition={Transition}
          handleClose={handleCloseAddress}
          
        />
        <Box className={styles.filter}>
          <span className={styles.filter_span}></span>
          <span style={{ paddingBottom: '3px' }}>Cho thuê</span>
          <ArrowDropDown />
        </Box>
        <Box className={styles.filter}>
          <span className={styles.filter_span}></span>
          <span style={{ paddingBottom: '3px' }}>Phòng trọ</span>
          <ArrowDropDown />
        </Box>

        <Box onClick={handleClickOpenPrice}>
          <Button filter text="Giá +" />
        </Box>
        <DialogPrice
          open={openPrice}
          Transition={Transition}
          handleClose={handleClosePrice}
        />
        <Box>
          <Button filter text="Diện tích +" />
        </Box>
        <Box>
          <Button filter text="Số phòng ngủ +" />
        </Box>
        <Box>
          <Button filter text="Tin có video +" />
        </Box>
        <Box>
          <Button filter text="Loại hình nhà ở +" />
        </Box>
      </Box>
    </Box>
  );
}

export default Filter;
