import { KeyboardArrowUp } from '@mui/icons-material';
import { Box, Grid, Pagination, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import motelApi from '~/api/MotelApi';
import { STATIC_HOST } from '~/constants';
import styles from './Categories.module.scss';
import Filter from './components/Filter/Filter';
import MotelItem from './components/MotelItem/MotelItem';

import Geocode from 'react-geocode';
import StorageKeys from '~/constants/storage-keys';
import SkeletonMotelItem from '~/components/SkeletonMotelItem';

const pageSize = 8;

function Categories() {
  const infoUser = JSON.parse(localStorage.getItem(StorageKeys.USER));
  const [loading, setLoading] = useState(true);
  const [opacity, setOpacity] = useState(0);
  const [limitMotels, setLimitMotels] = useState([]);
  const [favourite, setFavourite] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    start: 0,
    quantity: pageSize,
  });
  const [listLatAndLng, setListLatAndLng] = useState([]);
  const { IdProvince, IdDistrict, IdWard } = useParams();
  const [searchParams] = useSearchParams();
  const price = searchParams?.get('price')?.split('-');
  const acreage = searchParams?.get('acreage')?.split('-');

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
    setPagination({ ...pagination, start });
  };

  useEffect(() => {
    if (IdWard) {
      const fetchMotels = async () => {
        const motelList = await motelApi.getMotelsByIdWard({
          IdUser: infoUser.IdUser,
          IdWard,
          start: pagination.start,
          quantity: pagination.quantity,
          priceMin: (price && price[0] / 1000000) || 0,
          priceMax: (price && price[1] / 1000000) || 1000,
          acreageMin: (acreage && acreage[0]) || 0,
          acreageMax: (acreage && acreage[1]) || 1000,
        });
        setPagination({ ...pagination, count: motelList.count });
        console.log(motelList);
        setLimitMotels(motelList.motel);
        setFavourite(motelList.favourite);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      };
      fetchMotels();
    } else if (IdDistrict) {
      const fetchMotels = async () => {
        const motelList = await motelApi.getMotelsByIdDistrict({
          IdUser: infoUser.IdUser,
          IdDistrict,
          start: pagination.start,
          quantity: pagination.quantity,
          priceMin: (price && price[0] / 1000000) || 0,
          priceMax: (price && price[1] / 1000000) || 1000,
          acreageMin: (acreage && acreage[0]) || 0,
          acreageMax: (acreage && acreage[1]) || 1000,
        });
        setPagination({ ...pagination, count: motelList.count });
        console.log(motelList);
        setFavourite(motelList.favourite);

        setLimitMotels(motelList.motel);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      };
      fetchMotels();
    } else if (IdProvince) {
      const fetchMotels = async () => {
        const motelList = await motelApi.getMotelsByIdProvince({
          IdUser: infoUser.IdUser,
          IdProvince,
          start: pagination.start,
          quantity: pagination.quantity,
          priceMin: (price && price[0] / 1000000) || 0,
          priceMax: (price && price[1] / 1000000) || 1000,
          acreageMin: (acreage && acreage[0]) || 0,
          acreageMax: (acreage && acreage[1]) || 1000,
        });
        console.log(motelList);
        setPagination({ ...pagination, count: motelList.count });
        setLimitMotels(motelList.motel);
        setFavourite(motelList.favourite);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
      };
      fetchMotels();
    } else {
      const fetchMotels = async () => {
        const motelList = await motelApi.getLimitMotels({
          IdUser: infoUser.IdUser,
          start: pagination.start,
          quantity: pagination.quantity,
          priceMin: (price && price[0] / 1000000) || 0,
          priceMax: (price && price[1] / 1000000) || 1000,
          acreageMin: (acreage && acreage[0]) || 0,
          acreageMax: (acreage && acreage[1]) || 1000,
        });
        console.log(motelList);
        setPagination({ ...pagination, count: motelList.count });
        setLimitMotels(motelList.motel);
        setFavourite(motelList.favourite);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      };
      fetchMotels();
    }
  }, [
    IdWard,
    IdDistrict,
    IdProvince,
    pagination.start,
    price && price[0],
    price && price[1],
    acreage && acreage[0],
    acreage && acreage[1],
  ]);

  // useEffect(() => {
  //   const fetchAllMotel = async () => {
  //     const allMotel = await motelApi.getAllMotels();
  //     findLatAndLng(allMotel.motel);
  //   };
  //   fetchAllMotel();
  // }, []);

  window.addEventListener('scroll', toggleopacity);
  const findLatAndLng = (listmotels) => {
    const ListLatAndLng = [];
    Geocode.setRegion('au');
    Geocode.setLocationType('ROOFTOP');
    Geocode.setApiKey(StorageKeys.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
    listmotels.map((motel) => {
      Geocode.fromAddress(`${motel?.Address}, ${motel?.WardName}, ${motel?.DistrictName}, ${motel?.ProvinceName}`).then(
        (response) => {
          ListLatAndLng.push({ ...motel, latAndLng: response.results[0].geometry.location });
          // console.log(response.results[0].geometry.location);
        },
        (error) => {
          console.error(error);
        },
      );
      // console.log(`${motel?.Address}, ${motel?.WardName}, ${motel?.DistrictName}, ${motel?.ProvinceName}`);
    });
    setListLatAndLng(ListLatAndLng);
  };

  return (
    <Box>
      <Filter
        handlePageChange={handlePageChange}
        pagination={pagination}
        pageSize={pageSize}
        listMotel={listLatAndLng}
        address={
          IdWard
            ? limitMotels[0]?.WardName
            : IdDistrict
            ? limitMotels[0]?.DistrictName
            : IdProvince
            ? limitMotels[0]?.ProvinceName
            : ''
        }
        price={price}
        acreage={acreage}
      />
      <Grid container className={styles.motelList}>
        <Grid item md={7} sm={12} xs={12}>
          {limitMotels?.map((result) => {
            return loading ? (
              <SkeletonMotelItem />
            ) : (
              <MotelItem
                isLove={favourite.filter((item) => item.IdMotel == result.IdMotel)[0] ? true : false}
                avatar={result?.Avatar?.includes('http') ? result?.Avatar : `${STATIC_HOST}avatars/${result.Avatar}`}
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
                img={result?.srcMedia?.includes('http') ? result.srcMedia : `${STATIC_HOST}motels/${result.srcMedia}`}
                address={
                  IdDistrict
                    ? `${result.WardPrefix} ${result.WardName}`
                    : IdProvince
                    ? `${result.DistrictPrefix} ${result.DistrictName}`
                    : result.ProvinceName
                }
                IdMotel={result.IdMotel}
              />
            );
          })}
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
