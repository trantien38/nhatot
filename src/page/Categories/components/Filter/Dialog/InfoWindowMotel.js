import { InfoWindow, Marker } from '@react-google-maps/api';
import React from 'react';
import iconMarker from '~/assets/images/markerIcon-removebg-preview.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Box } from '@mui/material';

function InfoWindowMotel({ motel, onChangeDestination }) {
  const [markerLoaded, setMarkerLoaded] = useState(false);
  const handleClickShowInfoMotel = (motel) => {
    onChangeDestination(`${motel?.Address}, ${motel?.WardName}, ${motel?.DistrictName}, ${motel?.ProvinceName}`);
    console.log(motel);
    setMarkerLoaded(true);
  };
  return (
    <Box>
      <Marker key={motel.IdMotel} position={motel.latAndLng} icon={iconMarker} onClick={() => handleClickShowInfoMotel(motel)}>
        {markerLoaded && (
          <InfoWindow className={`info-${motel.IdMotel}`} style={{ display: 'none' }}>
            <Link to={`/detail/${motel.IdMotel}`}>
              <Box
                sx={{
                  '& h4': {
                    color: 'blue',
                  },
                  '& p ': {
                    color: 'gray',
                    margin: '8px 0',
                  },
                }}
              >
                <h4>{motel.Title}</h4>
                <p>{`Giá cho thuê: ${motel.Price} triệu/tháng`}</p>
                <p>{`Diện tích sử dụng: ${motel.Acreage} m2`}</p>
                <p>{`${motel.Address}, ${motel.WardName}, ${motel.DistrictName}, ${motel.ProvinceName}`}</p>
              </Box>
            </Link>
          </InfoWindow>
        )}
      </Marker>
    </Box>
  );
}

export default InfoWindowMotel;
