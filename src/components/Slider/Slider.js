import { Box } from '@mui/system';
import React from 'react';
import { useState, useRef, useEffect } from 'react';

const srcImg = [
  'https://cdn.chotot.com/admincentre/CybhBSFgAzUIlJRFFZr8CAgs-VcTFpX8UwL1a3GLVEI/preset:raw/plain/9cb61a33dccba128c9383a6956e4cb92-2805770622679927617.jpg',
  'https://cdn.chotot.com/admincentre/fmgBiC3x0EXIJWefMK5jOWli3jEp3jDiOhwRpE5Kw48/preset:raw/plain/854024df368c8576ba057cdaed1317fc-2806793307907436243.jpg',
  'https://cdn.chotot.com/admincentre/dd4UfbJ2VdNeLYSfUk2NoIzD1qXN2wUrGaAL7y8dP2M/preset:raw/plain/b7477f2fe6c711692fbd273315bf74c2-2805770692151326817.jpg',
];

export default function Slider() {
  const [src, setSrc] = useState(srcImg[0]);
  const srcRef = useRef();
  const indexRef = useRef(0);
  const randomSlider = () => {
    const index = indexRef.current;
    srcRef.current = setTimeout(() => {
      setSrc(srcImg[index]);
      randomSlider();
      console.log(1);
    }, 1000);
    indexRef.current += 1;
    if (index > 2) {
      indexRef.current = 0;
    }
    console.log(2);
  };

  return (
    
    <Box sx={{ height: '234px', backgroundColor: '#fff' }}>
      <Box sx={{
        maxWidth: '960px',
        margin: ' 0 auto',
      }}>
      <img
        style={{width:'100%'}}
        alt="HB PTY JUPITER"
        src={src || srcImg[0]}
        ref={srcRef}
        // onClick={randomSlider}
        // decoding="async"
        // class="img-item"
        // style="position: absolute; inset: 0px; box-sizing: border-box; padding: 0px; border: none; margin: auto; display: block; width: 0px; height: 0px; min-width: 100%; max-width: 100%; min-height: 100%; max-height: 100%; object-fit: cover;"
      />
      </Box>
    </Box>
  );
}
