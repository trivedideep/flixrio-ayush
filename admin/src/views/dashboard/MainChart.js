import React, { useEffect, useRef, useState } from 'react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';

const MainChart = () => {
  const [topVideos, setTopVideos] = useState([]);
  const chartRef = useRef(null);

  const fetchTopVideos = async () => {
    try {
      const response = await fetch('http://localhost:8090/display_top20_mostviewvideo');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setTopVideos(result);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const getRandomColor = () => {
    const colors = ['success', 'info', 'warning', 'danger', 'primary'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const calculatePercentage = (value, total) => {
    return (value / total) * 100;
  };

  const calculateProgress1 = (data) => {
    return data.map((item) => item.views);
  };

  useEffect(() => {
    fetchTopVideos();
  }, []);

  useEffect(() => {
    if (topVideos.length > 0) {
      const viewsData = calculateProgress1(topVideos);
      chartRef.current.data.datasets[0].data = viewsData;
      chartRef.current.update();
    }
  }, [topVideos]);

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          );
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color');
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          );
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color');
          chartRef.current.update();
        });
      }
    });
  }, [chartRef]);

  return (
    <>
      <CChartLine
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: topVideos.map((video, index) => `${video.v_name}`),
          datasets: [
            {
              label: 'Top Videos',
              backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
              borderColor: getStyle('--cui-info'),
              pointHoverBackgroundColor: getStyle('--cui-info'),
              borderWidth: 2,
              data: topVideos.length > 0 ? calculateProgress1(topVideos) : [],
              fill: true,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              max: 250,
              ticks: {
                color: getStyle('--cui-body-color'),
                maxTicksLimit: 5,
                stepSize: Math.ceil(250 / 5),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  );
};

export default MainChart;
