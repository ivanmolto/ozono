import { useParams } from "react-router-dom";
import { gql, useQuery } from "urql";
import EventsPagination from "./EventsPagination";

const Event = () => {
  let params = useParams();

  const eventId = params.eventId;
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
      <div className="min-h-full font-montserrat">
        <main className="flex-1 pb-8">
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <h2 className="font-bold text-xl">
              POAP - Proof of Attendance Protocol
            </h2>
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200"></div>
            Loading...
          </div>
        </main>
      </div>
    );
  if (error) return <p>{error.message}</p>;

  return (
    <div className="min-h-full font-montserrat">
      <main className="flex-1 pb-8">
        <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <h2 className="font-bold text-xl">
            POAP - Proof of Attendance Protocol
          </h2>
        </div>
        {data?.events.map((event, ind) => (
          <EventsPagination
            key={ind}
            eventId={eventId}
            count={event.addrsAttendAggregate.count}
          />
        ))}
      </main>
    </div>
  );
};
export default Event;
