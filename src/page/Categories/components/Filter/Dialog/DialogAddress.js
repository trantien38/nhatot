import { Dialog } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import addressApi from '~/api/AddressApi';
import { AREA_ICON, BACK_ICON } from '~/constants';
import District from '../Address/District';
import Province from '../Address/Province';
import Ward from '../Address/Ward';
import styles from './Dialog.module.scss';

function DialogAddress({ open, Transition, handleClose }) {
  const [address, setAddress] = useState([]);
  const { IdWard, IdProvince, IdDistrict } = useParams();

  useEffect(() => {
    const fetchAddress = async () => {
      const provinceList = await addressApi.getProvince();
      setAddress(provinceList.province);
    };
    fetchAddress();
  }, []);
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <Box
        sx={{
          padding: '0 17px',
          backgroundColor: '#fff!important',
          boxShadow: 'inset 0 -1px 0 #e8e8e8',
          display: 'flex',
        }}
      >
        {/* <KeyboardArrowLeft /> */}
        <Link
          to={
            IdWard
              ? `/cho-thue-phong-tro/${IdProvince}/${IdDistrict}`
              : IdDistrict
              ? `/cho-thue-phong-tro/${IdProvince}`
              : IdProvince
              ? `/cho-thue-phong-tro`
              : ''
          }
          onClick={!IdProvince && handleClose}
        >
          <img className={styles.btn_back} src={BACK_ICON} />
        </Link>
        <Box
          sx={{
            padding: '0 24px',
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            '& p': {
              color: '#222',
              fontWeight: '700',
              fontSize: '14px',
              lineHeight: '18px',
            },
          }}
        >
          <p>Chọn khu vực</p>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'relative',
          padding: '0',
          maxHeight: '500px',
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            padding: '0 24px',
            backgroundColor: '#fff',
            display: 'flex',
            '& p': {
              color: '#222',
              fontWeight: '700',
              fontSize: '14px',
              lineHeight: '18px',
            },
          }}
        >
          <img src={AREA_ICON} />
          &nbsp;&nbsp;<p>Lọc theo khu vực</p>
        </Box>
        <Box sx={{ width: '480px' }}>
          {IdDistrict ? (
            <Ward handleClose={handleClose} />
          ) : IdProvince ? (
            <District handleClose={handleClose} />
          ) : (
            <Province handleClose={handleClose} />
          )}
        </Box>
      </Box>
    </Dialog>
  );
}

export default DialogAddress;
