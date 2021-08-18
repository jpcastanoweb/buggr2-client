import React, { useContext, useEffect, useState } from "react"
import { useParams, Link, Redirect } from "react-router-dom"
import OpportunityContext from "../../context/Opportunity/OpportunityContext"
import { toDateString } from "./../../_helperFunctions"

export default function SingleOpportunity(props) {
  const { opportunityid } = useParams()

  const oppCtx = useContext(OpportunityContext)
  const { opportunity, loadOpportunity, submitDeleteOpportunity } = oppCtx

  const [modalActive, setModalActive] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      await submitDeleteOpportunity(opportunityid)
      setDeleted(true)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    loadOpportunity(opportunityid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return deleted ? (
    <Redirect to="/app/opportunities" />
  ) : (
    <>
      {/* Heading */}
      <div className="mb-3 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {opportunity.title}
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link to={`/app/opportunities/edit/${opportunityid}`}>
            <button
              type="button"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent border-purple-900 rounded-full shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit
            </button>
          </Link>
          <button
            type="button"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-purple-900 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Convert
          </button>
          <button
            type="button"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-red-900 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={(e) => {
              e.preventDefault()
              setModalActive(true)
            }}
          >
            Delete
          </button>
        </div>
      </div>
      {/* Divider */}
      <hr className="border-gray-300 mb-3" />
      {/* Information grid */}
      <div className="flex flex-row gap-x-20 gap-y-4 flex-wrap">
        <div>
          <p className="mb-1 text-xs">Customer</p>
          <p className="">
            {opportunity.forCustomer ? opportunity.forCustomer.name : "N/A"}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs">Value</p>
          <p className="">
            {opportunity.dollarValue ? opportunity.dollarValue : "N/A"}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs">Current Stage</p>
          <p className="">
            {opportunity.currentStage ? opportunity.currentStage : "N/A"}
          </p>
        </div>

        <div>
          <p className="mb-1 text-xs">Opened</p>
          <p className="">
            {opportunity.openedDate
              ? toDateString(opportunity.openedDate)
              : "N/A"}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs">Exprected Close Date</p>
          <p className="">
            {opportunity.closeDate
              ? toDateString(opportunity.closeDate)
              : "N/A"}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs">Contact Full Name</p>
          <p className="fs-5">John Doe</p>
        </div>
        <div>
          <p className="mb-1 text-xs">Contact Email Address</p>
          <p className="fs-5">john@gmail.com</p>
        </div>
        <div>
          <p className="mb-1 text-xs">Contact Phone Number</p>
          <p className="fs-5">(224) 777-777</p>
        </div>
      </div>

      {/* MODAL for DELETE */}

      {modalActive ? (
        <div
          class="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* <!--
              Background overlay, show/hide based on modal state.

              Entering: "ease-out duration-300"
                From: "opacity-0"
                To: "opacity-100"
              Leaving: "ease-in duration-200"
                From: "opacity-100"
                To: "opacity-0"
            --> */}
            <div
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
            <span
              class="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            {/* <!--
                Modal panel, show/hide based on modal state.

                Entering: "ease-out duration-300"
                  From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  To: "opacity-100 translate-y-0 sm:scale-100"
                Leaving: "ease-in duration-200"
                  From: "opacity-100 translate-y-0 sm:scale-100"
                  To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              --> */}
            <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  {/* <!-- Heroicon name: outline/exclamation --> */}
                  <svg
                    class="h-6 w-6 text-red-600"
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    class="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Delete {opportunity.title}
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Are you sure you want to delete {opportunity.title}? All
                      of its data will be permanently deleted. This action
                      cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={(e) => {
                    handleDelete(e)
                  }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={(e) => {
                    e.preventDefault()
                    setModalActive(false)
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  )
}
