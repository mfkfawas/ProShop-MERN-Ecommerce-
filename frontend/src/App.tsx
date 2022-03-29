import { Container } from 'react-bootstrap';

import Footer from './layout/Footer';
import Header from './layout/Header';

function App() {
  return (
    <>
      <Header />
      <Container>
        <main className='py-3'>
          <h1>WELCOME TO MY APP</h1>
        </main>
      </Container>
      <Footer />
    </>
  );
}

export default App;
