import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../store/actions/userActions';
import { UserActionType } from '../store/actions/userActionType';
import { Link } from 'react-router-dom';

const UserEditPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const params = useParams() as any;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userIdFromURL = params.id as any;

  const userDetails = useSelector((state: any) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state: any) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: UserActionType.USER_UPDATE_RESET });
      navigate('/admin/userlist');
    } else {
      if (!user.name || user._id !== userIdFromURL) {
        dispatch(getUserDetails(userIdFromURL));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, navigate, userIdFromURL, user, successUpdate]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userIdFromURL, name, email, isAdmin }));
  };

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
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

            <Form.Group controlId='email' className='margin-bottom'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                autoComplete='on'
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin' className='margin-bottom'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                autoComplete='on'
                checked={isAdmin}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIsAdmin(e.target.checked)
                }
              ></Form.Check>
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

export default UserEditPage;
