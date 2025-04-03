import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

function DashLayout() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default DashLayout;