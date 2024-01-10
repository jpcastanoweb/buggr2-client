import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrgContext from "../../context/Organization/OrgContext";
import { toDollarString } from "../../_helperFunctions";

export default function Customers() {
  console.log("hello");
  const orgCtx = useContext(OrgContext);
  const { customers, loadCustomers } = orgCtx;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("entered customers useEffect");
    const load = async () => {
      await loadCustomers();
      setLoading(false);
    };

    load();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <></>
  ) : (
    <div>
      {/* Heading */}
      <div className="mb-3 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Customers
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link to="/app/customers/new">
            <button
              type="button"
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-purple-900 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
      {/* Divider */}
      <hr className="border-gray-300 mb-3" />
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
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Project Revenue
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Open New Business
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Contact Name
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
                  {customers.map((elem, i) => {
                    return (
                      <tr key={i}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {elem.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {toDollarString(
                            elem.projects
                              ? elem.projects.reduce((a, b) => {
                                  return a + b.dollarValue;
                                }, 0)
                              : ""
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {toDollarString(
                            elem.opportunities
                              ? elem.opportunities.reduce((a, b) => {
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
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {elem.mainContact
                            ? elem.mainContact.firstName +
                              " " +
                              elem.mainContact.lastName
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            to={`/app/customers/edit/${elem._id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            to={`/app/customers/${elem._id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
