import './App.css'
import React from 'react';
import './App.css';  // Importing styles
import CharacterList from './components/CharacterList';  // Import the CharacterList component

const App = () => {
  return (
    <div className="App">
      <h1>Team Builder</h1>
      <CharacterList />  {/* Rendering CharacterList component */}
    </div>
  );
};

export default App;
