import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../store/actions/productActions';
import { Link } from 'react-router-dom';
import { ActionType } from '../store/actions/productActionType';

const ProductEditPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const params = useParams() as any;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productIdFromURL = params.id as any;

  const productDetails = useSelector((state: any) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state: any) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ActionType.PRODUCT_UPDATE_RESET });
      dispatch({ type: ActionType.PRODUCT_DETAILS_RESET });
      navigate('/admin/productlist');
    } else {
      if (!product?.name || product?._id !== productIdFromURL) {
        dispatch(listProductDetails(productIdFromURL));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, productIdFromURL, product, successUpdate, navigate]);

  const uploadFileHandler = async (e: any) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/v1/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // UPDATE PRODUCT
    dispatch(
      updateProduct({
        _id: productIdFromURL,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='margin-bottom'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                autoComplete='on'
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price' className='margin-bottom'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                autoComplete='on'
                value={price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPrice(+e.target.value)
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image' className='margin-bottom'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                autoComplete='on'
                value={image}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setImage(e.target.value)
                }
              ></Form.Control>

              <p className='margin-up'>OR</p>

              <label htmlFor='image-file' className='file-label margin-bottom'>
                <input
                  className='file-input hover'
                  type='file'
                  id='image-file'
                  accept='image/*'
                  onChange={uploadFileHandler}
                />
              </label>

              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand' className='margin-bottom'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setBrand(e.target.value)
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock' className='margin-bottom'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCountInStock(+e.target.value)
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category' className='margin-bottom'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCategory(e.target.value)
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description' className='margin-bottom'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDescription(e.target.value)
                }
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='margin-bottom hover'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditPage;
