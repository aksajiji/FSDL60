import React, { useState } from "react";
import CareerSuggestion from "./components/CareerSuggestion";
import CareerDetails from "./components/CareerDetails";
import { FaSearch } from "react-icons/fa";
import "./App.css";

const careerData = {
  technology: [
    { name: "Software Developer", description: "Build software systems.", salary: "$60K - $120K", skills: "JavaScript, Problem-solving" },
    { name: "Data Scientist", description: "Analyze data for insights.", salary: "$70K - $130K", skills: "Python, Machine Learning" }
  ],
  design: [
    { name: "Graphic Designer", description: "Create visual content.", salary: "$50K - $90K", skills: "Adobe Suite, Creativity" },
    { name: "UI/UX Designer", description: "Design user interfaces.", salary: "$60K - $100K", skills: "Prototyping, Design" }
  ],
  business: [
    { name: "Marketing Manager", description: "Lead marketing campaigns.", salary: "$55K - $95K", skills: "Marketing, Analytics" },
    { name: "Project Manager", description: "Manage projects from start to finish.", salary: "$60K - $110K", skills: "Leadership, Organization" }
  ]
};

const App = () => {
  const [interests, setInterests] = useState("");
  const [skills, setSkills] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);

  const handleSubmit = () => {
    let filteredCareers = [];

    if (interests.toLowerCase().includes("technology")) {
      filteredCareers = [...filteredCareers, ...careerData.technology];
    }
    if (interests.toLowerCase().includes("design")) {
      filteredCareers = [...filteredCareers, ...careerData.design];
    }
    if (interests.toLowerCase().includes("business")) {
      filteredCareers = [...filteredCareers, ...careerData.business];
    }

    setSuggestions(filteredCareers);
  };

  const handleSelectCareer = (career) => {
    setSelectedCareer(career);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Career Path Finder</h1>
        <p>Find your ideal career path based on your interests and skills.</p>
      </header>

      <div className="input-section">
        <input
          type="text"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="Enter your interests (e.g., Technology, Design)"
        />
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Enter your skills (e.g., Programming, Design)"
        />
        <button onClick={handleSubmit}>
          <FaSearch /> Analyze
        </button>
      </div>

      {selectedCareer ? (
        <CareerDetails career={selectedCareer} />
      ) : (
        <CareerSuggestion suggestions={suggestions} onSelectCareer={handleSelectCareer} />
      )}
    </div>
  );
};

export default App;
