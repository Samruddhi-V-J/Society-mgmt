import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';

function ResidentLayout() {
  return (
    <div className="app">
      <Sidebar role="resident" />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default ResidentLayout;