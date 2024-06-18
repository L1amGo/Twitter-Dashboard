// Dashboard.js
import React from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function Dashboard({ data }) {
    const { tweets, sentiment_counts } = data;

    return (
        <Container component="main" maxWidth="lg">
            <TableContainer component={Paper} style={{ marginTop: '50px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Username</TableCell>
                            <TableCell>Handle</TableCell>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>Text</TableCell>
                            <TableCell>Replies</TableCell>
                            <TableCell>Reposts</TableCell>
                            <TableCell>Likes</TableCell>
                            <TableCell>Sentiment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tweets.map((tweet, index) => (
                            <TableRow key={index}>
                                <TableCell>{tweet[0]}</TableCell>
                                <TableCell>{tweet[1]}</TableCell>
                                <TableCell>{tweet[2]}</TableCell>
                                <TableCell>{tweet[3]}</TableCell>
                                <TableCell>{tweet[4]}</TableCell>
                                <TableCell>{tweet[5]}</TableCell>
                                <TableCell>{tweet[6]}</TableCell>
                                {/* <TableCell>
                                    Negative: {tweet[7]}, 
                                    Neutral: {tweet[8]}, 
                                    Positive: {tweet[9]}
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* <Paper elevation={3} style={{ marginTop: '50px', padding: '20px' }}>
                <h2>Sentiment Analysis</h2>
                <p>Total Tweets: {tweets.length}</p>
                <p>Positive: {sentiment_counts.positive}</p>
                <p>Neutral: {sentiment_counts.neutral}</p>
                <p>Negative: {sentiment_counts.negative}</p>
            </Paper> */}
        </Container>
    );
}

export default Dashboard;
