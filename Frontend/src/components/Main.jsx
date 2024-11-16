"use client";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import createChunks from "../../public/js/createChunks.js";
import createFileFromBlob from "../../public/js/createFileFromBlob.js";
import encodeFile from "../../public/js/encodeFile.js";
import FileView from "./FileView.jsx";

export default function Main() {
  const [file, setFile] = useState("");
  const [allFiles, setAllFiles] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/getAllFiles")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAllFiles(data.data);
      });
  },[]);
  async function handleClick() {
    console.log(file);
    const fileName = file.name;
    const eachChunkSizeInMb = 2;
    const chunkedBlobs = createChunks(file, eachChunkSizeInMb);
    console.log(chunkedBlobs);
    const chunkedFiles = createFileFromBlob(chunkedBlobs, fileName);
    console.log(chunkedFiles);
    let i = 0;
    for (i = 0; i < chunkedFiles.length; i++) {
      const encodedFile = await encodeFile(chunkedFiles[i]);
      console.log(i);
      const payload = {
        fileName: file.name,
        fileType: file.type,
        lastModifiedDate: file.lastModifiedDate,
        fileSize: file.size,
        data: encodedFile,
      };
      try {
        const resp = await fetch("http://localhost:3000/uploadFile", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!resp.ok) {
          throw new Error(`Failed to upload chunk ${i + 1}`);
        }
        console.log(`Chunk ${i + 1} uploaded successfully`);
      } catch (error) {
        console.error(`Error uploading chunk ${i + 1}:`, error);
      }
    }
    if (i == chunkedFiles.length) {
      const res = await fetch("http://localhost:3000/processFile");
      res.json().then((data) => {
        alert(data.msg);
      });
    } else {
      alert("some error occured while uploading the file try again");
    }
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-white my-10 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-center">
          Start storing your files by uploading them below.
        </h1>

        <div className="flex flex-col sm:flex-row justify-between w-full max-w-4xl">
          <input
            className="relative mx-5 block w-full sm:w-3/4 cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-2 text-base font-normal text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3 file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white file:dark:text-white"
            type="file"
            id="file"
            name="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm sm:text-base px-5 py-2.5 sm:ml-2 mt-2 sm:mt-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            name="upload"
            onClick={handleClick}
          >
            Upload the file
          </button>
        </div>

        <div className="px-4 py-6 my-80 min-w-full sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-lg sm:text-base text-center font-medium text-gray-300">
            Currently Stored Files On The Discord
          </dt>
          <dd className="mt-2 text-sm sm:text-base text-gray-300 sm:col-span-2 sm:mt-0">
            <ul
              role="list"
              className="divide-y divide-gray-100 rounded-md border border-gray-200"
            >
              {allFiles.map((ele, i) => {
                return <FileView fileName={ele.fileName} fileSize={ele.fileSize} key={i} numberOfChunks={ele.groupMessageId.length} fileType={ele.fileType} />
              })}
            </ul>
          </dd>
        </div>
      </div>
    </>
  );
}
