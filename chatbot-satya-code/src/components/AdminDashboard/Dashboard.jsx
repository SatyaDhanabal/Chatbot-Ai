// Dashboard.jsx
import React, { useState } from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown, TrendingUp } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [chartFilter, setChartFilter] = useState('month');

  const stats = {
    totalChats: 1250,
    totalLikes: 890,
    totalDislikes: 156,
    engagement: 87.5
  };

  const chartData = {
    month: [
      { name: 'Jan', chats: 300, likes: 220, dislikes: 35 },
      { name: 'Feb', chats: 280, likes: 200, dislikes: 28 },
      { name: 'Mar', chats: 350, likes: 270, dislikes: 45 },
      { name: 'Apr', chats: 320, likes: 200, dislikes: 48 },
      { name: 'May', chats: 400, likes: 320, dislikes: 40 },
      { name: 'Jun', chats: 370, likes: 310, dislikes: 38 },
    ],
    week: [
      { name: 'Mon', chats: 45, likes: 35, dislikes: 8 },
      { name: 'Tue', chats: 52, likes: 40, dislikes: 6 },
      { name: 'Wed', chats: 48, likes: 38, dislikes: 9 },
      { name: 'Thu', chats: 55, likes: 42, dislikes: 7 },
      { name: 'Fri', chats: 60, likes: 45, dislikes: 12 },
      { name: 'Sat', chats: 30, likes: 25, dislikes: 5 },
      { name: 'Sun', chats: 35, likes: 28, dislikes: 8 },
    ],
    year: [
      { name: '2019', chats: 3200, likes: 2400, dislikes: 450 },
      { name: '2020', chats: 3800, likes: 2900, dislikes: 520 },
      { name: '2021', chats: 4200, likes: 3200, dislikes: 580 },
      { name: '2022', chats: 3500, likes: 2650, dislikes: 480 },
      { name: '2023', chats: 3900, likes: 3100, dislikes: 510 },
    ],
  };

  const currentData = chartData[chartFilter];
  const maxVal = Math.max(...currentData.flatMap(d => [d.chats, d.likes, d.dislikes]));

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Monitor your application's performance and user engagement</p>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div>
            <p>Total Chats</p>
            <h2>{stats.totalChats.toLocaleString()}</h2>
          </div>
          <div className="stat-icon blue"><MessageCircle /></div>
        </div>
        <div className="stat-card">
          <div>
            <p>Total Likes</p>
            <h2>{stats.totalLikes.toLocaleString()}</h2>
          </div>
          <div className="stat-icon green"><ThumbsUp /></div>
        </div>
        <div className="stat-card">
          <div>
            <p>Total Dislikes</p>
            <h2>{stats.totalDislikes.toLocaleString()}</h2>
          </div>
          <div className="stat-icon red"><ThumbsDown /></div>
        </div>
        <div className="stat-card">
          <div>
            <p>Engagement Rate</p>
            <h2>{stats.engagement}%</h2>
          </div>
          <div className="stat-icon purple"><TrendingUp /></div>
        </div>
      </div>

      <div className="chart-section compact">
        <div className="chart-header">
          <h3>Analytics Overview</h3>
          <div className="filter-buttons">
            {['week', 'month', 'year'].map(filter => (
              <button
                key={filter}
                className={chartFilter === filter ? 'active' : ''}
                onClick={() => setChartFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="chart-bars">
          {currentData.map((data, index) => (
            <div key={index} className="bar-group">
              <div className="bar chats" style={{ height: `${(data.chats / maxVal) * 180}px` }} title={`Chats: ${data.chats}`}></div>
              <div className="bar likes" style={{ height: `${(data.likes / maxVal) * 180}px` }} title={`Likes: ${data.likes}`}></div>
              <div className="bar dislikes" style={{ height: `${(data.dislikes / maxVal) * 180}px` }} title={`Dislikes: ${data.dislikes}`}></div>
              <p className="bar-label">{data.name}</p>
            </div>
          ))}
        </div>

        <div className="chart-legend">
          <span><span className="legend-box blue"></span>Chats</span>
          <span><span className="legend-box green"></span>Likes</span>
          <span><span className="legend-box red"></span>Dislikes</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;