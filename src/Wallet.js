import { useParams } from "react-router-dom";
import { gql, useQuery } from "urql";
import UsersPagination from "./UsersPagination";

const Wallet = () => {
  let params = useParams();

  const addressId = params.addressId;

  const variables = { address: addressId };

  const WALLET_QUERY = gql`
    query ($address: String) {
      addrs(where: { address: $address }) {
        address
        holdNftsAggregate {
          count
        }
        attendEventsAggregate {
          count
        }
      }
    }
  `;

  const query = WALLET_QUERY;
  const [result] = useQuery({ query, variables });
  const { data, fetching, error } = result;

  if (fetching)
    return (
      <div className="min-h-full font-montserrat">
        <main className="flex-1 pb-8">
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <h2 className="font-bold text-xl">Web3 User Profile</h2>
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200"></div>
            Loading...
          </div>
        </main>
      </div>
    );

  if (error) return <p>{error.message}</p>;
  if (data?.addrs.length === 0)
    return (
      <div className="min-h-full font-montserrat">
        <main className="flex-1 pb-8">
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <h2 className="font-bold text-xl">Web3 User Profile</h2>
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200"></div>
            Sorry, no data available for {params.addressId}
          </div>
        </main>
      </div>
    );

  return (
    <div className="min-h-full font-montserrat">
      <main className="flex-1 pb-8">
        <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <h2 className="font-bold text-xl">Web3 User Profile</h2>
        </div>
        {data?.addrs.map((wallet, ind) => (
          <UsersPagination
            key={ind}
            addressId={addressId}
            nftcount={wallet.holdNftsAggregate.count}
            poapcount={wallet.attendEventsAggregate.count}
          />
        ))}
      </main>
    </div>
  );
};
export default Wallet;
