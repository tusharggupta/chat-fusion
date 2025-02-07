"use client";

import React, { useEffect, useState } from "react";
import "@uploadthing/react/styles.css";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export function FileUpload({
  onChange,
  value,
  endpoint
}: FileUploadProps) {
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    const fetchFileType = async () => {
      if (!value) return;
      try {
        const response = await fetch(value, { method: "HEAD" });
        const contentType = response.headers.get("Content-Type");
        setFileType(contentType);
      } catch (error) {
        console.error("Error fetching file type:", error);
      }
    };

    fetchFileType();
  }, [value]);

  const isImage = fileType?.startsWith("image");
  const isPDF = fileType === "application/pdf";

  if (value && isImage) {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" unoptimized />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && isPDF) {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
        >
          View PDF
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log("Uploaded File:", res);
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => console.error(error.message)}
    />
  );
}
