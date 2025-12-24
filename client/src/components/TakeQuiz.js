import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TakeQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/quizzes/${id}`)
      .then(response => setQuiz(response.data))
      .catch(error => console.error('Error fetching quiz:', error));
  }, [id]);

  const handleAnswerChange = (questionIndex, answerIndex) => {
    setAnswers({ ...answers, [questionIndex]: answerIndex });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/quizzes/submit', { quizId: id, answers }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        setScore(response.data.score);
        setSubmitted(true);
      })
      .catch(error => console.error('Error submitting quiz:', error));
  };

  if (!quiz) return <p>Loading quiz...</p>;

  if (submitted) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>Quiz Submitted</h1>
        <p>Your score: {score}/{quiz.questions.length}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{quiz.title}</h1>
      <form onSubmit={handleSubmit}>
        {quiz.questions.map((q, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h3>{q.question}</h3>
            {q.options.map((opt, optIndex) => (
              <label key={optIndex} style={{ display: 'block', marginBottom: '5px' }}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={optIndex}
                  onChange={() => handleAnswerChange(index, optIndex)}
                  required
                />
                {opt}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default TakeQuiz;