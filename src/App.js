import { useContext, useState } from 'react';
import './App.css';
import Routes from './containers';
import { UserContext } from './context/context';

function App() {

  const [menuOpenInMobile, setMenuOpenInMobile] = useState(false);

  return (
    <UserContext.Provider value={{
      menuOpenInMobile,
      setMenuOpenInMobile
    }}>
      <div className="App">
        <Routes />
      </div>
    </UserContext.Provider>
  );
}

export default App;
