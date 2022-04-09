import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProducts } from '../store/actions/productActions';
import { ProductTypeObj } from '../interface';

// import products from '../products';

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const productList = useSelector((state: any) => state.productList);
  const { products, loading, error } = productList;
  // console.log(products);
  // const [products, setProducts] = useState<ProductTypeObj[] | []>([]);

  // useEffect(() => {
  // const fetchProducts = async () => {
  //   const { data } = await axios('/api/products');
  //   setProducts(data.data.data);
  // };
  // fetchProducts();
  // }, []);

  return (
    <>
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
    </>
  );
};

export default HomePage;
