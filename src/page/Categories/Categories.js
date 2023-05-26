import { KeyboardArrowUp } from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import motelApi from '~/api/MotelApi';
import { AVATAR_DEFAULT, RED_HEART, ROOM_DEFAULT, SAVEAD_ICON, STATIC_HOST } from '~/constants';
import styles from './Categories.module.scss';
import Filter from './components/Filter/Filter';
import MotelItem from './components/MotelItem/MotelItem';

import Geocode from 'react-geocode';
import StorageKeys from '~/constants/storage-keys';
import NoMotel from '~/components/NoData/NoMotel';
import { isEmpty } from 'lodash';
import SkeletonMotelItem from '~/components/Skeleton/SkeletonMotelItem';
import userApi from '~/api/UserApi';
import { toastMessage } from '~/utils/toast';
import { Toaster } from 'react-hot-toast';

function Categories() {
  const infoUser = JSON.parse(localStorage.getItem(StorageKeys.USER));
  const [filters, setFilters] = useState({
    price: [0, 18286286],
    acreage: [0, 88],
    count: 0,
    start: 0,
    quantity: 2,
    page: 1,
  });
  const [loading, setLoading] = useState(true);
  const [opacity, setOpacity] = useState(0);
  const [limitMotels, setLimitMotels] = useState([]);
  const [favourite, setFavourite] = useState([]);
  const { IdProvince, IdDistrict, IdWard } = useParams();

  const toggleOpacity = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 380) {
      setOpacity(1);
    } else {
      setOpacity(0);
    }
  };

  window.addEventListener('scroll', toggleOpacity);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleChangeFilters = (values) => {
    setFilters(values);
  };

  const handleChangeFavourite = async (data) => {
    console.log(data);
    if (data.src == SAVEAD_ICON) {
      const addFavourite = await userApi.addFavourite({ IdMotel: data.IdMotel, IdUser: infoUser?.IdUser });
      console.log(addFavourite);
      toastMessage.success(addFavourite.msg);
      setFavourite(addFavourite.favourite);
    } else {
      const deleteFavourite = await userApi.deleteFavourite({ IdMotel: data.IdMotel, IdUser: infoUser?.IdUser });
      toastMessage.success(deleteFavourite.msg);
      setFavourite(deleteFavourite.favourite);
    }
  };
  const handleChangeMotel = () => {
    setFilters({
      price: [0, 18286286],
      acreage: [0, 88],
      count: 0,
      start: 0,
      quantity: 2,
      page: 1,
    });
  };

  useEffect(() => {
    const { price, acreage, start, quantity } = filters;
    const [acreageMin, acreageMax] = acreage;

    const priceMin = price[0] / 1000000;
    const priceMax = price[1] / 1000000;
    if (IdWard) {
      (async () => {
        const motelList = await motelApi.getMotelsByIdWard({
          IdUser: infoUser?.IdUser,
          IdWard,
          start,
          quantity,
          priceMin,
          priceMax,
          acreageMin,
          acreageMax,
        });
        filters.count = motelList.count;
        setLimitMotels(motelList.motel);
        setFavourite(motelList.favourite);
        setLoading(false);
      })();
    } else if (IdDistrict) {
      (async () => {
        const motelList = await motelApi.getMotelsByIdDistrict({
          IdUser: infoUser?.IdUser,
          IdDistrict,
          start,
          quantity,
          priceMin,
          priceMax,
          acreageMin,
          acreageMax,
        });
        console.log(motelList);
        setFavourite(motelList.favourite);
        filters.count = motelList.count;
        setLimitMotels(motelList.motel);

        setLoading(false);
      })();
    } else if (IdProvince) {
      (async () => {
        const motelList = await motelApi.getMotelsByIdProvince({
          IdUser: infoUser?.IdUser,
          IdProvince,
          start,
          quantity,
          priceMin,
          priceMax,
          acreageMin,
          acreageMax,
        });
        console.log(motelList);
        filters.count = motelList.count;
        setLimitMotels(motelList.motel);
        setFavourite(motelList.favourite);
        setLoading(false);
      })();
    } else {
      (async () => {
        const motelList = await motelApi.getLimitMotels({
          IdUser: infoUser?.IdUser,
          start,
          quantity,
          priceMin,
          priceMax,
          acreageMin,
          acreageMax,
        });
        console.log(motelList);
        filters.count = motelList.count;
        setLimitMotels(motelList.motel);
        setFavourite(motelList.favourite);
        setLoading(false);
      })();
    }
  }, [IdWard, IdDistrict, IdProvince, filters]);

  useEffect(() => {
    (async () => {
      const allMotel = await motelApi.getAllMotels();
    })();
  }, []);

  console.log(window.location);
  console.log(favourite);
  limitMotels?.map((result, index) => {
    console.log(favourite.filter((item) => item.IdMotel == result.IdMotel)[0] ? true : false);
  });

  return (
    <Box>
      <Toaster />
      <Filter
        onChangeFilters={handleChangeFilters}
        // listMotel={listLatAndLng}
        address={
          IdWard
            ? limitMotels[0]?.WardName
            : IdDistrict
            ? limitMotels[0]?.DistrictName
            : IdProvince
            ? limitMotels[0]?.ProvinceName
            : ''
        }
        filters={filters}
      />
      <Grid container className={styles.motelList}>
        <Grid item md={7} sm={12} xs={12}>
          {limitMotels?.map((result, index) => {
            return loading ? (
              <SkeletonMotelItem />
            ) : isEmpty(limitMotels[0]) ? (
              <NoMotel handleChangeMotel={handleChangeMotel} />
            ) : (
              <MotelItem
                onChangeFavourite={handleChangeFavourite}
                key={index}
                isLove={favourite.filter((item) => item.IdMotel == result.IdMotel)[0] ? RED_HEART : SAVEAD_ICON}
                time={{
                  mon: result.month,
                  week: result.week,
                  day: result.day,
                  hour: result.hour,
                  minute: result.minute,
                  second: result.second,
                }}
                address={
                  IdDistrict
                    ? `${result.WardPrefix} ${result.WardName}`
                    : IdProvince
                    ? `${result.DistrictPrefix} ${result.DistrictName}`
                    : result.ProvinceName
                }
                model={result}
              />
            );
          })}
          {/*  {isEmpty(limitMotels) && !loading && <NoMotel handleChangeMotel={handleChangeMotel} />} */}
        </Grid>
        <Grid item md={5}>
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
      <br />
      {/* <ListMap /> */}
    </Box>
  );
}

export default Categories;
