import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');

  const navigate = useNavigate();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate('/');
    }
  };

  const keywordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <Form onSubmit={submitHandler} className='search-form'>
      <div>
        <Form.Control
          type='text'
          name='q'
          onChange={keywordChangeHandler}
          placeholder='Search Products...'
          className='mr-sm-2 ml-sm-5'
        ></Form.Control>
      </div>

      <div>
        <Button type='submit' variant='outline-success' className='p-2'>
          Search
        </Button>
      </div>
    </Form>
  );
};

export default SearchBox;
