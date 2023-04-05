import { useEffect, useState } from 'react';
import { Box, Dialog, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from '../Profile.module.scss';
import addressApi from '~/api/AddressApi';
import Button from '~/components/Button/Button';

function DialogDetailAddress({ open, Transition, handleClose, Address, WardName, DistrictName, ProvinceName, callbackParent }) {
  const [detailAddress, setDetailAddress] = useState(Address);
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState(ProvinceName);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState(DistrictName);
  const [wards, setWards] = useState([]);
  const [ward, setWard] = useState(WardName);

  const handleChangeProvince = (event) => {
    setProvince(event.target.value);
    console.log(event.target.value);
    setDistrict('');
    setDetailAddress('');
  };
  const handleChangeDistrict = (event) => {
    setDistrict(event.target.value);
    setWard('');
    setDetailAddress('');
  };
  const handleChangeWard = (event) => {
    setWard(event.target.value);
    console.log(event);
    setDetailAddress('');
  };
  const handleChangeDetailAddress = (event) => {
    setDetailAddress(event.target.value);
  };

  useEffect(() => {
    const fetchProvince = async () => {
      const provinceList = await addressApi.getProvince();
      setProvinces(provinceList.province);
    };
    fetchProvince();
  }, []);
  useEffect(() => {
    const fetchDistrict = async () => {
      console.log(province);
      const districtList = await addressApi.getDistrictByProvinceName({ ProvinceName: province });
      setDistricts(districtList.district);
    };
    fetchDistrict();
  }, [province]);
  useEffect(() => {
    const fetchWard = async () => {
      const wardList = await addressApi.getWardByDistrictName({ DistrictName: district });
      setWards(wardList.ward);
    };
    fetchWard();
  }, [district]);

  const handleSubmit = () => {
    callbackParent({
      detailAddress,
      ward,
      district,
      province,
    });
    handleClose();
  };

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
          padding: '0 12px',
          backgroundColor: '#fff!important',
          boxShadow: 'inset 0 -1px 0 #e8e8e8',
          display: 'flex',
        }}
      >
        <Link to="">
          <img
            onClick={handleClose}
            className={styles.btn_back}
            src="https://static.chotot.com/storage/chotot-icons/svg/back.svg"
          />
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
      <Grid
        container
        item
        spacing={2}
        sx={{
          width: '600px',
          padding: '20px',
        }}
      >
        <Grid item md={12} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tỉnh, Thành phố</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={province}
              label="Tỉnh, Thành phố"
              onChange={handleChangeProvince}
            >
              {provinces.map((result) => (
                <MenuItem key={result.IdProvince} value={result.ProvinceName}>
                  {result.ProvinceName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Quận, Huyện, Thị xã</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={district}
              label="Quận, Huyện, Thị xã"
              onChange={handleChangeDistrict}
            >
              {districts.map((result) => (
                <MenuItem key={result.IdDistrict} value={result.DistrictName}>
                  {result.DistrictName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Phường, Xã, Thị trấn</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ward}
              label="Phường, Xã, Thị trấn"
              onChange={handleChangeWard}
            >
              {wards.map((result) => (
                <MenuItem key={result.IdWard} value={result.WardName}>
                  {result.WardName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <TextField
            label="Địa chỉ cụ thể"
            id="outlined-basic"
            onChange={handleChangeDetailAddress}
            value={detailAddress}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item md={12} sm={12} xs={12} onClick={handleSubmit}>
          <Button orange text="Xong" />
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default DialogDetailAddress;
