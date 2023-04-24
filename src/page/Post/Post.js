import { Box, Grid, Slide, TextareaAutosize, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '~/components/Button/Button';
import InputField from '~/components/HookForm/InputField';
import DialogDetailAddress from '../Auth/Profile/components/DialogDetailAddress';
import UploadItem from './components/UploadItem';
import styles from './Post.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import StorageKeys from '~/constants/storage-keys';
import motelApi from '~/api/MotelApi';
import { toastMessage } from '~/utils/toast';
import { Toaster } from 'react-hot-toast';
import AddIcon from './components/AddIcon';
import TextareaForm from '~/components/HookForm/TextareaForm';
import Editor from './components/Editor';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
function Post({ socket }) {
  const navigate = useNavigate();
  const [openAddress, setOpenAddress] = useState(false);
  const [addressDetail, setAddressDetail] = useState('');
  const [address, setAddress] = useState('');
  const [ward, setWard] = useState('');
  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState([]);
  const [description, setDescription] = useState('');

  const idUser = JSON?.parse(localStorage?.getItem(StorageKeys?.USER)).IdUser;
  const schema = yup.object().shape({
    interiorStatus: yup.string().required('Vui lòng nhập tình trạng nội thất'),
    // description: yup.string().required('Vui lòng nhập mô tả').min(20, 'Mô tả quá ngắn'),
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
      // description: '',
    },
    resolver: yupResolver(schema),
  });

  const handleChangeImage = (data) => {
    console.log(data);
    const datas = [];
    const a = [...data];
    a.map((item, index) => {
      datas.push(data[index]);
      console.log(index);
      console.log(item.name);
    });
    console.log(datas);
    setImage(datas);
  };

  const handleChangeVideo = (data) => {
    const datas = [];
    const a = [...data];
    a.map((item, index) => {
      datas.push(data[index]);
      console.log(index);
      console.log(item.name);
    });
    console.log(datas);
    setVideo(datas);
  };

  const handleChangeDescription = (values) => {
    setDescription(values);
    console.log(values);
  };

  const handleOnSubmit = async (values) => {
    console.log(123);
    const formData = new FormData();
    for (const single_file of image) {
      formData.append('media', single_file, single_file.name);
    }
    for (const single_file of video) {
      formData.append('media', single_file, single_file.name);
    }
    formData.append('acreage', values.acreage);
    formData.append('address', address);
    formData.append('deposits', values.deposits);
    formData.append('description', description);
    formData.append('idUser', idUser);
    formData.append('interiorStatus', values.interiorStatus);
    formData.append('price', values.price);
    formData.append('province', province);
    formData.append('title', values.title);
    formData.append('ward', ward);
    console.log({ ...values, ward, province, address, image, idUser });

    const addMotel = await motelApi.add(formData);
    console.log(addMotel);
    toastMessage.success(addMotel.msg);
    // setTimeout(() => {
    //   navigate('/cho-thue-phong-tro');
    // }, 1500);
  };
  const handleDeleteImage = (src) => {
    console.log(123);
    const newImages = image.filter((item) => item !== src);
    setImage(newImages);
  };
  const handleDeleteVideo = (src) => {
    console.log(src);
    const newVideos = video.filter((item) => item !== src);
    setVideo(newVideos);
    console.log(newVideos);
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
      <Toaster />
      <Grid item md={2} sx={{ padding: '20px 20px 20px 0' }}>
        <h3>Ảnh/video nhà trọ</h3>
        <p>
          Xem thêm về<Link>Quy định đăng tin</Link>
        </p>
        <UploadItem
          callback={handleChangeImage}
          name="media"
          _name="image"
          iconImage
          title="Đăng từ 3 đến 12 hình"
          content="hình ảnh"
          info
        />
        <br />
        <UploadItem callback={handleChangeVideo} name="media" _name="video" iconVideo title="Tải lên video" content="video" />
      </Grid>
      {(image[0] || video[0]) && (
        <Grid item md={4} sx={{ marginTop: '16px' }}>
          <Grid container spacing={1}>
            {image[0]
              ? image.map((src) => {
                  return (
                    <Grid item md={6} height="130px">
                      <img width="100%" height="120px" src={URL.createObjectURL(src)} />
                      <span onClick={() => handleDeleteImage(src)}>
                        <AddIcon style={{ transform: 'rotate(45deg)' }} />
                      </span>
                    </Grid>
                  );
                })
              : ''}
            {video[0]
              ? video.map((srcVideo) => {
                  return (
                    <Grid item md={6} height="130px">
                      <video width="100%" height="120" controls>
                        <source src={URL.createObjectURL(srcVideo)} type="video/mp4" />
                      </video>
                      <span onClick={() => handleDeleteVideo(srcVideo)}>
                        <AddIcon style={{ transform: 'rotate(45deg)' }} />
                      </span>
                    </Grid>
                  );
                })
              : ''}
          </Grid>
        </Grid>
      )}
      <Grid item md={image[0] || video[0] ? 6 : 10}>
        <Grid
          item
          container
          spacing={0}
          sx={{
            margin: '16px',
            width: 'calc(100% - 48px)',
            '& .css-rm5lca-MuiFormControl-root': {
              height: '66px',
            },
          }}
        >
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
              type="text"
              name="title"
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
              label="Tình trạng nội thất"
              type="text"
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
              type="number"
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
              type="number"
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
              type="number"
              name="deposits"
              errors={errors}
              required
              control={control}
            />
          </Grid>

          <Grid
            sx={{
              marginBottom: '16px',
            }}
            item
            md={12}
            sm={12}
            xs={12}
            onClick={handleClickOpenAddress}
          >
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
            <Editor handleChangeDescription={handleChangeDescription} />
          </Grid>
          <Grid item md={12} sm={12} xs={12} sx={{ marginTop: '16px' }}>
            <Button type="submit" orange text={'Đăng tin'} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Post;
