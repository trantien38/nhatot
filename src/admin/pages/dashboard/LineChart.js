import { Line } from 'react-chartjs-2';
import { Grid, Paper } from '@mui/material';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { dataLine, optionsDoughnut } from 'src/utils/function';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function LineChart({ total_motel, total_motel_month }) {
  console.log({ total_motel, total_motel_month });
  return (
    <Grid container columnSpacing={2}>
      {/* <Grid item lg={5}>
        <Paper
          variant="elevation"
          sx={{
            borderRadius: 2,
          }}
        >
          <Box p={4}>
            <Typography
              sx={{
                pb: 3,
              }}
              variant="h4"
              fontWeight="600"
            >
              Tổng nhà trọ
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <Box>
                <CabinTwoTone
                  sx={{
                    color: '#c3c306',
                  }}
                />
              </Box>
              <Typography sx={{ marginBottom: 0 }} variant="h5" gutterBottom>
                {total_motel[0].total_motel}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Grid> */}

      <Grid item xs={12} md={12} sm={12}>
        <Paper
          sx={{
            borderRadius: 2,
          }}
        >
          <Line
            options={{
              ...optionsDoughnut('Thống kê nhà trọ đăng theo tháng'),
            }}
            data={dataLine({
              labels: total_motel_month.map((item) => item.month),
              data: total_motel_month.map((item) => item.total_motel),
              count: total_motel[0].total_motel,
            })}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LineChart;
