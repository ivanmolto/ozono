import { gql, useQuery } from "urql";
const Nfts = ({ contractId }) => {
  const variables = { contract: contractId };
  const HOLD_QUERY = gql`
    query ($contract: String) {
      nfts(where: { contract: $contract }) {
        contract
        imageUrl
        symbol
        addrsHoldAggregate {
          count
        }
      }
    }
  `;
  const query = HOLD_QUERY;

  const [result] = useQuery({ query, variables });
  const { data, fetching, error } = result;

  if (fetching || data === undefined) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <>
      {data?.nfts.map((nft) => (
        <div key={nft.contract}>
          <img src={nft.imageUrl} alt={nft.symbol} />
          <div>{nft.contract}</div>
          <div>{nft.symbol}</div>
          <div>{nft.addrsHoldAggregate.count}</div>
        </div>
      ))}
    </>
  );
};
export default Nfts;
