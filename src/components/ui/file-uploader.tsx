import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, FileText, Plus } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface FileUploaderProps {
  onFileChange: (files: File[]) => void;
  accept?: string;
  maxSize?: number; // in MB
  multiple?: boolean;
}

export function FileUploader({ 
  onFileChange, 
  accept = ".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png", 
  maxSize = 10,
  multiple = true
}: FileUploaderProps) {
  const { t } = useLanguage();
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    
    if (!selectedFiles || selectedFiles.length === 0) {
      return;
    }
    
    const newFiles: File[] = [];
    let hasError = false;
    
    // Check each file
    Array.from(selectedFiles).forEach(file => {
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(t('error.fileSize') + `: ${file.name} (${maxSize}MB)`);
        hasError = true;
        return;
      }
      
      newFiles.push(file);
    });
    
    if (hasError) {
      return;
    }
    
    setError(null);
    const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
    setFiles(updatedFiles);
    onFileChange(updatedFiles);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    onFileChange(updatedFiles);
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
        multiple={multiple}
        className="hidden"
      />
      
      {files.length === 0 ? (
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
            {accept.split(',').join(', ')} (Max {maxSize}MB per file)
          </p>
          {multiple && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{t('document.multipleFiles')}</p>}
        </div>
      ) : (
        <div className="space-y-3">
          {files.map((file, index) => (
            <div key={index} className="flex items-center p-3 space-x-4 bg-gray-50 dark:bg-gray-900 rounded-lg border">
              <FileText className="h-8 w-8 text-primary shrink-0" />
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
                onClick={() => handleRemoveFile(index)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          {multiple && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleButtonClick}
              className="mt-2 w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('document.addMore')}
            </Button>
          )}
        </div>
      )}
      
      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}