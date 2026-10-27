"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, CheckCircle2, X } from "lucide-react";

/**
 * Interface defining properties for the Dropzone file upload component.
 */
export interface DropzoneProps {
  /** Callback fired when a file is loaded or extracted. */
  onFileLoaded: (filename: string, content?: string) => void;
  /** Active file name currently attached, or null if empty. */
  activeFile: string | null;
  /** Callback fired when the active file is removed. */
  onClearFile: () => void;
}

/**
 * Dropzone Component
 *
 * Provides a drag-and-drop document upload target supporting text, markdown,
 * CSV, and simulated PDF/DOCX audit policy ingestion.
 *
 * @param props - Component configuration properties adhering to {@link DropzoneProps}.
 * @returns The rendered Dropzone upload interface.
 */
export function Dropzone({
  onFileLoaded,
  activeFile,
  onClearFile,
}: DropzoneProps): React.JSX.Element {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const processFile = (file: File): void => {
    const filename = file.name;
    const isTextReadable =
      filename.endsWith(".txt") ||
      filename.endsWith(".md") ||
      filename.endsWith(".csv") ||
      filename.endsWith(".json");

    if (isTextReadable) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>): void => {
        const text = (event.target?.result as string) || "";
        onFileLoaded(filename, text);
      };
      reader.readAsText(file);
    } else {
      // PDF or DOCX binary mock preview
      onFileLoaded(
        filename,
        `[Extracted Audit Document: ${filename}]\nEvaluated operational metrics from ${filename} (${(
          file.size / 1024
        ).toFixed(1)} KB). Includes shift scheduling logs, occupational health incidents, and contractor wage distribution sheets.`
      );
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.txt,.csv,.md,.json"
        onChange={handleFileInputChange}
        className="hidden"
        id="audit-file-upload"
      />

      {activeFile ? (
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-200">
          <div className="flex items-center gap-2.5 truncate">
            <CheckCircle2 className="w-4 h-4 text-orange-400 flex-shrink-0" />
            <div className="truncate text-xs font-medium">
              <span className="text-orange-400 font-semibold">Attached File: </span>
              <span className="font-mono text-zinc-200">{activeFile}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClearFile}
            className="p-1 rounded-md hover:bg-orange-500/20 text-orange-300 hover:text-white transition-colors"
            title="Remove file"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`cursor-pointer group flex flex-col items-center justify-center p-5 rounded-xl border border-dashed transition-all duration-200 ${
            isDragOver
              ? "border-orange-500 bg-orange-500/10 shadow-[0_0_20px_-3px_rgba(249,115,22,0.25)]"
              : "border-zinc-800 bg-zinc-950/40 hover:border-zinc-700 hover:bg-zinc-900/60"
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-orange-400 group-hover:border-orange-500/40 transition-colors">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <p className="text-xs font-semibold text-zinc-300 group-hover:text-zinc-100 transition-colors">
                Drop policy file or click to browse
              </p>
              <p className="text-[11px] text-zinc-400">
                Supports PDF, DOCX, TXT, CSV, Markdown (Max 25MB)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropzone;
