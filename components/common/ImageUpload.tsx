"use client";

import { useEffect, useState } from "react";
import { Button, Spinner } from "@heroui/react";
import { CameraIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "react-toastify";

interface ImageUploadProps {

    value?: string;
    onChange: (value: string) => void;
    label?: string;
    className?: string;
    onFileSelect?: (file: File | null) => void; // Optional for manual upload handling
}

export default function ImageUpload({
    value = "",
    onChange,
    label = "Upload Image",
    className,
    onFileSelect
}: ImageUploadProps) {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string>("");

    useEffect(() => {
        setPreview(value || "");
    }, [value]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Create local preview
        const localPreview = URL.createObjectURL(file);
        setPreview(localPreview);

        // If onFileSelect is present, we are in "manual" mode - defer upload to parent
        if (onFileSelect) {
            onFileSelect(file);
            // We still define the "value" as the blob url temporarily for the UI if needed, 
            // but usually we don't call onChange(url) here to avoid confusion with real URLs.
            // But to keep form state happy/dirty, we might. 
            // Let's rely on onFileSelect for the logic and preview for display.
            return;
        }

        // AUTO UPLOAD MODE (Default)
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "exe-202"
        );

        try {
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dfmg8qv7g";
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formData
            );

            const imageUrl = res.data.secure_url;
            onChange(imageUrl);
            setPreview(imageUrl);
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload image");
            setPreview(value || "");
        } finally {
            setLoading(false);
            e.target.value = "";
        }
    };

    const handleRemove = () => {
        setPreview("");
        if (onFileSelect) {
            onFileSelect(null);
        }
        onChange("");
    };

    return (
        <div className={`space-y-2 ${className ?? ""}`}>
            {label && (
                <label className="text-sm font-semibold text-foreground-600 block mb-2">
                    {label}
                </label>
            )}

            <div className="flex items-center gap-4">
                {preview ? (
                    <div className="relative group w-32 h-32 rounded-xl overflow-hidden border border-divider shadow-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={preview}
                            alt="Uploaded"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                                isIconOnly
                                color="danger"
                                variant="flat"
                                size="sm"
                                onPress={handleRemove}
                                className="bg-white/90 hover:bg-white text-danger"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-divider rounded-xl cursor-pointer hover:border-success-500 hover:bg-success-50 transition-colors group">
                        {loading ? (
                            <Spinner size="sm" color="success" />
                        ) : (
                            <>
                                <CameraIcon className="w-8 h-8 text-default-300 group-hover:text-success-500 transition-colors" />
                                <span className="text-xs text-default-400 mt-2 font-medium group-hover:text-success-600">
                                    Click to upload
                                </span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleUpload}
                                />
                            </>
                        )}
                    </label>
                )}
            </div>
        </div>
    );
}
