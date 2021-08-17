import React, { useContext, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import OpportunityContext from "../../context/Opportunity/OpportunityContext"
import { toDateString } from "./../../_helperFunctions"

export default function SingleOpportunity(props) {
  const { opportunityid } = useParams()

  const oppCtx = useContext(OpportunityContext)
  const { opportunity, loadOpportunity } = oppCtx

  useEffect(() => {
    loadOpportunity(opportunityid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
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
    </>
  )
}
