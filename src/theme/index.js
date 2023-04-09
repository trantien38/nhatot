const { createTheme } = require('@mui/material');

const theme = createTheme({
  color: {
    title: '',
    primary: 'gray',
    btn: '#FF6D25',
    btnHover: '#e6e6e6',
    btnAdd: '#589f39',
    btnAddHover: '#3b8122',
    price: '#c90927',
    hoverBtn: '',
    scroll: '#b7b7b7',
  },
  size: {
    browser: '1080px',
  },
});

export default theme;
