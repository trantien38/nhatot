import { Grid } from '@mui/material';

function ImageItem({ handleChangeImage, srcImage }) {
  return (
    <Grid
      item
      sx={{ padding: '0 6px', cursor: 'pointer' }}
      sm={3}
      xs={4}
      md={2.4}
    >
      <img
        onClick={handleChangeImage(srcImage)}
        width={'100%'}
        height={'120px'}
        src={srcImage}
      />
    </Grid>
  );
}

export default ImageItem;
