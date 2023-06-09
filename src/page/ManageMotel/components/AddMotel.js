import { yupResolver } from '@hookform/resolvers/yup';
import { Box, FormControl, FormHelperText, Grid, InputAdornment, OutlinedInput, Slide, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import motelApi from '~/api/MotelApi';
import AddIcon from '~/components/AddIcon';
import Button from '~/components/Button/Button';
import DialogDetailAddress from '~/components/DialogDetailAddress';
import Editor from '~/components/Editor';
import InputField from '~/components/HookForm/InputField';
import StorageKeys from '~/constants/storage-keys';
import { toastMessage } from '~/utils/toast';
import UploadItem from './UploadItem';
// import AddIcon from '../../components/AddIcon';
// import Editor from './components/Editor';
// import UploadItem from './components/UploadItem';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
function AddMotel({ socket }) {
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
  const [titleImage, setTitleImage] = useState('Đăng từ 3 đến 12 hình');
  const [titleVideo, setTitleVideo] = useState('Tải lên video');
  const { IdUser, Name } = JSON?.parse(localStorage?.getItem(StorageKeys?.USER));
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
    const datas = [...image];
    const a = [...data];
    a.map((item, index) => {
      datas.push(data[index]);
      console.log(index);
      console.log(item.name);
    });
    console.log(datas);
    setImage(datas);
    setTitleImage(`Tải lên ${datas.length} hình ảnh`);
  };

  const handleChangeVideo = (data) => {
    const datas = [...video];
    const a = [...data];
    a.map((item, index) => {
      datas.push(data[index]);
      console.log(index);
      console.log(item.name);
    });
    console.log(datas);
    setVideo(datas);
    setTitleVideo(`Tải lên ${datas.length} video`);
  };

  const handleChangeDescription = (values) => {
    setDescription(values);
  };

  const handleOnSubmit = async (values) => {
    console.log('submit motel');
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
    formData.append('IdUser', IdUser);
    formData.append('interiorStatus', values.interiorStatus);
    formData.append('price', values.price);
    formData.append('province', province);
    formData.append('title', values.title);
    formData.append('ward', ward);
    formData.append('notifi', `${Name} vừa đăng phòng trọ mới`);
    // if (addressDetail)
    if (description == '') {
      toastMessage.error('Nhập mô tả chi tiết');
    } else if (!image[0] && !video[0]) {
      toastMessage.error('Tải ảnh hoặc video lên');
    } else {
      const addMotel = await motelApi.add(formData);
      toastMessage.success(addMotel.msg);
      socket.emit('post-motel', { msg: `${Name} vừa đăng phòng trọ mới`, IdUser });
      setTimeout(() => {
        navigate('/cho-thue-phong-tro');
      }, 2000);
    }
  };
  const handleDeleteImage = (src) => {
    console.log(src);
    const newImages = image.filter((item) => item !== src);
    setImage(newImages);
    setTitleImage(`Tải lên ${newImages.length} hình ảnh`);
    console.log(newImages);
  };
  const handleDeleteVideo = (src) => {
    console.log(src);
    console.log(video);
    const newVideos = video.filter((item) => item !== src);
    console.log(newVideos);
    setVideo(newVideos);
    setTitleVideo(`Tải lên ${newVideos.length} video`);
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
    <Grid container spacing-md-1 component="form" onSubmit={handleSubmit(handleOnSubmit)} sx={{ marginTop: '12px' }}>
      <Toaster />
      <Grid item md={2} sm={3.5} xs={12}>
        <h3>Ảnh/video nhà trọ</h3>
        <p>
          Xem thêm về<Link>&nbsp;Quy định đăng tin</Link>
        </p>
        <Grid container>
          <Grid item md={12} sm={12} xs={5.8}>
            <UploadItem
              callback={handleChangeImage}
              name="media"
              _name="image"
              iconImage
              title={titleImage}
              content="hình ảnh"
              info
            />
          </Grid>
          <hr />
          <Grid item md={12} sm={12} xs={5.8}>
            <UploadItem callback={handleChangeVideo} name="media" _name="video" iconVideo title={titleVideo} content="video" />
          </Grid>
        </Grid>
      </Grid>
      {(image[0] || video[0]) && (
        <Grid item md={4} sm={8.5} sx={{ marginTop: '16px', padding: '0 10px' }}>
          <Grid container spacing={1}>
            {image.length > 0
              ? image.map((src, index) => {
                  return (
                    <Grid key={index} item md={6} sm={4} xs={6} sx={{ position: 'relative', height: '130px' }}>
                      <img width="100%" height="120px" src={URL.createObjectURL(src)} alt="image" />
                      <Box
                        onClick={() => handleDeleteImage(src)}
                        sx={{
                          position: 'absolute',
                          top: '131px',
                          right: '171px',
                          '& svg:hover': {
                            padding: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'red',
                            margin: '10px 35px 0 -11px',
                          },
                        }}
                      >
                        <AddIcon style={{ transform: 'rotate(45deg)', marginTop: '-111px', marginLeft: '138px' }} />
                      </Box>
                    </Grid>
                  );
                })
              : ''}
            {video.length > 0
              ? video.map((srcVideo) => {
                  return (
                    <Grid key={srcVideo.name} item md={6} sm={4} xs={6} sx={{ position: 'relative', height: '130px' }}>
                      <video width="100%" height="120" controls>
                        <source src={URL.createObjectURL(srcVideo)} type="video/mp4" />
                      </video>
                      <Box
                        onClick={() => handleDeleteVideo(srcVideo)}
                        sx={{
                          position: 'absolute',
                          top: '131px',
                          right: '171px',
                          '& svg:hover': {
                            padding: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'red',
                            margin: '10px 35px 0 -11px',
                          },
                        }}
                      >
                        <AddIcon style={{ transform: 'rotate(45deg)', marginTop: '-111px', marginLeft: '138px' }} />
                      </Box>
                    </Grid>
                  );
                })
              : ''}
          </Grid>
        </Grid>
      )}
      <Grid item md={image[0] || video[0] ? 6 : 10} sm={12} sx={{ paddingLeft: '8px' }}>
        {/* <Box sx={{ display: 'flex', justifyContent: 'right' }}> */}
        <Grid
          container
          spacing={0}
          sx={{
            marginBottom: '16px',
            width: 'calc(100%)',
            '& .css-rm5lca-MuiFormControl-root': {
              height: '66px',
            },
          }}
        >
          <Grid item md={12} sm={12} xs={12}>
            <InputField label="Tiêu đề" type="text" name="title" errors={errors} required control={control} />
          </Grid>

          <Grid item md={12} sm={12} xs={12}>
            <InputField
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
              label="Giá"
              type="number"
              name="price"
              errors={errors}
              required
              control={control}
              InputProps="triệu/tháng"
            />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <InputField
              label="Diện tích"
              type="number"
              name="acreage"
              errors={errors}
              required
              control={control}
              InputProps="m2"
            />
          </Grid>
          {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <OutlinedInput
              id="outlined-adornment-weight"
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              aria-describedby="outlined-weight-helper-text"
              inputProps={{
                'aria-label': 'weight',
              }}
            />
            <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
          </FormControl> */}
          <Grid item md={12} sm={12} xs={12}>
            <InputField
              label="Tiền cọc"
              type="number"
              name="deposits"
              errors={errors}
              required
              control={control}
              InputProps="triệu/tháng"
            />
          </Grid>

          <Grid
            sx={{
              margin: '16px 0',
              '& input': {
                padding: '8.5px 14px !important',
              },
              '& label': {
                top: '-6px',
              },
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
        {/* </Box> */}
      </Grid>
    </Grid>
  );
}

export default AddMotel;
