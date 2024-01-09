import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import OpportunityContext from "../../context/Opportunity/OpportunityContext";
import OrgContext from "../../context/Organization/OrgContext";
import { toDateString, OPP_STAGES } from "../../_helperFunctions";

export default function EditOpportunity() {
  const opportunityCtx = useContext(OpportunityContext);
  const { submitCreateOpportunity } = opportunityCtx;

  const orgCtx = useContext(OrgContext);
  const { org, loadOrg } = orgCtx;

  const [data, setData] = useState({
    title: "",
    openedDate: null,
    closeDate: null,
    dollarValue: 0,
    currentStage: "New",
    belongsTo: org._id,
    forCustomer: "",
  });
  const [editing, setEditing] = useState(true);
  const [errors, setErrors] = useState({
    title: "",
    forCustomer: "",
  });

  const handleChange = (e) => {
    e.preventDefault(e);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    const { name, value } = e.target;

    switch (name) {
      case "title":
        setErrors({
          ...errors,
          [name]: value.length < 1 ? "Opportunity's Title cannot be empty" : "",
        });
        break;
      case "forCustomer":
        setErrors({
          ...errors,
          [name]:
            value === "Select Customer" ? "Customer cannot be left blank" : "",
        });
        break;

      default:
        break;
    }
  };

  const sendData = async (e) => {
    e.preventDefault();

    if (validateForm(errors)) {
      try {
        await submitCreateOpportunity(data);
        // Navigate to customer page
        loadOrg(org._id);
        setEditing(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  };

  return editing ? (
    <div>
      <form
        className="space-y-8 divide-y divide-gray-200"
        onSubmit={(e) => {
          sendData(e);
        }}
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Opportunity
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  for="name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Title
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      autocomplete="title"
                      value={data.title}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                </div>
                {errors.title.length > 0 && (
                  <div className="rounded-md bg-red-50 p-2 mt-1">
                    <div className="flex">
                      <div className="ml-2">
                        <div className="text-sm text-red-700">
                          <span className="error">{errors.title}</span>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  for="name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Customer
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                    <select
                      type="number"
                      name="forCustomer"
                      id="forCustomer"
                      autocomplete="forCustomer"
                      defaultValue="Select Option"
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      <option>Select Customer</option>
                      {org.customers
                        ? org.customers.map((e, i) => {
                            return (
                              <option key={i} value={e._id}>
                                {e.name}
                              </option>
                            );
                          })
                        : ""}
                    </select>
                  </div>
                </div>
                {errors.forCustomer.length > 0 && (
                  <div className="rounded-md bg-red-50 p-2 mt-1">
                    <div className="flex">
                      <div className="ml-2">
                        <div className="text-sm text-red-700">
                          <span className="error">{errors.forCustomer}</span>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  for="name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Opened
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                      type="date"
                      name="openedDate"
                      id="openedDate"
                      autocomplete="openedDate"
                      value={toDateString(data.openedDate)}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  for="name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Close Date
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                      type="date"
                      name="closeDate"
                      id="closeDate"
                      autocomplete="closeDate"
                      value={toDateString(data.closeDate)}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  for="name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Dollar Value
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                      type="number"
                      name="dollarValue"
                      id="dollarValue"
                      autocomplete="dollarValue"
                      value={data.dollarValue}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  for="name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Current Stage
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                    <select
                      type="number"
                      name="currentStage"
                      id="currentStage"
                      autocomplete="currentStage"
                      defaultValue={data.currentStage}
                      className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    >
                      {OPP_STAGES.map((e, i) => {
                        return (
                          <option key={i} value={e}>
                            {e}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={(e) => {
                setEditing(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <Navigate to={"/app/opportunities/"} />
  );
}
