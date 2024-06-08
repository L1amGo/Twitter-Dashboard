// src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import SearchForm from './components/SearchForm.js';
import ScrapedDataList from './components/ScrapedDataList';

function App() {
    const [scrapedData, setScrapedData] = useState([]);

    const handleSearch = async (email, password, phoneNumber, searchQuery) => {
        try {
            const response = await axios.post('/scrape', {
                email,
                password,
                phone_number: phoneNumber,
                search_query: searchQuery
            });
            setScrapedData(response.data);
        } catch (error) {
            console.error('Error scraping data:', error);
        }
    };

    return (
        <div>
            <SearchForm onSearch={handleSearch} />
            <ScrapedDataList data={scrapedData} />
        </div>
    );
}

export default App;
