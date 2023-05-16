import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Slide, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bannerApi from '~/api/BannerApi';
import Button from '~/components/Button/Button';

export const AddBanner = () => {
  const [active, setActive] = useState('');
  const [title, setTitle] = useState('Tải lên banner:');
  const [file, setFile] = useState({});

  const handleChangeActive = (e) => {
    setActive(e.target.value);
  };
  const handleChangeBanner = (e) => {
    setFile(e.target.files);
    console.log(e.target.files[0]);
    setTitle(`Tải lên ${e.target.files.length} banner`);
  };
  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('active', active);

    // const addQuestion = await bannerApi.add(formData);
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
            <label htmlFor="image" style={{ cursor: 'pointer' }}>
              <b style={{ position: 'relative', top: '-14px' }}>{title}&nbsp;&nbsp;</b>

              <svg xmlns="http://www.w3.org/2000/svg" width="53" height="39" viewBox="0 0 53 39">
                <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                  <g stroke="#FF8800" strokeWidth="2" transform="translate(-255 -179)">
                    <g transform="translate(132 122)">
                      <path d="M150.631 87.337c-5.755 0-10.42-4.534-10.42-10.127 0-5.593 4.665-10.127 10.42-10.127s10.42 4.534 10.42 10.127c0 5.593-4.665 10.127-10.42 10.127m10.42-24.755l-2.315-4.501h-16.21l-2.316 4.5h-11.579s-4.631 0-4.631 4.502v22.505c0 4.5 4.631 4.5 4.631 4.5h41.684s4.631 0 4.631-4.5V67.083c0-4.501-4.631-4.501-4.631-4.501h-9.263z"></path>
                    </g>
                  </g>
                </g>
              </svg>
              <span
                style={{
                  position: 'absolute',
                  marginTop: '-14px',
                  marginLeft: '-4px',
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 21">
                  <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                    <g fill="#FF8800" transform="translate(-161 -428)">
                      <g transform="translate(132 398)">
                        <g transform="translate(16.648 17.048)">
                          <g transform="rotate(-180 16.142 16.838)">
                            <rect width="2.643" height="19.82" x="8.588" y="0" rx="1.321"></rect>
                            <path
                              d="M9.91 0c.73 0 1.321.592 1.321 1.321v17.177a1.321 1.321 0 01-2.643 0V1.321C8.588.591 9.18 0 9.91 0z"
                              transform="rotate(90 9.91 9.91)"
                            ></path>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </span>
            </label>
            <input id="image" hidden type="file" multiple name="image" onChange={handleChangeBanner} />
          </FormControl>
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
          <Button orange text={'Add'} />
        </Grid>
        <Grid item sx={{ width: '100px', '& button': { borderRadius: '10px' } }}>
          {/* <Link to="/admin/question/list"> */}
            <Button linkTo="/admin/question/list" danger text={'Cancel'} />
          {/* </Link> */}
        </Grid>
      </Grid>
    </Box>
  );
};
