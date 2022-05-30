import { gql, useQuery } from "urql";

const HOLD_QUERY = gql`
  query ($address: String, $limit: Int, $offset: Int) {
    addrs(where: { address: $address }) {
      address
      holdnfts(options: { limit: $limit, offset: $offset }) {
        contract
        imageUrl
        symbol
      }
    }
  }
`;
const query = HOLD_QUERY;

const HoldNfts = ({ variables }) => {
  const [result] = useQuery({ query, variables });
  const { data, fetching, error } = result;

  if (fetching || data === undefined) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      {data?.addrs.map((holder, ind) => (
        <div key={ind}>
          {holder.holdnfts.map((collection, index) => (
            <div key={index}>
              <div>{collection.contract}</div>
              <img src={collection.imageUrl} alt={collection.contract} />
              <div>{collection.symbol}</div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
export default HoldNfts;
