import { Box, Grid, Slide, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '~/components/Button/Button';
import DialogDetailAddress from '../Auth/Profile/components/DialogDetailAddress';
import UploadItem from './components/UploadItem';
import styles from './Post.module.scss';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
function Post() {
  const [openAddress, setOpenAddress] = useState(false);
  const [addressDetail, setAddressDetail] = useState('');
  const [address, setAddress] = useState('');
  const [ward, setWard] = useState('');
  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');
  const [interiorStatus, setInteriorStatus] = useState('');
  const [acreage, setAcreage] = useState('');
  const [price, setPrice] = useState('');
  const [deposits, setDeposits] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleClickOpenAddress = () => {
    setOpenAddress(true);
  };
  const handleCloseAddress = () => {
    setOpenAddress(false);
  };

  const handleChangAddress = (dataChild) => {
    setAddress(dataChild.detailAddress);
    setWard(dataChild.ward);
    setDistrict(dataChild.district);
    setProvince(dataChild.province);
    setAddressDetail(`${dataChild.detailAddress}, ${dataChild.ward}, ${dataChild.district}, ${dataChild.province}`);
  };

  const handleChangeInteriorStatus = (event) => {
    setInteriorStatus(event.target.value);
  };
  const handleChangeAcreage = (event) => {
    setAcreage(event.target.value);
  };
  const handleChangePrice = (event) => {
    setPrice(event.target.value);
  };
  const handleChangeDeposits = (event) => {
    setDeposits(event.target.value);
  };
  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleSubmit = () => {
    console.log(addressDetail);
    console.log(interiorStatus);
    console.log(acreage);
    console.log(price);
    console.log(deposits);
    console.log(title);
    console.log(description);
  };
  return (
    <Grid container>
      <Grid item md={3} sx={{ padding: '0 20px' }}>
        <h3>Ảnh/video nhà trọ</h3>
        <p>
          Xem thêm về<Link>Quy định đăng tin</Link>
        </p>
        <UploadItem iconImage title="Đăng từ 3 đến 12 hình" info />
        <br />
        <UploadItem iconVideo title="Tải lên video" />
      </Grid>
      <Grid item md={9}>
        <Grid item container spacing={2} sx={{ margin: '16px', width: 'calc(100% - 48px)' }}>
          <Grid item md={12} sm={12} xs={12} onClick={handleClickOpenAddress}>
            <TextField
              label="Địa chỉ"
              id="outlined-basic"
              //   onChange={handleChangeAddress}
              value={addressDetail}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <DialogDetailAddress
            Address={address}
            WardName={ward}
            DistrictName={district}
            ProvinceName={province}
            open={openAddress}
            Transition={Transition}
            handleClose={handleCloseAddress}
            callbackParent={handleChangAddress}
          />

          <Grid item md={12} sm={12} xs={12}>
            <TextField
              label="Tình trạng nội thất"
              id="outlined-basic"
              onChange={handleChangeInteriorStatus}
              value={interiorStatus}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              label="Diện tích"
              id="outlined-basic"
              onChange={handleChangeAcreage}
              value={acreage}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              label="Giá"
              id="outlined-basic"
              onChange={handleChangePrice}
              value={price}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              label="Số tiền cọc"
              id="outlined-basic"
              onChange={handleChangeDeposits}
              value={deposits}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              label="Tiêu đề bài đăng"
              id="outlined-basic"
              onChange={handleChangeTitle}
              value={title}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <TextField
              label="Mô tả chi tiết"
              id="outlined-basic"
              onChange={handleChangeDescription}
              value={description}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12} onClick={handleSubmit}>
            <Button orange text={'Đăng tin'} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Post;
