import React, { useContext, useState } from "react"
import { Link } from "react-router-dom"
import UserContext from "./../../context/User/UserContext.js"

export default function Settings() {
  const userCtx = useContext(UserContext)
  const { user, submitEditAccount, submitEditProfile } = userCtx

  const [data, setData] = useState({
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    pictureUrl: user.pictureUrl,
  })

  const handleChange = (e) => {
    e.preventDefault()
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const sendAccountData = (e) => {
    e.preventDefault()
    submitEditAccount({
      userid: user._id,
      email: data.email,
    })
  }

  const sendProfileData = (e) => {
    e.preventDefault()
    submitEditProfile({
      userid: user._id,
      firstName: data.firstName,
      lastName: data.lastName,
      pictureURL: data.pictureUrl,
    })
  }

  return (
    <div className="mb-3 ">
      <div className="flex-1 min-w-0 mb-5">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
          Settings
        </h2>
      </div>
      <div class="space-y-8 divide-y divide-gray-200">
        <div class="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <form>
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Account
              </h3>
            </div>

            <div class="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
              <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  for="first-name"
                  class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Email
                </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    autocomplete="email"
                    value={data.email}
                    class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                    onChange={(e) => {
                      handleChange(e)
                    }}
                  />
                </div>
              </div>
            </div>
            <div class="pt-5">
              <div class="flex justify-end">
                <button
                  type="submit"
                  class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={(e) => {
                    sendAccountData(e)
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
          <form class="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
            <div>
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Profile
              </h3>
            </div>
            <div class="space-y-6 sm:space-y-5">
              <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  for="firstName"
                  class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  First Name
                </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    autocomplete="firstName"
                    value={data.firstName}
                    onChange={(e) => {
                      handleChange(e)
                    }}
                    class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  for="lastName"
                  class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Last name
                </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    autocomplete="lastName"
                    value={data.lastName}
                    onChange={(e) => {
                      handleChange(e)
                    }}
                    class="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div class="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  for="photo"
                  class="block text-sm font-medium text-gray-700"
                >
                  Profile Picture
                </label>
                <div class="mt-1 sm:mt-0 sm:col-span-2">
                  <div class="flex items-center">
                    <span class="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                      <svg
                        class="h-full w-full text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </span>
                    <button
                      type="button"
                      disabled={true}
                      class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="pt-5">
              <div class="flex justify-end">
                <button
                  type="submit"
                  class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={(e) => {
                    sendProfileData(e)
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
