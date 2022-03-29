import { Container } from 'react-bootstrap';

import Footer from './layout/Footer';
import Header from './layout/Header';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <Header />
      <Container>
        <main className='py-3'>
          <HomePage />
        </main>
      </Container>
      <Footer />
    </>
  );
}

export default App;
