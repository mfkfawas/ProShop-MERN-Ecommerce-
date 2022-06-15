import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../store/actions/productActions';
import { ProductTypeObj } from '../interface';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

// import products from '../products';

const HomePage = () => {
  const dispatch = useDispatch();
  const { keyword, pageNumber = 1 } = useParams();

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const productList = useSelector((state: any) => state.productList);
  const { products, loading, error, currentPage, pages } = productList;

  return (
    <>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      <Row>
        {products &&
          products.map((product: ProductTypeObj) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
      </Row>

      <Paginate total={pages} page={currentPage} />
    </>
  );
};

export default HomePage;
