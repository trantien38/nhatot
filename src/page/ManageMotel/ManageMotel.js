import { Delete, Edit } from '@mui/icons-material';
import { Box } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import motelApi from '~/api/MotelApi';
import StorageKeys from '~/constants/storage-keys';
import MotelToolbar from './components/MotelToolbar';

const columns = [
  { field: 'IdMotel', headerName: 'ID', width: 168 },
  { field: 'Title', headerName: 'Tiêu đề', width: 280 },
  { field: 'Price', headerName: 'Giá thuê', width: 80 },
  { field: 'Acreage', headerName: 'Diện tích', width: 80 },
  { field: 'Address', headerName: 'Địa chỉ', width: 220 },
  { field: 'Deposits', headerName: 'Tiền cọc', width: 80 },
  // { field: 'Status', headerName: 'Tình trạng', width: 90 },
  // { field: 'Description', headerName: 'Mô tả', width: 90 },
  // { field: 'Price', headerName: 'Price', width: 80 },

  {
    field: 'actions',
    type: 'actions',
    headerName: 'Thao tác',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ id }) => {
      return [
        <Link to={`/manage-motel/edit-${id}`}>
          <GridActionsCellItem
            sx={{ '& svg': { width: '23px', height: '23px' } }}
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            color="inherit"
          />
        </Link>,
        // <Link onClick={handleSubmit(id)}>
        //   <GridActionsCellItem icon={<Delete />} label="Delete" color="inherit" />
        // </Link>,
      ];
    },
  },
];

export default function ManageMotel() {
  const infoUser = JSON.parse(localStorage.getItem(StorageKeys.USER));
  console.log(infoUser);
  const height = window.innerHeight;
  const [motels, setMotels] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  useEffect(() => {
    console.log('useeffect');
    const fetchMotels = async () => {
      console.log('useeffect2');

      const motelList = await motelApi.getAllMotelByIdUser(infoUser?.IdUser);
      setMotels(motelList.motel);
      console.log(motelList);
    };
    fetchMotels();
  }, []);
  return (
    // <Box sx={{ margin: '0 30px 0 46px' }}>
    <Box>
      {/* {motels.length > 0 ? ( */}
        <Box sx={{ height: `calc(${height}px - 68px)`, width: '100%' }}>
          <DataGrid
            getRowId={(motels) => motels.IdMotel}
            rows={motels}
            rowModesModel={rowModesModel}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[25]}
            checkboxSelection
            slots={{
              toolbar: MotelToolbar,
            }}
            slotProps={{
              toolbar: { setMotels, setRowModesModel },
            }}
            sx={{ fontSize: '14px' }}
          />
        </Box>
      {/* ) : (
        <NoMotel />
      )} */}
    </Box>
  );
}
