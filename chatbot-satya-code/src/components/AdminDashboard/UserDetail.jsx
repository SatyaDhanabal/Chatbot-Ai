// components/AdminDashboard/UserDetail.js
import React from 'react';
import './UserDetail.css';

const UserDetail = ({ user, onBack }) => {
  const chartData = [
    { period: 'Week 1', chats: 35, likes: 28, dislikes: 3 },
    { period: 'Week 2', chats: 42, likes: 31, dislikes: 4 },
    { period: 'Week 3', chats: 38, likes: 30, dislikes: 2 },
    { period: 'Week 4', chats: 30, likes: 25, dislikes: 3 }
  ];

  return (
    <div className="user-detail">
      <div className="user-detail-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Users
        </button>
        <h2>{user.name} - Dashboard</h2>
      </div>

      <div className="user-stats">
        <div className="stat-card">
          <div className="stat-icon">💬</div>
          <div className="stat-info">
            <h3>{user.totalChats}</h3>
            <p>Total Chats</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👍</div>
          <div className="stat-info">
            <h3>{user.totalLikes}</h3>
            <p>Total Likes</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👎</div>
          <div className="stat-info">
            <h3>{user.totalDislikes}</h3>
            <p>Total Dislikes</p>
          </div>
        </div>
      </div>

      <div className="user-charts">
        <div className="chart-section">
          <h3>Chat Activity</h3>
          <div className="chart">
            {chartData.map((item, index) => (
              <div key={index} className="chart-bar">
                <div className="bar-group">
                  <div 
                    className="bar chats" 
                    style={{ height: `${(item.chats / Math.max(...chartData.map(d => d.chats))) * 100}%` }}
                  ></div>
                </div>
                <div className="bar-label">{item.period}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-section">
          <h3>Likes & Dislikes</h3>
          <div className="chart">
            {chartData.map((item, index) => (
              <div key={index} className="chart-bar">
                <div className="bar-group">
                  <div 
                    className="bar likes" 
                    style={{ height: `${(item.likes / Math.max(...chartData.map(d => d.likes))) * 100}%` }}
                  ></div>
                  <div 
                    className="bar dislikes" 
                    style={{ height: `${(item.dislikes / Math.max(...chartData.map(d => d.dislikes))) * 100}%` }}
                  ></div>
                </div>
                <div className="bar-label">{item.period}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;