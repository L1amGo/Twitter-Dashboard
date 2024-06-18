// src/App.js
import React, { useState } from 'react';
import InputForm from './components/InputForm';
import Dashboard from './components/Dashboard';

function App() {
    const [scrapedData, setScrapedData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);

    return (
        <div>
            {!showDashboard ? (
                <InputForm 
                    setScrapedData={setScrapedData}
                    setLoading={setLoading}
                    setShowDashboard={setShowDashboard}
                    loading={loading} // Pass loading state to InputForm
                />
            ) : (
                <Dashboard data={scrapedData} />
            )}
        </div>
    );
}

export default App;
