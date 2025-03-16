import "./NavBar.css"; 
import NavButton from "../Buttons/NavButton";

type Props = {};

const NavBar = (props: Props) => {
    return <div className="NavBarHolder">
        <NavButton label="Home" to="/" className="navBarButton button--bestia" />
        <NavButton label="Rules" to="/rules" className="navBarButton button--bestia" />
        <NavButton label="Games" to="/games" className="navBarButton button--bestia" />
        {/* <NavButton label="Leaderboard" to="/leaderboard" className="navBarButton button--bestia" /> */}
    </div>
};

export default NavBar;