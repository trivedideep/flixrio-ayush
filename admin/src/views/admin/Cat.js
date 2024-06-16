import React, { useState, useEffect } from 'react';
import { Button, Table, Space, message, Modal, Form, Input,Card } from 'antd';
import axios from 'axios';

const Cat = () => {
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
      const response = await fetch('http://localhost:8090/cat');
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
    const intervalId = setInterval(fetchData, 5000); // Fetch data every 5 seconds

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

  const deleteRecord = async (c_id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this data?',
      okType: 'danger',
      onOk: async () => {
        try {
          const res = await axios.delete(`http://localhost:8090/delcat/${c_id}`);
          setLoading(false);
          if (res.data.status === "Success") {
            message.success(res.data.message);
            fetchData(); // Refresh data after deletion
          } else {
            message.error(res.data.message);
          }
        } catch (err) {
          setLoading(false);
          console.error(err);
          message.error("An error occurred while deleting category");
        }
      }
    });
    console.log('Delete record with id:', c_id);
  };

  const edit = (record) => {
    setIsEditing(true);
    setEditingRecord(record);
    form.setFieldsValue(record); // Set form values to the selected record
    console.log(record);
  };

  const handleChange = (e) => {
    setEditingRecord({ ...editingRecord, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const res = await axios.put('http://localhost:8090/upcat', { ...values, c_id: editingRecord.c_id });
      if (res.data.status === "Success") {
        message.success(res.data.message);
        setEditFormVisible(false);
        setIsEditing(false);
        fetchData(); // Refresh data after update
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      console.error('Error updating category:', err);
      message.error("An error occurred while updating category");
    }
  };

  const columns = [
    {
      title: 'category_id',
      dataIndex: 'c_id',
    },
    {
      title: 'category name',
      dataIndex: 'name',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => edit(record)} type="link">Edit</Button>
          <Button onClick={() => deleteRecord(record.c_id)} type="link">Delete</Button>
        </Space>
      ),
    },
  ];

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };

  const hasSelected = selectedRowKeys.length > 0;

  return (
       <Card title={<h2>Category Data Table</h2>} extra={<Button type="primary" onClick={start} disabled={hasSelected} loading={loading}>
       Reload
     </Button>}>
      {/* <div style={{ marginBottom: 16 }}>
        
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div> */}
      <Table rowSelection={false} columns={columns} dataSource={data} loading={tableLoading} rowKey="c_id" />
      
      <Modal
        title="Edit Category"
        visible={isEditing}
        onCancel={() => { setIsEditing(false); }}
        onOk={handleSubmit}
      >
        <Form form={form} initialValues={editingRecord}>
          <Form.Item label="Category ID" name="c_id" hidden>
            <Input disabled />
          </Form.Item>
          <Form.Item label="Category Name" name="name" rules={[{ required: true, message: 'Please input category name!' }]}>
            <Input name="name" onChange={handleChange} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Cat;
