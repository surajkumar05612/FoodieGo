import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LayoutApp from '../../components/Layout';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Select, Table, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

const Products = () => {

  const dispatch = useDispatch();

  const [productData, setProductData] = useState([]);
  const [popModal, setPopModal] = useState(false);
  const visible = () => {
    setPopModal(true);
  }
  const hide = () => {
    setPopModal(false);
  }

  const getAllProducts = async () => {
    try {
        dispatch({
            type: "SHOW_LOADING",
        });
        const {data} = await axios.get('/api/products/getproducts');
        setProductData(data);
        dispatch({
            type: "HIDE_LOADING",
        });
        console.log(data);

    } catch (error) {
        console.log(error);
    }
}

  useEffect(() => {
    getAllProducts();
}, []);

const columns = [
  {
    title: "Name",
    dataIndex: "name"
  },
  {
    title: "Image",
    dataIndex: "image",
    render: (image, record) => <img src={image} alt={record.name} height={60} width={60} />
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Action",
    dataIndex: "_id",
    render:(id, record) => 
    <div>
      <DeleteOutlined className='cart-action' />
      <EditOutlined className='cart-edit' />
    </div>
  }
]

const handlerSubmit = async (value) => {
  try {
    dispatch({
        type: "SHOW_LOADING",
    });
    const res = await axios.post('/api/products/addproducts', value);
    message.success("Product Added Successfully!");
    getAllProducts();
    setPopModal(false);
    dispatch({
        type: "HIDE_LOADING",
    });
    
} catch (error) {
  message.error("Error!");
    console.log(error);
}
}

  return (
    <LayoutApp>
        <h2>All Products</h2>
        <Button className='add-new' onClick={visible}>Add New</Button>
        <Table dataSource={productData} columns={columns} bordered/>
        <Modal title="Add New Product" visible={popModal} onCancel={hide} footer={false}>
          <Form layout='vertical' onFinish={handlerSubmit}>
            <FormItem name="name" label="Name">
              <Input />
            </FormItem>
            <Form.Item name="category" label="Category">
              <Select>
                <Select.Option value="burger">Burger</Select.Option>
                <Select.Option value="pizza">Pizza</Select.Option>
                <Select.Option value="drinks">Drinks</Select.Option>
                <Select.Option value="pasta">Pasta</Select.Option>
              </Select>
            </Form.Item>
            <FormItem name="price" label="Price">
              <Input />
            </FormItem>
            <FormItem name="image" label="Image Url">
              <Input />
            </FormItem>
            <div className="form-btn-add">
              <Button htmlType='submit' className='add-new'>Add</Button>
            </div>
          </Form>
        </Modal>
    </LayoutApp>
  )
}

export default Products