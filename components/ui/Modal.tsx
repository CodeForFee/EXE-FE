"use client";

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ModalProps {
    isOpen: boolean;
    onClose?: () => void;
    onOpenChange?: () => void;
    title?: string;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    className?: string; // Content classname
}

export default function Modal({
    isOpen,
    onClose,
    onOpenChange,
    title,
    children,
    size = 'md',
    className = ""
}: ModalProps) {
    const overlayRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const handleClose = React.useCallback(() => {
        if (onClose) onClose();
        if (onOpenChange) onOpenChange();
    }, [onClose, onOpenChange]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.body.style.overflow = 'unset';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, handleClose]);

    if (!isOpen || !mounted) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        '2xl': 'max-w-6xl',
        full: 'max-w-full m-4'
    };

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200">
            <div
                ref={overlayRef}
                onClick={(e) => e.target === overlayRef.current && handleClose()}
                className="absolute inset-0"
            />
            <div className={`relative bg-white rounded-xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 ${className}`}>
                {/* Header */}
                {(title || onClose || onOpenChange) && (
                    <div className="flex items-center justify-between px-6 py-4 border-b border-divider">
                        {title && <h3 className="text-xl font-heading font-bold text-green-950">{title}</h3>}
                        <button
                            onClick={handleClose}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors ml-auto"
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Body - children usually contains ModalBody etc, but we'll just render children */}
                <div className="flex-1 overflow-y-auto no-scrollbar">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}
