import { NavLink, useNavigate } from 'react-router-dom';
import { 
  RiDashboardLine, 
  RiFileList2Line,
  RiMoneyDollarCircleLine,
  RiCalendarEventLine,
  RiNotification3Line,
  RiLogoutBoxLine,
  RiUserSettingsLine,
  RiFileTextLine,
  RiCustomerService2Line,
  RiParkingBoxLine,
  RiPhoneLine,
  RiStarLine
} from 'react-icons/ri';
import '../styles/Sidebar.css';

function Sidebar({ role }) {
  const navigate = useNavigate();
  const basePath = role === 'admin' ? '/admin-dashboard' : '/resident-dashboard';

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="logo">
        <img src="/vite.svg" alt="Logo" className="logo-img" />
        <span>CommUnity</span>
      </div>
      
      <nav className="nav-menu">
        <NavLink to={basePath} className="nav-link" end>
          <RiDashboardLine /> Dashboard
        </NavLink>
        <NavLink to={`${basePath}/request-services`} className="nav-link">
          <RiCustomerService2Line /> Request Services
        </NavLink>
        <NavLink to={`${basePath}/complaints`} className="nav-link">
          <RiFileList2Line /> Complaints
        </NavLink>
        
        <NavLink to={`${basePath}/events`} className="nav-link">
          <RiCalendarEventLine /> Events
        </NavLink>
        <NavLink to={`${basePath}/notices`} className="nav-link">
          <RiNotification3Line /> Notices
        </NavLink>
        <NavLink to={`${basePath}/parking`} className="nav-link">
          <RiParkingBoxLine /> Parking
        </NavLink>
        <NavLink to={`${basePath}/emergency-contacts`} className="nav-link">
          <RiPhoneLine /> Emergency Contacts
        </NavLink>
        <NavLink to={`${basePath}/billings`} className="nav-link">
          <RiMoneyDollarCircleLine /> Billings
        </NavLink>
        <NavLink to={`${basePath}/feedback`} className="nav-link">
          <RiStarLine /> Feedback
        </NavLink>
        
        
        {/* {role === 'admin' && (
          <>
            <NavLink to={`${basePath}/posts`} className="nav-link">
              <RiFileTextLine /> Posts
            </NavLink>
            <NavLink to={`${basePath}/resident-list`} className="nav-link">
              <RiUserSettingsLine /> Manage Residents
            </NavLink>
          </>
        )} */}
      </nav>

      <div className="logout">
        <button className="logout-btn" onClick={handleLogout}>
          <RiLogoutBoxLine /> Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;