import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import { GridToolbarContainer } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { Slide } from '@mui/material';
import { Link } from 'react-router-dom';
import DialogEditUser from './DialogEditUser';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
function UserToolbar(props) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<Add />}>
        <Link to="/admin/user/add">Thêm người dùng</Link>
      </Button>
      <DialogEditUser open={openDialog} Transition={Transition} handleClose={handleCloseDialog} />
    </GridToolbarContainer>
  );
}

export default UserToolbar;
