import React, { useState, useRef } from "react";

const DragDropUpload: React.FC<{
  onFileSelect: (file: File | null) => void;
}> = ({ onFileSelect }) => {
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    onFileSelect(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
      setTimeout(() => {
        fileInputRef.current?.click();
      }, 10);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    } else {
      onFileSelect(null); 
      setPreview(null);
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragOver(false);
        }}
        onDrop={handleDrop}
        className={`justify-center items-center flex bg-gray-50 cursor-pointer border-2 border-dashed rounded-lg p-8 text-center text-gray-400 ${
          dragOver ? "border-blue-400 bg-blue-50" : "border-gray-300"
        }`}
        style={{ minHeight: "120px" }}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="mx-auto h-24 object-contain rounded"
          />
        ) : (
          <p>Drag and drop a file here or click to select</p>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
};

export default DragDropUpload;
