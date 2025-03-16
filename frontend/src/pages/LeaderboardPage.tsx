import { useEffect, useState } from "react";
import { Session } from "../types/Session";
import { GameService, SessionService } from "../api/api";
import { Game } from "../types/Game";
import NavBar from "../components/NavBar/NavBar";
import GameButton from "../components/Buttons/GameButton";
import "./LeaderboardPage.css";

const SessionsTable = () => {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const sessionsData = await SessionService.getAllSessions();
                setSessions(sessionsData);
            } catch (error) {
                console.error("Failed to fetch sessions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();

        const fetchGames = async () => {
            try {
                const gamesData = await GameService.getAllGames();
                setGames(gamesData);
            } catch (error) {
                console.error("Failed to fetch games:", error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchGames();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Game</th>
                    <th>Date</th>
                    <th>Duration</th>
                    <th>Correct Answers</th>
                    <th>Incorrect Answers</th>
                </tr>
            </thead>
            <tbody>
                {sessions.map(session => {
                    const game = games.find(game => game.gameId === session.gameId);
                    return (
                        <tr key={session.sessionId}>
                            <td>{game?.name}</td>
                            <td>{new Date(session.startTime).toLocaleString()}</td>
                            <td>{session.duration} seconds</td>
                            <td>{session.correctAnswers}</td>
                            <td>{session.incorrectAnswers}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    )
}

function LeaderboardPage() {
    return (
        <div>
            <NavBar />
            <div className="body">
                <h1>Leaderboard</h1>
                <div className="leaderboardTableContainer">
                    <SessionsTable />
                </div>
                <div className="buttonsHolder">
                    <GameButton label="Start Game" to="/games"/>
                    <GameButton label="Create Game" to="/create-game"/>
                </div>
            </div>
        </div>
    );
}

export default LeaderboardPage;