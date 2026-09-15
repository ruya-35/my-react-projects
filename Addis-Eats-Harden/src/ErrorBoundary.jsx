import React from "react";

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
    
    render() {
        if (this.state.hasError) {
            return (
            <div className="error-fallback">
                <h3>Something went wrong.</h3>
                <p className="error-fallback-text">{this.state.error?.message || "An unexpected error occurred."}</p>
                <button onClick={() => this.setState({ hasError: false, error: null })}>Try again</button>
            </div>
            );
        }
        return this.props.children;
    }
}