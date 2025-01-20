import React from 'react';

const Dashboard = () => { 
    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <ul>
                <li>Create a section for displaying the top 10 most booked books.</li>
                <li>Display user engagement metrics (e.g., daily/weekly bookings).</li>
                <li>Show cancellation statistics by book or user.</li>
                <li>Add data filtering options (e.g., by date range).</li>
                <li>Use bar charts, pie charts, or tables to visualize metrics.</li>
            </ul>
        </div>
    );
};

export default Dashboard;