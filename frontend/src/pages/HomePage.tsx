import { Col, Row } from 'react-bootstrap';

import Product from '../components/Product';
import products from '../products';

const HomePage = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product
              _id={product._id}
              image={product.image}
              name={product.image}
              rating={product.rating}
              numReviews={product.numReviews}
              price={product.price}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
