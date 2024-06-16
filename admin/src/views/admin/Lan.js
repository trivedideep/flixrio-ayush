import React, { useState, useEffect } from 'react';
import { Button, Table, Space, message, Modal, Form, Input,Card } from 'antd';
import axios from 'axios';
const Lan = () => {
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
      const response = await fetch('http://localhost:8090/lan');
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
    console.log(record); };

    const handleChange = (e) => {
      setEditingRecord({ ...editingRecord, [e.target.l_name]: e.target.value });
    }; 
  const deleteRecord = (l_id) => {
    Modal.confirm({
      title:'Are you sure,you want to delete this data',
      okType:"danger",
      onOk:async()=>
        {
          try {
            const res = await axios.delete(`http://localhost:8090/dellan/${l_id}`);
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
    console.log('Delete record with id:', l_id);
  };
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const res = await axios.put('http://localhost:8090/uplan', { ...values, l_id: editingRecord.l_id });
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
      title: 'Language_id',
      dataIndex: 'l_id',
    },
    {
      title: 'Language ',
      dataIndex: 'l_name',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => edit(record)} type="link">Edit</Button>
          <Button onClick={() => deleteRecord(record.l_id)} type="link">Delete</Button>
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
    <Card title={<h2>Language Data Table</h2>} extra={<Button type="primary" onClick={start} disabled={hasSelected} loading={loading}>
       Reload
     </Button>}>
    <div>
      
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
        title="Edit Language"
        visible={isEditing}
        onCancel={() => { setIsEditing(false); }}
        onOk={handleSubmit}
      >
        <Form form={form} initialValues={editingRecord}>
          <Form.Item label="Language ID" name="l_id" hidden>
            <Input disabled />
          </Form.Item>
          <Form.Item label="language Name" name="l_name" rules={[{ required: true, message: 'Please input category name!' }]}>
            <Input name="l_name" onChange={handleChange} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
    </Card>
  );
};

export default Lan;
