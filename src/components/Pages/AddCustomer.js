import React, { useContext, useState } from "react"
import { Redirect } from "react-router-dom"
import CustomerContext from "../../context/Customer/CustomerContext"
import OrgContext from "../../context/Organization/OrgContext"

export default function EditCustomer(props) {
  const customerCtx = useContext(CustomerContext)
  const { customerid, submitCreateCustomer } = customerCtx

  const orgCtx = useContext(OrgContext)
  const { org, loadOrg } = orgCtx

  const [data, setData] = useState({
    name: "",
    belongsTo: org._id,
  })
  const [editing, setEditing] = useState(true)

  const handleChange = (e) => {
    e.preventDefault(e)
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const sendData = async (e) => {
    e.preventDefault()
    try {
      await submitCreateCustomer(data)
      // Redirect to customer page
      loadOrg(org._id)
      setEditing(false)
    } catch (error) {
      console.log(error)
    }
  }

  return editing ? (
    <div>
      <form
        class="space-y-8 divide-y divide-gray-200"
        onSubmit={(e) => {
          sendData(e)
        }}
      >
        <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Add a New Customer
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Name
                </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <div class="max-w-lg flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autocomplete="name"
                      value={data.name}
                      class="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                      onChange={(e) => {
                        handleChange(e)
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-5">
          <div class="flex justify-end">
            <button
              type="button"
              class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={(e) => {
                setEditing(false)
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <Redirect to={"/app/customers/"} />
  )
}