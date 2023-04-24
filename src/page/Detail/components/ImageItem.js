import { Grid } from '@mui/material';

function ImageItem({ handleChangeImage, srcMedia, type, sm, xs, md }) {
  return (
    <Grid item sx={{ padding: '0 6px', cursor: 'pointer' }} sm={sm} xs={xs} md={md} onClick={handleChangeImage(srcMedia, type)}>
      {type == 'image' && <img width={'100%'} height={'120px'} src={srcMedia} />}
      {type == 'video' && (
        <video width="100%" height="120">
          <source src={srcMedia} type="video/mp4" />
        </video>
      )}
    </Grid>
  );
}

export default ImageItem;
