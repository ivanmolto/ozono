import { gql, useQuery } from "urql";

const Poaps = ({ eventId }) => {
  const variables = { id: eventId };
  const ATTEND_QUERY = gql`
    query ($id: String) {
      events(where: { id: $id }) {
        id
        imageUrl
        name
        addrsAttendAggregate {
          count
        }
      }
    }
  `;
  const query = ATTEND_QUERY;

  const [result] = useQuery({ query, variables });
  const { data, fetching, error } = result;

  if (fetching || data === undefined) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      {data?.events.map((poap) => (
        <div key={poap.id}>
          <img src={poap.imageUrl} alt={poap.name} />
          <div>{poap.id}</div>
          <div>{poap.name}</div>
          <div>{poap.addrsAttendAggregate.count}</div>
        </div>
      ))}
    </>
  );
};
export default Poaps;
