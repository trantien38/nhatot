import { Box } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '~/components/AddIcon';
function UploadItem({ iconImage, iconVideo, title, info, callback, content, _name }) {
  const [titles, setTitles] = useState(title);
  const handleChangeImage = (e) => {
    setTitles(`Tải lên ${e.target.files.length} ${content}`);
    console.log(e.target.files);
    callback(e.target.files);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      {info && (
        <Box
          sx={{
            position: 'absolute',
            cursor: 'pointer',
            top: '8px',
            right: '8px',
            zIndex: '3',
            '& svg': {
              height: '19px',
            },
            '& span': {
              paddingLeft: '6px',
            },
          }}
        >
          <svg data-type="monochrome" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 12" width="1em" height="1em">
            <path
              fill="currentColor"
              d="M6 0a6 6 0 100 12A6 6 0 006 0zm-.693 8.59V5.843a.693.693 0 111.386 0V8.59a.693.693 0 11-1.386 0zM6 4.393a.833.833 0 110-1.666.833.833 0 010 1.666z"
            ></path>
          </svg>
          <span>Hình ảnh hợp lệ</span>
        </Box>
      )}
      <Box
        sx={{
          height: '160px',
          backgroundColor: '#f4f4f4',
          borderRadius: '4px',
          border: '2px dotted #fe9900',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          opacity: '1',
          paddingTop: '0',
          '& svg': {
            cursor: 'pointer',
          },
          '& p': {
            marginBottom: 0,
          },
        }}
      >
        <input id={_name} type="file" name="media" multiple style={{ display: 'none' }} onChange={handleChangeImage} />
        <label htmlFor={_name}>
          {iconImage && (
            <svg xmlns="http://www.w3.org/2000/svg" width="53" height="39" viewBox="0 0 53 39">
              <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
                <g stroke="#FF8800" strokeWidth="2" transform="translate(-255 -179)">
                  <g transform="translate(132 122)">
                    <path d="M150.631 87.337c-5.755 0-10.42-4.534-10.42-10.127 0-5.593 4.665-10.127 10.42-10.127s10.42 4.534 10.42 10.127c0 5.593-4.665 10.127-10.42 10.127m10.42-24.755l-2.315-4.501h-16.21l-2.316 4.5h-11.579s-4.631 0-4.631 4.502v22.505c0 4.5 4.631 4.5 4.631 4.5h41.684s4.631 0 4.631-4.5V67.083c0-4.501-4.631-4.501-4.631-4.501h-9.263z"></path>
                  </g>
                </g>
              </g>
            </svg>
          )}

          {iconVideo && (
            <svg xmlns="http://www.w3.org/2000/svg" width="53" height="39" fill="none" viewBox="0 0 53 39">
              <path
                stroke="#FF8800"
                strokeWidth="2"
                d="M39.62 11.031l.013-.006.012-.006 11.707-6.042a1.329 1.329 0 01.208-.076l.007.003.128.025c.28.054.305.221.305.228v26.046a.412.412 0 01-.07.095.704.704 0 01-.203.145h-.122c-.073 0-.126 0-.176-.002h-.024l-.031-.017-11.721-6.183-.016-.008-.017-.008c-.16-.077-.41-.363-.41-.847v-12.5c0-.484.25-.77.41-.847zm11.716 20.404h.001-.001z"
              ></path>
              <mask id="path-2-inside-1_289_1913" fill="#fff">
                <path
                  fillRule="evenodd"
                  d="M10.447 7c1.81 0 3.234 1.466 3.234 3.333 0 1.867-1.423 3.333-3.234 3.333S7.213 12.2 7.213 10.333C7.213 8.466 8.636 7 10.447 7zM28.07 36.167c4.656 0 8.537-4 8.537-8.8v-18.4c0-4.8-3.88-8.8-8.537-8.8H8.537C3.881.167 0 4.167 0 8.967v18.4c0 4.934 3.751 8.8 8.537 8.8H28.07z"
                  clipRule="evenodd"
                ></path>
              </mask>
              <path
                fill="#FF8800"
                d="M10.447 9c.65 0 1.234.513 1.234 1.333h4C15.68 7.419 13.419 5 10.447 5v4zm1.234 1.333c0 .82-.584 1.333-1.234 1.333v4c2.972 0 5.234-2.42 5.234-5.333h-4zm-1.234 1.333c-.65 0-1.234-.513-1.234-1.333h-4c0 2.914 2.262 5.333 5.234 5.333v-4zm-1.234-1.333c0-.82.584-1.333 1.234-1.333V5c-2.972 0-5.234 2.42-5.234 5.333h4zM28.07 38.167c5.818 0 10.537-4.953 10.537-10.8h-4c0 3.753-3.042 6.8-6.537 6.8v4zm10.537-10.8v-18.4h-4v18.4h4zm0-18.4c0-5.847-4.72-10.8-10.537-10.8v4c3.495 0 6.537 3.047 6.537 6.8h4zM28.07-1.833H8.537v4H28.07v-4zm-19.533 0C2.72-1.833-2 3.12-2 8.967h4c0-3.753 3.042-6.8 6.537-6.8v-4zM-2 8.967v18.4h4v-18.4h-4zm0 18.4c0 5.98 4.59 10.8 10.537 10.8v-4c-3.624 0-6.537-2.913-6.537-6.8h-4zm10.537 10.8H28.07v-4H8.537v4z"
                mask="url(#path-2-inside-1_289_1913)"
              ></path>
            </svg>
          )}
          <AddIcon />
        </label>
        <p>{titles}</p>
      </Box>
    </Box>
  );
}

export default UploadItem;
