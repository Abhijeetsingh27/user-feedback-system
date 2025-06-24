import React, { useState } from 'react';
import './FeedbackForm.css';

const initialState = {
  userName: '',
  email: '',
  feedbackText: '',
  category: 'suggestion',
};

const FeedbackForm = ({ onSubmit }) => {
  const [form, setForm] = useState(initialState);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('http://localhost:5000/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Thank you for your feedback!');
        setForm(initialState);
        if (onSubmit) onSubmit();
      } else {
        setMessage(data.error || 'Submission failed.');
      }
    } catch (err) {
      setMessage('Network error.');
    }
    setLoading(false);
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h2>Submit Feedback</h2>
      <label>
        Name
        <input type="text" name="userName" value={form.userName} onChange={handleChange} required />
      </label>
      <label>
        Email
        <input type="email" name="email" value={form.email} onChange={handleChange} required />
      </label>
      <label>
        Category
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="suggestion">Suggestion</option>
          <option value="bug report">Bug Report</option>
          <option value="feature request">Feature Request</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>
        Feedback
        <textarea name="feedbackText" value={form.feedbackText} onChange={handleChange} required />
      </label>
      <button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
      {message && <div className="feedback-message">{message}</div>}
    </form>
  );
};

export default FeedbackForm; 