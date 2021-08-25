// Auth/Signup.js
import logo from "./../../images/main_logo_notext.png"
import React, { useState, useContext } from "react"

import { Link } from "react-router-dom"
import UserContext from "./../../context/User/UserContext"

export default function Signin() {
  const userCtx = useContext(UserContext)

  const { loginUser } = userCtx

  const [data, setData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleChange = (event) => {
    event.preventDefault()

    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const sendData = async (event) => {
    try {
      event.preventDefault()
      const error = await loginUser(data)
      if (error) setError(error.msg)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-white flex">
        <div className="hidden lg:block relative w-0 flex-1 bg-purple-900 text-white">
          <div className="container h-full flex flex-row justify-center items-center">
            <img
              src={logo}
              alt=""
              width="50"
              className="d-inline-block align-text-top"
            />
            <span className="font-body text-3xl m-2">Buggr</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <div className="mt-8">
              <div className="mt-6">
                <form
                  className="space-y-6"
                  onSubmit={(e) => {
                    sendData(e)
                  }}
                >
                  <div>
                    <label
                      // for="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      // for="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => {
                          handleChange(e)
                        }}
                      />
                    </div>
                  </div>
                  {error.length > 0 ? (
                    <div class="rounded-md bg-red-50 p-4">
                      <div class="flex">
                        <div class="flex-shrink-0">
                          {/* <!-- Heroicon name: solid/x-circle --> */}
                          <svg
                            class="h-5 w-5 text-red-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                        <div class="ml-3">
                          <span className="error">{error}</span>{" "}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-900 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Log In
                    </button>
                  </div>
                  <div className="relative">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-2 bg-white text-sm text-gray-500">
                        Don't have an account yet?{" "}
                        <Link to="/signup" className="underline">
                          Get Started!
                        </Link>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
