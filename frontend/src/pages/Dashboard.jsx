import React from 'react';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium">Recent Activity</h3>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium">Statistics</h3>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium">Quick Actions</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
