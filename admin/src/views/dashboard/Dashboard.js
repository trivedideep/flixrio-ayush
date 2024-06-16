import React,{ useState, useEffect } from 'react'
import classNames from 'classnames'
import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'



import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'

const Dashboard = () => {
  const [topVideos, setTopVideos] = useState([]);
  const [progressExample, setProgressExample] = useState([]);

  const fetchTopVideos = async () => {
    try {
      const response = await fetch('http://localhost:8090/display_mostviewvideo');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setTopVideos(result);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };
  function calculatePercentage(currentValue, totalValue) {
    if (totalValue === 0) {
      return 0;
    } else {
      return Math.round((currentValue / totalValue) * 100);
    }
  }
  const colors = ['success', 'info', 'warning', 'danger', 'primary'];
  
  const calculateProgress = (data) => {
    return data.map((item) => ({
      title: item.v_name,
      value: `${item.views} Views`,
      percent: calculatePercentage(item.views,100),
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
  };

  useEffect(() => {
    fetchTopVideos();
  }, []);

  useEffect(() => {
    if (topVideos.length > 0) {
      const calculatedProgress = calculateProgress(topVideos);
      console.log(calculatedProgress);
      setProgressExample(calculatedProgress);
    }
  }, [topVideos]);

  // const progressExample = [
  //   { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
  //   { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
  //   { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
  //   { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
  //   { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  // ]


  

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Top 5 Most View Videos
              </h4>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            {progressExample.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>
      <CCard className="mb-4">
        <CCardBody>
        <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Top 20 Views Videos
              </h4>
            </CCol>
          </CRow>
          </CCardBody>
          <CCardFooter><MainChart /></CCardFooter>
      </CCard>
      {/* <WidgetsBrand className="mb-4" withCharts /> */}
      
    </>
  )
}

export default Dashboard
