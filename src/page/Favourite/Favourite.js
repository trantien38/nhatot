import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import motelApi from '~/api/MotelApi';
import NoFavourite from '~/components/NoData/NoFavourite';
import { STATIC_HOST } from '~/constants';
import StorageKeys from '~/constants/storage-keys';
import MotelItem from '../Categories/components/MotelItem/MotelItem';

function Favourite() {
  const IdUser = JSON.parse(localStorage.getItem(StorageKeys.USER)).IdUser;
  const [listMotel, setListMotel] = useState([]);
  useEffect(() => {
    const fetchMotels = async () => {
      const listMotelFavourite = await motelApi.getMotelFavourite(IdUser);
      console.log(listMotelFavourite);
      setListMotel(listMotelFavourite.motel);
    };
    fetchMotels();
  }, [IdUser]);
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        padding: '20px 0',
        '& h2': {
          paddingLeft: '15px',
        },
      }}
    >
      <h2>Tin đăng đã lưu ({listMotel.length})</h2>
      {listMotel[0] ? (
        listMotel?.map((result, index) => {
          return (
            <MotelItem
              key={index}
              isLove
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
              address={`${result.DistrictPrefix} ${result.DistrictName}`}
              IdMotel={result.IdMotel}
            />
          );
        })
      ) : (
        <NoFavourite />
      )}
    </Box>
  );
}

export default Favourite;
