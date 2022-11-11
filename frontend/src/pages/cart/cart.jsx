import React from 'react'
import { useSelector } from 'react-redux';
import LayoutApp from '../../components/Layout';
import { DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { Table } from 'antd';

const Cart = () => {
  const {cartItems} = useSelector(state => state.rootReducer);

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
      title: "Quantity",
      dataIndex: "_id",
      render:(id, record) => 
        <div>
          <PlusCircleOutlined className='cart-add'/>
          <strong>{record.quantity}</strong>
          <MinusCircleOutlined className='cart-minus'/>
        </div>
    },
    {
      title: "Action",
      dataIndex: "_id",
      render:(id, record) => <DeleteOutlined />
    }
  ]
  return (
    <LayoutApp>
      <h2>Cart</h2> 
      <Table dataSource={cartItems} columns={columns} bordered/>
    </LayoutApp>
  )
}

export default Cart