import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Slide, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import adminApi from '~/api/AdminApi';
import bannerApi from '~/api/BannerApi';
import AddIcon from '~/components/AddIcon';
import Button from '~/components/Button/Button';
import { toastMessage } from '~/utils/toast';
import IconAddImage from './IconAddImage';

export const AddBanner = () => {
  const [active, setActive] = useState('');
  const [title, setTitle] = useState('Tải lên banner:');
  const [banner, setBanner] = useState([]);
  const navigate = useNavigate();
  const handleChangeActive = (e) => {
    setActive(e.target.value);
  };
  const handleChangeBanner = (e) => {
    const data = e.target.files;
    const datas = [...banner];
    const a = [...data];
    a.map((item, index) => {
      datas.push(data[index]);
      console.log(index);
      console.log(item.name);
    });
    setBanner(datas);
    console.log(e.target.files);
    setTitle(`Tải lên ${e.target.files.length} banner`);
  };
  const handleDeleteBanner = (src) => {
    console.log(src);
    const newBanners = banner.filter((item) => item !== src);
    setBanner(newBanners);
    setTitle(`Tải lên ${newBanners.length} banner`);
    console.log(newBanners);
  };
  const handleSubmit = async (e) => {
    const formData = new FormData();
    // formData.append('banner', banner);
    for (const single_file of banner) {
      formData.append('banner', single_file, single_file.name);
    }
    formData.append('active', active);
    console.log(banner, active, active == '');
    if (banner.length == 0) {
      toastMessage.error('Bạn chưa tải banner lên');
    } else if (active == '') {
      toastMessage.error('Bạn chưa chọn trạng thái cho banner');
    } else {
      const addQuestion = await adminApi.adminAddBanner(formData);
      toastMessage.success(addQuestion.msg);

      setTimeout(() => {
        navigate('/admin/banner/list');
      }, 2000);
    }
  };
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
          <IconAddImage title={title} />
          <input id="banner" accept={`image/*`} hidden type="file" multiple name="banner" onChange={handleChangeBanner} />
        </FormControl>
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <Grid container spacing={2}>
          {banner[0]
            ? banner.map((src, index) => {
                return (
                  <Grid key={index} item md={4} sm={6} xs={12} sx={{ position: 'relative', height: '130px' }}>
                    <img width="100%" height="100%" src={URL.createObjectURL(src)} alt="image" />
                    <Box
                      onClick={() => handleDeleteBanner(src)}
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
      <Grid item md={12} sm={12} xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" value={active}>
            Trạng thái
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={active}
            label="Gender"
            onChange={handleChangeActive}
          >
            <MenuItem value={1}>Hiển thị</MenuItem>
            <MenuItem value={0}>Ẩn</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item sx={{ width: '100px', '& button': { borderRadius: '10px' } }} onClick={handleSubmit}>
        <Button orange text={'Thêm'} />
      </Grid>
      <Grid item sx={{ width: '100px', '& button': { borderRadius: '10px' } }}>
        <Link to="/admin/banner/list">
          <Button danger text={'Hủy bỏ'} />
        </Link>
      </Grid>
    </Grid>
  );
};
