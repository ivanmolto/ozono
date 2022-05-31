import { useState } from "react";
import Users from "./Users";
import HoldNfts from "./HoldNfts";

const UsersPagination = ({ addressId, nftcount, poapcount }) => {
  let offset = 0;
  const limit = 20;
  console.log(addressId);

  const nftpagination = Math.floor(nftcount / limit);
  // const poappagination = Math.floor(poapcount / limit);

  const [pageVariables, setPageVariables] = useState([
    { address: addressId, limit, offset },
  ]);

  console.log(pageVariables);

  const isLastPageNFT = nftpagination === pageVariables.length - 1;
  // const isLastPagePoap = poappagination = pageVariables.length - 1;

  return (
    <>
      <Users addressId={addressId} />
      <div className="mt-8 font-montserrat">
        <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
          NFT Balance
        </h2>
        {pageVariables.map((variables, i) => (
          <HoldNfts key={i} variables={variables} />
        ))}
        {!isLastPageNFT && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col mt-2">
              <div className="align-middle min-w-full overflow-x-auto overflow-hidden sm:rounded-lg">
                <div
                  className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                  aria-label="Pagination"
                >
                  <div className="flex-1 flex justify-between sm:justify-end">
                    <button
                      type="button"
                      className="ml-3 relative inline-flex items-center px-4 py-2 border shadow-sm text-sm font-medium rounded-md text-white bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400"
                      onClick={() =>
                        setPageVariables([
                          ...pageVariables,
                          {
                            offset: pageVariables.length * limit,
                            limit,
                            address: addressId,
                          },
                        ])
                      }
                    >
                      Load more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default UsersPagination;
