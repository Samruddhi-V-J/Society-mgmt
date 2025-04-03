import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';

function AdminLayout() {
  return (
    <div className="app">
      <Sidebar role="admin" />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;