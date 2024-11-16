"use client";
import React from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import decodeFile from "../../public/js/decodeFile.js";
import mergeChunksIntoOneFile from "../../public/js/mergeChunksIntoOneFile.js"
export default function FileView(props) {
  async function handleDownload() {
    console.log("Please download " + props.fileName);
    let encodedFiles = [];
    for(let i = 0; i < props.numberOfChunks; i++){
      await fetch("http://localhost:3000/getAttechmentUrlById", {
        method: "POST",
        body: JSON.stringify({
          fileName: props.fileName,
          chunkIndex: i
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log("chunk - " + (i + 1) + "downloaded");
        encodedFiles.push(data);
      })
    }
    let decodedFiles = [];
    for(let i = 0; i < encodedFiles.length; i++){
        const fileNameWithOutExtension = props.fileName
        .split(".")
        .slice(0, -1)
        .join(".");
        const extension = props.fileName.split(".").pop();
        decodedFiles.push(decodeFile(encodedFiles[i].encodedChunk, fileNameWithOutExtension + "-" + i + "." + extension, props.fileType));
    }
    const mergedFile = mergeChunksIntoOneFile(decodedFiles, props.fileName);
    const fileUrl = URL.createObjectURL(mergedFile);
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = mergedFile.name;
    a.click();
    URL.revokeObjectURL(fileUrl);
  }
  async function handleDelete() {
    console.log("Please delete " + props.fileName);
    for(let i = 0; i < props.numberOfChunks; i++){
      await fetch("http://localhost:3000/deleteFile", {
        method: "POST",
        body: JSON.stringify({
          fileName: props.fileName,
          chunkIndex: i
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((resp) => {
        if(!resp.ok){
          alert("Failed to delete the file");
        }
      })
    }
    alert(`${props.fileName} deleted!!`);
  }
  return (
    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm sm:text-base">
      <div className="flex w-0 flex-1 items-center">
        <PaperClipIcon
          aria-hidden="true"
          className="size-5 shrink-0 text-gray-400"
        />
        <div className="ml-4 flex min-w-0 flex-1 gap-2">
          <span className="truncate font-medium text-gray-300">
            {props.fileName}
          </span>
          <span className="shrink-0 text-gray-400">
            {(props.fileSize / 10e5).toFixed(2)} MB
          </span>
        </div>
      </div>
      <div className="ml-4 shrink-0">
        <a
          className="font-medium text-indigo-600 hover:text-indigo-500 mx-5 lg:mx-9"
          onClick={handleDownload}
        >
          Download
        </a>
        <a
          className="font-medium text-red-600 hover:text-red-500"
          onClick={handleDelete}
        >
          Delete
        </a>
      </div>
    </li>
  );
}
