import { AlertTriangle } from 'lucide-react'; // Assuming you're using lucide-react for icons
import React, { Component, ErrorInfo, ReactNode } from 'react';

import { Button } from '@/components/ui/button'; // Assuming you have a Button component

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-screen flex-col items-center justify-center bg-background">
            <div className="rounded-lg border bg-card p-8 shadow-sm">
              <div className="flex flex-col items-center space-y-4">
                <div className="rounded-full bg-destructive/15 p-3">
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>

                <div className="text-center">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">Something went wrong!</h2>
                  <p className="mt-2 text-muted-foreground">We apologize for the inconvenience. Please try again.</p>
                </div>

                <div className="mt-6 flex gap-2">
                  <Button onClick={this.handleReset} variant="default">
                    Try again
                  </Button>
                  <Button onClick={() => (window.location.href = '/')} variant="outline">
                    Go to Homepage
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
