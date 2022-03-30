import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Footer from './layout/Footer';
import Header from './layout/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container>
        <main className='py-3'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/product/:id' element={<ProductPage />} />
          </Routes>
        </main>
      </Container>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
