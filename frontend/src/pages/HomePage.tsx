import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

import Product from '../components/Product';
import { ProductTypeObj } from '../interface/interface';

import products from '../products';

const HomePage = () => {
  // const [products, setProducts] = useState<ProductTypeObj[] | []>([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data } = await axios('/api/products');
  //     setProducts(data);
  //   };

  //   fetchProducts();
  // }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product
              product={product}
              // _id={product._id}
              // image={product.image}
              // name={product.name}
              // rating={product.rating}
              // numReviews={product.numReviews}
              // price={product.price}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
