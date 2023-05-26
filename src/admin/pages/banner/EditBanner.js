import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Slide, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import adminApi from '~/api/AdminApi';
import AddIcon from '~/components/AddIcon';

import Button from '~/components/Button/Button';
import { STATIC_HOST } from '~/constants';
import { toastMessage } from '~/utils/toast';
import IconAddImage from './IconAddImage';

export const EditBanner = () => {
  const { editSlug } = useParams();
  const [name, id] = editSlug.split('-');
  const [active, setActive] = useState('');
  const [banner, setBanner] = useState(null);
  const navigate = useNavigate();
  const handleChangeActive = (e) => {
    setActive(e.target.value);
  };
  const handleChangeBanner = (e) => {
    console.log(e.target.files);
    setBanner(e.target.files);
  };

  useEffect(() => {
    (async () => {
      const bannerItem = await adminApi.adminGetBanner(id);
      console.log(bannerItem);
      setBanner(bannerItem.banner);
      setActive(bannerItem.banner[0].Active);
    })();
  }, [id]);

  const handleSubmit = async () => {
    console.log({ id, banner, active });
    const formData = new FormData();
    if (!banner[0].srcBanner) {
      for (const single_file of banner) {
        formData.append('banner', single_file, single_file.name);
      }
    }
    formData.append('id', id);
    formData.append('active', active);

    const result = await adminApi.adminUpdateBanner(formData);
    console.log(result.msg);
    toastMessage.success(result.msg);
    setTimeout(() => {
      navigate('/admin/banner/list');
    }, 2000);
  };
  const handleDeleteBanner = (src) => {
    console.log(src);
    // const newBanners = banner.filter((item) => item !== src);
    setBanner(null);
    // setTitle(`Tải lên 0 banner`);
    // console.log(newBanners);
  };
  console.log(banner);
  return (
    <Grid
      sx={{
        boxShadow: '0 .15rem 1.75rem 0 rgba(58,59,69,.15)',
        border: '1px solid #e3e6f0',
        borderRadius: '0.35rem',

        backgroundColor: '#fff',
        marginTop: '0px',
        marginBottom: '12px',
        padding: '0 16px 16px 0 ',
        '& h3': {
          margin: 0,
        },
        '& input': {
          fontSize: '14px',
        },
        '& label': {
          fontSize: '14px',
        },
        '& p': {
          fontSize: '14px',
        },
      }}
      container
      spacing={1}
    >
      <Toaster />
      <Grid item md={12} sm={12} xs={12}>
        <FormControl fullWidth>
          {/* <form action="/profile" method="post" enctype="multipart/form-data">
            <label htmlFor="banner">Upload banner: </label>
            <input id="banner" type="file" name="banner" multiple onChange={handleChangeBanner} />
          </form> */}
          <IconAddImage title={'Chọn banner: '} />
          <input id="banner" accept={`image/*`} hidden type="file" multiple name="banner" onChange={handleChangeBanner} />
        </FormControl>
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <Grid container spacing={2}>
          {banner && (
            <Grid key={banner} item md={3} sm={4} xs={6} sx={{ position: 'relative', height: '130px' }}>
              <img
                width="100%"
                height="100%"
                src={banner[0]?.srcBanner ? `${STATIC_HOST}banners/${banner[0]?.srcBanner}` : URL.createObjectURL(banner[0])}
                alt="image"
              />
              <Box
                onClick={() => handleDeleteBanner(banner)}
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
          )}
        </Grid>
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" value={active}>
            Trạng thái
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={active}
            label="status"
            onChange={handleChangeActive}
          >
            <MenuItem value={1}>Hiển thị</MenuItem>
            <MenuItem value={0}>Ẩn</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item sx={{ width: '100px', '& button': { borderRadius: '10px' } }} onClick={handleSubmit}>
        <Button orange text={'Lưu'} />
      </Grid>
      <Grid item sx={{ width: '100px', '& button': { borderRadius: '10px' } }}>
        <Link to="/admin/banner/list">
          <Button danger text={'Hủy bỏ'} />
        </Link>
      </Grid>
    </Grid>
  );
};
