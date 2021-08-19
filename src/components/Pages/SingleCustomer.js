import React, { useContext, useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import CustomerContext from "../../context/Customer/CustomerContext"
import { toDateString } from "./../../_helperFunctions"

export default function SingleCustomer(props) {
  const { customerid } = useParams()

  const customerCtx = useContext(CustomerContext)
  const { customer, loadCustomer, submitAddContact } = customerCtx
  const [addingContact, setAddingContact] = useState(false)
  const [contactData, setContactData] = useState({
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    ownerid: null,
  })
  const [loading, setLoading] = useState(true)

  const handleAddContactChange = (e) => {
    e.preventDefault()
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    })
  }

  const sendData = async (e) => {
    setAddingContact(false)
    await submitAddContact({
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      email: contactData.email,
      phoneNumber: contactData.phoneNumber,
      ownerid: customer._id,
    })
  }

  useEffect(() => {
    const loadEverything = async () => {
      await loadCustomer(customerid)
      setLoading(false)
    }

    loadEverything()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return !loading ? (
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
          <p className="">
            {customer.opportunities
              ? customer.opportunities.reduce((a, b) => {
                  if (
                    b.currentStage !== "Closed - Won" &&
                    b.currentStage !== "Closed - Lost"
                  ) {
                    return a + b.dollarValue
                  } else {
                    return a
                  }
                }, 0)
              : ""}{" "}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs">Project Revenue</p>
          <p className="">
            {customer.projects
              ? customer.projects.reduce((a, b) => a + b.dollarValue, 0)
              : ""}{" "}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs">Customer Since</p>
          <p className="">{toDateString(customer.createdAt)}</p>
        </div>

        <div>
          <p className="mb-1 text-xs">Contact Full Name</p>
          <p className="">
            {customer.mainContact
              ? customer.mainContact.firstName +
                (customer.mainContact.lastName
                  ? " " + customer.mainContact.lastName
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
      <div className="xl:grid xl:grid-cols-3 xl:gap-10 ">
        <div className="xl:col-span-2 ">
          {/* Opportunities' Table */}
          <div className="flex flex-col mb-4">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <div className="py-3 pl-3 w-full w-border-b border-gray-200 bg-purple-100">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 ">
                      Opportunities
                    </h3>
                  </div>
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
          {/* Projects Table */}
          <div className="flex flex-col mb-4">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <div className="py-3 pl-3 w-full w-border-b border-gray-200 bg-purple-100">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 ">
                      Projects
                    </h3>
                  </div>
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
        <div className="bg-gray-100 grid md:grid-cols-3 xl:grid-cols-1 gap-8">
          <div className="container flex justify-center">
            <div className="flex-grow sm:rounded-lg ">
              <div className="relative shadow-sm rounded-lg ">
                <div className="py-3 px-4 rounded-lg bg-purple-100  ">
                  <div className="flex justify-between align-center py-2">
                    <h3 className="text-lg align-middle leading-6 font-medium text-gray-900 w-h-10">
                      Contacts
                    </h3>
                  </div>
                  <div className="bg-white shadow overflow-hidden rounded-md max-h-52 overflow-scroll">
                    <ul className="divide-y divide-gray-200">
                      <li>
                        <div className="p-3 hover:bg-gray-100">
                          <button
                            className="w-full text-left"
                            onClick={() => {
                              setAddingContact(true)
                            }}
                          >
                            {" "}
                            + Add Contact
                          </button>
                        </div>
                      </li>
                      {customer.contacts ? (
                        customer.contacts.map((e, i) => {
                          return (
                            <li key={i}>
                              <div className="p-3">
                                {e.firstName + " " + e.lastName}
                                <br />
                                Email: {e.email}
                                <br />
                                {e.phoneNumber
                                  ? "Phone Number: " + e.phoneNumber
                                  : ""}
                              </div>
                            </li>
                          )
                        })
                      ) : (
                        <li>
                          <div className="p-3">No Contacts</div>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container flex justify-center">
            <div className="flex-grow  sm:rounded-lg">
              <div className="relative shadow-sm rounded-lg ">
                <div className="py-3 px-4 rounded-lg bg-purple-100">
                  <div className="flex justify-between align-center py-2">
                    <h3 className="text-lg align-middle leading-6 font-medium text-gray-900 w-h-10">
                      Notes
                    </h3>
                  </div>
                  <div className="bg-white shadow overflow-hidden rounded-md max-h-56 overflow-scroll">
                    <ul className="divide-y divide-gray-200">
                      <li>
                        <div className="p-3 hover:bg-gray-100">
                          <button
                            className="w-full text-left"
                            // onClick={() => {
                            //   setAddingContact(true)
                            // }}
                          >
                            {" "}
                            + Add Note
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* MODALS */}
      {addingContact ? (
        <>
          <form
            onSubmit={(e) => {
              sendData(e)
            }}
          >
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

                <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div class="sm:flex sm:items-end ">
                      <div class="flex-grow mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          class="text-lg leading-6 font-medium text-gray-900"
                          id="modal-title"
                        >
                          Add New Contact to {customer.name}
                        </h3>
                        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-4">
                          <label
                            for="name"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            First Name *
                          </label>
                          <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <div class="max-w-lg flex rounded-md shadow-sm">
                              <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                autocomplete="firstName"
                                required
                                class="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                onChange={(e) => {
                                  handleAddContactChange(e)
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-4">
                          <label
                            for="name"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            Last Name
                          </label>
                          <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <div class="max-w-lg flex rounded-md shadow-sm">
                              <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                autocomplete="lastName"
                                required
                                class="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                onChange={(e) => {
                                  handleAddContactChange(e)
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-4">
                          <label
                            for="name"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            Email Address *
                          </label>
                          <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <div class="max-w-lg flex rounded-md shadow-sm">
                              <input
                                type="email"
                                name="email"
                                id="email"
                                autocomplete="email"
                                required
                                class="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                onChange={(e) => {
                                  handleAddContactChange(e)
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-4">
                          <label
                            for="name"
                            class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            Phone Number
                          </label>
                          <div class="mt-1 sm:mt-0 sm:col-span-2">
                            <div class="max-w-lg flex rounded-md shadow-sm">
                              <input
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                autocomplete="phoneNumber"
                                required
                                class="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                onChange={(e) => {
                                  handleAddContactChange(e)
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-900 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={(e) => {
                        e.preventDefault()
                        setAddingContact(false)
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        ""
      )}
    </div>
  ) : (
    ""
  )
}
