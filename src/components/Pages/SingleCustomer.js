import React, { useContext, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import CustomerContext from "../../context/Customer/CustomerContext"
import { toDateString } from "./../../_helperFunctions"

export default function SingleCustomer(props) {
  const { customerid } = useParams()

  const customerCtx = useContext(CustomerContext)
  const { customer, loadCustomer } = customerCtx

  useEffect(() => {
    loadCustomer(customerid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {/* Heading */}
      <div className="mb-3 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {customer.name}
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link to={`/app/customers/edit/${customerid}`}>
            <button
              type="button"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent border-purple-900 rounded-full shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit
            </button>
          </Link>
        </div>
      </div>
      {/* Divider */}
      <hr className="border-gray-300 mb-3" />
      {/* Information grid */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div>
          <p className="mb-1 text-xs">Potential Business</p>
          <p className="">{"N/A"}</p>
        </div>
        <div>
          <p className="mb-1 text-xs">Project Revenue</p>
          <p className="">{"N/A"}</p>
        </div>
        <div>
          <p className="mb-1 text-xs">Customer Since</p>
          <p className="">{"N/A"}</p>
        </div>

        <div>
          <p className="mb-1 text-xs">Contact Full Name</p>
          <p className="">
            {customer.mainContact
              ? customer.mainContact.firstName +
                (customer.mainContact.lastName
                  ? customer.mainContact.lastName
                  : "")
              : "N/A"}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs">Contact Email Address</p>
          <p className="">
            {customer.mainContact ? customer.mainContact.email : "N/A"}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs">Contact Phone Number</p>
          <p className="fs-5">
            {customer.mainContact
              ? customer.mainContact.phoneNumber
                ? customer.mainContact.phoneNumber
                : "N/A"
              : "N/A"}
          </p>
        </div>
      </div>
      {/* Divider */}
      <hr className="border-gray-300 mb-3" />
      {/* Opportunities' Table */}
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Opportunities
        </h3>
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Stage
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Value
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Opened
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Expected Close Date
                    </th>

                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customer.opportunities ? (
                    customer.opportunities.map((elem, i) => {
                      return (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {elem.title ? elem.title : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {elem.currentStage ? elem.currentStage : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {elem.dollarValue ? elem.dollarValue : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {elem.openedDate
                              ? toDateString(elem.openedDate)
                              : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {elem.closeDate
                              ? toDateString(elem.closeDate)
                              : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to={`/app/opportunities/edit/${elem._id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to={`/app/opportunities/${elem._id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Divider */}
      <hr className="border-gray-300 mb-3" />
      {/* Projects' Table */}
      <div className="pb-5 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Projects
        </h3>
      </div>
      {/* Table */}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Stage
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Value
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Start Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Goal Date
                    </th>

                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customer.projects ? (
                    customer.projects.map((elem, i) => {
                      return (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {elem.title ? elem.title : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {elem.currentStage ? elem.currentStage : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {elem.dollarValue ? elem.dollarValue : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {elem.startDate
                              ? toDateString(elem.startDate)
                              : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {elem.goalDate
                              ? toDateString(elem.goalDate)
                              : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to={`/app/projects/edit/${elem._id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </Link>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link
                              to={`/app/projects/${elem._id}`}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      )
                    })
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
