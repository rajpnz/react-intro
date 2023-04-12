import logo from './logo.svg';
import './App.css';
import Counter from './counter/Counter'
import TransportSelector from "./public-transport/TransportSelector";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
        <div>
            <Counter />
        </div>
        <div>
            <TransportSelector />
        </div>
    </div>
  );
}

export default App;
