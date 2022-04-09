import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Rating from '../components/Rating';
import { ProductType } from '../interface';

function Product({ product }: ProductType) {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`} state={product}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`} state={product}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div' className='my-3'>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as='h3' className='my-3'>
          ${product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
