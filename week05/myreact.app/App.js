import React, { useState } from 'react';

// Main App Component
const App = () => {
  // State to store the form data and results
  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  const [experience, setExperience] = useState('');
  const [result, setResult] = useState(null);

  // Function to handle form submission and get recommendations
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && skills && interests && experience) {
      const recommendations = getCareerRecommendations(skills, interests, experience);
      setResult({
        name,
        skills,
        interests,
        experience,
        recommendations,
      });
    } else {
      alert("Please fill in all fields.");
    }
  };

  // Function to get career recommendations based on the user's input
  const getCareerRecommendations = (skills, interests, experience) => {
    let recommendations = [];

    if (skills.includes('JavaScript') || skills.includes('React')) {
      recommendations.push('Frontend Developer');
    }

    if (skills.includes('Python') || skills.includes('Data Analysis')) {
      recommendations.push('Data Scientist');
    }

    if (experience >= 5) {
      recommendations.push('Senior Software Engineer');
    } else {
      recommendations.push('Junior Developer');
    }

    if (interests.toLowerCase().includes('management')) {
      recommendations.push('Product Manager');
    }

    if (interests.toLowerCase().includes('design')) {
      recommendations.push('UX/UI Designer');
    }

    if (recommendations.length === 0) {
      recommendations.push('Consider further education or certifications');
    }

    return recommendations;
  };

  return (
    <div>
      {/* Header Section */}
      <header style={styles.header}>
        <h1 style={styles.title}>Career Analysis App</h1>
      </header>

      {/* Form Section */}
      <main style={styles.main}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Skills:</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Interests:</label>
            <input
              type="text"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label>Experience (in years):</label>
            <input
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.button}>Get Career Suggestions</button>
        </form>

        {/* Results Section */}
        {result && (
          <div style={styles.results}>
            <h2>Career Suggestions for {result.name}</h2>
            <p><strong>Skills:</strong> {result.skills}</p>
            <p><strong>Interests:</strong> {result.interests}</p>
            <p><strong>Experience:</strong> {result.experience} years</p>
            <h3>Recommended Careers:</h3>
            <ul style={styles.list}>
              {result.recommendations.map((career, index) => (
                <li key={index} style={styles.listItem}>{career}</li>
              ))}
            </ul>
          </div>
        )}
      </main>

      {/* Footer Section */}
      <footer style={styles.footer}>
        <p>© 2025 Career Analysis App</p>
      </footer>
    </div>
  );
};

// Simple Inline Styling for the App
const styles = {
  header: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    margin: 0,
  },
  main: {
    width: '100%',
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  results: {
    marginTop: '20px',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: '0',
  },
  listItem: {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    marginBottom: '8px',
    borderRadius: '5px',
  },
  footer: {
    backgroundColor: '#f1f1f1',
    padding: '10px',
    textAlign: 'center',
  },
};

export default App;
