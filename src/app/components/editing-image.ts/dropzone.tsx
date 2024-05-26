'use client';
import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '7px',
  borderWidth: 2,
  borderRadius: 10,
  borderColor: '#4381A7',
  backgroundColor: '#4381A7',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer',
  maxHeight: '100px',
  with: '100%',
};

const focusedStyle = {
  borderColor: '#000',
  // borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

export function UploadImageSVG(props: any) {
  return (
    <svg
      width={48}
      height={48}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 21.5c-3.04 0-5.5-2.46-5.5-5.5s2.46-5.5 5.5-5.5 5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5zm0-8a2.5 2.5 0 000 5 2.5 2.5 0 000-5z"
        fill="#fff"
      />
      <path
        d="M30 45.5H18C7.14 45.5 2.5 40.86 2.5 30V18C2.5 7.14 7.14 2.5 18 2.5h8c.82 0 1.5.68 1.5 1.5s-.68 1.5-1.5 1.5h-8C8.78 5.5 5.5 8.78 5.5 18v12c0 9.22 3.28 12.5 12.5 12.5h12c9.22 0 12.5-3.28 12.5-12.5V20c0-.82.68-1.5 1.5-1.5s1.5.68 1.5 1.5v10c0 10.86-4.64 15.5-15.5 15.5z"
        fill="#fff"
      />
      <path
        d="M36 17.5c-.82 0-1.5-.68-1.5-1.5V4c0-.6.36-1.16.92-1.38.56-.22 1.2-.1 1.64.32l4 4c.58.58.58 1.54 0 2.12-.58.58-1.54.58-2.12 0L37.5 7.62V16c0 .82-.68 1.5-1.5 1.5z"
        fill="#fff"
      />
      <path
        d="M32 9.5c-.38 0-.76-.14-1.06-.44-.58-.58-.58-1.54 0-2.12l4-4c.58-.58 1.54-.58 2.12 0 .58.58.58 1.54 0 2.12l-4 4c-.3.3-.68.44-1.06.44zM5.34 39.4c-.48 0-.96-.24-1.24-.66-.46-.68-.28-1.62.4-2.08l9.86-6.62c2.16-1.44 5.14-1.28 7.1.38l.66.58c1 .86 2.7.86 3.68 0l8.32-7.14c2.12-1.82 5.46-1.82 7.6 0l3.26 2.8c.62.54.7 1.48.16 2.12-.54.62-1.5.7-2.12.16l-3.26-2.8c-1-.86-2.68-.86-3.68 0l-8.32 7.14c-2.12 1.82-5.46 1.82-7.6 0l-.66-.58c-.92-.78-2.44-.86-3.46-.16L6.2 39.16c-.28.16-.58.24-.86.24z"
        fill="#fff"
      />
    </svg>
  );
}

interface DropZoneUploadProps {
  handleImageUpload: (files: File[]) => void;
  // handleDocumentUpload: (files: File[]) => void;
  // typeUpload: PostContentType;
}

export function DropZoneUpload({
  handleImageUpload,
  // handleDocumentUpload,
  // typeUpload,
}: DropZoneUploadProps) {
  const typeImages = {
    'image/*': [],
  };

  // accept = '.doc,.docx,.pdf,.xls,.xlsx';

  const typeDocuments = {
    'application/pdf': ['.pdf'],
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
      '.docx',
    ],
    'application/msword': ['.doc'],
    'application/vnd.ms-excel': ['.xls'],
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
      '.xlsx',
    ],
    // 'text/plain': ['.txt'],
    'application/vnd.ms-powerpoint': ['.ppt'],
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      ['.pptx'],
  };

  let typeUploadActual;
  // switch (typeUpload) {
  //   case `${PostContentType.IMAGE}`:
  //     typeUploadActual = typeImages;
  //     break;
  //   case `${PostContentType.DOCUMENT}`:
  //     typeUploadActual = typeDocuments;
  //     break;
  //   default:
  //     typeUploadActual = typeImages;
  // }
  // switch (typeUpload) {
  //   case `${PostContentType.IMAGE}`:
  //     typeUploadActual = typeImages;
  //     return typeImages;
  //   case `${PostContentType.DOCUMENT}`:
  //     return typeDocuments;
  //   default:
  //     return typeImages;
  // }

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    accept: typeUploadActual,
    onDropAccepted(files) {
      // if (typeUpload === PostContentType.DOCUMENT) handleDocumentUpload(files);
      // if (typeUpload === PostContentType.IMAGE) handleImageUpload(files);
      handleImageUpload(files);
    },
  });

  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className="w-full">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div className="flex items-center justify-center gap-4 p-5">
          <UploadImageSVG />
          <p className="text-white">
            Click ou arraste aqui{' '}
            {/* {typeUpload === PostContentType.DOCUMENT
              ? 'os arquivos'
              : 'as imagens'} */}
          </p>
        </div>
      </div>
    </div>
  );
}
