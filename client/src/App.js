import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [scrapedData, setScrapedData] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.post('/scrape', { search_query: searchQuery });
            setScrapedData(response.data);
        } catch (error) {
            console.error('Error scraping data:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {/* Display scraped data */}
        </div>
    );
}

export default App;
