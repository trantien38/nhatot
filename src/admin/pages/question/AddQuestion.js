import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Slide, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import questionApi from '~/api/QuestionApi';
import Button from '~/components/Button/Button';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export const AddQuestion = () => {
  const [active, setActive] = useState('');
  const [question, setQuestion] = useState('');

  const navigate = useNavigate();

  const handleChangeActive = (e) => {
    setActive(e.target.value);
  };
  const handleChangeQuestion = (e) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async () => {
    const addQuestion = await questionApi.add({ active, question });
    console.log(addQuestion.msg);
    setTimeout(() => {
      navigate('/admin/question/list');
    }, 2000);
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
          <TextField
            item
            label="Question"
            id="outlined-basic"
            variant="outlined"
            fullWidth
            value={question}
            onChange={handleChangeQuestion}
          />
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
