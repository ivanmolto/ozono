import { gql, useQuery } from "urql";
import CollectionsPagination from "./CollectionsPagination";
const Collections = () => {
  const contractId = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
  const variables = { contract: contractId };

  const PAGINATION_QUERY = gql`
    query ($contract: String) {
      nfts(where: { contract: $contract }) {
        addrsHoldAggregate {
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
      {data?.nfts.map((nft, ind) => (
        <CollectionsPagination key={ind} count={nft.addrsHoldAggregate.count} />
      ))}
    </>
  );
};
export default Collections;
