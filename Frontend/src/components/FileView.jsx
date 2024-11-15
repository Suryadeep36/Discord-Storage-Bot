"use client"
import React from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
export default function FileView(props) {
    function handleDownload(){
        console.log("Please download " + props.fileName);
    }
    function handleDelete(){
        console.log("Please delete " + props.fileName);
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
          <span className="shrink-0 text-gray-400">{(props.fileSize / 10e5).toFixed(2)} MB</span>
        </div>
      </div>
      <div className="ml-4 shrink-0">
        <a
          className="font-medium text-indigo-600 hover:text-indigo-500 mx-5 lg:mx-9"
          onClick={handleDownload}
        >
          Download
        </a>
        <a className="font-medium text-red-600 hover:text-red-500" onClick={handleDelete}>
          Delete
        </a>
      </div>
    </li>
  );
}
