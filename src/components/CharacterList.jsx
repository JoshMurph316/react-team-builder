// src/components/CharacterList.jsx
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';  // Import NavBar component
import './CharacterList.css';  // Import CSS for styling
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';  // Import Firestore
import { Accordion, AccordionSummary, AccordionDetails, Avatar, Chip, Tooltip, Card, CardContent, Typography, CardHeader, Button } from '@mui/material';
import { motion } from 'framer-motion';  // Import motion from framer-motion

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);  // State for filtered characters
  const [selectedCharacter, setSelectedCharacter] = useState(null);  // State for selected character
  const [searchText, setSearchText] = useState('');  // State for search input
  const [debouncedSearchText, setDebouncedSearchText] = useState('');  // Debounced search text for filtering
  const [sortingOption, setSortingOption] = useState('name');  // Default sorting by name

  // Debounced search function to delay the filter until after 4 characters are entered
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 500);  // Delay to handle when the user stops typing

    return () => clearTimeout(timeoutId);  // Clear timeout if the user types again
  }, [searchText]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'characters'));
      const characterData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCharacters(characterData);
      setFilteredCharacters(characterData);  // Initially set filtered characters to all characters
    };
    fetchData();
  }, []);

  const handleAvatarClick = (character) => {
    setSelectedCharacter(character);  // Set the clicked character as selected
  };

  const handleSearch = (searchText) => {
    setSearchText(searchText);

    if (searchText.length >= 4) {
      const filtered = characters.filter(character => {
        const nameMatch = character.name.toLowerCase().includes(searchText.toLowerCase());
        const traitMatch = character.traits.some(trait =>
          trait.toLowerCase().includes(searchText.toLowerCase())
        );
        const abilityMatch = Object.entries(character.abilities).some(([abilityName, abilityDescription]) =>
          abilityName.toLowerCase().includes(searchText.toLowerCase()) ||
          abilityDescription.toLowerCase().includes(searchText.toLowerCase())
        );
        return nameMatch || traitMatch || abilityMatch;
      });
      setFilteredCharacters(filtered);  // Update filtered list
    } else {
      setFilteredCharacters(characters); // Show all if search text is less than 4 characters
    }
  };

  const handleClearFilter = () => {
    setSearchText('');
    setFilteredCharacters(characters); // Restore the full list
  };

  const handleCloseCard = () => {
    setSelectedCharacter(null);  // Close the selected character card
  };

  const handleSortChange = (option) => {
    setSortingOption(option);  // Set the sorting option (name or power)
    const sorted = [...filteredCharacters].sort((a, b) => {
      if (option === 'name') {
        return a.name.localeCompare(b.name);
      } else if (option === 'power') {
        return b.stats.POWER - a.stats.POWER;  // Sort by power
      }
    });
    setFilteredCharacters(sorted);  // Apply sorted list
  };

  const handleAddToStagingArea = (character) => {
    // Add logic to add character to the staging area
    console.log(`Added ${character.name} to staging area!`);
  };

  return (
    <div>

      <NavBar onSearch={handleSearch} onSortChange={handleSortChange} />  {/* Include NavBar component */}

      <h2>Character List</h2>

      <Button variant="contained" color="primary" onClick={handleClearFilter} style={{ marginBottom: '20px' }}>
        Clear Filter
      </Button>

      <div className="character-container" style={{ marginTop: '80px' }}>

        {filteredCharacters.length > 0 ? (filteredCharacters.map(character => (
          <div key={character.id} className="character-item">

            <Tooltip title={character.name}>
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: selectedCharacter && selectedCharacter.id === character.id ? 0 : 1 }} // Scale animation
                transition={{ duration: 0.1 }}
                onClick={() => handleAvatarClick(character)}  // Add onClick event
              >
                <Avatar
                  className="character-avatar"
                  alt={character.name}
                  src={character.imageUrl}
                />
              </motion.div>
            </Tooltip>

            {/* Conditionally render the selected character's card */}
            {selectedCharacter && selectedCharacter.id === character.id && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="character-card"
              >
                <Card>
                  <CardHeader
                    avatar={<Avatar className="card-avatar" alt={character.name} src={character.imageUrl} />}
                    title={character.name}
                    subheader={character.description}
                  />
                  <CardContent>

                    <div className="chip-container">
                      {character.traits.map((trait, index) => (
                        <Chip key={index} label={trait} variant="outlined" className="character-chip" clickable />
                      ))}
                    </div>

                    <div className="ability-container">
                      {Object.entries(character.abilities).map(([abilityName, abilityDescription], index) => (
                        <div key={index}>
                          <Accordion>
                            <AccordionSummary>
                              <Typography variant="body2">{abilityName}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                              <Typography variant="body2">{abilityDescription}</Typography>
                            </AccordionDetails>
                          </Accordion>
                        </div>
                      ))}
                    </div>

                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleAddToStagingArea(character)}
                      style={{ marginTop: '20px' }}
                    >
                      Add to Staging Area
                    </Button>

                    <Button
                      variant="contained"
                      color="default"
                      onClick={handleCloseCard}
                      style={{ marginTop: '10px' }}
                    >
                      Close Card
                    </Button>

                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        ))) : (
          <p>Loading character list...</p>
        )}

      </div>
    </div>
  );
}

export default CharacterList;
