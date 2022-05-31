import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Wallets from "./Wallets";
import WalletProfiler from "./WalletProfiler";
import Wallet from "./Wallet";
import Collections from "./Collections";
import CollectionProfiler from "./CollectionProfiler";
import Collection from "./Collection";
import Nft from "./Nfts";
import Events from "./Events";
import EventProfiler from "./EventProfiler";
import Event from "./Event";
import NoMatch from "./NoMatch";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="walletprofiler" element={<WalletProfiler />} />
        <Route path="wallets" element={<Wallets />}>
          <Route index element={<WalletProfiler />} />
          <Route path=":addressId" element={<Wallet />}></Route>
        </Route>
        <Route path="collectionprofiler" element={<CollectionProfiler />} />
        <Route path="collections" element={<Collections />}>
          <Route index element={<CollectionProfiler />} />
          <Route path=":contractId" element={<Collection />}>
            <Route path=":nftId" element={<Nft />} />
          </Route>
        </Route>
        <Route path="eventprofiler" element={<EventProfiler />} />
        <Route path="events" element={<Events />}>
          <Route index element={<EventProfiler />} />
          <Route path=":eventId" element={<Event />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default App;
