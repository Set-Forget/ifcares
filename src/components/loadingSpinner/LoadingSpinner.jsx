import React from 'react';

const LoadingSpinner = () => {
  return (
    <div class="flex justify-center items-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-900"></div>
    </div>
  );
};

export default LoadingSpinner;
