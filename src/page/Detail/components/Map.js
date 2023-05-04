import { useRef, useState, useEffect } from 'react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { Box, Button, ButtonGroup, Flex, HStack, IconButton, Input, SkeletonText, Text } from '@chakra-ui/react';
import StorageKeys from '~/constants/storage-keys';
import Geocode from 'react-geocode';
// import iconMarker from './markerMotel.jpg';
import iconMarker from '~/assets/images/markerIcon.jpg';
import theme from '~/theme';
import { Grid } from '@mui/material';

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

  // if (!isLoaded) {
  //   return <SkeletonText />;
  // }

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

  // };

  // useEffect(() => {
  //   findLatAndLng();
  // }, [address]);
  // convert address to lat, lng

  // setDestination(address);
  async function calculateRoute() {
    // if (originRef.current.value === '' || destiantionRef.current.value === '') {
    //   return;
    // }
    console.log('tinhs tians');
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

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setOrigin('');
    setDestination('');
  }

  const handleChangeOrigin = (e) => {
    setOrigin(e.target.value);
  };

  const handleChangeDestination = (e) => {
    setDestination(e.target.value);
  };

  const handleClick = () => {};

  return (
    <Flex position="relative" flexDirection="column" alignItems="center" h="600px" w="900px">
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
          <Marker position={coordinates} onClick={() => handleClick()} />
          {/* <Marker position={center} icon={iconMarker} /> */}
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </Box>
      <Box
        sx={{
          backgroundColor: theme.color.measuring,
          width: '567px',
          fontSize: '16px',
          boxSizing: 'border-box',
          position: 'relative',
          right: '-68px',
          '& input': {
            width: 'calc(100% - 10px)',
            fontSize: '16px',
            margin: 0,
            alignItems: 'center',
            display: 'flex',
          },
          '& button': {
            fontSize: '16px',
          },
        }}
        p={4}
        borderRadius="lg"
        m={4}
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <HStack spacing={4} justifyContent="space-between">
          <Box flexGrow={12}>
            <Autocomplete>
              <Input type="text" onChange={handleChangeOrigin} value={origin} placeholder="Điểm đi" ref={originRef} />
            </Autocomplete>
          </Box>
          <Box sx={{ width: '118px', display: 'flex', justifyContent: 'space-between' }}>
            <IconButton sx={{ cursor: 'pointer' }} aria-label="center back" icon={<FaTimes />} onClick={clearRoute} />
            <IconButton
              aria-label="center back"
              icon={<FaLocationArrow />}
              isRound
              onClick={() => {
                map.panTo(coordinates);
                map.setZoom(15);
                setDestination(address);
              }}
              sx={{ cursor: 'pointer' }}
            />
          </Box>
        </HStack>
        <HStack spacing={4} mt={8} justifyContent="space-between">
          <Box flexGrow={6}>
            <Autocomplete>
              <Input
                type="text"
                onChange={handleChangeDestination}
                value={destination}
                placeholder="Điểm đến"
                ref={destiantionRef}
              />
            </Autocomplete>
          </Box>
          <Box>
            <ButtonGroup>
              <Button sx={{ cursor: 'pointer' }} colorScheme="pink" type="submit" onClick={calculateRoute}>
                Tính đường đi
              </Button>
            </ButtonGroup>
          </Box>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Grid container sx={{ '& p': { margin: '6px 0' } }}>
            <Grid item md={6}>
              <Text>Khoảng cách: {distance} </Text>
            </Grid>
            <Grid item md={6}>
              <Text>Thời gian ước tính: {duration} </Text>
            </Grid>
          </Grid>
        </HStack>
      </Box>
    </Flex>
  );
}

export default Map;
