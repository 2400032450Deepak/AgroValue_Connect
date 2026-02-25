import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

// Use a reliable fallback image from Unsplash instead of via.placeholder.com
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1587049352851-8d4e8915a7c4?w=300&h=300&fit=crop';

const ImageWithFallback = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = FALLBACK_IMAGE,
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleError = () => {
    if (!error) {
      setError(true);
      setImgSrc(fallbackSrc);
    }
  };

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <div className="relative w-full h-full bg-gray-100">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <FaSpinner className="animate-spin text-primary-600 text-2xl" />
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt}
        className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

export default ImageWithFallback;