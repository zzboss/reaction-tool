import React from 'react';

interface ImagePreviewProps {
  originalImage: string | null;
  processedImage: string | null;
  processingMode: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  originalImage, 
  processedImage,
  processingMode
}) => {
  if (!originalImage) {
    return (
      <div className="h-96 bg-gray-900/50 rounded-lg border border-purple-700/20 flex items-center justify-center p-6 shadow-inner">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-900/30 border border-purple-700/30 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-1">没有选择图片</h3>
          <p className="text-purple-300 max-w-xs mx-auto">请选择一张图片开始处理，或者从历史记录中选择一张</p>
        </div>
      </div>
    );
  }

  const renderProcessingLabel = () => {
    const labels = {
      'grayscale': '灰色图',
      'blackwhite': '黑白图',
      'contour': '轮廓图',
      'original': '原图'
    };
    
    return labels[processingMode as keyof typeof labels] || processingMode;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <div className="bg-gray-900/50 rounded-lg border border-purple-700/20 overflow-hidden shadow-inner">
        <div className="p-3 bg-gray-800/70 border-b border-purple-700/30">
          <h3 className="text-sm font-medium text-purple-200">原图</h3>
        </div>
        <div className="p-4 flex items-center justify-center">
          <img 
            src={originalImage} 
            alt="Original" 
            className="max-w-full max-h-72 object-contain rounded border border-gray-700/50" 
          />
        </div>
      </div>
      
      <div className="bg-gray-900/50 rounded-lg border border-purple-700/20 overflow-hidden shadow-inner">
        <div className="p-3 bg-gray-800/70 border-b border-purple-700/30">
          <h3 className="text-sm font-medium text-purple-200">{renderProcessingLabel()}</h3>
        </div>
        <div className="p-4 flex items-center justify-center">
          {processedImage ? (
            <img 
              src={processedImage} 
              alt="Processed" 
              className="max-w-full max-h-72 object-contain rounded border border-gray-700/50" 
            />
          ) : (
            <div className="text-center text-purple-300">
              <p>点击"开始转换"按钮处理图片</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;