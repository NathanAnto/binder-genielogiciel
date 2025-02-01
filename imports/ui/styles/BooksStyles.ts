import styled from 'styled-components';

export const BooksContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 25px;
    padding: 30px;
`;

export const BookCard = styled.div`
    background: white;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }

    h3 {
        color: #2c3e50;
        margin-bottom: 15px;
        font-size: 18px;
    }

    p {
        color: #666;
        font-size: 14px;
    }
`;

export const NoBooks = styled.div`
    text-align: center;
    padding: 50px;
    color: #666;

    h2 {
        color: #2c3e50;
        margin-bottom: 15px;
    }

    p {
        font-size: 16px;
    }
`;