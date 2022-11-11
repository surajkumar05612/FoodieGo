import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LayoutApp from '../../components/Layout';
import { DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { Table } from 'antd';

const Products = () => {

  const dispatch = useDispatch();

  const [productData, setProductData] = useState([]);

  useEffect(() => {
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

    getAllProducts();
}, [dispatch]);

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
    render:(id, record) => <DeleteOutlined className='cart-action' />
  }
]

  return (
    <LayoutApp>
        <h2>All Products</h2>
        <Table dataSource={productData} columns={columns} bordered/>
    </LayoutApp>
  )
}

export default Products