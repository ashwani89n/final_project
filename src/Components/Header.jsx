import './Header.css';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header-container">
        <h1 className="logo">Talkin&apos; Panthers</h1>
        <div >
        <Link to="/dashboard"><button className="dashboard-button">Dashboard</button></Link>
        </div>
      </div>
    );
  };
  
  export default Header;
  