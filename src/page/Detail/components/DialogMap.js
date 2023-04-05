import { CloseOutlined } from '@mui/icons-material';
import { Dialog } from '@mui/material';
import Map from './Map';
import styles from '../Detail.module.scss';

function DialogMap({ open, Transition, handleClose, address }) {
  return (
    <Dialog
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

      {/* <Map address={address} /> */}

      <iframe
        width="600"
        height="660"
        loading="lazy"
        allowfullscreen=""
        src={`https://maps.google.com/maps?&q=${address}&output=embed`}
      />
    </Dialog>
  );
}

export default DialogMap;
