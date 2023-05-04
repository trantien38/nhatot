import { Delete, Edit } from '@mui/icons-material';
import { Box } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import bannerApi from '~/api/BannerApi';
import BannerToolbar from './BannerToolbar';

const columns = [
  { field: 'id', headerName: 'ID', width: 38 },
  { field: 'img', headerName: 'Image', width: 330 },
  { field: 'active', headerName: 'Active', width: 80 },
  {
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    width: 100,
    cellClassName: 'actions',
    getActions: ({ id }) => {
      return [
        <Link to={`/admin/banner/edit-${id}`}>
          <GridActionsCellItem icon={<Edit />} label="Edit" className="textPrimary" color="inherit" />
        </Link>,
        // <Link onClick={handleSubmit(id)}>
        //   <GridActionsCellItem icon={<Delete />} label="Delete" color="inherit" />
        // </Link>,
      ];
    },
  },
];
export const ListBanner = () => {
  const height = window.innerHeight;
  const [banners, setBanners] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  useEffect(() => {
    console.log('useeffect');
    const fetchBanners = async () => {
      console.log('useeffect2');

      const bannerList = await bannerApi.getAll();
      // setBanners(bannerList.banner);
      console.log(bannerList);
    };
    fetchBanners();
  }, []);
  return (
    <Box sx={{ margin: '0 30px 0 46px' }}>
      <div style={{ height: `calc(${height}px - 120px)`, width: '100%' }}>
        <DataGrid
          getRowId={(questions) => questions.id}
          rows={banners}
          rowModesModel={rowModesModel}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[25]}
          checkboxSelection
          slots={{
            toolbar: BannerToolbar,
          }}
          slotProps={{
            toolbar: { setBanners, setRowModesModel },
          }}
        />
      </div>
    </Box>
  );
};
