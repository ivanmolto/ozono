import { gql, useQuery } from "urql";

const ATTEND_QUERY = gql`
  query ($id: String, $limit: Int, $offset: Int) {
    events(where: { id: $id }) {
      id
      addrsAttendAggregate {
        count
      }
      addrsAttend(options: { limit: $limit, offset: $offset }) {
        address
      }
    }
  }
`;
const query = ATTEND_QUERY;

const AddressAttend = ({ variables }) => {
  const [result] = useQuery({ query, variables });
  const { data, fetching, error } = result;

  if (fetching || data === undefined) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      {data?.events.map((audience, ind) => (
        <div key={ind}>
          {audience.addrsAttend.map((user, index) => (
            <div key={index}>{user.address}</div>
          ))}
        </div>
      ))}
    </>
  );
};
export default AddressAttend;
