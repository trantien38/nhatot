import { Box, Flex } from '@chakra-ui/react';
import { Grid, TextField } from '@mui/material';
import { DirectionsRenderer, GoogleMap, Marker } from '@react-google-maps/api';
import { useEffect, useRef, useState } from 'react';
import Geocode from 'react-geocode';
import { Toaster } from 'react-hot-toast';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import motelApi from '~/api/MotelApi';
import Button from '~/components/Button/Button';
import StorageKeys from '~/constants/storage-keys';
import theme from '~/theme';
import { toastMessage } from '~/utils/toast';
import InfoWindowMotel from './InfoWindowMotel';

// const center = { lat: 16.047199, lng: 108.219955 };

function ListMap() {
  const [motels, setMotels] = useState(null);

  const [listLatAndLng, setListLatAndLng] = useState([]);
  useEffect(() => {
    const fetchAllMotel = async () => {
      const allMotel = await motelApi.getAllMotels();
      findLatAndLng(allMotel.motel);
    };
    fetchAllMotel();
  }, []);

  const refMotels = useRef([]);
  const infoUser = JSON.parse(localStorage.getItem(StorageKeys?.USER));
  const addressUser = `${infoUser?.Address}, ${infoUser?.WardName}, ${infoUser?.DistrictName}, ${infoUser?.ProvinceName}`;
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [origin, setOrigin] = useState(infoUser ? addressUser : '');
  const [destination, setDestination] = useState('');
  const [radius, setRadius] = useState();
  const [markerLoaded, setMarkerLoaded] = useState(false);
  const [location, setLocation] = useState('');

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  // convert address to lat, lng
  const [coordinates, setCoordinates] = useState(null);
  Geocode.setRegion('au');
  Geocode.setLocationType('ROOFTOP');

  Geocode.setApiKey(StorageKeys.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

  useEffect(() => {
    try {
      Geocode.fromAddress(addressUser).then(
        (response) => {
          setCoordinates(response.results[0].geometry.location);
          // console.log(response.results[0].geometry.location);
        },
        (error) => {
          console.error(error);
        },
      );
    } catch (error) {
      console.log(error);
    }
  }, [addressUser]);

  // convert address to lat, lng
  useEffect(() => {
    (() => {
      listLatAndLng?.map(async (motel) => {
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
          // const results =  directionsService.route({
          origin: addressUser,
          // destination: `${motel[0]?.Address}, ${motel[0]?.WardName}, ${motel[0]?.DistrictName}, ${motel[0]?.ProvinceName}`,
          destination: `${motel?.Address}, ${motel?.WardName}, ${motel?.DistrictName}, ${motel?.ProvinceName}`,
          //   eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING,
        });
        const distanceList = results.routes[0].legs[0].distance.text.split(' ');
        console.log(distanceList);
        if (distanceList[0].replace(/,/g, '.') * 1 < radius) {
          refMotels.current.push(motel);
        }
      });

      setTimeout(() => {
        console.log(refMotels.current);
        setMotels(refMotels.current);
      }, 1500);
    })();
  }, [radius]);

  async function calculateRoute() {
    console.log(originRef.current.value);
    if (originRef.current.value == '') {
      toastMessage.error('Vui lòng nhập điểm đi');
    } else if (destiantionRef.current.value === '') {
      toastMessage.error('Vui lòng nhập điểm đến');
    } else if (destiantionRef.current.value === '' && originRef.current.value == '') {
      toastMessage.error('Vui lòng nhập điểm đi và điểm đến');
    } else {
      // eslint-disable-next-line no-undef
      const directionsService = new google.maps.DirectionsService();
      const results = await directionsService.route({
        origin,
        destination,
        //   eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    }
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setOrigin('');
    setRadius('');
    setDestination('');
    refMotels.current = [];
  }

  const handleChangeLocation = (e) => {
    console.log(e.target.value);
    setLocation(e.target.value);
  };
  const handleChangeOrigin = (e) => {
    setOrigin(e.target.value);
  };

  const handleChangeDestination = (e) => {
    setDestination(e.target.value);
  };
  const handleChangeRadius = (e) => {
    console.log(e.target.value);
    console.log(location);

    refMotels.current = [];
    setRadius(e.target.value);
  };

  const findLatAndLng = (listmotels) => {
    console.log(listmotels);
    const ListLatAndLng = [];
    Geocode.setRegion('au');
    Geocode.setLocationType('ROOFTOP');
    Geocode.setApiKey(StorageKeys.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
    listmotels.map((motel) => {
      Geocode.fromAddress(`${motel?.Address}, ${motel?.WardName}, ${motel?.DistrictName}, ${motel?.ProvinceName}`).then(
        (response) => {
          ListLatAndLng.push({ ...motel, latAndLng: response.results[0].geometry.location });
          console.log(response.results[0].geometry.location);
        },
        (error) => {
          console.error(error);
        },
      );
      console.log(`${motel?.Address}, ${motel?.WardName}, ${motel?.DistrictName}, ${motel?.ProvinceName}`);
    });
    console.log(listLatAndLng);
    setListLatAndLng(ListLatAndLng);
  };
  const onChangeDestination = (value) => {
    setDestination(value);
  };
  return (
    <Flex position="relative" flexDirection="column" alignItems="center" h="880px" w="1120px">
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        <GoogleMap
          center={coordinates}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: true,
            streetViewControl: true,
            mapTypeControl: true,
            fullscreenControl: true,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={coordinates} />
          {motels?.map((motel) => (
            <InfoWindowMotel motel={motel} onChangeDestination={onChangeDestination} />
          ))}
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </Box>
      <Toaster />

      <Grid
        container
        spacing={1}
        sx={{
          backgroundColor: theme.color.measuring,
          width: '800px',
          fontSize: '16px',
          boxSizing: 'border-box',
          position: 'relative',
          left: '52px',

          '& button': {
            fontSize: '16px',
          },
          padding: '12px',
          margin: '9px',
          backgroungColor: 'white',
          zIndex: '1',
        }}
      >
        <Grid item md={8}>
          <TextField
            type="text"
            id="outlined-required"
            label="Điểm đi"
            onChange={handleChangeOrigin}
            value={origin}
            fullWidth
            inputRef={originRef}
          />
        </Grid>
        <Grid item md={4}>
          <Grid container>
            <Grid item md={10}>
              <p style={{ margin: 0 }}>Khoảng cách: {distance}</p>
            </Grid>
            <Grid item md={2}>
              <Box
                sx={{
                  width: '26px',
                  height: '26px',
                  '& button': {
                    height: '100%',
                    marginTop: 0,
                    alignItems: 'center',
                    marginLeft: '8px',
                    display: 'flex',
                  },
                }}
                onClick={clearRoute}
              >
                <Button danger text={<FaTimes />} />
              </Box>
            </Grid>
            <Grid item md={10}>
              <p>Thời gian ước tính: {duration}</p>
            </Grid>
            <Grid item md={2}>
              <Box
                sx={{
                  width: '26px',
                  height: '26px',
                  '& button': {
                    alignItems: 'center',
                    display: 'flex',
                    height: '100%',
                    marginLeft: '8px',
                    marginTop: '8px',
                  },
                }}
                onClick={() => {
                  map.panTo(coordinates);
                  map.setZoom(14);
                  // setDestination(address);
                }}
                isRound
                aria-label="center back"
              >
                <Button primary text={<FaLocationArrow />} />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={8}>
          <TextField
            label="Điểm đến"
            fullWidth
            id="outlined-required"
            type="text"
            onChange={handleChangeDestination}
            value={destination}
            inputRef={destiantionRef}
          />
        </Grid>

        <Grid item md={4}>
          <Grid container spacing={1}>
            <Grid item md={5}>
              <TextField
                label="Bán kính"
                fullWidth
                id="outlined-required"
                type="text"
                onChange={handleChangeRadius}
                value={radius}
              />
            </Grid>
            <Grid item md={7}>
              <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', '& button': { padding: '6px', width: '100%' } }}>
                <Button sx={{ padding: '4px 0' }} primary onClickButton={calculateRoute} text="Tính đường đi" />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Flex>
  );
}

export default ListMap;
