import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[Evermind ErrorBoundary Caught]', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-background, #FDF8F3)',
            padding: 24,
            fontFamily: 'system-ui, sans-serif'
          }}
        >
          <div
            style={{
              maxWidth: 520,
              width: '100%',
              background: '#FFFFFF',
              borderRadius: 20,
              padding: 32,
              border: '2px solid rgba(193, 96, 74, 0.25)',
              boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
              textAlign: 'center'
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: 12 }}>🌸</div>
            <h2 style={{ color: 'var(--color-primary, #C1604A)', marginBottom: 8 }}>
              Evermind is right here with you
            </h2>
            <p style={{ color: 'var(--color-muted, #8A7E74)', marginBottom: 24, lineHeight: 1.6 }}>
              A gentle pause occurred. We are keeping your memories safe.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              style={{
                width: '100%',
                minHeight: 56,
                background: 'var(--color-primary, #C1604A)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 14,
                fontWeight: 800,
                fontSize: '1.1rem',
                cursor: 'pointer'
              }}
            >
              Take a breath and continue
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
