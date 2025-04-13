// src/components/CharacterList.jsx
import React, { useState, useEffect } from 'react';
import './CharacterList.css';  // Import CSS for styling
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';  // Import Firestore
import { Avatar, Chip, Tooltip, Card, CardContent, Typography, CardHeader } from '@mui/material';
import { motion } from 'framer-motion';  // Import motion from framer-motion

function CharacterList() {
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);  // State for selected character

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'characters'));
      const characterData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Fetched characters:', characterData);  // Log fetched data
      setCharacters(characterData);
    };
    fetchData();
  }, []);

  const handleAvatarClick = (character) => {
    setSelectedCharacter(character);  // Set the clicked character as selected
  };

  return (
    <div>
      <h2>Character List</h2>

      <div className="character-container">
        {characters.length > 0 ? (characters.map(character => (
          <div key={character.id} className="character-item">
            <Tooltip title={character.name}>

              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: selectedCharacter && selectedCharacter.id === character.id ? 0 : 1 }} // Scale animation
                transition={{ duration: 0.3 }}
                onClick={() => handleAvatarClick(character)}  // Add onClick event
              >
                <Avatar
                  className="character-avatar"
                  alt={character.name}
                  src={character.imageUrl}
                ></Avatar>
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
                <Card >
                  <CardHeader
                    avatar={ <Avatar className="card-avatar" alt={character.name} src={character.imageUrl}></Avatar> }
                    title={ character.name }
                    subheader={ character.description }
                  ></CardHeader>
                  <CardContent>

                    <div className="chip-container">
                      {character.traits.map((trait, index) => (
                        <Chip key={index} label={trait} variant="outlined" className="character-chip" />
                      ))}
                    </div>
                    
                    <Typography variant="body2">Health: {character.stats.HEALTH}</Typography>
                    <Typography variant="body2">Power: {character.stats.POWER}</Typography>
                    <Typography variant="body2">Speed: {character.stats.SPEED}</Typography>
                    {/* Add other character details you want to show */}
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
