import { Link } from "react-router-dom";
import './GameButton.css';

type GameButtonProps = {
  label: string;
  to: string;
};

const GameButton = ({ label, to }: GameButtonProps) => {
  return (
    <Link to={to}>
      <button className="button--telesto">
        <span>{label}</span>
      </button>
    </Link>
  );
};

export default GameButton;