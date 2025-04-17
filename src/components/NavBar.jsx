import React, { useState } from 'react';
import { AppBar, Toolbar, TextField, IconButton, Typography } from '@mui/material';

function NavBar({ onSearch }) {
    const [searchText, setSearchText] = useState('');  // State for search text
    const  handleSearchChange = (e) => {
        setSearchText(e.target.value);  // Update search text state
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault();  // Prevent default form submission
        onSearch(searchText);  // Call the onSearch prop with the search text
    }

    return (

        <AppBar position="fixed">
            <Toolbar>
                {/* <Typography>
                    Character Filter
                </Typography> */}
                <form onSubmit={handleSearchSubmit}>
                    <TextField
                        value={searchText}
                        onChange={handleSearchChange}
                        label='Search Characters...'
                        variant ="outlined"
                        size="small"
                    />
                    {/* <IconButton type="submit" sx={{ color: 'white' }}>
                    </IconButton> */}
                </form>
            </Toolbar>
        </AppBar>
    )
    
}

export default NavBar;