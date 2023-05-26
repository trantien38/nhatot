import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import questionApi from '~/api/QuestionApi';
import { toastMessage } from '~/utils/toast';
import QuestionToolbar from './QuestionToolbar';

export const ListQuestion = () => {
  const [open, setOpen] = useState(false);
  const height = window.innerHeight;
  const [questions, setQuestions] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [idQuestion, setIdQuestion] = useState();

  const columns = [
    // { field: 'id', headerName: 'STT', width: 38 },
    { field: 'IdQuestion', headerName: 'ID', width: 168 },
    { field: 'Content', headerName: 'Question', width: 280 },
    { field: 'Active', headerName: 'Active', width: 80 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <Link to={`/admin/question/edit-${id}`}>
            <GridActionsCellItem
              sx={{ '& svg': { width: '23px', height: '23px' } }}
              icon={<Edit />}
              label="Edit"
              className="textPrimary"
              color="inherit"
            />
          </Link>,
          <Link onClick={() => handleClickOpen(id)}>
            <GridActionsCellItem
              sx={{ '& svg': { width: '23px', height: '23px' } }}
              icon={<Delete sx={{ color: 'red' }} />}
              label="Delete"
              color="inherit"
            />
          </Link>,
        ];
      },
    },
  ];

  useEffect(() => {
    (async () => {
      const questionList = await questionApi.getAll();
      setQuestions(questionList.question);
    })();
  }, []);

  const handleClickOpen = (id) => {
    console.log(id);
    setOpen(true);
    setIdQuestion(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (idQuestion) => {
    console.log(idQuestion);
    const removeQuestion = await questionApi.remove(idQuestion);
    setOpen(false);
    setQuestions(removeQuestion.question);
    toastMessage.success(removeQuestion.msg);
    console.log(removeQuestion.question);
  };

  return (
    <Box>
      <Toaster />
      <Box sx={{ height: `calc(${height}px - 120px)`, width: '100%' }}>
        <DataGrid
          getRowId={(questions) => questions.IdQuestion}
          rows={questions}
          rowModesModel={rowModesModel}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[25]}
          checkboxSelection
          slots={{
            toolbar: QuestionToolbar,
          }}
          slotProps={{
            toolbar: { setQuestions, setRowModesModel },
          }}
          sx={{ fontSize: '14px' }}
        />
      </Box>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Xác nhận xóa câu hỏi này?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ fontSize: '14px' }}>
            Hành động này không thể được hoàn tác. Bạn có muốn tiếp tục?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ '& button': { fontSize: '14px' } }}>
          <Button sx={{ '&:hover': { backgroundColor: 'red', color: 'white' } }} onClick={() => handleSubmit(idQuestion)}>
            Xóa
          </Button>
          <Button onClick={handleClose} autoFocus>
            Hủy bỏ
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
