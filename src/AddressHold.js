import { gql, useQuery } from "urql";

const HOLD_QUERY = gql`
  query ($contract: String, $limit: Int, $offset: Int) {
    nfts(where: { contract: $contract }) {
      addrsHold(options: { limit: $limit, offset: $offset }) {
        address
      }
    }
  }
`;
const query = HOLD_QUERY;

const AddressHold = ({ variables }) => {
  const [result] = useQuery({ query, variables });
  const { data, fetching, error } = result;

  if (fetching || data === undefined) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      {data?.nfts.map((holder, ind) => (
        <div key={ind}>
          {holder.addrsHold.map((user, index) => (
            <div key={index}>{user.address}</div>
          ))}
        </div>
      ))}
    </>
  );
};
export default AddressHold;
