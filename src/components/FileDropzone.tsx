import { useRef } from "react";

export function FileDropzone({
  onFiles,
}: {
  onFiles: (files: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onFiles(Array.from(e.dataTransfer.files));
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="w-full h-40 border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-50 transition"
    >
      <p className="text-sm">Drag & drop CSV here or click to upload</p>
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        multiple={false}
        hidden
        onChange={(e) => {
          if (e.target.files) {
            onFiles(Array.from(e.target.files));
          }
        }}
      />
    </div>
  );
}
