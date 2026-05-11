import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      const de = document.documentElement.lang === 'de';
      return (
        <div className="min-h-dvh flex flex-col items-center justify-center gap-4 px-6 text-center">
          <span className="text-4xl">{'\u{1F635}'}</span>
          <h1 className="font-heading text-xl font-bold text-pf-text">
            {de ? 'Etwas ist schiefgelaufen' : 'Something went wrong'}
          </h1>
          <p className="text-sm text-gray-400 max-w-sm">
            {de ? 'Ein unerwarteter Fehler ist aufgetreten. Lade die Seite neu.' : 'An unexpected error occurred. Try reloading the page.'}
          </p>
          <button
            onClick={() => {
              localStorage.removeItem('pathfinder-v5');
              window.location.reload();
            }}
            className="px-6 py-2.5 bg-pf-primary text-white font-semibold rounded-xl hover:bg-pf-dark cursor-pointer transition-colors"
          >
            {de ? 'Neu laden' : 'Reload'}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
