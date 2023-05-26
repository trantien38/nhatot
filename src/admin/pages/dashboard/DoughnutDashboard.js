import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Grid, Paper } from '@mui/material';
import { optionsDoughnut, renderColors, renderdata } from '~/utils/function';

function DoughnutDashboard({ title, data, label, column }) {
  return (
    <Grid item md={4} sm={6} xs={12} lg={4}>
      <Paper
        sx={{
          borderRadius: 2,
        }}
      >
        <Doughnut
          options={optionsDoughnut(title)}
          data={renderdata({
            data: data.map((item) => item.countMotel),
            labels: data.map((item) => item[column]),
            colors: renderColors(data.length),
            title,
            label,
          })}
        />
      </Paper>
    </Grid>
  );
}

export default DoughnutDashboard;
