import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';

import questionApi from '~/api/QuestionApi';
import { toastMessage } from '~/utils/toast';
import Button from '~/components/Button/Button';
import InputField from '~/components/HookForm/InputField';

export const EditQuestion = () => {
  const { editSlug } = useParams();
  const [name, id] = editSlug.split('-');
  const [active, setActive] = useState('');
  const navigate = useNavigate();

  const handleChangeActive = (e) => {
    setActive(e.target.value);
  };
  const schema = yup.object().shape({
    question: yup.string().required('Vui lòng nhập question'),
  });
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      question: '',
    },
    resolver: yupResolver(schema),
  });

  const fetchQuestions = async () => {
    const questionItem = await questionApi.get(id);
    reset({
      question: questionItem.question[0].Content,
    });
    setActive(questionItem.question[0].Active);
  };
  useEffect(() => {
    fetchQuestions();
  }, [id]);

  const handleOnSubmit = async (values) => {
    const result = await questionApi.update({ id, question: values.question, active });
    toastMessage.success(result.msg);
    setTimeout(() => {
      navigate('/admin/question/list');
    }, 2000);
  };

  return (
    <Grid
      component="form"
      onSubmit={handleSubmit(handleOnSubmit)}
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
          label="Question"
          name="question"
          type="text"
          errors={errors}
          required
          control={control}
        />
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
      <Grid item sx={{ width: '100px', '& button': { borderRadius: '10px' } }}>
        <div onClick={handleSubmit}>
          <Button type="submit" orange text={'Lưu'} />
        </div>
      </Grid>
      <Grid item sx={{ width: '100px', '& button': { borderRadius: '10px' } }}>
        <Link to="/admin/question/list">
          <Button danger text={'Hủy bỏ'} />
        </Link>
      </Grid>
    </Grid>
  );
};
