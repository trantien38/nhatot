import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import motelApi from '~/api/MotelApi';
import Sliders from '~/components/Slider/Sliders';
import Category from './Category';
import Item from './Item';
import Menu from './Menu';

export default function Home() {
  const [motels, setMotels] = useState({});

  useEffect(() => {
    (async () => {
      const listMotel = await motelApi.getMotelHomePage();
      console.log(listMotel);
      setMotels(listMotel);
    })();
  }, []);
  return (
    <>
      <Sliders />
      {/* <Box
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
      </Box> */}

      <Box>
        <Menu data={motels.motelNew} title="Tin đăng mới nhất" />
        <Menu data={motels.motelFavourite} title="Tin yêu thích nhiều nhất" />
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
          <h2>CHO THUÊ NHÀ TRỌ UY TÍN, NHANH CHÓNG TRÊN NHÀ TỐT</h2>
          <h3>Thuê phòng trọ giá rẻ</h3>
          <p>
            Là hình thức kinh doanh khá phổ biến, mức thuê phù hợp với nhiều khách hàng khác nhau. Đặc biệt, phòng trọ TPHCM,
            phòng trọ giá rẻ Hà Nội rất phù hợp với những đối tượng có thu nhập thấp, lao động tự do… Tuy nhiên, những phòng trọ
            giá rẻ này sẽ ẩn chứa khá nhiều rủi ro khác nhau.
          </p>
          <p>
            Phòng trọ giá rẻ có mặt hạn chế về chất lượng phòng, hạ tầng xung quanh, an ninh khu vực… Vị trí xây dựng thường ở khu
            vực có khu công nghiệp, các trường đại học, vùng ven, ngoại thành. Giá thuê thường từ 1 triệu đến 3 triệu/tháng với
            diện tích 10m2 đến 25m2.
          </p>

          <h3>Thuê phòng trọ với giá bình dân</h3>
          <p>
            Thuê phòng trọ bình dân thường phù hợp với các bạn nhân viên văn phòng, hộ gia đình có mức thu nhập ổn định. Hoặc có
            thể là nhóm sinh viên – học sinh có điều kiện kinh tế… Những phòng này thường có vị trí đẹp, tiện đi lại.
          </p>
          <p>
            Giá nhà trọ Thủ Đức bình dân dao động từ 3,5 triệu đến 6 triệu/tháng cho diện tích từ 25m2 đến 50m2. Thông thường
            những phòng trọ này sẽ được trang bị những tiện nghi cơ bản nhất. Nhiều nơi thuê xong, bạn chỉ cần mang đồ đến ở.
          </p>
          <p>
            Ngoài ra, hình thức cho thuê trọ còn có các căn hộ dịch vụ, ký túc xá, homestay. Mỗi hình thức sẽ có nhiều gia khác
            nhau tùy thuộc vào vị trí và kinh phí đầu tư.
          </p>
          <h2>LƯU Ý NHỮNG ĐIỀU SAU KHI THUÊ TRỌ</h2>
          <h3>Thuê phòng trọ nên xác định khu vực thuê phòng trước</h3>
          <p>
            Bạn phải biết được là mình cần tìm phòng ở khu vực nào? Bạn cần khoanh vùng trước những nơi có thể thuê phòng trọ.
            Điều này giúp bạn dễ tìm và tìm kiếm hiệu quả hơn. Thông thường, vị trí thuê phòng bạn nên xác định dựa trên các tiêu
            chí khác nhau. Như thuê gần chỗ bạn làm việc, thuê gần trường học?
          </p>
          <p>
            Vị trí thuê phòng cần phải thuận lợi cho việc di chuyển từ chỗ ở đến chỗ làm, đến trường học. Điều này sẽ giúp bạn
            tiết kiệm thời gian, công sức đi lại… Và xét về lâu dài thì thuê phòng như thế này sẽ rẻ và có lợi hơn nhiều. Nếu để
            có thể giảm tối đa chi phí thuê phòng, có thể chọn các địa điểm cho thuê phòng trọ Thủ Đức, thuê phòng trọ quận 1,
            thuê phòng trọ quận 5, phòng trọ quận 9, phòng trọ quận 3, phòng trọ bình chánh, phòng trọ hóc môn, quận 12. Do đây là
            các quận nằm ngoài rìa của thành phố Hồ Chí Minh.
          </p>
          <h3>Thuê phòng nên chọn nơi có nhiều tiện ích xung quanh</h3>
          <p>
            Bạn nên lựa chọn thuê phòng trọ ở những nơi có nhiều tiện ích xung quanh. Cơ bản nhất cũng phải gần chợ, siêu thị,
            bệnh viện… Nếu gia đình có con nhỏ, bạn nên lựa chọn nơi gần trường học của trẻ.
          </p>
          <p>
            Cần tránh những nơi nhiều quán nhậu, khu vực hẻo lánh hoặc không an ninh, đặc biệt là với các bạn nữ. Khi xem nhà, bạn
            nên quan sát xem xung quanh khu vực phòng trọ có bị ngập nước khi mưa hay không?
          </p>
          <h3>Tìm hiểu các loại chi phí thuê phòng trọ</h3>
          <p>
            Giá thuê phòng trọ tùy thuộc vào vị trí, diện tích, không gian. Bên cạnh đó, những phòng đầy đủ tiện nghi thường có
            giá thuê cao hơn. Ngoài giá thuê phòng mỗi tháng, bạn cần phải tính toán các chi phí kèm theo.
          </p>
          <p>
            Bạn cần phải tìm hiểu phí gửi xe, tiền điện nước, tiền internet, hoặc tiền vệ sinh… Mọi thứ cần phải được tìm hiểu và
            thỏa thuận rõ với chủ nhà cho thuê. Điều này giúp bạn tránh được những chi phí phát sinh bất ngờ.
          </p>
          <h3>Bạn phải kiểm tra chất lượng phòng trọ</h3>
          <p>
            Nên đi xem phòng vào buổi sáng, đi chung với bạn bè – không nên đi một mình. Quan sát xem chất lượng ngoại thất, nội
            thất trong phòng như thế nào? Vì các yếu tố này sẽ ảnh hưởng đến chất lượng sống của bạn sau này.
          </p>
          <p>
            Hãy kiểm tra xem tường nhà có bị nứt không? Cửa phòng, cửa sổ có khóa chắc chắn và có kín đáo hay không? Quan sát và
            thử xem nhà vệ sinh xem có ổn hay không? Nước sinh hoạt có sạch hay không?
          </p>
          <h3>Hãy thỏa thuận giá cho thuê phòng</h3>
          <p>
            Bạn nên dựa vào tình hình thực tế để trả giá thuê với chủ phòng trọ. Việc trả giá tiền thuê sẽ giúp bạn thuê được
            phòng trọ với giá phù hợp nhất.
          </p>
        </Box>
      </Box>
    </>
  );
}
