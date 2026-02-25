import React from 'react';

const Skeleton = ({ className }) => {
    return (
        <div
            className={`animate-pulse bg-gray-200 dark:bg-dark-800 rounded-lg ${className}`}
        />
    );
};

export default Skeleton;
