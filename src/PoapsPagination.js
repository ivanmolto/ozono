import { useState } from "react";
import AttendEvents from "./AttendEvents";

const PoapsPagination = ({ count }) => {
  const addressId = "0x7904667c340601aab73939372c016dc5102732a2";
  let offset = 0;
  const limit = 20;

  const pagination = Math.floor(count / limit);

  const [pageVariables, setPageVariables] = useState([
    { address: addressId, limit, offset },
  ]);

  const isLastPage = pagination === pageVariables.length - 1;

  return (
    <>
      {pageVariables.map((variables, i) => (
        <AttendEvents key={i} variables={variables} />
      ))}
      {!isLastPage && (
        <button
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
          Load More
        </button>
      )}
    </>
  );
};
export default PoapsPagination;
