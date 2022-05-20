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
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import UserListPage from './pages/UserListPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Container>
          <main className='py-3'>
            <Routes>
              <Route path='/order/:id' element={<OrderPage />} />
              <Route path='/placeorder' element={<PlaceOrderPage />} />
              <Route path='/payment' element={<PaymentPage />} />
              <Route path='/shipping' element={<ShippingPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/product/:id' element={<ProductPage />} />
              <Route path='/cart/:id' element={<CartPage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/admin/userlist' element={<UserListPage />} />
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
