import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#0f2044",
            color: "#f5c842",
            fontFamily: "sans-serif",
            gap: "1.5rem",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", margin: 0 }}>⚠️ একটি সমস্যা হয়েছে</h2>
          <p style={{ color: "#cbd5e1", margin: 0 }}>
            পেজটি refresh করুন। সমস্যা থাকলে আবার চেষ্টা করুন।
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            style={{
              background: "#f5c842",
              color: "#0f2044",
              border: "none",
              borderRadius: "8px",
              padding: "0.75rem 2rem",
              fontSize: "1rem",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            🔄 Reload করুন
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
