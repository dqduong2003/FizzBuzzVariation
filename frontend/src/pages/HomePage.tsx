import GameButton from "../components/Buttons/GameButton";
import NavBar from "../components/NavBar/NavBar";
import "./HomePage.css";

function HomePage() {

  return (
    <div className="HomePage">
      <NavBar />
      <div className="body">
        <h1>Test your skills with FizzBuzz variations!</h1>
        <div className="buttonsHolder">
          <GameButton label="Start Game" to="/games"/>
          <GameButton label="Create Game" to="/create-game"/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;