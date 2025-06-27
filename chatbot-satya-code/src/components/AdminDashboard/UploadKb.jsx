// components/AdminDashboard/UploadKB.js
import React, { useState } from 'react';
import './UploadKb.css';

const UploadKB = () => {
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [completedFiles, setCompletedFiles] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert(`File ${file.name} exceeds 10MB limit`);
        continue;
      }

      const fileObj = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        status: 'uploading'
      };

      // Add to uploading files
      setUploadingFiles(prev => [...prev, fileObj]);

      // Simulate upload process
      setTimeout(() => {
        setUploadingFiles(prev =>
          prev.map(f =>
            f.id === fileObj.id
              ? { ...f, status: 'embedding' }
              : f
          )
        );

        setTimeout(() => {
          setUploadingFiles(prev =>
            prev.map(f =>
              f.id === fileObj.id
                ? { ...f, status: 'complete' }
                : f
            )
          );

          // After 1 second, move to completed files and show success
          setTimeout(() => {
            setUploadingFiles(prev => prev.filter(f => f.id !== fileObj.id));
            setCompletedFiles(prev => [...prev, { ...fileObj, status: 'uploaded' }]);
            setShowSuccess(true);
            
            // Hide success message after 3 seconds
            setTimeout(() => {
              setShowSuccess(false);
            }, 3000);
          }, 1000);
        }, 2000);
      }, 2000);
    }

    // Clear the input
    e.target.value = '';
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'uploading':
        return 'Uploading Document...';
      case 'embedding':
        return 'Embedding in Process...';
      case 'complete':
        return 'KB Upload Complete';
      case 'uploaded':
        return 'Successfully Uploaded';
      default:
        return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploading':
        return '⏳';
      case 'embedding':
        return '🔄';
      case 'complete':
        return '✅';
      case 'uploaded':
        return '✅';
      default:
        return '';
    }
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      default:
        return '📄';
    }
  };

  return (
    <div className="upload-kb">
      <div className="upload-container">
        {/* Upload Guide */}
        <div className="upload-guide">
          <div className="guide-box">
            <h3>Knowledge Base Upload</h3>
            <p>You can upload PDF, Word, Excel files. Max size: 10MB.</p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="upload-section">
          <div className="upload-area">
            <input
              type="file"
              id="kb-upload"
              multiple
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={handleFileUpload}
              className="file-input"
            />
            <label htmlFor="kb-upload" className="upload-label">
              <div className="upload-icon">📁</div>
              <h4>Click to upload files</h4>
              <p>Or drag and drop files here</p>
            </label>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="upload-success">
            <div className="success-icon">🎉</div>
            <h3>File Uploaded Successfully!</h3>
            <p>Your file has been processed and added to the knowledge base.</p>
          </div>
        )}

        {/* Progress Card - Only show when files are uploading */}
        {uploadingFiles.length > 0 && (
          <div className="progress-card">
            <h3>Upload Progress</h3>
            <div className="progress-list">
              {uploadingFiles.map(file => (
                <div key={file.id} className={`progress-item ${file.status}`}>
                  <div className="file-info">
                    <div className="file-icon">{getFileIcon(file.name)}</div>
                    <div className="file-details">
                      <h4>{file.name}</h4>
                      <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <div className="file-status">
                    <span className="status-icon">
                      {getStatusIcon(file.status)}
                    </span>
                    <span className="status-text">
                      {getStatusText(file.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Uploaded Files Display */}
        {completedFiles.length > 0 && (
          <div className="uploaded-files-display">
            <h3>Uploaded Files</h3>
            <div className="uploaded-files-list">
              {completedFiles.map(file => (
                <div key={file.id} className="uploaded-file-item">
                  <div className="file-info">
                    <div className="file-icon">{getFileIcon(file.name)}</div>
                    <div className="file-details">
                      <h4>{file.name}</h4>
                      <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <div className="file-status">
                    <span className="status-icon">
                      {getStatusIcon(file.status)}
                    </span>
                    <span className="status-text">
                      {getStatusText(file.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadKB;