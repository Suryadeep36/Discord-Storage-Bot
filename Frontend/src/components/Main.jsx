import { PaperClipIcon } from "@heroicons/react/20/solid";

export default function Main() {
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
          />
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm sm:text-base px-5 py-2.5 sm:ml-2 mt-2 sm:mt-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            name="upload"
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
              <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm sm:text-base">
                <div className="flex w-0 flex-1 items-center">
                  <PaperClipIcon
                    aria-hidden="true"
                    className="size-5 shrink-0 text-gray-400"
                  />
                  <div className="ml-4 flex min-w-0 flex-1 gap-2">
                    <span className="truncate font-medium text-gray-300">
                      resume_back_end_developer.pdf
                    </span>
                    <span className="shrink-0 text-gray-400">2.4mb</span>
                  </div>
                </div>
                <div className="ml-4 shrink-0">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500 mx-5 lg:mx-9"
                  >
                    Download
                  </a>
                  <a
                    href="#"
                    className="font-medium text-red-600 hover:text-red-500"
                  >
                    Delete
                  </a>
                </div>
              </li>
              
            </ul>
          </dd>
        </div>
      </div>
    </>
  );
}
