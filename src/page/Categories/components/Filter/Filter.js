import { ArrowDropDown } from '@mui/icons-material';
import { Pagination, Slide } from '@mui/material';
import { Box } from '@mui/system';
import Button from '~/components/Button/Button';
import DialogAddress from './Dialog/DialogAddress';
import styles from './Filter.module.scss';
import React, { useState } from 'react';
import DialogPrice from './Dialog/DialogPrice';
import theme from '~/theme';
import DialogAcreage from './Dialog/DialogAcreage';
import ListMap from './Dialog/ListMap';
import DialogListMap from './Dialog/DialogListMap';
import StorageKeys from '~/constants/storage-keys';
import { useNavigate } from 'react-router-dom';
import { LOCATION_FILTER, LOCATION_GRAY_ICON } from '~/constants';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function Filter({ address, onChangeFilters, filters }) {
  const { price, acreage, count, quantity } = filters;
  console.log(count, quantity);
  const [openAddress, setOpenAddress] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [openAcreage, setOpenAcreage] = useState(false);
  const [openListMap, setOpenListMap] = useState(false);
  const navigate = useNavigate();
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

  const handleClickOpenAcreage = () => {
    setOpenAcreage(true);
  };

  const handleCloseAcreage = () => {
    setOpenAcreage(false);
  };
  const handleDeleteFilter = () => {
    setOpenAcreage(false);
    setOpenPrice(false);
    navigate('/cho-thue-phong-tro');
  };
  const handleClickOpenListMap = () => {
    setOpenListMap(true);
  };

  const handleCloseListMap = () => {
    setOpenListMap(false);
  };

  const handleChange = (event, value) => {
    console.log({ value });
    const start = value === 1 ? 0 : (value - 1) * quantity;
    onChangeFilters({
      ...filters,
      start,
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        padding: '10px 0',
        position: 'fixed',
        top: theme.size.heightHeader,
        display: 'flex',
        zIndex: 10,
        marginLeft: '-2000px',
        paddingLeft: '2000px',
        width: '100%',
      }}
    >
      <Box
        sx={{
          margin: 'auto 0',
          maxWidth: theme.size.browser,
          display: 'flex',
          fontSize: '16px',
          '& >div': {
            marginLeft: '9px',
          },
          '& button': {
            fontSize: '16px',
          },
        }}
      >
        {/* <Box className={styles.filter}>
          <span className={styles.filter_span}></span>
          <span style={{ paddingBottom: '3px' }}>Lọc</span>
        </Box> */}

        <Box className={styles.filter} onClick={handleClickOpenAddress}>
          <img src={LOCATION_FILTER} alt="" />
          <span style={{ paddingBottom: '3px' }}>&nbsp;{address || 'Toàn quốc'}</span>
          <ArrowDropDown />
        </Box>
        <DialogAddress open={openAddress} Transition={Transition} handleClose={handleCloseAddress} />
        <Box className={styles.filter} onClick={handleClickOpenListMap}>
          <span className={styles.filter_span}></span>
          <span style={{ paddingBottom: '3px' }}>Tìm quanh đây</span>
          <ArrowDropDown />
        </Box>
        <DialogListMap open={openListMap} Transition={Transition} handleClose={handleCloseListMap} />

        {/* <Box className={styles.filter}>
          <span className={styles.filter_span}></span>
          <span style={{ paddingBottom: '3px' }}>Phòng trọ</span>
          <ArrowDropDown />
        </Box> */}

        <Box onClick={handleClickOpenPrice}>
          <Button
            filter
            text={
              price[0] != 0 || price[1] != 18286286
                ? `
          ${new Intl.NumberFormat().format(price[0])}đ - ${new Intl.NumberFormat().format(price[1])}đ`
                : 'Giá +'
            }
          />
        </Box>
        <DialogPrice
          open={openPrice}
          Transition={Transition}
          handleDeleteFilter={handleDeleteFilter}
          handleClose={handleClosePrice}
          onChangeFilters={onChangeFilters}
          filters={filters}
        />

        <Box onClick={handleClickOpenAcreage}>
          <Button filter text={acreage[0] != 0 || acreage[1] != 88 ? `${acreage[0]}m2 - ${acreage[1]}m2` : 'Diện tích +'} />
        </Box>
        <DialogAcreage
          open={openAcreage}
          Transition={Transition}
          handleDeleteFilter={handleDeleteFilter}
          handleClose={handleCloseAcreage}
          onChangeFilters={onChangeFilters}
          filters={filters}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginLeft: '8px',
          padding: '12px 0',
          '& li>button': {
            fontSize: '14px',
          },
        }}
      >
        <Pagination
          onChange={handleChange}
          count={Math.ceil(count / quantity)}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Box>
    </Box>
  );
}

export default Filter;
