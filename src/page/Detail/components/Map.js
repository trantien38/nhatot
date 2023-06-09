import { useRef, useState, useEffect } from 'react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { Box, ButtonGroup, Flex, HStack, IconButton, Input, SkeletonText, Text } from '@chakra-ui/react';
import StorageKeys from '~/constants/storage-keys';
import Geocode from 'react-geocode';
import theme from '~/theme';
import { Grid, TextField } from '@mui/material';
import { toastMessage } from '~/utils/toast';
import { Toaster } from 'react-hot-toast';
import Button from '~/components/Button/Button';

const center = { lat: 16.047199, lng: 108.219955 };

function Map({ address }) {
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: StorageKeys.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  //   libraries: ['places'],
  // });
  const infoUser = JSON.parse(localStorage.getItem(StorageKeys?.USER));
  const addressUser = `${infoUser?.Address}, ${infoUser?.WardName}, ${infoUser?.DistrictName}, ${infoUser?.ProvinceName}`;
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [origin, setOrigin] = useState(infoUser ? addressUser : '');
  const [destination, setDestination] = useState(address);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  // convert address to lat, lng
  const [coordinates, setCoordinates] = useState(null);
  Geocode.setRegion('au');
  Geocode.setLocationType('ROOFTOP');
  // const findLatAndLng = () => {
  Geocode.setApiKey(StorageKeys.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  useEffect(() => {
    Geocode.fromAddress(address).then(
      (response) => {
        setCoordinates(response.results[0].geometry.location);
        console.log(response.results[0].geometry.location);
      },
      (error) => {
        console.error(error);
      },
    );
  }, [address]);

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
        origin: originRef.current.value,
        destination: destiantionRef.current.value,
        //   eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
      console.log(123, results);
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
    setDestination('');
  }

  const handleChangeOrigin = (e) => {
    console.log(e.target.value);
    setOrigin(e.target.value);
  };

  const handleChangeDestination = (e) => {
    setDestination(e.target.value);
  };

  return (
    <Flex position="relative" flexDirection="column" alignItems="center" h="880px" w="1120px">
      <Toaster />
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
          {/* <Marker position={center} icon={iconMarker} /> */}
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </Box>

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
        <Grid item md={9}>
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
        <Grid item md={3}>
          <p style={{ margin: 0 }}>Khoảng cách: {distance}</p>
          <p>Thời gian ước tính: {duration}</p>
        </Grid>
        <Grid item md={9}>
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

        <Grid item md={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
            <Box
              sx={{
                width: '30px',
                height: '30px',
                '& button': {
                  height: '100%',
                  marginTop: 0,
                  alignItems: 'center',
                  display: 'flex',
                },
              }}
              onClick={clearRoute}
            >
              <Button danger text={<FaTimes />} />
            </Box>
            <Box sx={{ '& button': { padding: '6px' } }}>
              <Button sx={{ padding: '4px 0' }} primary onClickButton={calculateRoute} text="Tính đường đi" />
            </Box>

            <Box
              sx={{
                width: '30px',
                height: '30px',
                '& button': {
                  alignItems: 'center',
                  display: 'flex',
                  height: '100%',
                },
              }}
              onClick={() => {
                map.panTo(coordinates);
                map.setZoom(14);
                setDestination(address);
              }}
              isRound
              aria-label="center back"
            >
              <Button primary text={<FaLocationArrow />} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Flex>
  );
}

export default Map;
