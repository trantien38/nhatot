import { Dialog } from '@mui/material';
import HeaderDialog from '~/components/HeaderDialog';
import Map from './Map';

function DialogMap({ open, Transition, handleClose, address }) {
  console.log(address);
  return (
    <Dialog
      sx={{
        '& .MuiPaper-root': {
          maxWidth: '900px',
        },

        margin: '0 auto',
      }}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <HeaderDialog title="Bản đồ" handleClose={handleClose} />

      {address && <Map address={address} />}
    </Dialog>
  );
}

export default DialogMap;
