import { gql, useQuery } from "urql";
import EventsPagination from "./EventsPagination";
import { SearchIcon } from "@heroicons/react/outline";

const Events = () => {
  const eventId = "43064";
  const variables = { id: eventId };

  const PAGINATION_QUERY = gql`
    query ($id: String) {
      events(where: { id: $id }) {
        id
        addrsAttendAggregate {
          count
        }
      }
    }
  `;

  const query = PAGINATION_QUERY;
  const [result] = useQuery({ query, variables });
  const { data, fetching, error } = result;

  if (fetching)
    return (
      <div className="min-h-full">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
          <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="items-center flex-1 flex">
              <form className="w-full flex md:ml-0" action="#" method="GET">
                <label htmlFor="address" className="sr-only">
                  Address
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <input
                    id="event"
                    name="event"
                    className="block w-1/2 px-4 pl-8 pr-3 py-2 shadow-sm text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500 sm:text-sm border-sky-300 rounded-md"
                    placeholder="Event Id"
                    type="text"
                  />
                </div>
              </form>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md text-white bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400"
              >
                <SearchIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
                Show event data
              </button>
            </div>
          </div>
        </div>
        <main className="flex-1 pb-8">
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200"></div>
          </div>
        </main>
      </div>
    );
  if (error) return <p>{error.message}</p>;

  return (
    <div className="min-h-full">
      <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
        <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <div className="items-center flex-1 flex">
            <form className="w-full flex md:ml-0" action="#" method="GET">
              <label htmlFor="address" className="sr-only">
                Address
              </label>
              <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                <input
                  id="event"
                  name="event"
                  className="block w-1/2 px-4 pl-8 pr-3 py-2 shadow-sm text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500 sm:text-sm border-sky-300 rounded-md"
                  placeholder="Event Id"
                  type="text"
                />
              </div>
            </form>
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md text-white bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400"
            >
              <SearchIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
              Show event data
            </button>
          </div>
        </div>
      </div>
      <main className="flex-1 pb-8">
        {data?.events.map((event, ind) => (
          <EventsPagination
            key={ind}
            count={event.addrsAttendAggregate.count}
          />
        ))}
      </main>
    </div>
  );
};
export default Events;
