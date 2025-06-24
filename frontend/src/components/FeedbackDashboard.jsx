import React, { useEffect, useState } from 'react';
import './FeedbackDashboard.css';

const categories = [
  { value: '', label: 'All' },
  { value: 'suggestion', label: 'Suggestion' },
  { value: 'bug report', label: 'Bug Report' },
  { value: 'feature request', label: 'Feature Request' },
  { value: 'other', label: 'Other' },
];

const sortOptions = [
  { value: 'timestamp', label: 'Newest' },
  { value: 'userName', label: 'Name' },
  { value: 'email', label: 'Email' },
];

const FeedbackDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('timestamp');
  const [order, setOrder] = useState('desc');
  const [loading, setLoading] = useState(false);

  const fetchFeedbacks = async () => {
    setLoading(true);
    let url = `http://localhost:5000/feedback?sortBy=${sortBy}&order=${order}`;
    if (category) url += `&category=${category}`;
    const res = await fetch(url);
    const data = await res.json();
    setTimeout(() => {
      setFeedbacks(Array.isArray(data) ? data : []);
      setLoading(false);
    }, 700);
  };

  useEffect(() => {
    fetchFeedbacks();
    // eslint-disable-next-line
  }, [category, sortBy, order]);

  const handleMarkAsRead = async (id) => {
    await fetch(`http://localhost:5000/feedback/${id}/read`, { method: 'PATCH' });
    setFeedbacks(fbs => fbs.map(fb => fb._id === id ? { ...fb, read: true } : fb));
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/feedback/${id}`, { method: 'DELETE' });
    setFeedbacks(fbs => fbs.filter(fb => fb._id !== id));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-controls">
        <h3 style={{ color: '#000', margin: 0 }}>
          Feedback Dashboard:
        </h3>
        <select value={category} onChange={e => setCategory(e.target.value)}>
          {categories.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <button onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}>
          {order === 'asc' ? '⬆️' : '⬇️'}
        </button>
      </div>
      <div className="dashboard-list">
        {loading ? <div className="dashboard-loading">Loading...</div> :
          feedbacks.length === 0 ? <div className="dashboard-empty">No feedback found.</div> :
          feedbacks.map(fb => (
            <div className="dashboard-item" key={fb._id}>
              <div className="dashboard-header">
                {!fb.read && <span className="notification-dot" title="Unread"></span>}
                <span className="dashboard-name">{fb.userName}</span>
                <span className="dashboard-email">{fb.email}</span>
                <span className={`dashboard-category dashboard-category-${fb.category.replace(/\s/g, '-')}`}>{fb.category}</span>
              </div>
              <div className="dashboard-text">{fb.feedbackText}</div>
              <div className="dashboard-timestamp">{new Date(fb.timestamp).toLocaleString()}</div>
              <div className="feedback-actions">
                {!fb.read && <button className="feedback-action-btn" onClick={() => handleMarkAsRead(fb._id)}>Mark as Read</button>}
                <button className="feedback-action-btn" onClick={() => handleDelete(fb._id)}>Delete</button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeedbackDashboard; 