import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Slide, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import bannerApi from '~/api/BannerApi';

import Button from '~/components/Button/Button';

export const EditBanner = () => {
  const { editSlug } = useParams();
  const [name, id] = editSlug.split('-');
  const [active, setActive] = useState('');
  const [banner, setBanner] = useState('');

  const handleChangeActive = (e) => {
    setActive(e.target.value);
  };
  const handleChangeBanner = (e) => {
    setBanner(e.target.value);
  };

  useEffect(() => {
    const fetchBanners = async () => {
      const bannerItem = await bannerApi.get(id);
      setBanner(bannerItem.banner[0].img);
      setActive(bannerItem.banner[0].active);
    };
    fetchBanners();
  }, [id]);

  const handleSubmit = async () => {
    console.log({ id, banner, active });
    // const result = await questionApi.update({ id, question, active });
    // console.log(result.msg);
    // toastMessage.success(result.msg);
    // setMsg(result.msg);
    // setTimeout(() => {
    //   navigate("/admin/question/list")
    // }, 2000);
  };

  return (
    <Box sx={{ margin: '0 30px 0 46px' }}>
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
        }}
        container
        spacing={2}
      >
        <Grid item md={12} sm={12} xs={12}>
          <FormControl fullWidth>
            <form action="/profile" method="post" enctype="multipart/form-data">
              <label htmlFor="banner">Upload banner: </label>
              <input id="banner" type="file" name="banner" multiple onChange={handleChangeBanner} />
            </form>
          </FormControl>
        </Grid>

        <Grid item md={12} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" value={active}>
              Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={active}
              label="Gender"
              onChange={handleChangeActive}
            >
              <MenuItem value={1}>Activated</MenuItem>
              <MenuItem value={0}>Not activated</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '100px', '& button': { borderRadius: '10px' } }} onClick={handleSubmit}>
          <Button orange text={'Add'} />
        </Grid>
        <Grid item sx={{ width: '100px', '& button': { borderRadius: '10px' } }}>
          <Link to="/admin/question/list">
            <Button danger text={'Cancel'} />
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};
