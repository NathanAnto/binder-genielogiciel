import styled from 'styled-components';

export const AdminContainer = styled.div`
    max-width: 1200px;
    margin: 20px auto;
    padding: 30px;
    background-color: #f8f9fa;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

export const AdminHeader = styled.div`
    background: #6c5ce7;
    padding: 1rem 2rem;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-left {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 1.2rem;
    }

    .admin-user {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

export const AdminContent = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    padding: 2rem;
    
    .main-section {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
`;

export const AdminForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    background: white;
    padding: 25px;
    border-radius: 8px;
    margin-bottom: 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    input {
        padding: 12px;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        font-size: 14px;
        transition: border-color 0.3s;

        &:focus {
            outline: none;
            border-color: #4a90e2;
        }
    }

    button {
        padding: 12px;
        background-color: #4a90e2;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.3s;

        &:hover {
            background-color: #357abd;
        }
    }

    select {
        padding: 12px;
        border: 1px solid #e0e0e0;
        border-radius: 6px;
        font-size: 14px;
        transition: border-color 0.3s;
        background-color: white;
        width: 100%;

        &:focus {
            outline: none;
            border-color: #4a90e2;
        }
    }
`;

export const StatisticsDashboard = styled.div`
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);

    .time-filter {
        width: 200px;
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin-bottom: 20px;
        font-size: 14px;
        background-color: white;
        cursor: pointer;

        &:focus {
            outline: none;
            border-color: #4a90e2;
            box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
        }
    }

    .stats-grid {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .chart-container {
        margin-top: 1rem;
        padding: 1rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .stats-card {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 8px;
        margin-bottom: 1.5rem;

        h3 {
            margin-bottom: 1rem;
            color: #2c3e50;
            font-size: 1.2rem;
        }
    }

    .stats-info {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .stat-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .value {
            font-weight: bold;
            color: #6c5ce7;
        }
    }
`;

export const BookTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background: white;
    border-radius: 8px;
    overflow: hidden;

    th, td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #e0e0e0;
    }

    th {
        background-color: #4a90e2;
        color: white;
    }

    tr:hover {
        background-color: #f5f5f5;
    }

    button.delete-button {
        padding: 8px 12px;
        background-color: #ff4444;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
            background-color: #cc0000;
        }
    }
`; 