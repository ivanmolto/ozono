import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EventProfiler = () => {
  const [action, setAction] = useState("");
  let navigate = useNavigate();

  const eventChangeHandler = (event) => {
    setAction(event.target.value);
  };

  async function submitHandler(event) {
    event.preventDefault();
    navigate(`/events/${action}`, { replace: true });
    setAction("");
  }

  return (
    <div class="bg-bckgd font-inter">
      <main className="flex-1 flex-col pb-8">
        <div className="mt-1">
          <h2 className="max-w-6xl mx-auto mt-0 px-4 text-lg leading-6 font-inter font-medium text-sky-400 sm:px-6 lg:px-8">
            Event Profiler
          </h2>
          <div>
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-3 md:flex md:items-center md:justify-between lg:border-t lg:border-sky-400"></div>
            </div>
          </div>
          <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <form
              onSubmit={submitHandler}
              className="space-y-8 divide-y divide-gray-200"
            >
              <div className="space-y-8 divide-y divide-gray-200">
                <div className="pt-8">
                  <div>
                    <h3 className="text-base leading-6 font-medium text-gray-900">
                      Fill in the inputs to see the Poap event
                    </h3>
                  </div>

                  <div className="sm:col-span-3 mt-4">
                    <label
                      htmlFor="nft-address"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Poap Id
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        value={action}
                        onChange={eventChangeHandler}
                        name="nft-address"
                        id="nft-address"
                        autoComplete="nft-address"
                        className="shadow-sm focus:ring-sky-500 focus:border-sky-500 block w-full sm:text-sm border-sky-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-44 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-400 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};
export default EventProfiler;
