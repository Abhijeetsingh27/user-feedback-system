import React from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackDashboard from './components/FeedbackDashboard';
import './App.css';

function App() {
  const [refresh, setRefresh] = React.useState(false);
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Refresh dashboard after feedback submission
  const handleFeedbackSubmit = () => setRefresh(r => !r);

  if (showSplash) {
    return (
      <div className="splash-screen">
        <h1>Welcome to <span>User Feedback System</span></h1>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1 className="main-title">User Feedback System</h1>
      <br></br>
      <div className="feedback-layout">
        <div className="feedback-form-wrapper">
          <FeedbackForm onSubmit={handleFeedbackSubmit} />
        </div>
        <div className="feedback-dashboard-wrapper">
          <FeedbackDashboard key={refresh} />
        </div>
      </div>
    </div>
  );
}

export default App;
