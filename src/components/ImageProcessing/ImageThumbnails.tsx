import React from 'react';
import { Trash } from 'lucide-react';

interface ImageThumbnailsProps {
  images: { id: number; data: string; name: string }[];
  onThumbnailClick: (image: { id: number; data: string; name: string }) => void;
  onDeleteImage: (id: number) => void;
}

const ImageThumbnails: React.FC<ImageThumbnailsProps> = ({ 
  images, 
  onThumbnailClick, 
  onDeleteImage 
}) => {
  if (images.length === 0) {
    return (
      <div className="text-center py-6 text-purple-300">
        <p>没有保存的图片</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-1">
      {images.map((image) => (
        <div 
          key={image.id} 
          className="group relative rounded-md overflow-hidden border border-purple-700/30 bg-gray-800/30"
        >
          <img 
            src={image.data} 
            alt={image.name} 
            className="w-full h-24 object-cover cursor-pointer"
            onClick={() => onThumbnailClick(image)} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-1.5">
            <button
              onClick={() => onDeleteImage(image.id)}
              className="p-1.5 bg-red-600/80 hover:bg-red-600 rounded-full text-white transition-colors ml-auto"
              title="删除图片"
            >
              <Trash size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageThumbnails;