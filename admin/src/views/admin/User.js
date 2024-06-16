import React, { useState, useEffect } from 'react';
import { Button, Table, Space, message, Modal, Form, Input,Card } from 'antd';
import axios from 'axios';
const User = () => {
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
      const response = await fetch('http://localhost:8090/user');
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
  const handleChange = (e) => {
    setEditingRecord({ ...editingRecord, [e.target.u_name]: e.target.value });
  };

  const edit = (record) => {
     setIsEditing(true);
    setEditingRecord(record);
    form.setFieldsValue(record); // Set form values to the selected record
    console.log(record);
  };

  const deleteRecord = (u_id) => {
    Modal.confirm({
      title:'Are you sure,you want to delete this data',
      okType:"danger",
      onOk:async()=>
        {
          try {
            const res = await axios.delete(`http://localhost:8090/deluser/${u_id}`);
            setLoading(false);
            if (res.data.status === "Success") {
              //alert(res.data.message);
            } else {
              alert(res.data.message);
            }
          } catch (err) {
            setLoading(false);
            console.log(err);
            alert("An error occurred while deleting user");
          }
        }

    })
    console.log('Delete record with id:', u_id);
    console.log('Delete record with id:', u_id);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const res = await axios.put('http://localhost:8090/upuser', { ...values, u_id: editingRecord.u_id });
      if (res.data.status === "Success") {
        message.success(res.data.message);
        setEditFormVisible(false);
        setIsEditing(false);
        fetchData(); // Refresh data after update
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      console.error('Error updating use:', err);
      message.error("An error occurred while updating user");
    }
  };
  
  const columns = [
    {
      title: 'user_id',
      dataIndex: 'u_id',
    },
    {
      title: 'user_name',
      dataIndex: 'u_name',
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'password',
      dataIndex: 'password',
    },
    {
      title: 'mono',
      dataIndex: 'mono',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => edit(record)} type="link">Edit</Button>
          <Button onClick={() => deleteRecord(record.u_id)} type="link">Delete</Button>
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
    <Card title={<h2>User Data Table</h2>} extra={<Button type="primary" onClick={start} disabled={hasSelected} loading={loading}>
       Reload
     </Button>}>
    <div>
      {/* <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div> */}
      <Table rowSelection={false} columns={columns} dataSource={data} loading={tableLoading} />

      <Modal
        title="Edit user"
        visible={isEditing}
        onCancel={() => { setIsEditing(false); }}
        onOk={handleSubmit}
      >
      <Form form={form} initialValues={editingRecord}>
          <Form.Item label="User ID" name="u_id" hidden>
            <Input disabled />
          </Form.Item>
          <Form.Item label="User Name" name="u_name" rules={[{ required: true, message: 'Please input user name!' }]}>
            <Input name="u_name" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input Email!' }]}>
            <Input name="email" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="password" name="password" rules={[{ required: true, message: 'Please input password!' }]}>
            <Input name="password" onChange={handleChange} />
          </Form.Item>
          <Form.Item label="Mobile no" name="mono" rules={[{ required: true, message: 'Please input mobileno!' }]}>
            <Input name="mono" onChange={handleChange} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
    </Card>
  );
};

export default User;
