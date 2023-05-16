import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Sliders from '~/components/Slider/Sliders';
import Category from './Category';
import Item from './Item';
import Menu from './Menu';

export default function Home() {
  return (
    <>
      <Sliders />
      <Box
        sx={{
          display: 'flex',
          padding: '20px',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}
      >
        <Category
          icon={
            'https://cdn.chotot.com/admincentre/t1gf-_cHO7gU7cs9p7cPJkV1ZeIgPWfWUUDBLGS2tME/preset:raw/plain/9a146728fc23ceecd86473876ea74692-2810741368001410030.jpg'
          }
          title={'Mua bán'}
          count={686.868}
          content={'tin đăng mua bán'}
        />
        <Box
          sx={{
            backgroundColor: '#e8e8e8',
            height: '56px',
            margin: 'auto 16px',
            width: '1px',
          }}
        />
        <Category
          icon={
            'https://cdn.chotot.com/admincentre/VJ8h5Rw2mZKK8U6npfacA1u9iX8slO1oVdzeWR8CjRY/preset:raw/plain/9b8f9265b2c51f26d8185ae69a32de50-2805802191452075298.jpg'
          }
          title={'Cho thuê'}
          count={286.286}
          content={'tin đăng cho thuê'}
        />
        <Box
          sx={{
            backgroundColor: '#e8e8e8',
            height: '56px',
            margin: 'auto 16px',
            width: '1px',
          }}
        />
        <Category
          icon={
            'https://cdn.chotot.com/admincentre/dmhHHMymGXT_9_-TKZmirYD3-16E7FqRUd3HwftUiXs/preset:raw/plain/6d4c07a06979d77218789a9d6eef57fe-2805802153325981342.jpg'
          }
          title={'Dự án'}
          count={888.888}
          content={'dự án'}
        />
      </Box>

      <Box>
        <Menu title={'Mua bán bất động sản'} count={99.999} />
        <Menu title={'Cho thuê bất động sản'} count={28.286} />
        <Menu title={'Dụ án được quan tâm'} count={86.868} />
      </Box>
      <Box
        sx={{
          backgroundColor: '#fff',
          marginTop: '12px',
        }}
      >
        <img
          alt="mid banner"
          src="https://cdn.chotot.com/admincentre/-qh1VBGLyzy32EqV2OrQiAHtFlVHJpmBKREXUSklPmA/preset:raw/plain/e3bc34302544e429bdbd6372b3ebd42b-2811454364981615492.jpg"
          width="100%"
        />
      </Box>
      <Box
        sx={{
          backgroundColor: '#fff',
          marginTop: '12px',
          '& h2': {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#262e3e',
            padding: '7.5px 12px',
          },
          '& h2 > p': {
            fontSize: '18px',
            color: '#fff',
            margin: 0,
            fontWeight: 700,
          },
          '& h2 > img': {
            marginLeft: '13px',
          },
        }}
      >
        <h2>
          <p>Trở thành Đối tác Nhà Tốt</p>
          <img width="22.4" height="28" alt="shield icon" src="https://static.chotot.com/storage/default_images/pty/shield.svg" />
        </h2>
        <Grid
          container
          sx={{
            padding: '0 14px 14px 14px',
          }}
        >
          <Item
            src="https://cdn.chotot.com/admincentre/cyv7mNjb62sbJme5uSc3WQz0OiNl7RvYiqKw1tf2ZIM/preset:raw/plain/e34f3443057f6cc5b640d117d73a4429-2808379119443443986.jpg"
            title="Nhãn Đối Tác"
            content="Tăng 40% hiệu quả tin đăng"
          />
          <Item
            src="https://cdn.chotot.com/admincentre/jpZqe68svUuCc0trsTLg9oUuDPqUc78tSMAkukSd7Ns/preset:raw/plain/1d6d2218e5c9703dad0fd94101a805d6-2808379189790155893.jpg"
            title="Tin đăng tiếp cận"
            content="Hơn 40 triệu người mua tiềm năng"
          />
          <Item
            src="https://cdn.chotot.com/admincentre/nIzlhaBBTRc1kI2ORAXWq09FAbD6Wq9DQPM1sSTSjPU/preset:raw/plain/bde99245622feb8caa90ba49c2ff9d81-2808379230799729806.jpg"
            title="Tài Khoản Doanh Nghiệp"
            content="Giúp tăng hiệu quả quản lý"
          />
        </Grid>
      </Box>

      <Box>
        <Box sx={{ padding: '8px' }}>
          <h2>MUA BÁN VÀ CHO THUÊ BẤT ĐỘNG SẢN UY TÍN, NHANH CHÓNG TRÊN NHÀ TỐT</h2>
          <p>(Nhà Tốt: Nền Tảng Bất động sản được phát triển bởi Chợ Tốt)</p>
          <p>
            Mua bán và cho thuê bất động sản được xem là một trong những hình thức kinh doanh siêu lợi nhuận, chính vì thế mà các
            hình thức kinh doanh bất động sản này đang được rất nhiều người quan tâm và đầu tư. Hãy cùng Nhà Tốt - chuyên trang
            bất động sản thuộc Chợ Tốt tìm hiểu kỹ hơn về các hình thức mua bán, cho thuê bất động sản ngay trên chuyên trang
            Nhatot.com.
          </p>
          <h3>Mua bán và cho thuê bất động sản là gì?</h3>
          <p>
            Kinh doanh bất động sản hiện nay đang là một trong những phương thức kinh doanh được rất nhiều nhà đầu tư hướng đến,
            sở dĩ kinh doanh bất động sản được nhiều người lựa chọn là do nó có thể mang tới cho các nhà đầu tư những khoản lợi
            nhuận siêu hấp dẫn, bởi vì vậy hình thức kinh doanh mua bán và cho thuê bất động sản là được nhiều nhà đầu tư lựa chọn
            nhất.
          </p>
        </Box>
      </Box>
    </>
  );
}
