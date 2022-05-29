import { gql, useQuery } from "urql";
import EventsPagination from "./EventsPagination";

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

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      {data?.events.map((event, ind) => (
        <EventsPagination key={ind} count={event.addrsAttendAggregate.count} />
      ))}
    </>
  );
};
export default Events;
