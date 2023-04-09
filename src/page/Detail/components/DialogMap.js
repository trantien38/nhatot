import { CloseOutlined } from '@mui/icons-material';
import { Dialog } from '@mui/material';
import Map from './Map';
import styles from '../Detail.module.scss';

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
      <div className={styles.dialogMapTop}>
        <p>Bản đồ</p>
        <span onClick={handleClose}>
          <CloseOutlined />
        </span>
      </div>

      {address && <Map address={address} />}
    </Dialog>
  );
}

export default DialogMap;
