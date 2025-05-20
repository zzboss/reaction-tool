import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Image as ImageIcon, Trash, RefreshCw } from 'lucide-react';
import ImagePreview from './ImagePreview';
import ImageThumbnails from './ImageThumbnails';
import { openDatabase, saveImage, getAllImages, deleteImage } from '../../utils/imageDb';

type ProcessingMode = 'grayscale' | 'blackwhite' | 'contour' | 'original';

const ImageProcessor: React.FC = () => {
  const [images, setImages] = useState<{ id: number; data: string; name: string }[]>([]);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [processingMode, setProcessingMode] = useState<ProcessingMode>('grayscale');
  const [threshold, setThreshold] = useState<number>(30);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDbInitialized, setIsDbInitialized] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize database and load saved images
  useEffect(() => {
    const initDb = async () => {
      await openDatabase();
      loadSavedImages();
      setIsDbInitialized(true);
    };
    
    initDb();
  }, []);

  const loadSavedImages = async () => {
    const savedImages = await getAllImages();
    setImages(savedImages);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImageName(file.name);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setCurrentImage(dataUrl);
      setProcessedImage(null); // Clear any previously processed image
    };
    
    reader.readAsDataURL(file);
  };

  const handleImageProcess = () => {
    if (!currentImage) return;
    
    setIsProcessing(true);
    
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw original image
      ctx.drawImage(img, 0, 0);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Process image based on selected mode
      switch(processingMode) {
        case 'grayscale':
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg;     // R
            data[i + 1] = avg; // G
            data[i + 2] = avg; // B
          }
          break;
          
        case 'blackwhite':
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            const val = avg < threshold ? 0 : 255;
            data[i] = val;     // R
            data[i + 1] = val; // G
            data[i + 2] = val; // B
          }
          break;
          
        case 'contour':
          // First convert to grayscale
          const grayscaleData = new Uint8ClampedArray(data.length);
          for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            grayscaleData[i] = grayscaleData[i + 1] = grayscaleData[i + 2] = avg;
            grayscaleData[i + 3] = 255;
          }
          
          // Apply simple edge detection
          for (let y = 1; y < canvas.height - 1; y++) {
            for (let x = 1; x < canvas.width - 1; x++) {
              const idx = (y * canvas.width + x) * 4;
              
              // Sobel operator (simplified)
              const idx_up = ((y - 1) * canvas.width + x) * 4;
              const idx_down = ((y + 1) * canvas.width + x) * 4;
              const idx_left = (y * canvas.width + (x - 1)) * 4;
              const idx_right = (y * canvas.width + (x + 1)) * 4;
              
              const gx = grayscaleData[idx_right] - grayscaleData[idx_left];
              const gy = grayscaleData[idx_down] - grayscaleData[idx_up];
              
              // Calculate gradient magnitude
              let mag = Math.sqrt(gx * gx + gy * gy);
              
              // Threshold
              mag = mag < threshold ? 0 : 255;
              
              data[idx] = data[idx + 1] = data[idx + 2] = 255 - mag; // Invert for better visibility
            }
          }
          break;
          
        case 'original':
        default:
          // No processing needed
          break;
      }
      
      // Put processed image data back
      ctx.putImageData(imageData, 0, 0);
      
      // Set the processed image data URL
      setProcessedImage(canvas.toDataURL('image/png'));
      setIsProcessing(false);
    };
    
    img.src = currentImage;
  };

  const handleSaveImage = async () => {
    if (!processedImage) return;
    
    await saveImage(processedImage, `${processingMode}_${imageName}`);
    loadSavedImages();
  };

  const handleDeleteImage = async (id: number) => {
    await deleteImage(id);
    loadSavedImages();
  };

  const handleThumbnailClick = (image: { id: number; data: string; name: string }) => {
    setCurrentImage(image.data);
    setImageName(image.name);
    setProcessedImage(null);
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <div className="bg-gradient-to-b from-gray-900/70 to-purple-900/40 rounded-xl border border-purple-700/30 shadow-xl backdrop-blur-sm overflow-hidden">
        <div className="p-5 border-b border-purple-700/30">
          <h2 className="text-2xl font-bold text-white">图片处理工具</h2>
          <p className="text-purple-200 mt-1">上传图片并应用各种滤镜效果</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Controls */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900/50 rounded-lg border border-purple-700/20 p-4 shadow-inner mb-4">
                <div className="flex flex-col gap-4">
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-all shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50"
                    >
                      <Upload size={18} />
                      选择图片
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-purple-200">转换模式</label>
                    <select
                      value={processingMode}
                      onChange={(e) => setProcessingMode(e.target.value as ProcessingMode)}
                      className="w-full bg-gray-800 border border-purple-700/30 text-white rounded-lg p-2.5 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="grayscale">灰色图</option>
                      <option value="blackwhite">黑白图</option>
                      <option value="contour">轮廓图</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-purple-200">
                      处理阈值: {threshold}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="0"
                        max="255"
                        value={threshold}
                        onChange={(e) => setThreshold(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                      />
                      <input 
                        type="number" 
                        value={threshold} 
                        onChange={(e) => setThreshold(parseInt(e.target.value))}
                        min="0"
                        max="255"
                        className="w-16 bg-gray-800 border border-purple-700/30 text-white rounded-lg p-1 text-center text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={handleImageProcess}
                      disabled={!currentImage || isProcessing}
                      className={`flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-all shadow-lg shadow-purple-900/30 hover:shadow-purple-900/50 ${
                        (!currentImage || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isProcessing ? <RefreshCw className="animate-spin" size={18} /> : <ImageIcon size={18} />}
                      开始转换
                    </button>
                    
                    <button
                      onClick={handleSaveImage}
                      disabled={!processedImage}
                      className={`flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-all shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50 ${
                        !processedImage ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <Download size={18} />
                      保存
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Saved Images */}
              <div className="bg-gray-900/50 rounded-lg border border-purple-700/20 p-4 shadow-inner">
                <h3 className="text-lg font-medium text-white mb-3">历史图片</h3>
                <ImageThumbnails 
                  images={images} 
                  onThumbnailClick={handleThumbnailClick} 
                  onDeleteImage={handleDeleteImage} 
                />
              </div>
            </div>
            
            {/* Right Panel - Image Preview */}
            <div className="lg:col-span-2">
              <ImagePreview 
                originalImage={currentImage} 
                processedImage={processedImage} 
                processingMode={processingMode} 
              />
              
              {/* Hidden canvas for processing */}
              <canvas ref={canvasRef} className="hidden"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageProcessor;