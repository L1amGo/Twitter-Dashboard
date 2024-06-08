// src/components/ScrapedDataList.js

import React from 'react';

function ScrapedDataList({ data }) {
    if (!data || data.length === 0) {
        return <div>No data available.</div>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Handle</th>
                    <th>Timestamp</th>
                    <th>Text</th>
                    <th>Replies</th>
                    <th>Reposts</th>
                    <th>Likes</th>
                </tr>
            </thead>
            <tbody>
                {data.map((tweet, index) => (
                    <tr key={index}>
                        <td>{tweet[0]}</td>
                        <td>{tweet[1]}</td>
                        <td>{tweet[2]}</td>
                        <td>{tweet[3]}</td>
                        <td>{tweet[4]}</td>
                        <td>{tweet[5]}</td>
                        <td>{tweet[6]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ScrapedDataList;
