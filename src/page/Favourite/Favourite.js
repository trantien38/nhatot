import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import motelApi from '~/api/MotelApi';
import userApi from '~/api/UserApi';
import NoFavourite from '~/components/NoData/NoFavourite';
import SkeletonMotelItem from '~/components/Skeleton/SkeletonMotelItem';
import { RED_HEART, SAVEAD_ICON, STATIC_HOST } from '~/constants';
import StorageKeys from '~/constants/storage-keys';
import { toastMessage } from '~/utils/toast';
import MotelItem from '../Categories/components/MotelItem/MotelItem';

function Favourite() {
  const [loading, setLoading] = useState(true);
  const [listMotel, setListMotel] = useState([]);
  const [favourite, setFavourite] = useState([]);
  const { IdUser } = JSON.parse(localStorage.getItem(StorageKeys.USER));

  useEffect(() => {
    (async () => {
      const listMotelFavourite = await motelApi.getMotelFavourite(IdUser);
      console.log(listMotelFavourite);
      setFavourite(listMotelFavourite.favourite);
      setLoading(false);
      setListMotel(listMotelFavourite.motel);
    })();
  }, [IdUser]);
  const handleChangeFavourite = async (data) => {
    console.log(data);
    if (data.src == SAVEAD_ICON) {
      const addFavourite = await userApi.addFavourite({ IdMotel: data.IdMotel, IdUser });
      console.log(addFavourite);
      toastMessage.success(addFavourite.msg);
      setFavourite(addFavourite.favourite);
    } else {
      const deleteFavourite = await userApi.deleteFavourite({ IdMotel: data.IdMotel, IdUser });
      toastMessage.success(deleteFavourite.msg);
      setFavourite(deleteFavourite.favourite);
    }
  };
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
      {listMotel?.map((result, index) => {
        return loading ? (
          <SkeletonMotelItem />
        ) : !listMotel[0] ? (
          <NoFavourite />
        ) : (
          <MotelItem
            key={index}
            onChangeFavourite={handleChangeFavourite}
            isLove={favourite.filter((item) => item.IdMotel == result.IdMotel)[0] ? RED_HEART : SAVEAD_ICON}
            time={{
              mon: result.month,
              week: result.week,
              day: result.day,
              hour: result.hour,
              minute: result.minute,
              second: result.second,
            }}
            model={result}
            address={`${result.DistrictPrefix} ${result.DistrictName}`}
          />
        );
      })}
    </Box>
  );
}

export default Favourite;
