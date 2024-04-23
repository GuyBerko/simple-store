import ItemsGrid from './components/ItemsGrid';
import './App.css';
// the backend is wrote to support multiple users adn there is no way to sign in at the client
// so user identification is currently hardcoded
import { DEFAULT_USER_ID } from './config';

const App = () => {
  return (
    <div className='App'>
      <div className='header'><h1>Simple Store</h1></div>
      <ItemsGrid userId={DEFAULT_USER_ID} />
    </div>
  );
};

export default App;
