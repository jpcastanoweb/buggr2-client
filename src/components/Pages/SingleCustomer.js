import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CustomerContext from "../../context/Customer/CustomerContext";
import { toDateString, toDollarString } from "./../../_helperFunctions";

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function SingleCustomer(props) {
  const { customerid } = useParams();

  const customerCtx = useContext(CustomerContext);
  const { customer, loadCustomer, submitAddContact, submitAddNote } =
    customerCtx;
  const [addingContact, setAddingContact] = useState(false);
  const [addingNote, setAddingNote] = useState(false);
  const [contactData, setContactData] = useState({
    firstName: null,
    lastName: null,
    email: null,
    phoneNumber: null,
    ownerid: null,
  });
  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
  });
  const [viewNote, setViewNote] = useState(false);
  const [currentNote, setCurrentNote] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({
    firstName: "",
    email: "",
  });

  const handleAddContactChange = (e) => {
    e.preventDefault();
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });

    const { name, value } = e.target;

    switch (name) {
      case "firstName":
        setErrors({
          ...errors,
          [name]:
            value.length < 2
              ? "First Name must be at least 2 characters long!"
              : "",
        });
        break;
      case "email":
        setErrors({
          ...errors,
          [name]: emailRegex.test(value) ? "" : "Email is not valid!",
        });
        break;

      default:
        break;
    }
  };

  const handleAddNoteChange = (e) => {
    e.preventDefault();
    setNoteData({
      ...noteData,
      [e.target.name]: e.target.value,
    });
  };

  const sendData = async (e) => {
    if (validateForm(errors)) {
      await submitAddContact({
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        email: contactData.email,
        phoneNumber: contactData.phoneNumber,
        ownerid: customer._id,
      });
      setAddingContact(false);
    }
  };

  const sendNoteData = async (e) => {
    const fullData = {
      title: noteData.title,
      content: noteData.content,
      onModel: "Customer",
      ownerid: customer._id,
    };
    await submitAddNote(fullData);
    setAddingNote(false);
  };

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  };

  useEffect(() => {
    const loadEverything = async () => {
      await loadCustomer(customerid);
      setLoading(false);
    };

    loadEverything();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            {toDollarString(
              customer.opportunities
                ? customer.opportunities.reduce((a, b) => {
                    if (
                      b.currentStage !== "Closed - Won" &&
                      b.currentStage !== "Closed - Lost"
                    ) {
                      return a + b.dollarValue;
                    } else {
                      return a;
                    }
                  }, 0)
                : ""
            )}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs">Project Revenue</p>
          <p className="">
            {toDollarString(
              customer.projects
                ? customer.projects.reduce((a, b) => a + b.dollarValue, 0)
                : ""
            )}
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
                                {toDollarString(
                                  elem.dollarValue ? elem.dollarValue : 0
                                )}
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
                          );
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
                                {toDollarString(
                                  elem.dollarValue ? elem.dollarValue : 0
                                )}
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {elem.dueDate
                                  ? toDateString(elem.dueDate)
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
                          );
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
        {/* Notes, Contacts */}
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
                        <div className="p-3 hover:bg-gray-200">
                          <button
                            className="w-full text-left"
                            onClick={() => {
                              setAddingContact(true);
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
                          );
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
            <div className="flex-grow h-100 max-w-full sm:rounded-lg">
              <div className="relative shadow-sm rounded-lg ">
                <div className="py-3 px-4 rounded-lg bg-purple-100">
                  <div className="flex justify-between align-center py-2">
                    <h3 className="text-lg align-middle leading-6 font-medium text-gray-900 w-h-10">
                      Notes
                    </h3>
                  </div>
                  <div className="bg-white shadow overflow-ellipsis rounded-md h-52 max-h-56 overflow-scroll">
                    <ul className="divide-y divide-gray-200 overflow-ellipsis">
                      <li className="w-100">
                        <div className="p-3 hover:bg-gray-200">
                          <button
                            className="w-full text-left"
                            onClick={() => {
                              setAddingNote(true);
                            }}
                          >
                            {" "}
                            + Add Note
                          </button>
                        </div>
                      </li>
                      {customer.notes ? (
                        customer.notes.map((e, i) => {
                          return (
                            <li key={i} className="overflow-ellipsis">
                              <button
                                onClick={(event) => {
                                  event.preventDefault();
                                  setCurrentNote(e);
                                  setViewNote(true);
                                }}
                                className="p-3 w-full max-w-full text-left hover:bg-gray-200"
                              >
                                <span>{e.title}</span>
                                <br />
                                <span className="text-xs">
                                  Created On:{" "}
                                  {e.createdAt ? toDateString(e.createdAt) : ""}
                                </span>
                                <br />
                                <p className="text-sm truncate">{e.content}</p>
                              </button>
                            </li>
                          );
                        })
                      ) : (
                        <li>
                          <div className="p-3">No Notes</div>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container flex justify-center">
            <div className="flex-grow h-100 sm:rounded-lg">
              <div className="relative shadow-sm rounded-lg ">
                <div className="py-3 px-4 rounded-lg bg-purple-100">
                  <div className="flex justify-between align-center py-2">
                    <h3 className="text-lg align-middle leading-6 font-medium text-gray-900 w-h-10">
                      Documents
                    </h3>
                  </div>
                  <div className="bg-white shadow overflow-hidden rounded-md h-52 max-h-56 overflow-scroll">
                    <div className="w-100 h-full flex justify-center items-center text-gray-700 text-lg">
                      Coming Soon
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Contact Modal */}
      {addingContact ? (
        <>
          <form
            onSubmit={(e) => {
              sendData(e);
            }}
            noValidate
          >
            <div
              className="fixed z-10 inset-0 overflow-y-auto"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                  className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                  aria-hidden="true"
                ></div>

                {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
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

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-end ">
                      <div className="flex-grow mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-lg leading-6 font-medium text-gray-900"
                          id="modal-title"
                        >
                          Add New Contact to {customer.name}
                        </h3>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            First Name *
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg flex rounded-md shadow-sm">
                              <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                autoComplete="firstName"
                                className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                onChange={(e) => {
                                  handleAddContactChange(e);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        {errors.firstName.length > 0 && (
                          <div className="rounded-md bg-red-50 p-2 mt-1">
                            <div className="flex">
                              <div className="ml-2">
                                <div className="text-sm text-red-700">
                                  <span className="error">
                                    {errors.firstName}
                                  </span>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            Last Name
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg flex rounded-md shadow-sm">
                              <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                autoComplete="lastName"
                                className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                onChange={(e) => {
                                  handleAddContactChange(e);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            Email Address *
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg flex rounded-md shadow-sm">
                              <input
                                type="email"
                                name="email"
                                id="email"
                                autoComplete="email"
                                className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                onChange={(e) => {
                                  handleAddContactChange(e);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        {errors.email.length > 0 && (
                          <div className="rounded-md bg-red-50 p-2 mt-1">
                            <div className="flex">
                              <div className="ml-2">
                                <div className="text-sm text-red-700">
                                  <span className="error">{errors.email}</span>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            Phone Number
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg flex rounded-md shadow-sm">
                              <input
                                type="text"
                                name="phoneNumber"
                                id="phoneNumber"
                                autoComplete="phoneNumber"
                                className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                onChange={(e) => {
                                  handleAddContactChange(e);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-900 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        setAddingContact(false);
                        setErrors({
                          firstName: "",
                          email: "",
                        });
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
      {/* Add Contact Modal */}
      {addingNote ? (
        <>
          <form
            onSubmit={(e) => {
              sendNoteData(e);
            }}
            noValidate
          >
            <div
              className="fixed z-10 inset-0 overflow-y-auto"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                  className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                  aria-hidden="true"
                ></div>

                {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
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

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-end ">
                      <div className="flex-grow mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-lg leading-6 font-medium text-gray-900"
                          id="modal-title"
                        >
                          Add New Note to {customer.name}
                        </h3>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            Title *
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg flex rounded-md shadow-sm">
                              <input
                                type="text"
                                name="title"
                                id="title"
                                autoComplete="title"
                                className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                onChange={(e) => {
                                  handleAddNoteChange(e);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        {/* {errors.firstName.length > 0 && (
                          <div className="rounded-md bg-red-50 p-2 mt-1">
                            <div className="flex">
                              <div className="ml-2">
                                <div className="text-sm text-red-700">
                                  <span className="error">
                                    {errors.firstName}
                                  </span>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        )} */}
                        <label
                          htmlFor="content"
                          className="block mb-3 text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Content
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <div className="max-w-lg flex rounded-md shadow-sm">
                            <textarea
                              type="text"
                              name="content"
                              id="content"
                              autoComplete="content"
                              className="w-full h-80 block focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                              onChange={(e) => {
                                handleAddNoteChange(e);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-900 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        setAddingNote(false);
                        // setNoteErrors({
                        //   title: "",
                        //   content: "",
                        // })
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
      {/* View Note */}
      {viewNote ? (
        <>
          <div
            className="fixed z-10 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>

              {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
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

              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-end ">
                    <div className="flex-grow mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        {currentNote.title}
                      </h3>
                      <label
                        htmlFor="content"
                        className="block mb-3 text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        {currentNote.createdAt
                          ? toDateString(currentNote.createdAt)
                          : ""}
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="max-w-lg flex rounded-md shadow-sm">
                          <textarea
                            type="text"
                            name="content"
                            id="content"
                            autoComplete="content"
                            value={currentNote.content}
                            className="w-full h-80 block focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      setViewNote(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  ) : (
    ""
  );
}
