import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, FileText } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface FileUploaderProps {
  onFileChange: (file: File | null) => void;
  accept?: string;
  maxSize?: number; // in MB
}

export function FileUploader({ 
  onFileChange, 
  accept = ".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png", 
  maxSize = 10 
}: FileUploaderProps) {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    
    if (!selectedFile) {
      setFile(null);
      onFileChange(null);
      return;
    }
    
    // Check file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB limit`);
      setFile(null);
      onFileChange(null);
      return;
    }
    
    setError(null);
    setFile(selectedFile);
    onFileChange(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError(null);
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
      />
      
      {!file ? (
        <div 
          className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          onClick={handleButtonClick}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4 flex text-sm leading-6 text-gray-600 dark:text-gray-400">
            <label
              htmlFor="file-upload"
              className="relative cursor-pointer rounded-md font-semibold text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary"
            >
              <span>{t('document.upload')}</span>
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {accept.split(',').join(', ')} (Max {maxSize}MB)
          </p>
        </div>
      ) : (
        <div className="flex items-center p-4 space-x-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <FileText className="h-8 w-8 text-primary" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {file.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRemoveFile}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}