import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import questionApi from '~/api/QuestionApi';
import QuestionToolbar from './QuestionToolbar';

export const ListQuestion = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 38 },
    { field: 'content', headerName: 'Question', width: 330 },
    { field: 'active', headerName: 'Active', width: 80 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <Link to={`/admin/question/edit-${id}`}>
            <GridActionsCellItem icon={<Edit />} label="Edit" className="textPrimary" color="inherit" />
          </Link>,
          <Link onClick={() => handleClickOpen(id)}>
            <GridActionsCellItem icon={<Delete />} label="Delete" color="inherit" />
          </Link>,
        ];
      },
    },
  ];
  const handleSubmit = async (idQuestion) => {
    console.log(idQuestion);
    const removeQuestion = await questionApi.remove(idQuestion);
    setOpen(false);
    console.log(removeQuestion);
  };

  const [open, setOpen] = useState(false);
  const height = window.innerHeight;
  const [questions, setQuestions] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [idQuestion, setIdQuestion] = useState();
  useEffect(() => {
    const fetchQuestions = async () => {
      const questionList = await questionApi.getAll();
      setQuestions(questionList.question);
    };
    fetchQuestions();
  }, [questions]);

  const handleClickOpen = (id) => {
    console.log(id);
    setOpen(true);
    setIdQuestion(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ margin: '0 30px 0 46px' }}>
      <div style={{ height: `calc(${height}px - 120px)`, width: '100%' }}>
        <DataGrid
          getRowId={(questions) => questions.id}
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
        />
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Confirm delete this question?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone. Do you want to continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSubmit(idQuestion)}>Delete</Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
