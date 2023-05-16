import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import motelApi from '~/api/MotelApi';
import Button from '~/components/Button/Button';
import { SAVEAD_ICON, STATIC_HOST } from '~/constants';
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
        listMotel?.map((result) => {
          return (
            <MotelItem
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '& span': {
              color: 'rgb(155, 155, 155)',
              display: 'flex',
              alignItems: 'center',
            },
          }}
        >
          <p>Bạn chưa yêu thích nhà trọ nào!</p>
          <span>
            Hãy bấm nút &nbsp;
            <img src={SAVEAD_ICON} /> &nbsp; ở tin đăng để lưu và xem lại sau.
          </span>
          <p>
            <Button linkTo="/cho-thue-phong-tro" orange text="Bắt đầu tìm kiếm" />
          </p>
        </Box>
      )}
    </Box>
  );
}

export default Favourite;
