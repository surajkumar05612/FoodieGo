import React, { useState, useEffect } from 'react'
import axios from 'axios';
import LayoutApp from '../../components/Layout';
import { Row, Col } from 'antd';
import Product from '../../components/Product';
import { useDispatch } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch();

    const [productData, setProductData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('burgers');
    const categories = [
        {
            name: "burgers",
            imageUrl: "https://png.pngtree.com/png-vector/20191030/ourmid/pngtree-burger-vector-illustration-with-filled-line-design-burger-clip-art-png-image_1923564.jpg",
        },
        {
            name: "pizzas",
            imageUrl: "https://images.vexels.com/media/users/3/262561/isolated/preview/d4e8a9986c2b7eb249a5f57b6684615a-food-pizza-meal.png",
        },
        {
            name: "drinks",
            imageUrl: "https://i.pinimg.com/564x/58/b4/01/58b401111e2de08472ddff4cb8bcd3df--cocktail-tequila-hawaian-party.jpg",
        },
        {
            name: "pasta",
            imageUrl: "https://thumbs.dreamstime.com/b/pasta-spaghetti-meatballs-plate-food-58015017.jpg",
        },
    ]

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
        <div className="category">
            {categories.map((category) => (
                <div key={category.name} className={`categoryFlex ${selectedCategory === category.name && 'category-active'}`}  onClick={() => setSelectedCategory(category.name)}>
                    <h3 className="categoryName">{category.name}</h3>
                    <img src={category.imageUrl} alt={category.name} height={60} width={60}/>
                </div>
            ))}
        </div>
        <Row>
            {productData.map((product) => (
            <Col xs={24} sm={6} md={12} lg={6}>
                <Product key={product.id} product={product} />
            </Col>
            ))}
        </Row>
    </LayoutApp>
  )
}

export default Home