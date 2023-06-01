import { Box } from '@mui/system';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import bannerApi from '~/api/BannerApi';
import { STATIC_HOST } from '~/constants';
import styles from './Slider.module.scss';

export default function Sliders() {
  const [banner, setBanner] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  useEffect(() => {
    (async () => {
      const bannerList = await bannerApi.getSrcBanner();
      setBanner(bannerList.banner);
      console.log(bannerList);
    })();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
      }}
    >
      <Box className={styles.slider}>
        <Box className={clsx(styles.slides, 'slides')}>
          <Slider {...settings}>
            {banner.length > 0 &&
              banner.map((result, index) => (
                <div key={index} className={clsx(styles.slide, 'first')}>
                  <img
                    src={`${STATIC_HOST}/banners/${result.srcBanner}`}
                    style={{ width: '100%', height: '300px' }}
                    alt="HB PTY JUPITER"
                  />
                </div>
              ))}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
}
