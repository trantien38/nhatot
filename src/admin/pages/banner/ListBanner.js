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
  const [banners, setBanners] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [open, setOpen] = useState(false);
  const [idBanner, setIdBanner] = useState();

  const columns = [
    { field: 'IdBanner', headerName: 'ID', width: 230 },
    {
      field: 'srcBanner',
      type: 'srcBanner',
      headerName: 'Banner',
      width: 250,
      cellClassName: 'srcBanner',
      renderCell: (params) => (
        // <Typography variant="subtitle2" className={classes.bolderText}>
        <img src={`${STATIC_HOST}banners/${params.value}`} height={70} width={230} alt="banner" />
        // </Typography>
      ),
    },
    {
      field: 'Active',
      headerName: 'Trạng thái',
      width: 80,
      renderCell: (params) => <p>{params.value == 1 ? 'Hiển thị' : 'Ẩn'}</p>,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Hành động',
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
    // <Box sx={{ height: '100%' }}>
    <Box sx={{ height: '100%', width: '100%' }}>
      <Toaster />
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
        sx={{
          height: '520px',
          fontSize: '14px',
          '& .MuiDataGrid-row': {
            maxHeight: '80px !important',
            height: '80px !important',
          },
          '& .MuiDataGrid-cell': {
            maxHeight: 'none !important',
          },
          '& .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar p': {
            fontSize: '14px',
          },
        }}
      />
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
