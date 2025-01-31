import React from 'react';
import { DashboardContainer, DashboardGrid, DashboardCard } from './styles/AdminStyles';

const Dashboard: React.FC = () => {
    return (
        <DashboardContainer>
            <h2 style={{ color: '#2c3e50' }}>Analytics Panel</h2>
            <DashboardGrid>
                <DashboardCard>
                    <h3>Top 10 Most Borrowed Books</h3>
                    <p>Coming soon: Display of most popular books</p>
                </DashboardCard>
                <DashboardCard>
                    <h3>User Engagement</h3>
                    <p>Coming soon: Daily/weekly booking metrics</p>
                </DashboardCard>
                <DashboardCard>
                    <h3>Cancellation Statistics</h3>
                    <p>Coming soon: Book/user cancellation data</p>
                </DashboardCard>
                <DashboardCard>
                    <h3>Data Filters</h3>
                    <p>Coming soon: Date range and category filters</p>
                </DashboardCard>
            </DashboardGrid>
        </DashboardContainer>
    );
};

export default Dashboard;