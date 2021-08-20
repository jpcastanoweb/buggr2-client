import React, { useContext, useEffect } from "react"
import { useParams, useLocation, Link } from "react-router-dom"
import UserContext from "../../../context/User/UserContext"

//custom hook
function useQuery() {
  return new URLSearchParams(useLocation().search)
}

export default function SessionSuccess() {
  const { session_id } = useParams()
  const userCtx = useContext(UserContext)
  const {
    user,
    requestSessionFromStripe,
    requestSubscriptionFromStripe,
    setUserSubscriptionStatus,
  } = userCtx
  const query = useQuery()
  console.log(query.get("session_id"))

  useEffect(() => {
    const submitRequestSession = async () => {
      try {
        const session = await requestSessionFromStripe(query.get("session_id"))
        const subscription = await requestSubscriptionFromStripe(
          session.subscription
        )

        await setUserSubscriptionStatus(subscription, user._id)
      } catch (error) {
        console.log(error)
      }
    }

    submitRequestSession()
  }, [])

  return (
    <div>
      <div>
        <div className="min-h-screen bg-white flex md:justify-center sm:justify-center">
          <div class="bg-white">
            <div class="max-w-xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
              <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    {/* <!-- Heroicon name: outline/check --> */}
                    <svg
                      class="h-6 w-6 text-green-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div class="mt-3 text-center sm:mt-5">
                    <h3
                      class="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Payment successful
                    </h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Welcome to Buggr! Thanks for starting your subscription.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6">
                  <Link to="/app">
                    <button
                      type="button"
                      class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
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
  )
}
