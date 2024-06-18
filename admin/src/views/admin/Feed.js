import React, { useState, useEffect } from 'react';
import { Button, Table, Space, message, Modal, Form, Input,Card } from 'antd';
import axios from 'axios';


const Feed = () => {
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);

  const fetchData = async () => {
    setTableLoading(true);
    try {
      const response = await fetch('http://localhost:8090/feed');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 2000); // Fetch data every 5 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);
  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      fetchData();
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const edit = (f_id) => {
    console.log('Edit record with id:', f_id);
    // Implement edit functionality here
  };

  const deleteRecord = (f_id) => {
    Modal.confirm({
      title:'Are you sure,you want to delete this data',
      okType:"danger",
      onOk:async()=>
        {
          try {
            const res = await axios.delete(`http://localhost:8090/delfeed/${f_id}`);
            setLoading(false);
            if (res.data.status === "Success") {
              //alert(res.data.message);
            } else {
              alert(res.data.message);
            }
          } catch (err) {
            setLoading(false);
            console.log(err);
            alert("An error occurred while deleting category");
          }
        }

    })
    console.log('Delete record with id:', f_id);
    console.log('Delete record with id:', f_id);
  };

  const columns = [
    
    {
      title: 'feedback_id',
      dataIndex: 'f_id',
    },
    {
      title: 'User_id',
      dataIndex: 'u_id',
    },
    {
      title: 'Feed back ',
      dataIndex: 'feed',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => deleteRecord(record.f_id)} type="link">Delete</Button>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <Card title={<h2>Feed back Data Table</h2>} extra={<Button type="primary" onClick={start} disabled={hasSelected} loading={loading}>
    Reload</Button>}>
    
      {/* <div
        style={{
          marginBottom: 16,
        }}
      >
        
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div> */}
      <Table rowSelection={false} columns={columns} dataSource={data} loading={tableLoading} />
    </Card>
  );
};

export default Feed;
