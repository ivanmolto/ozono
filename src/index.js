import React from "react";
import ReactDOM from "react-dom/client";
import { createClient, Provider, dedupExchange, fetchExchange } from "urql";
import { cacheExchange } from "@urql/exchange-graphcache";
import { simplePagination } from "@urql/exchange-graphcache/extras";

import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const client = createClient({
  url: "https://mw.graphql.knn3.xyz",
  exchanges: [
    dedupExchange,
    cacheExchange({
      resolvers: {
        Query: {
          addrsAttend: simplePagination(),
          addrsHold: simplePagination(),
          holdnfts: simplePagination(),
          attendEvents: simplePagination(),
        },
      },
      keys: {
        Addr: () => null,
        NFT: () => null,
        EventAddrAddrsAttendAggregationSelection: () => null,
        NFTAddrAddrsHoldAggregationSelection: () => null,
        AddrAddrAddrsFollowAggregationSelection: () => null,
        AddrAddrFollowAddrsAggregationSelection: () => null,
        AddrNFTHoldnftsAggregationSelection: () => null,
        AddrEventAttendEventsAggregationSelection: () => null,
      },
    }),
    fetchExchange,
  ],
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider value={client}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
