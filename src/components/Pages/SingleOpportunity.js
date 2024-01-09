import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import OpportunityContext from "../../context/Opportunity/OpportunityContext";
import CustomerContext from "../../context/Customer/CustomerContext";
import { toDateString } from "./../../_helperFunctions";
import {
  OPP_STAGES,
  OPP_STAGES_WITH_VALUES,
  toDollarString,
} from "./../../_helperFunctions";
import CompletedStep from "../misc/CompletedStep";
import CurrentStep from "../misc/CurrentStep";
import UpcomingStep from "../misc/UpcomingStep";

export default function SingleOpportunity(props) {
  const { opportunityid } = useParams();

  const oppCtx = useContext(OpportunityContext);
  const {
    opportunity,
    loadOpportunity,
    submitDeleteOpportunity,
    submitConvertOpportunity,
    submitAssignContact,
    submitAddNote,
  } = oppCtx;
  const customerCtx = useContext(CustomerContext);
  const { customer, loadCustomer } = customerCtx;

  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [convertModalActive, setConvertModalActive] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [converted, setConverted] = useState(false);
  const [convertedProjectId, setConvertedProjectId] = useState("");
  const [convertData, setConvertData] = useState({
    title: "",
    dueDate: null,
  });
  const [assigningContact, setAssigningContact] = useState(false);
  const [assignContactData, setAssignContactData] = useState({
    contactid: null,
  });
  const [addingNote, setAddingNote] = useState(false);
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

  /* Processing for Status Bar */
  const generateBar = () => {
    const currentStage = OPP_STAGES_WITH_VALUES[opportunity.currentStage];

    let list = [];

    if (opportunity.currentStage === "Closed - Lost") {
      for (let i = 0; i < 4; i++) {
        list.push(
          <CompletedStep
            number={i}
            name={OPP_STAGES[i]}
            max={OPP_STAGES.length - 1}
          />
        );
      }
      list.push(
        <CompletedStep
          number={4}
          name="Closed - Lost"
          max={OPP_STAGES.length - 1}
          red={true}
        />
      );
      return list;
    }

    for (let i = 0; i < OPP_STAGES.length - 1; i++) {
      if (i < currentStage - 1) {
        list.push(
          <CompletedStep
            number={i}
            name={OPP_STAGES[i]}
            max={OPP_STAGES.length - 1}
          />
        );
      } else if (i === currentStage - 1) {
        list.push(
          <CurrentStep
            name={OPP_STAGES[i]}
            number={i}
            max={OPP_STAGES.length - 1}
          />
        );
      } else {
        list.push(
          <UpcomingStep
            name={OPP_STAGES[i]}
            number={i}
            max={OPP_STAGES.length - 1}
          />
        );
      }
    }

    return list;
  };
  const handleAddNoteChange = (e) => {
    e.preventDefault();
    setNoteData({
      ...noteData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await submitDeleteOpportunity(opportunityid);
      setDeleted(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleConversion = async (e) => {
    e.preventDefault();
    const newProject = await submitConvertOpportunity(
      opportunityid,
      convertData
    );
    setConvertedProjectId(newProject._id);
    setConverted(true);
  };

  const handleConvertFormChange = async (e) => {
    e.preventDefault();
    setConvertData({
      ...convertData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAssignContactFormChange = async (e) => {
    e.preventDefault();
    setAssignContactData({
      ...assignContactData,
      [e.target.name]: e.target.value,
    });
  };

  const sendAssignContactData = async (e) => {
    e.preventDefault();
    setAssigningContact(false);
    await submitAssignContact({
      contactid: assignContactData.contactid,
      opportunityid: opportunity._id,
    });
  };

  const sendNoteData = async (e) => {
    const fullData = {
      title: noteData.title,
      content: noteData.content,
      onModel: "Opportunity",
      ownerid: opportunity._id,
    };
    await submitAddNote(fullData);
    setAddingNote(false);
  };

  useEffect(() => {
    const loadEverything = async () => {
      await loadOpportunity(opportunityid);
      setLoading(false);
    };

    loadEverything();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <></>
  ) : converted ? (
    <Navigate to={"/app/projects/" + convertedProjectId} />
  ) : deleted ? (
    <Navigate to="/app/opportunities" />
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
            onClick={(e) => {
              e.preventDefault();
              setConvertModalActive(true);
            }}
          >
            Convert
          </button>
          <button
            type="button"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-red-900 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={(e) => {
              e.preventDefault();
              setDeleteModalActive(true);
            }}
          >
            Delete
          </button>
        </div>
      </div>
      {/* Divider */}
      <hr className="border-gray-300 mb-3" />
      {/* Information grid */}
      <div className="flex flex-row gap-x-20 gap-y-4 flex-wrap mb-3">
        <div>
          <p className="mb-1 text-xs">Customer</p>
          <p className="">
            {opportunity.forCustomer ? opportunity.forCustomer.name : "N/A"}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs">Value</p>
          <p className="">
            {toDollarString(
              opportunity.dollarValue ? opportunity.dollarValue : 0
            )}
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
          <p className="fs-5">
            {opportunity.mainContact
              ? opportunity.mainContact.firstName +
                " " +
                opportunity.mainContact.lastName
              : "N/A"}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs">Contact Email Address</p>
          <p className="fs-5">
            {opportunity.mainContact ? opportunity.mainContact.email : "N/A"}
          </p>
        </div>
        <div>
          <p className="mb-1 text-xs">Contact Phone Number</p>
          <p className="fs-5">
            {opportunity.mainContact
              ? opportunity.mainContact.phoneNumber
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300 mb-3" />
      <div className="mb-10">
        {/* <!-- This example requires Tailwind CSS v2.0+ --> */}
        <nav aria-label="Progress">
          <ol className="border border-gray-300 rounded-md divide-y divide-gray-300 lg:flex lg:divide-y-0">
            <React.Fragment>
              {generateBar().map((e) => {
                return e;
              })}
            </React.Fragment>
          </ol>
        </nav>
      </div>
      <div className="bg-gray-100 grid md:grid-cols-3 xl:col-span-1 gap-5">
        <div className="container flex justify-center">
          <div className="flex-grow sm:rounded-lg ">
            <div className="relative shadow-sm rounded-lg ">
              <div className="py-3 px-4 rounded-lg bg-purple-100  ">
                <div className="flex justify-between align-center py-2">
                  <h3 className="text-lg align-middle leading-6 font-medium text-gray-900 w-h-10">
                    Associated Contacts
                  </h3>
                </div>
                <div className="bg-white shadow overflow-hidden rounded-md max-h-52 overflow-scroll">
                  <ul className="divide-y divide-gray-200">
                    <li>
                      <div className="p-3 hover:bg-gray-100">
                        <button
                          className="w-full text-left"
                          onClick={async () => {
                            if (opportunity.forCustomer)
                              await loadCustomer(opportunity.forCustomer._id);
                            setAssigningContact(true);
                          }}
                        >
                          {" "}
                          + Assign Contact
                        </button>
                      </div>
                    </li>
                    {opportunity.associatedContacts ? (
                      opportunity.associatedContacts.map((e, i) => {
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
                    {opportunity.notes ? (
                      opportunity.notes.map((e, i) => {
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

      {/* MODAL for DELETE */}

      {deleteModalActive ? (
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  {/* <!-- Heroicon name: outline/exclamation --> */}
                  <svg
                    className="h-6 w-6 text-red-600"
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
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-title"
                  >
                    Delete {opportunity.title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete {opportunity.title}? All
                      of its data will be permanently deleted. This action
                      cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={(e) => {
                    handleDelete(e);
                  }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setDeleteModalActive(false);
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

      {/* MODAL for CONVERT */}

      {convertModalActive ? (
        <form
          onSubmit={(e) => {
            handleConversion(e);
          }}
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
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-purple-100 sm:mx-0 sm:h-10 sm:w-10">
                      {/* <!-- Heroicon name: outline/exclamation --> */}
                      <svg
                        className="h-6 w-6 text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="purple"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        Convert {opportunity.title}
                      </h3>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-4">
                        <label
                          for="name"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Project Name
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <div className="max-w-lg flex rounded-md shadow-sm">
                            <input
                              type="text"
                              name="title"
                              id="title"
                              autocomplete="title"
                              required
                              value={convertData.title}
                              className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                              onChange={(e) => {
                                handleConvertFormChange(e);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                        <label
                          for="name"
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                        >
                          Due Date
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <div className="max-w-lg flex rounded-md shadow-sm">
                            <input
                              type="date"
                              name="dueDate"
                              id="dueDate"
                              autocomplete="dueDate"
                              required
                              value={convertData.dueDate}
                              className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                              onChange={(e) => {
                                handleConvertFormChange(e);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to convert {opportunity.title}?
                          This will create a new project and change the current
                          opportunity to "Closed - Won".
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-900 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Convert
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      setConvertModalActive(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        ""
      )}

      {/* MODAL for ASSIGN CONTACT */}

      {assigningContact ? (
        <>
          <form
            onSubmit={(e) => {
              sendAssignContactData(e);
            }}
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
                          Assign Contact to {opportunity.title}
                        </h3>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-4">
                          <label
                            for="name"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            Select Contact:
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <div className="max-w-lg flex rounded-md shadow-sm">
                              <select
                                type="text"
                                name="contactid"
                                id="contactid"
                                autocomplete="contactid"
                                value={assignContactData.contactid}
                                className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                onChange={(e) => {
                                  handleAssignContactFormChange(e);
                                }}
                                required
                              >
                                <option>Select Contact</option>
                                {customer.contacts
                                  ? customer.contacts.map((e, i) => {
                                      return (
                                        <option key={i} value={e._id}>
                                          {e.firstName + " " + e.lastName}
                                        </option>
                                      );
                                    })
                                  : ""}
                              </select>
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
                        setAssigningContact(false);
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
                          Add New Note to {opportunity.name}
                        </h3>
                        <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-4">
                          <label
                            for="name"
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
                                autocomplete="title"
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
                          for="content"
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
                              autocomplete="content"
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
                        for="content"
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
                            autocomplete="content"
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
    </>
  );
}
