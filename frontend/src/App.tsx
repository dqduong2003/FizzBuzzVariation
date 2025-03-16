import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import RulesPage from "./pages/RulesPage";
import AllGamesPage from "./pages/AllGamesPage";
import CreateGamePage from "./pages/CreateGamePage";
import StartSessionPage from "./pages/StartSessionPage";
import SessionPage from "./pages/SessionPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import Background from "./components/Background/Background";

function App() {
  return (
    <Router>
      <Background />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/games" element={<AllGamesPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage/>} />
        <Route path="/create-game" element={<CreateGamePage/>} />
        <Route path="/start-session/:id" element={<StartSessionPage />} />
        <Route path="/session/:sessionId" element={<SessionPage />} />
      </Routes>
    </Router>
  );
}

export default App;