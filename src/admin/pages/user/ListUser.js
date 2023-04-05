import { Delete, Edit } from '@mui/icons-material';
import { Box } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userApi from '~/api/UserApi';
import EditToolbar from './UserToolbar';

const columns = [
  { field: 'IdUser', headerName: 'ID', width: 38 },
  { field: 'Name', headerName: 'Full name', width: 130 },
  { field: 'Email', headerName: 'Email', width: 180 },
  { field: 'BirthDay', headerName: 'Birth day', width: 120 },
  { field: 'PhoneNumber', headerName: 'Phone number', width: 120 },
  { field: 'Gender', headerName: 'Gender', width: 90 },
  { field: 'Address', headerName: 'Address', width: 160 },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ id }) => {
      return [
        <Link to={`/admin/user/edit-${id}`}>

        <GridActionsCellItem icon={<Edit />} label="Edit" className="textPrimary" color="inherit" />
        </Link>,
        <GridActionsCellItem icon={<Delete />} label="Delete" color="inherit" />,
      ];
    },
  },
];

export const ListUser = () => {
  const height = window.innerHeight;
  const [users, setUsers] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  useEffect(() => {
    const fetchUsers = async () => {
      const userList = await userApi.getAllUser();
      console.log(userList);
      setUsers(userList.user);
    };
    fetchUsers();
  }, []);

  return (
    <Box sx={{ margin: '0 30px 0 46px' }}>
      <div style={{ height: `calc(${height}px - 120px)`, width: '100%' }}>
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
        />
      </div>
    </Box>
  );
};
