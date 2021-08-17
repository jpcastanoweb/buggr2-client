import React, { useContext } from "react"
import defaultPicture from "./../../images/defaultPicture2.png"
import UserContext from "../../context/User/UserContext"
import { Link } from "react-router-dom"
import useComponentVisible from "../../hooks/useComponentVisible"

export default function UserNav() {
  const userCtx = useContext(UserContext)

  const { signout, user } = userCtx
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false)

  const submitSignout = (e) => {
    signout()
  }

  return (
    <div
      ref={ref}
      className="w-full h-14 bg-purple-900 flex flex-row p-3 justify-between items-center"
    >
      <div className="flex flex-row items-center text-indigo-100">
        <img
          className="inline-block h-6 w-6 rounded-full"
          src={defaultPicture}
          alt=""
        />
        <span className="ml-3">
          {user.firstName} {user.lastName}
        </span>
      </div>
      <div className="relative inline-block text-left">
        <button
          type="button"
          className="bg-purple-900 rounded-full flex items-center text-gray-400 hover:text-gray-600 "
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={(e) => {
            setIsComponentVisible(true)
          }}
        >
          <span className="sr-only">Open options</span>
          {/* <!-- Heroicon name: solid/dots-vertical --> */}
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
        {isComponentVisible ? (
          <div
            className="origin-bottom-left absolute right-0 bottom-10 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            <div className="py-1" role="none">
              {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
              <Link
                to="/app/settings"
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200"
                role="menuitem"
                tabindex="-1"
                id="menu-item-1"
              >
                Settings
              </Link>
              <hr className="mx-3" />
              <form method="POST" action="#" role="none">
                <button
                  type="submit"
                  className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                  role="menuitem"
                  tabindex="-1"
                  id="menu-item-3"
                  onClick={() => {
                    submitSignout()
                  }}
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}
