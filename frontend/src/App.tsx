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
import UserEditPage from './pages/UserEditPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import OrderListPage from './pages/OrderListPage';

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
              <Route path='/admin/user/:id/edit' element={<UserEditPage />} />
              <Route path='/admin/productlist' element={<ProductListPage />} />
              <Route
                path='/admin/productlist/page/:pageNumber'
                element={<ProductListPage />}
              />
              <Route path='/admin/orderlist' element={<OrderListPage />} />
              <Route path='/admin/product/:id/edit' element={<ProductEditPage />} />
              <Route path='/search/:keyword' element={<HomePage />} />
              <Route path='/page/:pageNumber' element={<HomePage />} />
              <Route path='/search/:keyword/page/:pageNumber' element={<HomePage />} />
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
