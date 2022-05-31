import { useParams } from "react-router-dom";
import { gql, useQuery } from "urql";
import CollectionsPagination from "./CollectionsPagination";

const Collection = () => {
  let params = useParams();

  const contractId = params.contractId;

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

  if (fetching)
    return (
      <div className="min-h-full font-montserrat">
        <main className="flex-1 pb-8">
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <h2 className="font-bold text-xl">NFT Collection</h2>
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200"></div>
            Loading...
          </div>
        </main>
      </div>
    );
  if (error) return <p>{error.message}</p>;
  if (data?.nfts.length === 0)
    return (
      <div className="min-h-full font-montserrat">
        <main className="flex-1 pb-8">
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <h2 className="font-bold text-xl">NFT Collection</h2>
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200"></div>
            Sorry, no data available for {params.contractId}
          </div>
        </main>
      </div>
    );
  return (
    <div className="min-h-full font-montserrat">
      <main className="flex-1 pb-8">
        <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <h2 className="font-bold text-xl">NFT Collection</h2>
        </div>
        {data?.nfts.map((nft, ind) => (
          <CollectionsPagination
            key={ind}
            count={nft.addrsHoldAggregate.count}
            contractId={contractId}
          />
        ))}
      </main>
    </div>
  );
};
export default Collection;
