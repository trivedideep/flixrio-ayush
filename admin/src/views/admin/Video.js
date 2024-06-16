import React, { useState, useEffect } from 'react';
import { Button, Table, Space, message, Modal, Form, Input,Card } from 'antd';
import axios from 'axios';
const Video = () => {
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  const fetchData = async () => {
    setTableLoading(true);
    try {
      const response = await fetch('http://localhost:8090/vid');
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

  const edit = (record) => {
setIsEditing(true);
    setEditingRecord(record);
    form.setFieldsValue(record); // Set form values to the selected record
    console.log(record);  };

  const deleteRecord = (v_id) => {
    Modal.confirm({
      title:'Are you sure,you want to delete this data',
      okType:"danger",
      onOk:async()=>
        {
          try {
            const res = await axios.delete(`http://localhost:8090/delvid/${v_id}`);
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
    console.log('Delete record with id:', v_id);
    console.log('Delete record with id:', v_id);
  };

  const handleChange = (e) => {
    setEditingRecord({ ...editingRecord, [e.target.v_name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const res = await axios.put('http://localhost:8090/upvid', { ...values, v_id: editingRecord.v_id });
      if (res.data.status === "Success") {
        message.success(res.data.message);
        setEditFormVisible(false);
        setIsEditing(false);
        fetchData(); // Refresh data after update
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      console.error('Error updating video:', err);
      message.error("An error occurred while updating video");
    }
  };
  const columns = [
    {
      title: 'video_id',
      dataIndex: 'v_id',
    },
    {
      title: 'videoname',
      dataIndex: 'v_name',
    },
    {
        title: 'description',
        dataIndex: 'description',
      },
      {
        title: 'category_id',
        dataIndex: 'c_id',
      },
      {
        title: 'path',
        dataIndex: 'path',
      },
      {
        title: 'user_id',
        dataIndex: 'u_id',
      },
      {
        title: 'thubnail',
        dataIndex: 'thubnail',
      },
      {
        title: 'Views',
        dataIndex: 'views',
      },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => edit(record)} type="link">Edit</Button>
          <Button onClick={() => deleteRecord(record.v_id)} type="link">Delete</Button>
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
    <Card title={<h2>Video Data Table</h2>} extra={<Button type="primary" onClick={start} disabled={hasSelected} loading={loading}>
       Reload
     </Button>}>      
      {/* <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div> */}
      <Table rowSelection={false} columns={columns} dataSource={data} loading={tableLoading} />
      <Modal
        title="Edit Video Details"
        visible={isEditing}
        onCancel={() => { setIsEditing(false); }}
        onOk={handleSubmit}
      >
      <Form form={form} initialValues={editingRecord}>
          <Form.Item label="video ID" name="v_id" hidden>
            <Input disabled />
          </Form.Item>
          <Form.Item label="Video Name" name="v_name" rules={[{ required: true, message: 'Please input user name!' }]}>
            <Input name="v_name" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="description" name="description" rules={[{ required: true, message: 'Please input Email!' }]}>
            <Input name="description" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="c_id" name="c_id" rules={[{ required: true, message: 'Please input password!' }]}>
            <Input name="c_id" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="path" name="path" rules={[{ required: true, message: 'Please input mobileno!' }]}>
            <Input name="path" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="u_id" name="u_id" rules={[{ required: true, message: 'Please input mobileno!' }]}>
            <Input name="u_id" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="thubnail" name="thubnail" rules={[{ required: true, message: 'Please input mobileno!' }]}>
            <Input name="thubnail" onChange={handleChange} />
          </Form.Item>
          
          <Form.Item label="views" name="views" rules={[{ required: true, message: 'Please input mobileno!' }]}>
            <Input name="views" onChange={handleChange} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Video;
