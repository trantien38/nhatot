import { useRef, useState } from 'react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer } from '@react-google-maps/api';
import { Box, Button, ButtonGroup, Flex, HStack, IconButton, Input, SkeletonText, Text } from '@chakra-ui/react';
import StorageKeys from '~/constants/storage-keys';

const center = { lat: 16.047199, lng: 108.219955 };

function Map({ address }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: StorageKeys.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });
  const infoUser = JSON.parse(localStorage.getItem(StorageKeys?.USER));
  const addressUser = `${infoUser.Address}, ${infoUser.WardName}, ${infoUser.DistrictName}, ${infoUser.ProvinceName}`;

  console.log(address);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [origin, setOrigin] = useState(addressUser);
  const [destination, setDestination] = useState(address);

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  // if (!isLoaded) {
  //   return <SkeletonText />;
  // }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return;
    }
    console.log('tinhs tians')
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
    // setDistance(results.rows[0].element[0].distance.text);
    // setDuration(results.rows[0].element[0].duration.text);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  // originRef.current.value = addressUser;
  // destiantionRef.current.value = address;

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    setOrigin('');
    setDestination('');
    // originRef.current.value = '';
    // destiantionRef.current.value = '';
  }

  return (
    <Flex position="relative" flexDirection="column" alignItems="center" h="600px" w="600px">
      <Box position="absolute" left={0} top={0} h="100%" w="100%">
        <GoogleMap
          center={center}
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
          <Marker position={center} />
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </Box>
      <Box p={4} borderRadius="lg" m={4} bgColor="white" shadow="base" minW="container.md" zIndex="1">
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type="text" value={origin} placeholder="Điểm đi" ref={originRef} />
            </Autocomplete>
          </Box>
          <Box flexGrow={1}>
            <Autocomplete>
              <Input type="text" value={destination} placeholder="Điểm đến" ref={destiantionRef} />
            </Autocomplete>
          </Box>

          <ButtonGroup>
            <Button sx={{ cursor: 'pointer' }} colorScheme="pink" type="submit" onClick={calculateRoute}>
              Tính đường đi
            </Button>
            <IconButton sx={{ cursor: 'pointer' }} aria-label="center back" icon={<FaTimes />} onClick={clearRoute} />
          </ButtonGroup>
        </HStack>
        <HStack spacing={4} mt={4} justifyContent="space-between">
          <Text>Khoảng cách: {distance} </Text>
          <Text>Thời gian ước tính: {duration} </Text>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
            sx={{ cursor: 'pointer' }}
          />
        </HStack>
      </Box>
    </Flex>
  );

  // return (
  //   <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
  //     <Marker position={{ lat: 44, lng: -80 }} />
  //   </GoogleMap>
  // );
}

export default Map;
