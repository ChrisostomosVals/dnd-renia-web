import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Providers } from './providers';
import { AppRouter } from './routes';

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
