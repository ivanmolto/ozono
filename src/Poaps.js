import { gql, useQuery } from "urql";
import { LightningBoltIcon, UserGroupIcon } from "@heroicons/react/outline";

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
      {data?.events.map((poap) => (
        <div key={poap.id} className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <img
                    className="hidden h-64 w-64 rounded-full sm:block"
                    src={poap.imageUrl}
                    alt={poap.name}
                  />
                  <div>
                    <div className="flex items-center">
                      <img
                        className="h-16 w-16 rounded-full sm:hidden"
                        src={poap.imageUrl}
                        alt={poap.name}
                      />
                      <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                        {poap.name}
                      </h1>
                    </div>
                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dt className="sr-only">Poap Id</dt>
                      <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                        <LightningBoltIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {poap.id}
                      </dd>
                      <dt className="sr-only">Supply</dt>
                      <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                        <UserGroupIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {poap.addrsAttendAggregate.count}
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
export default Poaps;
