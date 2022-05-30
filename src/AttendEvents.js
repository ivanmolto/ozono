import { gql, useQuery } from "urql";

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

  if (fetching || data === undefined) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      {data?.addrs.map((participant, ind) => (
        <div key={ind}>
          {participant.attendEvents.map((event, index) => (
            <div key={index}>
              <div>{event.id}</div>
              <img src={event.imageUrl} alt={event.name} />
              <div>{event.name}</div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
export default AttendEvents;
