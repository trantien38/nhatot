import { useRef, useState, useEffect } from 'react';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import { useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer, InfoWindow } from '@react-google-maps/api';
import { Box, Button, ButtonGroup, Flex, HStack, IconButton, Input, SkeletonText, Text } from '@chakra-ui/react';
import StorageKeys from '~/constants/storage-keys';
import Geocode from 'react-geocode';
import iconMarker from '~/assets/images/markerIcon-removebg-preview.png';
import { toast, Toaster } from 'react-hot-toast';
import { toastMessage } from '~/utils/toast';
import { Link } from 'react-router-dom';
import theme from '~/theme';

const center = { lat: 16.047199, lng: 108.219955 };

function ListMap({ listMotel }) {
  const [motels, setMotels] = useState(listMotel);
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
  // };
  // useEffect(() => {
  //   findLatAndLng();
  // }, [addressUser]);
  // convert address to lat, lng
  useEffect(() => {
    function findAroundHere() {
      listMotel.map(async (motel) => {
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService();
        const results = await directionsService.route({
          origin: addressUser,
          // destination: `${motel[0]?.Address}, ${motel[0]?.WardName}, ${motel[0]?.DistrictName}, ${motel[0]?.ProvinceName}`,
          destination: `${motel?.Address}, ${motel?.WardName}, ${motel?.DistrictName}, ${motel?.ProvinceName}`,
          //   eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING,
        });
        const s = results.routes[0].legs[0].distance.text.split(' ');
        if (s[0].replace(/,/g, '.') * 1 < radius) {
          // console.log(s[0].replace(/,/g, '.') * 1);
          // console.log(motel);
          refMotels.current.push(motel);
          // setMotels([...motels, motel])
          // console.log([...motels, motel]);
          // setMotels([...motels, motel])
        }
      });
      setTimeout(async () => {
        await console.log(refMotels.current);
        await setMotels(refMotels.current);
      }, 1500);
    }
    findAroundHere();
  }, [radius]);

  // setDestination(address);
  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      toastMessage.error('Vui lòng nhập đầy đủ điểm đi và điểm đến');
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      // origin: originRef.current.value,
      // destination: destiantionRef.current.value,
      origin,
      destination,
      //   eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
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

  const handleChangeOrigin = (e) => {
    setOrigin(e.target.value);
  };

  const handleChangeDestination = (e) => {
    setDestination(e.target.value);
  };
  const handleChangeRadius = (e) => {
    refMotels.current = [];
    setRadius(e.target.value);
  };

  const handleClickShowInfoMotel = (motel) => {
    setDestination(`${motel?.Address}, ${motel?.WardName}, ${motel?.DistrictName}, ${motel?.ProvinceName}`);
    console.log(motel);
    const infoElement = document.querySelector(`.info-${motel.IdMotel}`);
    console.log(infoElement);
    // setMarkerLoaded(true);
  };

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
        >
          <Marker position={coordinates} onClick={() => handleClickShowInfoMotel()} />
          {motels?.map((motel) => (
            <Marker
              key={motel.IdMotel}
              position={motel.latAndLng}
              icon={iconMarker}
              onClick={() => handleClickShowInfoMotel(motel)}
            >
              {markerLoaded && (
                <InfoWindow>
                  <Link to={`/detail/${motel.IdMotel}`} className={`info-${motel.IdMotel}`}>
                    <h4>{motel.Title}</h4>
                    <p>{`Giá cho thuê: ${motel.Price} triệu/tháng`}</p>
                    <p>{`Diện tích sử dụng: ${motel.Acreage} m2`}</p>
                    <p>{`${motel.Address}, ${motel.WardName}, ${motel.DistrictName}, ${motel.ProvinceName}`}</p>
                  </Link>
                </InfoWindow>
              )}
            </Marker>
          ))}
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </Box>
      <Toaster />
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
        p={8}
        borderRadius="lg"
        bgColor="white"
        shadow="base"
        minW="container.md"
        zIndex="1"
      >
        <HStack spacing={2} justifyContent="space-between">
          <Box flexGrow={6}>
            <Autocomplete>
              <Input type="text" onChange={handleChangeOrigin} value={origin} placeholder="Điểm đi" ref={originRef} />
            </Autocomplete>
          </Box>
          <Box sx={{ width: '120px' }}>
            <Autocomplete>
              <Input
                type="text"
                onChange={handleChangeRadius}
                value={radius}
                placeholder="Bán kính: ? km"
                // ref={destiantionRef}
              />
            </Autocomplete>
          </Box>
        </HStack>
        <HStack spacing={2} mt={8} justifyContent="space-between">
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
          <Text sx={{ margin: '6px 0' }}>Khoảng cách ước tính: {distance} </Text>
          <Text>Thời gian ước tính: {duration} </Text>
          <IconButton
            aria-label="center back"
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              setOrigin(addressUser);
              map.panTo(coordinates);
              map.setZoom(15);
              //   setDestination(address);
            }}
            sx={{ cursor: 'pointer', backgroundColor: theme.color.measuring, border: 'none' }}
          />

          <IconButton
            sx={{ cursor: 'pointer', backgroundColor: theme.color.measuring, border: 'none' }}
            aria-label="center back"
            icon={<FaTimes />}
            onClick={clearRoute}
          />
        </HStack>
      </Box>
    </Flex>
  );
}

export default ListMap;
