import { Box } from '@mui/material';
import React from 'react';

function IconAddImage({ title, sx }) {
  return (
    <Box sx={sx}>
      <label htmlFor="banner" style={{ cursor: 'pointer' }}>
        <b style={{ position: 'relative', top: '-14px' }}>{title}&nbsp;&nbsp;</b>
        <svg xmlns="http://www.w3.org/2000/svg" width="53" height="39" viewBox="0 0 53 39">
          <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
            <g stroke="#FF8800" strokeWidth="2" transform="translate(-255 -179)">
              <g transform="translate(132 122)">
                <path d="M150.631 87.337c-5.755 0-10.42-4.534-10.42-10.127 0-5.593 4.665-10.127 10.42-10.127s10.42 4.534 10.42 10.127c0 5.593-4.665 10.127-10.42 10.127m10.42-24.755l-2.315-4.501h-16.21l-2.316 4.5h-11.579s-4.631 0-4.631 4.502v22.505c0 4.5 4.631 4.5 4.631 4.5h41.684s4.631 0 4.631-4.5V67.083c0-4.501-4.631-4.501-4.631-4.501h-9.263z"></path>
              </g>
            </g>
          </g>
        </svg>
        <span
          style={{
            position: 'absolute',
            marginTop: '-14px',
            marginLeft: '-4px',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 21">
            <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
              <g fill="#FF8800" transform="translate(-161 -428)">
                <g transform="translate(132 398)">
                  <g transform="translate(16.648 17.048)">
                    <g transform="rotate(-180 16.142 16.838)">
                      <rect width="2.643" height="19.82" x="8.588" y="0" rx="1.321"></rect>
                      <path
                        d="M9.91 0c.73 0 1.321.592 1.321 1.321v17.177a1.321 1.321 0 01-2.643 0V1.321C8.588.591 9.18 0 9.91 0z"
                        transform="rotate(90 9.91 9.91)"
                      ></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </span>
      </label>
    </Box>
  );
}

export default IconAddImage;
