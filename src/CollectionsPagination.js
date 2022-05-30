import { useState } from "react";
import Nfts from "./Nfts";
import AddressHold from "./AddressHold";
const PaginationCollections = ({ count }) => {
  const contractId = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
  let offset = 0;
  const limit = 20;

  const pagination = Math.floor(count / limit);

  const [pageVariables, setPageVariables] = useState([
    { id: contractId, limit, offset },
  ]);

  const isLastPage = pagination === pageVariables.length - 1;

  return (
    <>
      <Nfts contractId={contractId} />
      {pageVariables.map((variables, i) => (
        <AddressHold key={i} variables={variables} />
      ))}
      {!isLastPage && (
        <button
          onClick={() =>
            setPageVariables([
              ...pageVariables,
              {
                offset: pageVariables.length * limit,
                limit,
                id: contractId,
              },
            ])
          }
        >
          Load More
        </button>
      )}
    </>
  );
};
export default PaginationCollections;
