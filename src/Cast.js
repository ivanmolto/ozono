const Cast = ({ timestamp, body, explorer, name, title }) => {
  return (
    <li
      key={timestamp}
      className="col-span-1 border border-1 divide-y divide-gray-200 rounded-lg bg-white shadow-md"
    >
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="truncate text-sm font-medium text-gray-900">
              {title}
            </h3>
            <span className="inline-block flex-shrink-0 rounded-full px-2 py-0.5 text-xs">
              {timestamp.substring(0, 10)}
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-gray-500">{body}</p>
        </div>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-gray-200">
          <div className="flex w-0 flex-1">
            <div className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
              <a
                href={explorer}
                rel="noreferrer"
                target="_blank"
                className="relative inline-flex w-0 flex-1 items-center justify-center rounded-br-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                <img
                  className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-300"
                  src="https://ivanmolto.mypinata.cloud/ipfs/QmPkiym4cztxKsKLfztu3GuqkaPu5Uj4PwN9gUKFYL2e1j"
                  alt="snapshot"
                />
              </a>
            </div>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            <div className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700 hover:text-gray-500">
              <img
                className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-300"
                src="https://ivanmolto.mypinata.cloud/ipfs/QmbPZyLCoZxWot2gLqqnGiGtKKuPVL5L2TWuwG5D9kt2sU"
                alt="ethereum"
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Cast;
