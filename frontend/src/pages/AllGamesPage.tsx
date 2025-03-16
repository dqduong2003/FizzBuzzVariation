import React, { useEffect, useState } from "react";
import { Game } from "../types/Game";
import { GameService } from "../api/api";
import { Rule } from "../types/Rule";
import NavBar from "../components/NavBar/NavBar";
import NavButton from "../components/Buttons/NavButton";
import './AllGamesPage.css';
import GameButton from "../components/Buttons/GameButton";

const GameTable = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                    <th>Name</th>
                    <th>Author</th>
                    <th>Rules</th>
                    <th>Range</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {games.map(game => {
                // Parse `rules` only if it's a string
                const rules = typeof game.rules === 'string' ? JSON.parse(game.rules) : game.rules;
                console.log(rules);
                return (
                    <tr key={game.gameId}>
                        <td>{game.name}</td>
                        <td>{game.author}</td>
                        <td>
                        <ul>
                        {rules.map((rule: Rule, index: number) => {
                            console.log("Rule Item:", rule); // Debugging log for each rule
                            return (
                            <li key={index}>
                                {rule.Divisor || "No Divisor"} - {rule.Replacement || "No Replacement"}
                            </li>
                            );
                        })}
                        </ul>
                        </td>
                        <td>{game.rangeStart} - {game.rangeEnd}</td>
                        <td><NavButton label="Play" className='button--mimas' to={`/start-session/${game.gameId}`} /></td>
                    </tr>
                );
                })}
            </tbody>
        </table>
    );
}

function AllGamesPage() {
    return (
        <div>
            <NavBar />
            <div className="body">
                <div className="tableContainer">
                    <h1>All Games</h1>
                    <GameTable />
                </div>
                <GameButton label="Create Game" to="/create-game" />
            </div>
        </div>
    );
}

export default AllGamesPage;