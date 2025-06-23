import { useState } from 'react';

export default function AssignmentSubmissionForm() {
  const [fields, setFields] = useState({
    title: '',
    description: '',
    studentName: '',
    studentId: '',
    fileUrl: null
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: '', text: '' });
  const [dragActive, setDragActive] = useState(false);
  const userId = JSON.parse(localStorage.getItem('userId')); 
  // console.log("userId is here ====>",userId);

  // Handle input changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("file is here ====>",file);
    
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setFields(prev => ({
        ...prev,
        fileUrl: file
      }));
      setAlert({ type: '', text: '' });
    } else {
      setAlert({ type: 'error', text: 'Only PDF or image files allowed.' });
    }
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        setFields(prev => ({
          ...prev,
          fileUrl: file
        }));
        setAlert({ type: '', text: '' });
      } else {
        setAlert({ type: 'error', text: 'Only PDF or image files allowed.' });
      }
    }
  };

  // Submit handler
  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ type: '', text: '' });

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', fields.title);
      formDataToSend.append('description', fields.description);
      formDataToSend.append('studentName', fields.studentName);
      formDataToSend.append('studentId', fields.studentId);
      formDataToSend.append('submittedBy', userId);
      if (fields.fileUrl) {
        formDataToSend.append('fileUrl', fields.fileUrl);
      }

      const response = await fetch('https://ikkashin-lms.onrender.com/api/submissions/submit', {
        method: 'POST',
        body: formDataToSend
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit assignment');
      }

      setAlert({ type: 'success', text: 'Assignment submitted successfully!' });
      setFields({
        title: '',
        description: '',
        studentName: '',
        studentId: '',
        fileUrl: null
      });
    } catch (error) {
      setAlert({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-xl mx-auto bg-white border border-blue-200 rounded-3xl shadow-lg p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-blue-700 py-8 px-6 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow">
            {/* Unique icon: Paper airplane (SVG) */}
            <svg width="36" height="36" fill="none" viewBox="0 0 24 24">
              <path d="M3 20L21 12L3 4V10L15 12L3 14V20Z" fill="#2563eb"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-1 tracking-wide">Assignment Upload</h1>
          <p className="text-blue-100 text-base">Fast, simple, and secure submission</p>
        </div>
        {/* Form */}
        <form
          className="p-8 space-y-6"
          onSubmit={handleAssignmentSubmit}
          autoComplete="off"
        >
          <div>
            <label className="block text-blue-700 font-semibold mb-2 text-base">
              Assignment Title
            </label>
            <input
              type="text"
              name="title"
              value={fields.title}
              onChange={handleFieldChange}
              required
              className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-blue-900 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
              placeholder="Enter assignment title"
            />
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-2 text-base">
              Description
            </label>
            <textarea
              name="description"
              value={fields.description}
              onChange={handleFieldChange}
              required
              rows={3}
              className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-blue-900 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
              placeholder="Describe your assignment"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-blue-700 font-semibold mb-2 text-base">
                Student Name
              </label>
              <input
                type="text"
                name="studentName"
                value={fields.studentName}
                onChange={handleFieldChange}
                required
                className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-blue-900 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-blue-700 font-semibold mb-2 text-base">
                Student ID
              </label>
              <input
                type="text"
                name="studentId"
                value={fields.studentId}
                onChange={handleFieldChange}
                required
                className="w-full px-4 py-3 bg-white border border-blue-200 rounded-lg text-blue-900 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="Your student ID"
              />
            </div>
          </div>
          <div>
            <label className="block text-blue-700 font-semibold mb-2 text-base">
              fileUrl
            </label>
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-300 cursor-pointer ${
                dragActive
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-blue-200 hover:border-blue-400 hover:bg-blue-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center">
                {/* Unique icon: Upload arrow (SVG) */}
                <div className="w-10 h-10 mb-2 flex items-center justify-center">
                  <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                    <path d="M12 16V4M12 4L7 9M12 4L17 9" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="4" y="16" width="16" height="4" rx="2" fill="#2563eb" fillOpacity="0.15"/>
                  </svg>
                </div>
                {fields.fileUrl ? (
                  <div>
                    <p className="text-blue-700 font-semibold mb-1">{fields.fileUrl.name}</p>
                    <p className="text-blue-400 text-sm">Click or drag to replace</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-blue-700 font-semibold mb-1">Drop your file here or click to browse</p>
                    <p className="text-blue-400 text-sm">PDF or images only</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          {alert.text && (
            <div className={`p-4 rounded-lg border text-center ${
              alert.type === 'success'
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-blue-200 text-red-500'
            }`}>
              {alert.text}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                <span className="text-lg">Submit Assignment</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}