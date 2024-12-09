import { Link, useNavigate } from 'react-router-dom'; 
import { useState } from 'react';
import PropTypes from 'prop-types';  // Import PropTypes
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faClock, faBell, faSearch, faUser  } from '@fortawesome/free-solid-svg-icons';
import NotificationChecker from './NotificationChecker';
import '../Styles/NavBar.css';

const NavBar = ({ username }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleLogout = () => {
    // Implement your logout logic here, such as clearing tokens or user data
    navigate('/'); // Redirect to the landing page after logout
  };

  const handleAddTask = () => {
    navigate('/tasks'); // Navigate to the TaskPage when "+" icon is clicked
  };

  return (
    <nav className="navbar">
      <ul className="nav-icons">
        <li className="nav-icon" onClick={handleAddTask}>
          <FontAwesomeIcon icon={faPlus} />
        </li>
        <li className="nav-icon">
          <Link to="/timer">
            <FontAwesomeIcon icon={faClock} />
          </Link>
        </li>
        <li className="nav-icon">
          <div className="dropdown">
            <FontAwesomeIcon icon={faBell} onClick={toggleNotifications} />
            {showNotifications && (
              <div className="dropdown-content">
                <NotificationChecker />
              </div>
            )}
          </div>
        </li>
        <li className="nav-icon">
          <Link to="/search">
            <FontAwesomeIcon icon={faSearch} />
          </Link>
        </li>
        <li className="nav-icon" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <FontAwesomeIcon icon={faUser } />
          {dropdownOpen && (
            <div className="dropdown-menu">
              <p>Hello, {username}</p>
              <Link to="/user" className="to-settings">Account Settings</Link>
              <button onClick={handleLogout} className="logout">Log Out</button>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

// Define prop types for the NavBar component
NavBar.propTypes = {
  username: PropTypes.string.isRequired,
};

export default NavBar;