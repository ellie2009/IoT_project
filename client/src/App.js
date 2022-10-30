import logo from './logo.svg';
import './App.css';
import Home from './components/Introduction';
import Introduction from './components/Introduction';
import Bins from './components/Bins';

function App() {
  return (

    <div className="App">
      <header className="App-header">
        <Introduction />
        <Bins />
      </header>
    </div>
  );
}

export default App;
