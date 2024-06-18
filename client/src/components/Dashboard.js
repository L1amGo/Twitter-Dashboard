import React, { useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Tahoma, sans-serif',
    },
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
    },
});

function Dashboard({ data }) {
    const { tweets, sentiment_counts } = data;
    const [filteredTweets, setFilteredTweets] = useState(tweets);

    const filterBySentiment = (sentiment) => {
        const filtered = tweets.filter(tweet => {
            if (sentiment === 'positive') return parseFloat(tweet[9]) > 0.5;
            if (sentiment === 'neutral') return parseFloat(tweet[8]) > 0.5;
            if (sentiment === 'negative') return parseFloat(tweet[7]) > 0.5;
            return true;
        });
        setFilteredTweets(filtered);
    };

    const resetFilters = () => {
        setFilteredTweets(tweets);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
                <Paper elevation={3} style={{ marginTop: '20px', padding: '10px', border: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
                        <h2>Sentiment Analysis</h2>
                        <p>Total Tweets: {tweets.length}</p>
                        <p>Positive: {sentiment_counts.positive}</p>
                        <p>Neutral: {sentiment_counts.neutral}</p>
                        <p>Negative: {sentiment_counts.negative}</p>
                    </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Button variant="contained" onClick={() => filterBySentiment('positive')} style={{ marginBottom: '10px' }}>Positive Sentiment ({sentiment_counts.positive})</Button>
                                <Button variant="contained" onClick={() => filterBySentiment('neutral')} style={{ marginBottom: '10px' }}>Neutral Sentiment ({sentiment_counts.neutral})</Button>
                                <Button variant="contained" onClick={() => filterBySentiment('negative')} style={{ marginBottom: '10px' }}>Negative Sentiment ({sentiment_counts.negative})</Button>
                                <Button variant="contained" onClick={resetFilters}>Reset Filters</Button>
                            </div>

                </Paper>
                <div style={{ marginTop: '20px', maxHeight: '400px', overflowY: 'scroll' }}>
                    <TableContainer component={Paper} style={{ border: '1px solid #ddd' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Username</TableCell>
                                    <TableCell align="center">Handle</TableCell>
                                    <TableCell align="center">Timestamp</TableCell>
                                    <TableCell align="center">Text</TableCell>
                                    <TableCell align="center">Replies</TableCell>
                                    <TableCell align="center">Reposts</TableCell>
                                    <TableCell align="center">Likes</TableCell>
                                    <TableCell align="center">Sentiment</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredTweets.map((tweet, index) => (
                                    <TableRow key={index}>
                                        <TableCell align="center">{tweet[0]}</TableCell>
                                        <TableCell align="center">{tweet[1]}</TableCell>
                                        <TableCell align="center">{tweet[2]}</TableCell>
                                        <TableCell align="center">{tweet[3]}</TableCell>
                                        <TableCell align="center">{tweet[4]}</TableCell>
                                        <TableCell align="center">{tweet[5]}</TableCell>
                                        <TableCell align="center">{tweet[6]}</TableCell>
                                        <TableCell align="center">
                                            Negative: {tweet[7]}, Neutral: {tweet[8]}, Positive: {tweet[9]}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Container>
        </ThemeProvider>
    );
}

export default Dashboard;
