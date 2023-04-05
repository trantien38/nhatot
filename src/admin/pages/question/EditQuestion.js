import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Slide, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import questionApi from '~/api/QuestionApi';
import Button from '~/components/Button/Button';
import { toastMessage } from '~/utils/toast';

export const EditQuestion = () => {
  const { editSlug } = useParams();
  const [name, id] = editSlug.split('-');
  const [active, setActive] = useState('');
  const [question, setQuestion] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();


  const handleChangeActive = (e) => {
    setActive(e.target.value);
  };
  const handleChangeQuestion = (e) => {
    setQuestion(e.target.value);
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const questionItem = await questionApi.get(id);
      setQuestion(questionItem.question[0].content);
      setActive(questionItem.question[0].active);
    };
    fetchQuestions();
  }, [id]);

  const handleSubmit = async () => {
    console.log({ id, question, active });
    const result = await questionApi.update({ id, question, active });
    console.log(result.msg);
    // toastMessage.success(result.msg);
    setMsg(result.msg);
    setTimeout(() => {
      navigate("/admin/question/list")
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
        {msg && <p>{msg}</p>}
        <Grid item md={12} sm={12} xs={12}>
          <TextField item label="Question" id="outlined-basic" variant="outlined" fullWidth value={question} onChange={handleChangeQuestion} />
        </Grid>

        <Grid item md={12} sm={12} xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label" value={active}>
              Active
            </InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={active} label="Gender" onChange={handleChangeActive}>
              <MenuItem value={1}>Hoạt động</MenuItem>
              <MenuItem value={0}>Không hoạt động</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sx={{ width: '100px', '& button': { borderRadius: '10px' } }}>
          <div onClick={handleSubmit}>
            <Button orange text={'Save'} />
          </div>
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
