import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import adminApi from '~/api/AdminApi';
import { STATIC_HOST } from '~/constants';
import { toastMessage } from '~/utils/toast';
import BannerToolbar from './BannerToolbar';

export const ListBanner = () => {
  const height = window.innerHeight;
  const [banners, setBanners] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [open, setOpen] = useState(false);
  const [idBanner, setIdBanner] = useState();

  const columns = [
    { field: 'IdBanner', headerName: 'ID', width: 180 },
    {
      field: 'srcBanner',
      headerName: 'Image',
      width: 230,
      getActions: ({ id, srcBanner }) => {
        return [<img src={`${STATIC_HOST}banners/${srcBanner}`} alt="banner" />];
      },
    },
    { field: 'Active', headerName: 'Active', width: 80 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <Link to={`/admin/banner/edit-${id}`}>
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
      const bannerList = await adminApi.adminGetAllBanner();
      setBanners(bannerList.banner);
      console.log(bannerList);
    })();
  }, []);

  const handleClickOpen = (id) => {
    console.log(id);
    setOpen(true);
    setIdBanner(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (id) => {
    console.log(id);
    const removeBanner = await adminApi.adminRemoveBanner(id);
    setOpen(false);
    setBanners(removeBanner.banner);
    toastMessage.success(removeBanner.msg);
    console.log(removeBanner.banner);
  };

  return (
    <Box>
      <Toaster />
      <Box sx={{ height: `calc(${height}px - 120px)`, width: '100%' }}>
        <DataGrid
          getRowId={(banners) => banners.IdBanner}
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
          sx={{ fontSize: '14px' }}
        />
      </Box>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'Xác nhận xóa banner này?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ fontSize: '14px' }}>
            Hành động này không thể được hoàn tác. Bạn có muốn tiếp tục?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ '& button': { fontSize: '14px' } }}>
          <Button sx={{ '&:hover': { backgroundColor: 'red', color: 'white' } }} onClick={() => handleSubmit(idBanner)}>
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
