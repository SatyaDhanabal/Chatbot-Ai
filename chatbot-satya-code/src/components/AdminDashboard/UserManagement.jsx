// components/AdminDashboard/UserManagement.js
import React, { useState } from 'react';
import UserDetail from './UserDetail';
import './UserManagement.css';

const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users] = useState([
    {
      id: 1,
      name: 'Satya Kumar',
      email: 'satya12@gmail.com',
      role: 'User',
      status: 'Active',
      totalChats: 145,
      totalLikes: 89,
      totalDislikes: 12
    },
    {
      id: 2,
      name: 'Sugil Admin',
      email: 'sugil12@gmail.com',
      role: 'Admin',
      status: 'Active',
      totalChats: 67,
      totalLikes: 45,
      totalDislikes: 8
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'User',
      status: 'Inactive',
      totalChats: 23,
      totalLikes: 15,
      totalDislikes: 3
    },
    {
      id: 4,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'User',
      status: 'Active',
      totalChats: 78,
      totalLikes: 56,
      totalDislikes: 7
    }
  ]);

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'Active').length,
    inactiveUsers: users.filter(u => u.status === 'Inactive').length
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
  };

  const handleBackToList = () => {
    setSelectedUser(null);
  };

  if (selectedUser) {
    return <UserDetail user={selectedUser} onBack={handleBackToList} />;
  }

  return (
    <div className="user-management">
      <div className="user-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{stats.activeUsers}</h3>
            <p>Active Users</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">❌</div>
          <div className="stat-info">
            <h3>{stats.inactiveUsers}</h3>
            <p>Inactive Users</p>
          </div>
        </div>
      </div>

      <div className="users-table">
        <h3>User Management</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="action-btn view"
                        onClick={() => handleViewUser(user)}
                      >
                        View
                      </button>
                      <button className="action-btn edit">Edit</button>
                      <button className="action-btn delete">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;