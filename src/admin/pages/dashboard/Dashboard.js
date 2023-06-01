import { Grid } from '@mui/material';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import React, { useState, useEffect } from 'react';
import adminApi from '~/api/AdminApi';
import DoughnutDashboard from './DoughnutDashboard';
import LineChart from './LineChart';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

function Dashboard() {
  const [datas, setDatas] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await adminApi.adminGetDataDashboard();
      setDatas(data);
      console.log(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <p>Loading...</p>;
  
  return (
    <Grid container direction="row" alignItems="stretch" rowSpacing={2} columnSpacing={2} mb={2}>
      <DoughnutDashboard title="Thống kê nhà trọ theo chủ trọ" data={datas.motel_by_host} label="Nhà trọ" column="Name" />
      <DoughnutDashboard
        title="Thống kê nhà trọ theo tỉnh thành"
        data={datas.motel_by_province}
        label="Nhà trọ"
        column="ProvinceName"
      />
      <DoughnutDashboard
        title="Thống kê nhà trọ theo quận huyện"
        data={datas.motel_by_district}
        label="Nhà trọ"
        column="DistrictName"
      />
      {/* <DoughnutDashboard title="Thống kê nhà trọ theo phường xã" data={datas.motel_by_ward} label="Nhà trọ" column="WardName" /> */}
      <Grid item md={12} sm={12} xs={12} lg={12}>
        <LineChart total_motel={datas.total_motel} total_motel_month={datas.total_motel_month} />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
