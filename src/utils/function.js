export const renderColors = (numColors) => {
  var colors = [];
  var usedColors = new Set(); // Tạo một Set để lưu trữ các mã màu đã sử dụng

  while (colors.length < numColors) {
    var color = '#' + Math.floor(Math.random() * 16777215).toString(16);

    if (!usedColors.has(color)) {
      colors.push(color);
      usedColors.add(color);
    }
  }

  return colors;
};

export const renderdata = ({ labels, colors, data, title, label }) => {
  return {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],

    title: {
      display: true,
      text: title,
    },
  };
};

export const optionsDoughnut = (title) => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
};

export const dataLine = ({ labels, data, count }) => {
  return {
    labels,
    datasets: [
      {
        label: `Tổng nhà trọ: ${count}`,
        data,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
};
