
import { useNavigate } from 'react-router-dom'; 
import './SideBar.css';
import Clock from './Clock';
import logo from './logo.png';

const SideBar = () => {
  const navigate = useNavigate(); 

  return (
    <nav className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="TaskMaster Logo" className="logo" />
      </div>
      <div className="nav-buttons">
        <button className="nav-button" onClick={() => navigate('/home')}>
          <i className="fas fa-home"></i>
          <span>Home</span>
        </button>
        <button className="nav-button" onClick={() => navigate('/dashboards')}>
          <i className="fas fa-tachometer-alt"></i>
          <span>Dashboards</span>
        </button>
        <button className="nav-button" onClick={() => navigate('/inbox')}>
          <i className="fas fa-inbox"></i>
          <span>Inbox</span>
        </button>
      </div>
      <div className='clock'>
        <Clock />
      </div>
    </nav>
  );
};

export default SideBar;
