import React, { useContext, useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import CustomerContext from "../../context/Customer/CustomerContext";

export default function EditCustomer(props) {
  const { customerid } = useParams();

  const customerCtx = useContext(CustomerContext);
  const {
    customerid: id,
    customer,
    loadCustomer,
    submitEditCustomer,
  } = customerCtx;

  const [data, setData] = useState(customer);
  const [editing, setEditing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
  });

  const handleChange = (e) => {
    e.preventDefault(e);
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

    const { name, value } = e.target;

    switch (name) {
      case "name":
        setErrors({
          ...errors,
          [name]: value.length < 1 ? "Customer's name cannot be empty." : "",
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
        await submitEditCustomer(data);
        // Navigate to customer page
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

  useEffect(() => {
    const load = async () => {
      await loadCustomer(customerid);
      setData(customer);
      setLoading(false);
    };

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return editing ? (
    loading ? null : (
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
                  Customer
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
                    Name
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autocomplete="name"
                        value={data.name}
                        className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      />
                    </div>
                  </div>
                  {errors.name.length > 0 && (
                    <div className="rounded-md bg-red-50 p-2 mt-1">
                      <div className="flex">
                        <div className="ml-2">
                          <div className="text-sm text-red-700">
                            <span className="error">{errors.name}</span>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                  <label
                    for="mainContact"
                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Main Contact
                  </label>
                  <div className="mt-1 sm:mt-0 sm:col-span-2">
                    <div className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md">
                      <select
                        type="text"
                        name="mainContact"
                        id="mainContact"
                        autocomplete="mainContact"
                        defaultValue={
                          customer.mainContact ? customer.mainContact._id : null
                        }
                        className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                      >
                        {customer.contacts
                          ? customer.contacts.map((e, i) => {
                              return (
                                <option key={i} value={e._id}>
                                  {e.firstName +
                                    " " +
                                    (e.lastName ? e.lastName : "")}
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
    )
  ) : (
    <Navigate to={"/app/customers/" + customerid} />
  );
}
