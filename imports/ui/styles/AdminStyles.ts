import styled from 'styled-components';

export const AdminContainer = styled.div`
    max-width: 1200px;
    margin: 20px auto;
    padding: 30px;
    background-color: #f8f9fa;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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
`;

export const DashboardContainer = styled.div`
    margin-top: 20px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const DashboardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
`;

export const DashboardCard = styled.div`
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e0e0e0;
    transition: transform 0.3s;

    &:hover {
        transform: translateY(-5px);
    }

    h3 {
        color: #2c3e50;
        margin-bottom: 10px;
    }

    p {
        color: #666;
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