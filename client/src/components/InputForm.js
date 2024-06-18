// src/components/InputForm.js
import React, { useState } from 'react';
import axios from 'axios';
import {
    StyledContainer,
    StyledPaper,
    StyledBox,
    StyledButton,
    StyledCircularProgress,
    TextField,
    Typography,
} from '../styles/muiStyles';

function InputForm({ setScrapedData, setLoading, setShowDashboard, loading }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [loadingLocal, setLoadingLocal] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        setLoadingLocal(true);
        try {
            const response = await axios.post('/scrape', {
                email,
                password,
                phone_number: phoneNumber,
                search_query: searchQuery
            });
            setScrapedData(response.data);
            setShowDashboard(true);
        } catch (error) {
            console.error('Error scraping data:', error);
        } finally {
            setLoading(false);
            setLoadingLocal(false);
        }
    };

    const isButtonDisabled = loading || loadingLocal || !email || !password || !phoneNumber || !searchQuery;

    return (
        <StyledContainer component="main" maxWidth="xs">
            <StyledPaper elevation={3}>
                <Typography component="h1" variant="h5" align="center">
                    Twitter Sentiment Analysis
                </Typography>
                <StyledBox component="form">
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="phone_number"
                        label="Phone Number"
                        name="phone_number"
                        autoComplete="phone_number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="search_query"
                        label="Search Query"
                        name="search_query"
                        autoComplete="search_query"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <StyledButton
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                        disabled={isButtonDisabled}
                    >
                        {loadingLocal ? <StyledCircularProgress size={24} /> : 'Search'}
                    </StyledButton>
                </StyledBox>
            </StyledPaper>
        </StyledContainer>
    );
}

export default InputForm;
