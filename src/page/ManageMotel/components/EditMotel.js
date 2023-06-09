import { yupResolver } from '@hookform/resolvers/yup';
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Slide, TextField } from '@mui/material';
import { set } from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import motelApi from '~/api/MotelApi';
import AddIcon from '~/components/AddIcon';
import Button from '~/components/Button/Button';
import DialogDetailAddress from '~/components/DialogDetailAddress';
import Editor from '~/components/Editor';
import InputField from '~/components/HookForm/InputField';
import { STATIC_HOST } from '~/constants';
import StorageKeys from '~/constants/storage-keys';
import { toastMessage } from '~/utils/toast';
import UploadItem from './UploadItem';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
function EditMotel({ socket }) {
  const [status, setStatus] = useState(null);
  const { editSlug } = useParams();
  const [name, id] = editSlug.split('-');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [openAddress, setOpenAddress] = useState(false);
  const [addressDetail, setAddressDetail] = useState('');
  const [address, setAddress] = useState('');
  const [ward, setWard] = useState('');
  const [district, setDistrict] = useState('');
  const [province, setProvince] = useState('');
  const [image, setImage] = useState([]);
  const [video, setVideo] = useState([]);
  const refMedia = useRef([]);
  const [titleImage, setTitleImage] = useState('Đăng từ 3 đến 12 hình');
  const [titleVideo, setTitleVideo] = useState('Tải lên video');
  const [description, setDescription] = useState('');
  const { IdUser, Name } = JSON?.parse(localStorage?.getItem(StorageKeys?.USER));

  useEffect(() => {
    const fetchMotel = async () => {
      await motelApi
        .getInfoMotel({ IdMotel: id, IdUser })
        .then((motelItem) => {
          console.log({ motelItem });
          reset({
            title: motelItem.motel[0].Title,
            interiorStatus: motelItem.motel[0].Status,
            acreage: motelItem.motel[0].Acreage,
            price: motelItem.motel[0].Price,
            deposits: motelItem.motel[0].Deposits,
          });
          const images = motelItem.media.filter((item) => item.Type == 'image');
          const videos = motelItem.media.filter((item) => item.Type == 'video');
          setAddressDetail(
            `${motelItem?.motel[0]?.Address}, ${motelItem?.motel[0]?.WardPrefix} ${motelItem?.motel[0]?.WardName}, ${motelItem?.motel[0]?.DistrictPrefix} ${motelItem?.motel[0]?.DistrictName}, Tp.${motelItem?.motel[0]?.ProvinceName}`,
          );
          setAddress(`${motelItem?.motel[0]?.Address}`);
          setWard(`${motelItem?.motel[0]?.WardName}`);
          setDistrict(`${motelItem?.motel[0]?.DistrictName}`);
          setProvince(`${motelItem?.motel[0]?.ProvinceName}`);
          console.log(
            `${motelItem?.motel[0]?.Address}, ${motelItem?.motel[0]?.WardPrefix} ${motelItem?.motel[0]?.WardName}, ${motelItem?.motel[0]?.DistrictPrefix} ${motelItem?.motel[0]?.DistrictName}, Tp.${motelItem?.motel[0]?.ProvinceName}`,
          );
          console.log(motelItem?.motel[0]);
          setStatus(motelItem?.motel[0]?.Active);
          setDescription(motelItem?.motel[0]?.Description);
          setImage(images);
          setTitleImage(`Tải lên ${images.length} hình ảnh`);
          setTitleVideo(`Tải lên ${videos.length} video`);
          setVideo(videos);
        })
        .finally(() => {
          setLoading(false);
        });
      //   setMotel(motelItem.motel);
      //
      //   setLoading(false);
    };
    fetchMotel();
  }, [id]);

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
    reset,
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
  const handleChangeStatus = (e) => {
    console.log(e.target.value);
    setStatus(e.target.value);
  };
  const handleChangeDescription = (values) => {
    setDescription(values);
  };

  const handleOnSubmit = async (values) => {
    const formData = new FormData();
    console.log(image);
    console.log(video);
    if (image.length > 0) {
      for (const single_file of image) {
        if (single_file.name) {
          console.log(single_file.name);
          formData.append('media', single_file, single_file.name);
        }
      }
    }
    if (video.length > 0) {
      for (const single_file of video) {
        if (single_file.name) {
          console.log(single_file.name);
          formData.append('media', single_file, single_file.name);
        }
      }
    }

    formData.append('mediaDelete', JSON.stringify(refMedia.current));
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
    formData.append('IdMotel', id);
    formData.append('status', status);
    formData.append('notifi', `${Name} vừa đăng phòng trọ mới`);
    console.log('delete media: ', refMedia.current);
    const addMotel = await motelApi.update(formData);
    toastMessage.success(addMotel.msg);
    setTimeout(() => {
      navigate('/manage-motel');
    }, 1500);
  };
  const handleDeleteImage = (src) => {
    console.log(src);
    if (src.srcMedia) {
      refMedia.current.push(src.srcMedia);
    }
    const newImages = image.filter((item) => item.srcMedia !== src.srcMedia || item !== src);
    setImage(newImages);
    setTitleImage(`Tải lên ${newImages.length} hình ảnh`);
  };
  const handleDeleteVideo = (src) => {
    console.log(src);
    console.log(video);

    const newVideos = video.filter((item) => item.srcMedia !== src.srcMedia || item !== src);
    if (src.srcMedia) {
      refMedia.current.push(src.srcMedia);
    }
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

  if (loading) return <h1>loading...</h1>;

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
            <UploadItem title={titleVideo} callback={handleChangeVideo} name="media" _name="video" iconVideo content="video" />
          </Grid>
        </Grid>
      </Grid>
      {(image[0] || video[0]) && (
        <Grid item md={4} sm={8.5} sx={{ marginTop: '16px', padding: '0 10px' }}>
          <Grid container spacing={1}>
            {image.length > 0
              ? image.map((srcImage, index) => {
                  return (
                    <Grid key={index} item md={6} sm={4} xs={6} sx={{ position: 'relative', height: '130px' }}>
                      <img
                        width="100%"
                        height="120px"
                        src={srcImage.name ? URL.createObjectURL(srcImage) : `${STATIC_HOST}motels/${srcImage.srcMedia}`}
                      />
                      <Box
                        onClick={() => handleDeleteImage(srcImage)}
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
                        <AddIcon
                          style={{
                            transform: 'rotate(45deg)',
                            marginTop: '-111px',
                            marginLeft: '138px',
                          }}
                        />
                      </Box>
                    </Grid>
                  );
                })
              : ''}
            {video.length > 0 &&
              video.map((srcVideo) => {
                return (
                  <Grid
                    item
                    md={6}
                    key={srcVideo.name || srcVideo.srcMedia}
                    sm={4}
                    xs={6}
                    sx={{ position: 'relative', height: '130px' }}
                  >
                    <video width="100%" height="120" controls>
                      <source
                        src={srcVideo.srcMedia ? `${STATIC_HOST}motels/${srcVideo.srcMedia}` : URL.createObjectURL(srcVideo)}
                        type="video/mp4"
                      />
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
              })}
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
            <InputField label="Giá" type="number" name="price" errors={errors} required control={control} />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <InputField label="Diện tích" type="number" name="acreage" errors={errors} required control={control} />
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <InputField label="Tiền cọc" type="number" name="deposits" errors={errors} required control={control} />
          </Grid>
          <Grid item md={12} sm={12} xs={12} sx={{ margin: '4px 0' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tình trạng</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleChangeStatus}
              >
                <MenuItem value={'1'}>Cho thuê</MenuItem>
                <MenuItem value={'0'}>Đã cho thuê</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid
            sx={{
              margin: '16px 0',
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
            <Editor handleChangeDescription={handleChangeDescription} content={description} />
          </Grid>
          <Grid item md={12} sm={12} xs={12} sx={{ marginTop: '16px' }}>
            <Button type="submit" orange text={'Lưu thay đổi'} />
          </Grid>
        </Grid>
        {/* </Box> */}
      </Grid>
    </Grid>
  );
}

export default EditMotel;
