import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rule } from '../types/Rule';
import NavBar from '../components/NavBar/NavBar';
import { CreateGameRequest } from '../types/CreateGameRequest';
import './CreateGamePage.css';
import { GameService } from '../api/api';

const CreateGameForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [rules, setRules] = useState<Rule[]>([]);
  const [rangeStart, setRangeStart] = useState<number>(1);
  const [rangeEnd, setRangeEnd] = useState<number>(100);

  const [currentDivisor, setCurrentDivisor] = useState<number | ''>('');
  const [currentReplacement, setCurrentReplacement] = useState('');

  const handleAddRule = () => {
    if (currentDivisor && currentReplacement) {
      setRules([...rules, { Divisor: currentDivisor, Replacement: currentReplacement }]);
      setCurrentDivisor('');
      setCurrentReplacement('');
    }
  };

  const handleRemoveRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newGame: CreateGameRequest = {
      name,
      author,
      rules,
      rangeStart,
      rangeEnd,
    };

    try {
      const response = await GameService.createGame(newGame);
      console.log("Game created successfully:", response);
      navigate("/games"); // Redirect to the games page after successful creation
    } catch (error) {
      console.error("Error creating game:", error);
      alert("Failed to create game. Please try again.");
    }
  };

  return (
    <div>
      <h1>Create a New Game</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value.trim())}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Author
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value.trim())}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Range Start
            <input
              type="number"
              value={rangeStart}
              onChange={(e) => setRangeStart(Number(e.target.value.trim()))}
              min={1}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Range End
            <input
              type="number"
              value={rangeEnd}
              onChange={(e) => setRangeEnd(Number(e.target.value.trim()))}
              min={rangeStart}
              required
            />
          </label>
        </div>
        <div>
          <h3>Rules</h3>
          <div>
            <label>
              <input
                type="number"
                placeholder='Divisor'
                value={currentDivisor}
                onChange={(e) => setCurrentDivisor(Number(e.target.value.trim()) || '')}
              />
            </label>
            <label>
              <input
                type="text"
                placeholder='Replacement'
                value={currentReplacement}
                onChange={(e) => setCurrentReplacement(e.target.value.trim())}
              />
            </label>
            <button type="button" onClick={handleAddRule}>
              Add Rule
            </button>
          </div>
          <ul>
            {rules.map((rule, index) => (
              <li key={index}>
                {rule.Divisor} - {rule.Replacement}
                <button type="button" onClick={() => handleRemoveRule(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit">Create Game</button>
      </form>
    </div>
  );
};

function CreateGamePage() {
    return (
        <div>
            <NavBar />
            <div className="body">
              <div className="formContainer">
                <CreateGameForm />
              </div>
            </div>
        </div>
    );
}

export default CreateGamePage;
