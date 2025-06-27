// components/AdminDashboard/AdminDashboard.js
import React, { useState } from 'react';
import { 
  Image, 
  File, 
  ArrowUpFromLine, 
  Plus, 
  Repeat2, 
  Pencil, 
  ThumbsUp, 
  Copy, 
  ThumbsDown,
  LogOut,
  MessageCircle,
  Search,
  History,
  BarChart3,
  Users,
  Upload
} from 'lucide-react';
import Dashboard from './Dashboard';
import UserManagement from './UserManagement';
import UploadKB from './UploadKb';
import './AdminDashboard.css';

const AdminDashboard = ({ user = { username: 'Admin' }, onLogout = () => {} }) => {
  const [activeTab, setActiveTab] = useState('chat'); // Default to chat
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleSendMessage = () => {
    if (inputMessage.trim() || uploadedFiles.length > 0) {
      const newMessage = {
        id: Date.now(),
        text: inputMessage || "Uploaded files",
        sender: 'user',
        timestamp: new Date().toLocaleTimeString(),
        files: [...uploadedFiles],
        likes: 0,
        dislikes: 0,
        userLiked: false,
        userDisliked: false
      };

      setMessages([...messages, newMessage]);
      setInputMessage('');
      setUploadedFiles([]);

      // Simulate AI response
      setTimeout(() => {
        let responseText = '';
        if (newMessage.files.length > 0) {
          const fileNames = newMessage.files.map(file => file.name).join(', ');
          responseText = `I received your message`;
          if (newMessage.text && newMessage.text !== "Uploaded files") {
            responseText += `: "${newMessage.text}"`;
          }
          responseText += ` along with ${newMessage.files.length} file(s): ${fileNames}. As an admin, I can help you analyze these files or perform administrative tasks. What would you like me to do?`;
        } else {
          responseText = `Hello Admin! I understand your message: "${newMessage.text}". How can I assist you with your administrative tasks?`;
        }

        const aiResponse = {
          id: Date.now() + 1,
          text: responseText,
          sender: 'ai',
          timestamp: new Date().toLocaleTimeString(),
          likes: 0,
          dislikes: 0,
          userLiked: false,
          userDisliked: false
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newFile = {
        id: Date.now(),
        name: file.name,
        size: file.size,
        type: file.type,
        file: file
      };
      setUploadedFiles([...uploadedFiles, newFile]);
    }
  };

  const removeFile = (fileId) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
  };

  const handleLike = (messageId) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        if (msg.userLiked) {
          return { 
            ...msg, 
            likes: msg.likes - 1, 
            userLiked: false 
          };
        } else if (msg.userDisliked) {
          return { 
            ...msg, 
            likes: msg.likes + 1, 
            dislikes: msg.dislikes - 1,
            userLiked: true,
            userDisliked: false
          };
        } else {
          return { 
            ...msg, 
            likes: msg.likes + 1, 
            userLiked: true 
          };
        }
      }
      return msg;
    }));
  };

  const handleDislike = (messageId) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        if (msg.userDisliked) {
          return { 
            ...msg, 
            dislikes: msg.dislikes - 1, 
            userDisliked: false 
          };
        } else if (msg.userLiked) {
          return { 
            ...msg, 
            likes: msg.likes - 1, 
            dislikes: msg.dislikes + 1,
            userLiked: false,
            userDisliked: true
          };
        } else {
          return { 
            ...msg, 
            dislikes: msg.dislikes + 1, 
            userDisliked: true 
          };
        }
      }
      return msg;
    }));
  };

  const handleCopy = (messageText) => {
    navigator.clipboard.writeText(messageText).then(() => {
      console.log('Message copied to clipboard');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const handleEdit = (messageId) => {
    console.log('Edit message:', messageId);
  };

  const handleRegenerate = (messageId) => {
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex > 0) {
      const userMessage = messages[messageIndex - 1];
      setTimeout(() => {
        let regeneratedText = '';
        if (userMessage.files && userMessage.files.length > 0) {
          const fileNames = userMessage.files.map(file => file.name).join(', ');
          regeneratedText = `Here's an alternative admin response to your message`;
          if (userMessage.text && userMessage.text !== "Uploaded files") {
            regeneratedText += ` "${userMessage.text}"`;
          }
          regeneratedText += ` and the uploaded file(s): ${fileNames}. Let me provide a different administrative perspective.`;
        } else {
          regeneratedText = `Here's a regenerated admin response to: "${userMessage.text}". This is a different administrative approach to your query.`;
        }

        const regeneratedResponse = {
          ...messages[messageIndex],
          text: regeneratedText,
          timestamp: new Date().toLocaleTimeString(),
        };
        
        const updatedMessages = [...messages];
        updatedMessages[messageIndex] = regeneratedResponse;
        setMessages(updatedMessages);
      }, 1000);
    }
  };

  const handleDownload = (messageText, messageId) => {
    const element = document.createElement('a');
    const file = new Blob([messageText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `admin_message_${messageId}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleLogout = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'upload':
        return <UploadKB />;
      default:
        return (
          <div className="admin-chat-interface">
            <div className="chat-sidebar">
              <div className="sidebar-header">
                <div className="logo">
                  <div className="logo-circle">
                    <img 
                      src="/path-to-your-logo.png" 
                      alt="Logo" 
                      className="logo-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="logo-placeholder">
                      <MessageCircle size={20} />
                    </div>
                  </div>
                  <h3>Admin AI</h3>
                </div>
              </div>

              <div className="sidebar-tabs">
                <button className="tab-btn active">
                  <MessageCircle size={16} />
                  New Chat
                </button>
                <button className="tab-btn">
                  <Search size={16} />
                  Search Chat
                </button>
                <button className="tab-btn">
                  <History size={16} />
                  Chat History
                </button>
              </div>

              <div className="sidebar-footer">
                <div className="user-profile">
                  <div className="profile-icon admin-icon">👨‍💼</div>
                  <span>{user.username}</span>
                </div>
                <button 
                  className="logout-btn" 
                  onClick={() => setShowLogoutModal(true)}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>

            <div className="chat-main">
              <div className="chat-background-logo">
                <img 
                  src="/path-to-your-logo.png" 
                  alt="Background Logo" 
                  className="background-logo-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              <div className="chat-messages">
                {messages.length === 0 && (
                  <div className="empty-chat">
                    <div className="empty-chat-content">
                      <div className="empty-logo">
                        <MessageCircle size={48} />
                      </div>
                      <h2>Welcome to Admin AI</h2>
                      <p>Start a conversation by typing a message below or upload files to analyze. Access your admin tools from the navigation above.</p>
                    </div>
                  </div>
                )}
                
                {messages.map(message => (
                  <div key={message.id} className={`message ${message.sender}`}>
                    <div className="message-card">
                      <div className="message-content">
                        <p>{message.text}</p>
                        {message.files && message.files.length > 0 && (
                          <div className="message-files">
                            {message.files.map(file => (
                              <div key={file.id} className="message-file">
                                <File size={16} />
                                <span className="file-info">
                                  <span className="file-name">{file.name}</span>
                                  <span className="file-size">({formatFileSize(file.size)})</span>
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="message-footer">
                        <span className="timestamp">{message.timestamp}</span>
                        
                        {message.sender === 'user' && (
                          <div className="message-actions">
                            <button 
                              className="action-btn edit-btn" 
                              title="Edit"
                              onClick={() => handleEdit(message.id)}
                            >
                              <Pencil size={14} />
                            </button>
                          </div>
                        )}
                        
                        {message.sender === 'ai' && (
                          <div className="message-actions">
                            <div className="actions-left">
                              <button 
                                className={`reaction-btn ${message.userLiked ? 'active-like' : ''}`}
                                onClick={() => handleLike(message.id)}
                                title="Like this response"
                              >
                                <ThumbsUp size={14} />
                                {message.likes > 0 && <span>{message.likes}</span>}
                              </button>
                              <button 
                                className={`reaction-btn ${message.userDisliked ? 'active-dislike' : ''}`}
                                onClick={() => handleDislike(message.id)}
                                title="Dislike this response"
                              >
                                <ThumbsDown size={14} />
                                {message.dislikes > 0 && <span>{message.dislikes}</span>}
                              </button>
                              <button 
                                className="action-btn regenerate-btn" 
                                title="Regenerate"
                                onClick={() => handleRegenerate(message.id)}
                              >
                                <Repeat2 size={14} />
                              </button>
                            </div>
                            
                            <div className="actions-right">
                              <button 
                                className="action-btn copy-btn" 
                                title="Copy"
                                onClick={() => handleCopy(message.text)}
                              >
                                <Copy size={14} />
                              </button>
                              <button 
                                className="action-btn edit-btn" 
                                title="Edit"
                                onClick={() => handleEdit(message.id)}
                              >
                                <Pencil size={14} />
                              </button>
                              <button 
                                className="action-btn download-btn" 
                                title="Download"
                                onClick={() => handleDownload(message.text, message.id)}
                              >
                                <ArrowUpFromLine size={14} />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="chat-input-area">
                {uploadedFiles.length > 0 && (
                  <div className="uploaded-files">
                    {uploadedFiles.map(file => (
                      <div key={file.id} className="uploaded-file">
                        <File size={16} />
                        <div className="file-details">
                          <span className="file-name">{file.name}</span>
                          <span className="file-size">{formatFileSize(file.size)}</span>
                        </div>
                        <button 
                          className="remove-file"
                          onClick={() => removeFile(file.id)}
                          title="Remove file"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="input-container">
                  <input
                    type="file"
                    id="file-upload"
                    accept=".pdf,.doc,.docx,.txt,.csv,.xlsx"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="file-upload" className="upload-btn" title="Upload document">
                    <File size={18} />
                  </label>
                  
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*,audio/*,video/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="image-upload" className="upload-btn" title="Upload media">
                    <Image size={18} />
                  </label>

                  <button className="upload-btn" title="Add attachment">
                    <Plus size={18} />
                  </button>

                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={uploadedFiles.length > 0 ? "Add a message about your files..." : "Type your admin message..."}
                    className="message-input"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  
                  <button 
                    className="send-btn" 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() && uploadedFiles.length === 0}
                  >
                    <ArrowUpFromLine size={16} />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Admin Navigation Bar */}
      <div className="admin-nav-bar">
        <div className="admin-nav-left">
          <div className="admin-logo">
            <div className="admin-logo-circle">
              <MessageCircle size={20} />
            </div>
            <h3>Admin Panel</h3>
          </div>
        </div>

        <div className="admin-nav-center">
          <button 
            className={`admin-nav-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageCircle size={18} />
            Chat
          </button>
          <button 
            className={`admin-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChart3 size={18} />
            Dashboard
          </button>
          <button 
            className={`admin-nav-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={18} />
            User Management
          </button>
          <button 
            className={`admin-nav-btn ${activeTab === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveTab('upload')}
          >
            <Upload size={18} />
            Upload KB
          </button>
        </div>

        <div className="admin-nav-right">
          <div className="admin-profile-nav">
            <div className="profile-icon admin-icon">👨‍💼</div>
            <span>{user.username}</span>
          </div>
          <button 
            className="logout-btn-nav" 
            onClick={() => setShowLogoutModal(true)}
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        {renderContent()}
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <button className="modal-btn cancel" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </button>
              <button className="modal-btn confirm" onClick={handleLogout}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;