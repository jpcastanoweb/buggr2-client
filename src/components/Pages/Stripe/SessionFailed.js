import React from "react"
import { Link } from "react-router-dom"

export default function SessionSuccess() {
  return (
    <div>
      <div>
        <div className="min-h-screen bg-white flex md:justify-center sm:justify-center">
          <div class="bg-white">
            <div class="max-w-xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
              <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                    {/* <!-- Heroicon name: outline/check --> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <div class="mt-3 text-center sm:mt-5">
                    <h3
                      class="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Payment not successful
                    </h3>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Something happened while trying to process your payment.
                        Please try again later.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6">
                  <Link to="/login">
                    <button
                      type="button"
                      class="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    >
                      Go back to login
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
