import React, {useState} from 'react';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';  // Import createTheme for custom theming
import theme from './theme';  // Import custom theme
import './App.css';  // Importing styles

import NavBar from './components/NavBar';  // Import the NavBar component
import CharacterList from './components/CharacterList';  // Import the CharacterList component

const App = () => {
  const [searchText, setSearchText] = useState('');  // State for search text
  const handleSearch = (searchText) => {
    setSearchText(searchText);  // Update search text state
  }


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* <NavBar onSearch={handleSearch}></NavBar> */}

      <div className="App">
        <h1>Team Builder</h1>
        <CharacterList searchText={searchText}/>  {/* Rendering CharacterList component */}
      </div>
      
    </ThemeProvider>
  );
};

export default App;
