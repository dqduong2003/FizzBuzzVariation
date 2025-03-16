import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Game } from "../types/Game";
import { Rule } from "../types/Rule";
import NavBar from "../components/NavBar/NavBar";
import "./StartSessionPage.css";
import { GameService, SessionService } from "../api/api";

const StartSessionForm = () => {
  const { id } = useParams<{ id: string }>(); // `id` is the `gameId` passed through the URL
  const navigate = useNavigate();

  const [game, setGame] = useState<Game | null>(null);
  const [duration, setDuration] = useState<number | "">("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameData = await GameService.getGameById(Number(id));

        // Parse rules if necessary
        const rules =
          typeof gameData.rules === "string" ? JSON.parse(gameData.rules) : gameData.rules;

        setGame({ ...gameData, rules });
      } catch (error) {
        console.error("Failed to fetch game details:", error);
        alert("Could not load the game details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  const handleStartSession = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!duration) {
      alert("Please enter a session duration.");
      return;
    }

    try {
        // const response = await axios.post(`https://localhost:5000/api/Session/start-session/${id}`, {
        //     gameId: id, // Ensure `id` is the correct variable for your gameId
        //     duration: Number(duration),
        //   });
        const newSession = await SessionService.startSession({ gameId: Number(id), duration: Number(duration) });

        // Redirect to the session page or handle the session as needed
        // alert("Session started successfully!");
        console.log("New Session:", newSession);

        // For example, navigate to a page displaying session details
        navigate(`/session/${newSession.sessionId}`);
        } catch (error) {
        console.error("Failed to start session:", error);
        alert("Could not start the session. Please try again.");
        }
    };

    if (loading) {
        return <p>Loading game details...</p>;
    }

    if (!game) {
        return <p>Game not found.</p>;
    }

    return (
        <div className="startSessionFormContainer">
        <p>
            <strong>Author:</strong> {game.author}
        </p>
        <h3>Rules:</h3>
        <ul>
            {game.rules.map((rule: Rule, index: number) => (
            <li key={index}>
                {rule.Divisor} - {rule.Replacement}
            </li>
            ))}
        </ul>
        <h3>Range:</h3>
        <p>
            {game.rangeStart} - {game.rangeEnd}
        </p>
        <form onSubmit={handleStartSession}>
            <label>
            Session Duration (in seconds):
            <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                required
            />
            </label>
            <button type="submit">Start</button>
        </form>
        </div>
    );
};

function StartSessionPage() {
    return (
        <div>
        <NavBar />
        <nav className="body">
          <h1>Start Game</h1>
          <StartSessionForm />
        </nav>
        </div>
    );
}

export default StartSessionPage;
