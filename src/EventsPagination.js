import { useState } from "react";
import Poaps from "./Poaps";
import AddressAttend from "./AddressAttend";

const EventsPagination = ({ count, eventId }) => {
  let offset = 0;
  const limit = 20;

  const pagination = Math.floor(count / limit);

  const [pageVariables, setPageVariables] = useState([
    { id: eventId, limit, offset },
  ]);

  const isLastPage = pagination === pageVariables.length - 1;

  return (
    <>
      <Poaps eventId={eventId} />
      <div className="mt-8">
        <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
          Attendees
        </h2>
        {pageVariables.map((variables, i) => (
          <AddressAttend key={i} variables={variables} />
        ))}
        {!isLastPage && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col mt-2">
              <div className="align-middle min-w-full overflow-x-auto overflow-hidden sm:rounded-lg">
                <div
                  className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                  aria-label="Pagination"
                >
                  <div className="flex-1 flex justify-between sm:justify-end">
                    <button
                      type="button"
                      className="ml-3 relative inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md text-white bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400"
                      onClick={() =>
                        setPageVariables([
                          ...pageVariables,
                          {
                            offset: pageVariables.length * limit,
                            limit,
                            id: eventId,
                          },
                        ])
                      }
                    >
                      Load more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default EventsPagination;
