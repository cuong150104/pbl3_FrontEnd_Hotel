import React from 'react';
import './customer.scss';

const AdminHome = () => {
  return (
    <div className="admin-home">
      <h1>Welcome, Customer!</h1>
      <div className="dashboard-widgets">
        <div className="widget">Latest Updates</div>
        <div className="widget">Statistics</div>
        <div className="widget">Booking</div>
      </div>
    </div>
  );
}

export default AdminHome;
