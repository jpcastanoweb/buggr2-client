import React, { useContext, useEffect } from "react"
import logo from "./../../../images/main_logo_notext.png"
import UserContext from "./../../../context/User/UserContext"

export default function SubscribePage() {
  const userCtx = useContext(UserContext)
  const {
    user,
    sessionUrl,
    startMonthlyCheckoutSession,
    startYearlyCheckoutSession,
    signout,
    eraseRedirect,
  } = userCtx

  const handleMonthlyCheckout = async (e) => {
    e.preventDefault()
    await startMonthlyCheckoutSession(user._id)
  }

  const handleYearlyCheckout = async (e) => {
    e.preventDefault()
    await startYearlyCheckoutSession(user._id)
  }

  useEffect(() => {
    const reloadingPage = () => {
      if (sessionUrl !== null) {
        const currentUrl = sessionUrl
        eraseRedirect()
        window.location.assign(currentUrl)
      }
    }

    reloadingPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionUrl])

  return (
    <div>
      <div className="min-h-screen bg-white flex md:justify-center sm:justify-center">
        <div className="hidden lg:block relative w-0 flex-1 bg-purple-900 text-white">
          <div className="container h-full flex flex-row justify-center items-center">
            <img
              src={logo}
              alt=""
              width="50"
              className="d-inline-block align-text-top"
            />
            <span className="font-body text-3xl m-2">Buggr</span>
          </div>
        </div>
        <div class="bg-white text-black">
          <div class="flex flex-row justify-between mt-5 px-5">
            <button
              class="flex flex-row gap-5  text-black hover:text-gray-400"
              onClick={() => {
                signout()
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <div className="">Sign Out</div>
            </button>
            <div>Welcome, {user.firstName + " " + user.lastName}</div>
          </div>

          <div class="max-w-xl mx-auto pt-5 pb-10 px-4 sm:px-6 lg:px-8">
            <div class="sm:flex sm:flex-col sm:align-center">
              <h1 class="mt-5 text-4xl font-extrabold text-gray-900 sm:text-center">
                Activate Your Account
              </h1>
              <p class="mt-5 text-md text-gray-500 sm:text-center">
                Start managing your team's projects and pay monthly or yearly.
              </p>
            </div>
            <div class="mt-4 space-y-4 xs:flex xs:flex-column sm:mt-8 sm:space-y-0 sm:gap-10 lg:max-w-xl lg:mx-auto xl:max-w-none xl:mx-0 ">
              <div class="border border-gray-200 mb-5 rounded-lg shadow-sm divide-y divide-gray-200">
                <div class="p-6">
                  <h2 class="text-lg leading-6 font-medium text-gray-900">
                    Monthly
                  </h2>
                  <p class="mt-4 text-sm text-gray-500">
                    Gain access to Buggr's full set of features for a monthly
                    fee.
                  </p>
                  <p class="mt-8">
                    <span class="text-4xl font-extrabold text-gray-900">
                      $12
                    </span>
                    <span class="text-base font-medium text-gray-500">/mo</span>
                  </p>
                  <button
                    class="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                    type="reset"
                    onClick={(e) => {
                      handleMonthlyCheckout(e)
                    }}
                  >
                    Buy Monthly
                  </button>
                </div>
              </div>

              <div class="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
                <div class="p-6">
                  <h2 class="text-lg leading-6 font-medium text-gray-900">
                    Yearly
                  </h2>
                  <p class="mt-4 text-sm text-gray-500">
                    Gain access to Buggr's full set of features for a yearly fee
                    at a discounted rate.
                  </p>
                  <p class="mt-8">
                    <span class="text-4xl font-extrabold text-gray-900">
                      $120
                    </span>
                    <span class="text-base font-medium text-gray-500">/yr</span>
                  </p>
                  <button
                    href="#"
                    class="mt-8 block w-full bg-gray-800 border border-gray-800 rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-gray-900"
                    onClick={(e) => {
                      handleYearlyCheckout(e)
                    }}
                  >
                    Buy Yearly
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
