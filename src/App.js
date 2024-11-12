import { ThemeProvider } from 'styled-components';
import { useContext, useState } from 'react';
import './App.css';
import Routes from './containers';

import { UserContext } from './context/context';


function App() {

  const [menuOpenInMobile, setMenuOpenInMobile] = useState(false);

  const styledComponentTheme = {
    'sm': '540px',   // small tablet
    'md': '720px',   // tablet
    'lg': '960px',   // desktop
    'xl': '1140px',  // large desktop
    '2xl': '1280px'  
  }

  return (
    <div className="App">
      <UserContext.Provider value={{
      menuOpenInMobile,
      setMenuOpenInMobile
    }}>
      <ThemeProvider theme={styledComponentTheme}>
        <Routes />
      </ThemeProvider>
    </UserContext.Provider>
    </div>
  );
}

export default App;
