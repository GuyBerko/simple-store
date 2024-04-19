import './App.css';
import ItemsGrid from './components/ItemsGrid';

const userId = '66211f3e34a3525316347cd9';

const App = () => {
  return (
    <div className='App'>
      <ItemsGrid userId={userId} />
    </div>
  );
};

export default App;
