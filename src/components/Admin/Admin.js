import React from 'react';
import './Admin.scss';

const AdminHome = () => {
  return (
    <div className="admin-home">
      <h1>Welcome, Admin!</h1>
      <div className="dashboard-widgets">
        <div className="widget">Latest Updates</div>
        <div className="widget">Statistics</div>
        <div className="widget">User Activity</div>
      </div>
    </div>
  );
}

export default AdminHome;
