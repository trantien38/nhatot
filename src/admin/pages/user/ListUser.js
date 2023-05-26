import { Delete, Edit, LockClockOutlined, LockOpenOutlined } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';

import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import adminApi from '~/api/AdminApi';

import { toastMessage } from '~/utils/toast';
import ToolTip from './ToolTip';
import EditToolbar from './UserToolbar';

// const handleChangeActive = (data) => {};

export const ListUser = () => {
  const columns = [
    { field: 'IdUser', headerName: 'ID', width: 100 },
    { field: 'Name', headerName: 'Họ và tên', width: 120 },
    // { field: 'Email', headerName: 'Email', width: 100 },
    { field: 'BirthDay', headerName: 'Ngày sinh', width: 120 },
    { field: 'PhoneNumber', headerName: 'Số điện thoại', width: 110 },
    { field: 'Gender', headerName: 'Giới tính', width: 100 },
    { field: 'Address', headerName: 'Địa chỉ', width: 180 },
    // { field: 'Active', headerName: 'Trạng thái', width: 180 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Hành động',
      width: 200,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <Link to={`/admin/user/edit-${params.id}`}>
            <GridActionsCellItem
              sx={{ '& svg': { width: '23px', height: '23px' } }}
              icon={<Edit />}
              label="Edit"
              className="textPrimary"
              color="inherit"
            />
          </Link>,
          <GridActionsCellItem
            onClick={() => handleClickOpen({ IdUser: params.id, Active: params.row.Active })}
            sx={{
              '& svg': {
                width: '23px',
                height: '23px',
              },
            }}
            icon={
              params.row.Active == 1 ? (
                <ToolTip icon={<LockOpenOutlined sx={{ color: 'green' }} />} toolTipText="Chưa khóa" />
              ) : (
                <ToolTip icon={<LockClockOutlined sx={{ color: 'red' }} />} toolTipText="Đã khóa" />
              )
            }
            label="Delete"
            color="inherit"
          />,
        ];
      },
    },
  ];

  const height = window.innerHeight;
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [status, setStatus] = useState(null);

  const [rowModesModel, setRowModesModel] = useState({});
  useEffect(() => {
    (async () => {
      const userList = await adminApi.getAllUser();
      console.log(userList);
      setUsers(userList.user);
    })();
  }, []);

  const handleClickOpen = (data) => {
    console.log(data);
    setId(data.IdUser);
    setStatus(data.Active);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    console.log({ id, status });
    const changeStatus = await adminApi.adminChangeStatusUser({ id, status });
    toastMessage.success(changeStatus.msg);
    setOpen(false);
    setUsers(changeStatus.user);
  };

  return (
    <Box sx={{ height: `calc(${height}px - 120px)`, width: '100%' }}>
      <Toaster />
      <DataGrid
        getRowId={(users) => users.IdUser}
        rows={users}
        rowModesModel={rowModesModel}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[25]}
        checkboxSelection
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setUsers, setRowModesModel },
        }}
        sx={{
          fontSize: '14px',
          '& .actions': {
            overflow: 'visible !important',
          },
        }}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {status == 1 ? 'Bạn có muốn khóa người dùng này không?' : 'Bạn có muốn mở khóa người dùng này không?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {status == 1 ? 'Khóa người dùng' : 'Mở khóa người dùng'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSubmit()}>Đồng ý</Button>
          <Button onClick={handleClose} autoFocus>
            Hủy bỏ
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
