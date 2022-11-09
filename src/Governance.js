import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Cast from "./Cast";
import Stamp from "./Stamp";

function getGovernance(address) {
  const options = { method: "GET", headers: { accept: "application/json" } };
  return fetch(
    `https://pregod.rss3.dev/v1/notes/${address}?limit=500&tag=governance&include_poap=false&count_only=false&query_status=false`,
    options
  ).then((response) => response.json());
}
function Rss3Governance({ address }) {
  const governanceQuery = useQuery(["governor"], () => getGovernance(address));

  const data = governanceQuery.data;
  if (governanceQuery.isLoading)
    return (
      <div className="min-h-full font-montserrat">
        <main className="flex-1 pb-8">
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <h2 className="font-bold text-xl">Governance Feed</h2>
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200"></div>
            Loading...
          </div>
        </main>
      </div>
    );
  if (governanceQuery.isError)
    return <p>Error: {governanceQuery.error.message}</p>;
  if (data.total === 0)
    return (
      <div className="min-h-full font-montserrat">
        <main className="flex-1 pb-8">
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <h2 className="font-bold text-xl">Governance Feed</h2>
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200"></div>
            Sorry, no data available for Governance
          </div>
        </main>
      </div>
    );
  return (
    <div className="min-h-full font-montserrat">
      <main className="flex-1 pb-8">
        <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
          <h2 className="font-bold text-xl">Governance</h2>
        </div>
        <Stamp address={address} />
        <div className="mt-8 font-montserrat">
          <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
            Feed
          </h2>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col mt-2">
              <div className="align-middle min-w-full overflow-x-auto shadow-sm overflow-hidden sm:rounded-lg">
                <div className="min-w-full divide-y divide-gray-200">
                  <ul className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
                    {data.result.map((note, i) => (
                      <Cast
                        key={i}
                        timestamp={note.timestamp}
                        body={note.actions[0].metadata.proposal.body}
                        explorer={note.actions[0].related_urls[0]}
                        name={
                          note.actions[0].metadata.proposal.organization.name
                        }
                        title={note.actions[0].metadata.proposal.title}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const Governance = () => {
  let params = useParams();

  const governanceId = params.governanceId;

  return <Rss3Governance address={governanceId} />;
};

export default Governance;
