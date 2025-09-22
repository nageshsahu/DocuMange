import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

function PreviewModal() {
  const { currentPreviewFile, setCurrentPreviewFile } = useContext(AppContext);

  if (!currentPreviewFile) return null;

  const closeModal = () => {
    setCurrentPreviewFile(null);
  };

  const downloadFile = () => {
    // In a real application, this would trigger a file download
    window.dispatchEvent(new CustomEvent('showToast', {
      detail: {
        type: 'info',
        title: 'Download Started',
        message: `Downloading ${currentPreviewFile.name}...`
      }
    }));

    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('showToast', {
        detail: {
          type: 'success',
          title: 'Download Complete',
          message: `${currentPreviewFile.name} has been downloaded successfully`
        }
      }));
    }, 1500);
  };

  const isImage = currentPreviewFile.type === 'image';
  const isPdf = currentPreviewFile.type === 'pdf';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeModal}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Document Preview</h3>
          <button onClick={closeModal} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-4 flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center">
            {isImage ? (
              <div className="text-center">
                <p className="text-gray-700 dark:text-gray-300 text-xl mb-4">{currentPreviewFile.name}</p>
                <img 
                  src={`https://picsum.photos/seed/${currentPreviewFile.name.replace(/\s+/g, '')}/800/600.jpg`} 
                  alt={currentPreviewFile.name} 
                  className="max-w-full max-h-full"
                />
              </div>
            ) : isPdf ? (
              <div className="text-center">
                <i className="fas fa-file-pdf text-red-500 text-6xl mb-4"></i>
                <p className="text-gray-700 dark:text-gray-300 text-xl">{currentPreviewFile.name}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">PDF viewer would be embedded here</p>
              </div>
            ) : (
              <div className="text-center">
                <i className="fas fa-file text-gray-500 text-6xl mb-4"></i>
                <p className="text-gray-700 dark:text-gray-300 text-xl">{currentPreviewFile.name}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">File preview not available</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
          <button 
            onClick={downloadFile}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <i className="fas fa-download mr-2"></i>Download
          </button>
          <button 
            onClick={closeModal}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreviewModal;