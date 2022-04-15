import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer from './layout/Footer';
import Header from './layout/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import store from './store/store';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Container>
          <main className='py-3'>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/product/:id' element={<ProductPage />} />
              <Route path='/cart/:id' element={<CartPage />} />
              <Route path='/cart/' element={<CartPage />} />
              <Route path='/' element={<HomePage />} />
            </Routes>
          </main>
        </Container>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
