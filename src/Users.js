import { gql, useQuery } from "urql";
import { UserAddIcon, UserGroupIcon } from "@heroicons/react/outline";

const Users = ({ addressId }) => {
  const variables = { address: addressId };
  const USER_QUERY = gql`
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
        holdNftsAggregate {
          count
        }
        attendEventsAggregate {
          count
        }
      }
    }
  `;

  const query = USER_QUERY;

  const [result] = useQuery({ query, variables });
  const { data, fetching, error } = result;

  if (fetching || data === undefined)
    return (
      <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
          <div className="flex-1 min-w-0">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  if (error) return <p>{error.message}</p>;

  return (
    <>
      {data?.addrs.map((user) => (
        <div key={user.address} className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="py-6 -mt-1 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <div>
                    <div className="flex items-center">
                      <h2 className="ml-3 text-xs sm:text-base font-semibold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                        {user.address}
                      </h2>
                    </div>
                    <div className="flex items-center">
                      <h2 className="ml-3 text-xs sm:text-base font-semibold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                        {user.ens}
                      </h2>
                    </div>
                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dt className="sr-only">Nft Collection</dt>
                      <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                        <UserAddIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {user.addrsFollowAggregate.count}
                      </dd>
                      <dt className="sr-only">Supply</dt>
                      <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                        <UserGroupIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {user.followAddrsAggregate.count}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default Users;
