import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ children, variant = "primary", size = "md", isLoading = false, className = "", ...props }) => {
    const baseClasses = "inline-flex items-center justify-center font-bold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500",
        secondary: "bg-gray-100 dark:bg-dark-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-dark-700",
        outline: "border-2 border-gray-200 dark:border-dark-700 text-gray-700 dark:text-gray-300 hover:border-orange-500 hover:text-orange-500",
        ghost: "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-800",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm rounded-lg",
        md: "px-6 py-3 text-base rounded-xl",
        lg: "px-8 py-4 text-lg rounded-2xl",
    };

    return (
        <button
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {children}
        </button>
    );
};

export default Button;
