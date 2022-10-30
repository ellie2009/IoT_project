import './App.css';
import Introduction from './components/Introduction';
import Bins from './components/Bins';
import Maps from './components/Maps';

function App() {
  return (

    <div className="App">
      <header className="App-header">
        <Introduction />
        <Bins />
        <Maps />
      </header>
    </div>
  );
}

export default App;
