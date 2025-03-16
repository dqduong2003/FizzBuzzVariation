import GameButton from "../components/Buttons/GameButton";
import NavBar from "../components/NavBar/NavBar";
import "./RulesPage.css";

function RulesPage() {

  return (
    <div className="RulesPage">
      <NavBar />
      <div className="body">
        <h1>Rules</h1>
          <div className="ruleContent">
              <p>FizzBuzz is a simple yet entertaining game that challenges players to replace certain numbers with specific words based on divisibility rules. 
              Traditionally, players replace any number divisible by 3 with "Fizz" and any number divisible by 5 with "Buzz." If a number is divisible by both 
              3 and 5, the player says "FizzBuzz" instead. The challenge lies in thinking quickly and applying the rules correctly, making it a fun mix of math 
              and reflexes. It's a timeless game that sharpens your number sense while keeping you on your toes!</p>
              <p>In this version, the game takes FizzBuzz to the next level by allowing players to create their own custom rules. Players can define unique divisors 
              and choose the replacement words, creating games like "FooBooLoo," where numbers divisible by 7, 11, and 103 are replaced by "Foo," "Boo," and "Loo," 
              respectively. You can also set a custom number range to tailor the challenge to your liking. Whether you want to stick to the classics or invent your 
              own twist, this game offers endless possibilities for creativity and fun!</p>
          </div>
          <div className="buttonsHolder">
            <GameButton label="Start Game" to="/games" />
            <GameButton label="Create Game" to="/create-game" />
        </div>
      </div>
    </div>
  );
}

export default RulesPage;