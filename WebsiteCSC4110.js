import logo from './logo.svg';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Hero from './components/Hero';

function App() {
  return (
    <div className="app">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
     <NavigationBar />
     <Hero />
    </div>
  );
}

export default App;
