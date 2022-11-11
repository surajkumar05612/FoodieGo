import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LayoutApp from '../../components/Layout';
import { DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { Table } from 'antd';

const Cart = () => {
  
  const dispatch = useDispatch();
  
  const {cartItems} = useSelector(state => state.rootReducer);

  const handlerIncrement = (record) => {
    dispatch({
      type: "UPDATE_CART",
      payload: {...record, quantity: record.quantity + 1}
    });
  };

  const handlerDecrement = (record) => {
    if(record.quantity !== 1) {
      dispatch({
        type: "UPDATE_CART",
        payload: {...record, quantity: record.quantity - 1}
      });
    }
  };

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
          <MinusCircleOutlined className='cart-minus' onClick={() => handlerDecrement(record)}/>
          <strong className='cart-quantity'>{record.quantity}</strong>
          <PlusCircleOutlined className='cart-add' onClick={() => handlerIncrement(record)}/>
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