import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <h1>Üzgünüz, bir şeyler yanlış gitti.</h1>
                    <p>Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 