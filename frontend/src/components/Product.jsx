import React from 'react'
import { Button, Card } from 'antd';
import { useDispatch } from 'react-redux';

const Product = ({product}) => {
  const dispatch = useDispatch();

  const handlerToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: product
    })
  }
  const { Meta } = Card;
  return (
    <Card
      hoverable
      style={{ width: 240, marginBottom: 30 }}
      cover={<img alt={product.name} src={product.image} style={{height: 200 }}/>}
    >
      <Meta title={product.name} description={product.category} />
      <div className="product-btn">
        <Button onClick={() => handlerToCart()}>Add to Cart</Button>
      </div>
    </Card>
  )
}

export default Product