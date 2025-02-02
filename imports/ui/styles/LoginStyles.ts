import styled from 'styled-components';

export const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    padding: 20px;
`;

export const LoginCard = styled.div`
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
`;

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;

    h1 {
        text-align: center;
        color: #2c3e50;
        margin-bottom: 20px;
        font-size: 24px;
    }

    input {
        width: 100%;
        padding: 12px 15px;
        border: 2px solid #e0e0e0;
        border-radius: 10px;
        font-size: 15px;
        transition: all 0.3s ease;

        &:focus {
            border-color: #4158D0;
            box-shadow: 0 0 0 3px rgba(65, 88, 208, 0.1);
            outline: none;
        }
    }

    button {
        width: 100%;
        padding: 12px;
        background: linear-gradient(135deg, #4158D0 0%, #C850C0 100%);
        color: white;
        border: none;
        border-radius: 10px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: transform 0.3s ease;

        &:hover {
            transform: translateY(-2px);
        }

        &:active {
            transform: translateY(1px);
        }
    }
`;