import { Link } from "react-router-dom";
import './NavButton.css';

type NavButtonProps = {
    label: string;
    to: string;
    className?: string; // Allow passing custom class names
};

const NavButton = ({ label, to, className }: NavButtonProps) => {
    return (
        <Link to={to}>
            <button className={className}>
                <div className="button__bg"></div>
                <span>{label}</span>
            </button>
        </Link>
    );
};

export default NavButton;