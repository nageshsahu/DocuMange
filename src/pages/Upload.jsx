import React, { useState, useRef, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import useToast from '../hooks/useToast';

function Upload() {
  const { documents, setDocuments } = useContext(AppContext);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: '',
    name: '',
    remarks: ''
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const fileInputRef = useRef(null);
  const { showToast } = useToast();

  const personalOptions = ['John Doe', 'Jane Smith', 'Bob Johnson'];
  const professionalOptions = ['HR Department', 'Finance Department', 'Marketing Department', 'IT Department'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Reset name when category changes
    if (name === 'category') {
      setFormData(prev => ({ ...prev, name: '' }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
  };

  const handleTagsInput = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tagValue = e.target.value.trim();
      
      if (tagValue && !selectedTags.includes(tagValue)) {
        setSelectedTags(prev => [...prev, tagValue]);
        e.target.value = '';
      }
    }
  };

  const removeTag = (tag) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedFiles.length === 0) {
      showToast('error', 'Error', 'Please select at least one file to upload');
      return;
    }

    // Create document objects for each file
    const newDocuments = selectedFiles.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type.includes('image') ? 'image' : 'pdf',
      category: formData.category,
      name: formData.name,
      tags: [...selectedTags],
      date: formData.date,
      remarks: formData.remarks,
      size: file.size
    }));

    // Add documents to state
    setDocuments(prev => [...prev, ...newDocuments]);
    
    // Show success message
    showToast('success', 'Upload Successful', `${selectedFiles.length} document(s) uploaded successfully`);
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      category: '',
      name: '',
      remarks: ''
    });
    setSelectedFiles([]);
    setSelectedTags([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getNameOptions = () => {
    if (formData.category === 'personal') {
      return personalOptions;
    } else if (formData.category === 'professional') {
      return professionalOptions;
    }
    return [];
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Upload Documents</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
              <input 
                type="date" 
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
              <select 
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              >
                <option value="">Select Category</option>
                <option value="personal">Personal</option>
                <option value="professional">Professional</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name/Department</label>
              <select 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
                disabled={!formData.category}
              >
                <option value="">Select Name/Department</option>
                {getNameOptions().map(option => (
                  <option key={option} value={option.toLowerCase().replace(' ', '.')}>{option}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags</label>
              <div className="relative">
                <input 
                  type="text" 
                  id="tags"
                  placeholder="Add tags..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  onKeyDown={handleTagsInput}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedTags.map(tag => (
                    <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300">
                      {tag}
                      <button 
                        type="button" 
                        className="ml-2 text-indigo-600 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-indigo-100"
                        onClick={() => removeTag(tag)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Remarks</label>
            <textarea 
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            ></textarea>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Upload Files</label>
            <div 
              id="fileDropArea"
              className="file-drop-area rounded-lg p-8 text-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 dark:text-gray-500 mb-3"></i>
              <p className="text-gray-600 dark:text-gray-400 mb-1">Drag and drop files here</p>
              <p className="text-gray-500 dark:text-gray-500 text-sm mb-3">or</p>
              <button type="button" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">Browse Files</button>
              <p className="text-gray-500 dark:text-gray-500 text-sm mt-3">Supported formats: Images, PDFs</p>
              <input 
                type="file" 
                ref={fileInputRef}
                className="hidden" 
                accept="image/*,.pdf" 
                multiple 
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="mt-3">
              {selectedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg mb-2">
                  <div className="flex items-center">
                    <i className={`fas fa-file-${file.type.includes('image') ? 'image text-green-500' : 'pdf text-red-500'} mr-2`}></i>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({(file.size / 1024).toFixed(2)} KB)</span>
                  </div>
                  <button 
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFile(index)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Upload Documents
          </button>
        </form>
      </div>
    </div>
  );
}

export default Upload;