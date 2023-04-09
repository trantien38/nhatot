import { KeyboardArrowUp } from '@mui/icons-material';
import { Box, Grid, Pagination } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import motelApi from '~/api/MotelApi';
import styles from './Categories.module.scss';
import Filter from './components/Filter/Filter';
import MotelItem from './components/MotelItem/MotelItem';

const pageSize = 8;

function Categories() {
  const [opacity, setOpacity] = useState(0);
  const [motels, setMotels] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    start: 0,
    quantity: pageSize,
  });
  const { IdProvince, IdDistrict, IdWard } = useParams();

  const toggleopacity = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 380) {
      setOpacity(1);
    } else {
      setOpacity(0);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handlePageChange = (event, page) => {
    console.log(page);
    const start = (page - 1) * pageSize;
    // const quantity = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, start });
  };

  useEffect(() => {
    if (IdWard) {
      const fetchMotels = async () => {
        const motelList = await motelApi.getMotelsByIdWard({
          IdWard,
          start: pagination.start,
          quantity: pagination.quantity,
        });
        setPagination({ ...pagination, count: motelList.count });
        console.log(motelList.motel);
        setMotels(motelList.motel);
      };
      fetchMotels();
    } else if (IdDistrict) {
      const fetchMotels = async () => {
        const motelList = await motelApi.getMotelsByIdDistrict({
          IdDistrict,
          start: pagination.start,
          quantity: pagination.quantity,
        });
        setPagination({ ...pagination, count: motelList.count });

        console.log(motelList.motel);
        setMotels(motelList.motel);
      };
      fetchMotels();
    } else if (IdProvince) {
      const fetchMotels = async () => {
        const motelList = await motelApi.getMotelsByIdProvince({
          IdProvince,
          start: pagination.start,
          quantity: pagination.quantity,
        });
        console.log(motelList.motel);
        setPagination({ ...pagination, count: motelList.count });

        setMotels(motelList.motel);
      };
      fetchMotels();
    } else {
      console.log('getAllMotels');
      const fetchMotels = async () => {
        console.log(pagination.start, pagination.quantity);
        const motelList = await motelApi.getAllMotels({ start: pagination.start, quantity: pagination.quantity });
        console.log(motelList.motel);
        setPagination({ ...pagination, count: motelList.count });
        setMotels(motelList.motel);
      };
      fetchMotels();
    }
  }, [IdWard, IdDistrict, IdProvince, pagination.start]);

  window.addEventListener('scroll', toggleopacity);
  return (
    <Box>
      <Filter
        address={IdWard ? motels[0]?.WardName : IdDistrict ? motels[0]?.DistrictName : IdProvince ? motels[0]?.ProvinceName : ''}
      />
      <Grid container className={styles.motelList}>
        <Grid item md={9}>
          {motels?.map((result) => (
            <MotelItem
              avatar={result.Avatar}
              time={{
                mon: result.month,
                week: result.week,
                day: result.day,
                hour: result.hour,
                minute: result.minute,
                second: result.second,
              }}
              name={result.Name}
              title={result.Title}
              acreage={result.Acreage}
              price={result.Price}
              img={result.srcImage}
              address={
                IdDistrict
                  ? `${result.WardPrefix} ${result.WardName}`
                  : IdProvince
                  ? `${result.DistrictPrefix} ${result.DistrictName}`
                  : result.ProvinceName
              }
              IdMotel={result.IdMotel}
            />
          ))}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: '12px 0',
            }}
          >
            <Pagination
              onChange={handlePageChange}
              count={Math.ceil(pagination.count / pageSize)}
              variant="outlined"
              shape="rounded"
              color="primary"
            />
          </Box>
        </Grid>
        <Grid item md={3}>
          <button
            style={{
              opacity: opacity,
            }}
            onClick={scrollToTop}
            className={styles.scrollToTop}
          >
            <KeyboardArrowUp />
          </button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Categories;
