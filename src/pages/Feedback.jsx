import React, { useState } from 'react';

function Feedback() {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the submission of the feedback
    console.log(feedback);
  };

  return (
    <div className="feedback-form">
      <h1>Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Feedback:
          <textarea value={feedback} onChange={e => setFeedback(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default Feedback;