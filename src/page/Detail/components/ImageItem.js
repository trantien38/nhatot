import { Grid } from '@mui/material';

function ImageItem({ handleChangeImage, srcImage, sm, xs, md }) {
  return (
    <Grid item sx={{ padding: '0 6px', cursor: 'pointer' }} sm={sm} xs={xs} md={md}>
      <img onClick={handleChangeImage(srcImage)} width={'100%'} height={'120px'} src={srcImage} />
    </Grid>
  );
}

export default ImageItem;
