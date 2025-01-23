import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard-container">
            <h2>Analytics Dashboard</h2>
            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h3>Top 10 Most Booked Books</h3>
                    <p>Coming soon: Display most popular books</p>
                </div>
                <div className="dashboard-card">
                    <h3>User Engagement</h3>
                    <p>Coming soon: Daily/weekly booking metrics</p>
                </div>
                <div className="dashboard-card">
                    <h3>Cancellation Statistics</h3>
                    <p>Coming soon: Book/user cancellation data</p>
                </div>
                <div className="dashboard-card">
                    <h3>Data Filters</h3>
                    <p>Coming soon: Date range and category filters</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;