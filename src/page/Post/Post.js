import { Box, Grid, Slide, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '~/components/Button/Button';
import InputField from '~/components/HookForm/InputField';
import DialogDetailAddress from '../Auth/Profile/components/DialogDetailAddress';
import UploadItem from './components/UploadItem';
import styles from './Post.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
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

  const schema = yup.object().shape({
    interiorStatus: yup.string().required('Vui lòng nhập tình trạng nội thất'),
    description: yup.string().required('Vui lòng nhập mô tả').min(6, 'Password is too short'),
    acreage: yup.string().required('Vui lòng nhập diện tích phòng trọ'),
    price: yup.string().required('Vui lòng nhập giá'),
    deposits: yup.string().required('Vui lòng nhập số tiền cọc'),
    title: yup.string().required('Vui lòng nhập tiêu đề'),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      interiorStatus: '',
      acreage: '',
      price: '',
      deposits: '',
      title: '',
      description: '',
    },
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = async (values) => {
    console.log({ ...values, ward, province });
  };
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

  return (
    <Grid container component="form" onSubmit={handleSubmit(handleOnSubmit)}>
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
          <Grid sx={{ '& input': {} }} item md={12} sm={12} xs={12} onClick={handleClickOpenAddress}>
            {/* <InputField
              sx={{
                fontSize: 2,
                color: 'red',
                '& label': {
                  fontSize: 14,
                },
                '& svg': {
                  fontSize: 18,
                },
                
              }}
              value={addressDetail}
              label="Địa chỉ"
              type="addres"
              name="address"
              errors={errors}
              required
              control={control}
            /> */}
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
            <InputField
              sx={{
                fontSize: 2,
                color: 'red',
                '& label': {
                  fontSize: 14,
                },
                '& svg': {
                  fontSize: 18,
                },
                
              }}
              label="Tình trạng nội thất"
              type="interiorStatus"
              name="interiorStatus"
              errors={errors}
              required
              control={control}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <InputField
              sx={{
                fontSize: 2,
                color: 'red',
                '& label': {
                  fontSize: 14,
                },
                '& svg': {
                  fontSize: 18,
                },
                
              }}
              label="Giá"
              type="price"
              name="price"
              errors={errors}
              required
              control={control}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <InputField
              sx={{
                fontSize: 2,
                color: 'red',
                '& label': {
                  fontSize: 14,
                },
                '& svg': {
                  fontSize: 18,
                },
                
              }}
              label="Diện tích"
              type="acreage"
              name="acreage"
              errors={errors}
              required
              control={control}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <InputField
              sx={{
                fontSize: 2,
                color: 'red',
                '& label': {
                  fontSize: 14,
                },
                '& svg': {
                  fontSize: 18,
                },
                
              }}
              label="Tiền cọc"
              type="deposits"
              name="deposits"
              errors={errors}
              required
              control={control}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <InputField
              sx={{
                fontSize: 2,
                color: 'red',
                '& label': {
                  fontSize: 14,
                },
                '& svg': {
                  fontSize: 18,
                },
                
              }}
              label="Mô tả"
              type="description"
              name="description"
              errors={errors}
              required
              control={control}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <InputField
              sx={{
                fontSize: 2,
                color: 'red',
                '& label': {
                  fontSize: 14,
                },
                '& svg': {
                  fontSize: 18,
                },
                
              }}
              label="Tiêu đề"
              type="title"
              name="title"
              errors={errors}
              required
              control={control}
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <Button type="submit" orange text={'Đăng tin'} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Post;
