import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'light' | 'flat';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    startContent?: React.ReactNode;
    radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
    color?: string;
    onPress?: () => void;
}

export default function Button({
    children,
    className = "",
    variant = 'primary',
    size = 'md',
    isLoading = false,
    startContent,
    disabled,
    radius = 'md',
    color,
    onPress,
    onClick,
    ...props
}: ButtonProps) {

    let effectiveVariant = variant;
    if (color === 'danger') effectiveVariant = 'danger';
    if (color === 'success') effectiveVariant = 'primary';
    if (variant === 'light' || variant === 'flat') effectiveVariant = 'ghost';

    const baseStyles = "inline-flex items-center justify-center font-heading font-bold transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

    const variants: Record<string, string> = {
        primary: "bg-green-900 text-cream shadow-soft hover:bg-green-800",
        secondary: "bg-wood-medium text-white shadow-soft hover:bg-wood-dark",
        outline: "border-2 border-green-900 text-green-900 hover:bg-green-50",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100",
        danger: "bg-red-500 text-white hover:bg-red-600",
        light: "bg-transparent text-gray-600 hover:bg-gray-100"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-6 py-2.5 text-sm",
        lg: "px-8 py-3 text-base"
    };

    const radii = {
        none: "rounded-none",
        sm: "rounded",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full"
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onClick) onClick(e);
        if (onPress) onPress();
    };

    return (
        <button
            className={`${baseStyles} ${variants[effectiveVariant] || variants.primary} ${sizes[size]} ${radii[radius]} ${className}`}
            disabled={disabled || isLoading}
            onClick={handleClick}
            {...props}
        >
            {isLoading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {!isLoading && startContent && <span className="mr-2 flex items-center">{startContent}</span>}
            {children}
        </button>
    );
}
