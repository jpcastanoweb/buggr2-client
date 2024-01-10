import React, { useContext, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import UserContext from "../../../context/User/UserContext";

//custom hook
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SessionSuccess() {
  const userCtx = useContext(UserContext);
  const {
    user,
    requestSessionFromStripe,
    requestSubscriptionFromStripe,
    setUserSubscriptionStatus,
  } = userCtx;
  const query = useQuery();

  useEffect(() => {
    const submitRequestSession = async () => {
      try {
        const session = await requestSessionFromStripe(query.get("session_id"));
        const subscription = await requestSubscriptionFromStripe(
          session.subscription
        );

        await setUserSubscriptionStatus(subscription, user._id);
      } catch (error) {
        console.log(error);
      }
    };

    submitRequestSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <div className="min-h-screen bg-white flex md:justify-center sm:justify-center">
          <div className="bg-white">
            <div className="max-w-xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    {/* <!-- Heroicon name: outline/check --> */}
                    <svg
                      className="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Payment successful
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Welcome to Buggr! Thanks for starting your subscription.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <Link to="/app">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    >
                      Get Started!
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
