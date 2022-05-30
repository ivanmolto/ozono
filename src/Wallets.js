import { gql, useQuery } from "urql";
import NftsPagination from "./NftsPagination";
import PoapsPagination from "./PoapsPagination";

const Wallets = () => {
  const addressId = "0x7904667c340601aab73939372c016dc5102732a2";
  const variables = { address: addressId };

  const PAGINATION_QUERY = gql`
    query ($address: String) {
      addrs(where: { address: $address }) {
        address
        ens
        addrsFollowAggregate {
          count
        }
        followAddrsAggregate {
          count
        }
        holdnftsAggregate {
          count
        }
        attendEventsAggregate {
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
      {data?.addrs.map((address, ind) => (
        <div key={ind}>
          <div>{address.address}</div>
          <div>{address.ens}</div>
          <div>{address.addrsFollowAggregate.count}</div>
          <div>{address.followAddrsAggregate.count}</div>
          <div>{address.holdnftsAggregate.count}</div>
          <div>{address.attendEventsAggregate.count}</div>
          <NftsPagination count={address.holdnftsAggregate.count} />
          <PoapsPagination count={address.attendEventsAggregate.count} />
        </div>
      ))}
    </>
  );
};
export default Wallets;
