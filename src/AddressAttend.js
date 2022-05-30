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
      <div className="shadow sm:hidden">
        <ul className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
          {data?.events.map((audience, ind) => (
            <div key={ind}>
              {audience.addrsAttend.map((user, index) => (
                <li key={index}>
                  <div className="block px-4 py-4 bg-white hover:bg-gray-50 border-2 border-gray-200">
                    <div className="flex items-center space-x-4 ">
                      <div className="flex-1 flex space-x-2 truncate ">
                        <div className="flex flex-col text-gray-500 text-sm  truncate">
                          <div className="truncate">{user.address}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          ))}
        </ul>
      </div>
      <div className="hidden sm:block">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col mt-2">
            <div className="align-middle min-w-full overflow-x-auto shadow-sm overflow-hidden sm:rounded-lg">
              <ul className="min-w-full divide-y divide-gray-200">
                {data?.events.map((audience, ind) => (
                  <div key={ind}>
                    {audience.addrsAttend.map((user, index) => (
                      <li
                        key={index}
                        className="bg-white border-2 border-gray-100 hover:bg-gray-200"
                      >
                        <div className="group inline-flex space-x-2 truncate text-sm ">
                          <div className="text-gray-500 truncate group-hover:text-gray-900 ">
                            {user.address}
                          </div>
                        </div>
                      </li>
                    ))}
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddressAttend;
