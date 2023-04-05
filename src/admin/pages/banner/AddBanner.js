import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Slide, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bannerApi from '~/api/BannerApi';
import Button from '~/components/Button/Button';

export const AddBanner = () => {
  const [active, setActive] = useState('');
  // const [banner, setBanner] = useState({
  //   file: [],
  // });
  const [file, setFile] = useState({});
  const [fileName, setFileName] = useState('');

  const handleChangeActive = (e) => {
    setActive(e.target.value);
  };
  const handleChangeBanner = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    console.log(e.target.files[0]);

    // setBanner({
    //   ...banner,
    //   file: e.target.files[0],
    // });
  };
  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append('fileName', fileName);
    formData.append('file', file);

    console.log(file);
    console.log(fileName);
    console.log(formData.get("file"));
    console.log(formData.get("fileName"));

    // axios
    //   .post('http://localhost:8000/banner', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then((res) => {
    //     console.warn(res);
    //   });

    // formData.append('file', file);
    const addQuestion = await bannerApi.add(formData);
    // console.log(addQuestion.msg);
    // setTimeout(() => {
    //   navigate('/admin/question/list');
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
            {/* <form action="/profile" method="post" enctype="multipart/form-data"> */}
            <label htmlFor="image">Upload banner: </label>
            <input id="image" type="file" name="image" onChange={handleChangeBanner} />
            {/* </form> */}
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
