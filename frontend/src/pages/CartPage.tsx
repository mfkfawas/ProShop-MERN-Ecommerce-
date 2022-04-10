import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart } from '../store/actions/cartActions';

const CartPage = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const cart = useSelector((state: any) => state.cart);
  const { cartItems } = cart;

  const productId = params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return <div>CartPage</div>;
};

export default CartPage;
