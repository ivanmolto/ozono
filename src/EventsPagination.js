import { useState } from "react";
import Poaps from "./Poaps";
import AddressAttend from "./AddressAttend";

const EventsPagination = ({ count }) => {
  const eventId = "43064";
  let offset = 0;
  const limit = 20;

  const pagination = Math.floor(count / limit);

  const [pageVariables, setPageVariables] = useState([
    { id: eventId, limit, offset },
  ]);

  const isLastPage = pagination === pageVariables.length - 1;

  return (
    <>
      <Poaps eventId={eventId} />
      {pageVariables.map((variables, i) => (
        <AddressAttend key={i} variables={variables} />
      ))}
      {!isLastPage && (
        <button
          onClick={() =>
            setPageVariables([
              ...pageVariables,
              {
                offset: pageVariables.length * limit,
                limit,
                id: eventId,
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
export default EventsPagination;
