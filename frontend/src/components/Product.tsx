import { Card } from 'react-bootstrap';

import Rating from '../components/Rating';
import { ProductType } from '../interface/interface';

function Product({ _id, image, name, rating, numReviews, price }: ProductType) {
  return (
    <Card className='my-3 p-3 rounded'>
      <a href={`/product/${_id}`}>
        <Card.Img src={image} variant='top' />
      </a>

      <Card.Body>
        <a href={`/product/${_id}`}>
          <Card.Title as='div'>
            <strong>{name}</strong>
          </Card.Title>
        </a>

        <Card.Text as='div' className='my-3'>
          <Rating value={rating} text={`${numReviews} reviews`} />
        </Card.Text>

        <Card.Text as='h3' className='my-3'>
          ${price}
        </Card.Text>  
      </Card.Body>
    </Card>
  );
}

export default Product;
