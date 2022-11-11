import React, { useState, useEffect } from 'react'
import axios from 'axios';
import LayoutApp from '../../components/Layout';
import { Row, Col } from 'antd';
import Product from '../../components/Product';
import { useDispatch } from 'react-redux';

const Home = () => {
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

  return (
    <LayoutApp>
        <Row>
            {productData.map (product=> (
                <Col xs={24} sm={12} md={12} lg={6}>
                    <Product product={product} />
                </Col>
            ))}
        </Row>
    </LayoutApp>
  )
}

export default Home