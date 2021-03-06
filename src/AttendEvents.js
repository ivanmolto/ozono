import { gql, useQuery } from "urql";
import { Link } from "react-router-dom";

const EVENT_QUERY = gql`
  query ($address: String, $limit: Int, $offset: Int) {
    addrs(where: { address: $address }) {
      address
      attendEvents(options: { limit: $limit, offset: $offset }) {
        id
        imageUrl
        name
      }
    }
  }
`;

const query = EVENT_QUERY;

const AttendEvents = ({ variables }) => {
  const [result] = useQuery({ query, variables });
  const { data, fetching, error } = result;

  if (fetching || data === undefined)
    return (
      <div className="shadow sm:hidden font-montserrat">
        <ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
          <p>Loading...</p>
        </ul>
      </div>
    );
  if (error) return <p>{error.message}</p>;
  return (
    <>
      <div className="shadow sm:hidden font-montserrat">
        <ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
          {data?.addrs.map((participant, ind) => (
            <div key={ind}>
              {participant.attendEvents.map((event, index) => (
                <li key={index}>
                  <Link
                    to={`/events/${event.id}`}
                    className="block px-4 py-4 bg-white hover:bg-gray-50 border-2 border-gray-50"
                  >
                    <div className="flex items-center space-x-4 ">
                      <div className="flex-1 flex items-center space-x-2 truncate ">
                        <img
                          className="h-20 w-20 rounded-full sm:hidden"
                          src={event.imageUrl}
                          alt={event.id}
                        />
                        <div className="flex flex-col text-gray-500 text-sm  truncate">
                          <div className="truncate">{event.name}</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </div>
          ))}
        </ul>
      </div>
      <div className="hidden sm:block font-montserrat">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col mt-2">
            <div className="align-middle min-w-full overflow-x-auto shadow-sm overflow-hidden sm:rounded-lg">
              <div className="min-w-full divide-y divide-gray-200">
                {data?.addrs.map((participant, ind) => (
                  <ul
                    key={ind}
                    className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
                  >
                    {participant.attendEvents.map((event, index) => (
                      <li key={index} className="relative">
                        <div className="group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                          <img
                            src={event.imageUrl}
                            alt={event.name}
                            className="object-cover pointer-events-none group-hover:opacity-75"
                          />
                          <Link
                            to={`/events/${event.id}`}
                            className="absolute inset-0 focus:outline-none"
                          >
                            <span className="sr-only">
                              View details for {event.name}
                            </span>
                          </Link>
                        </div>
                        <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
                          {event.name}
                        </p>
                        <p className="block text-sm font-medium text-gray-500 pointer-events-none truncate">
                          {event.id}
                        </p>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AttendEvents;
