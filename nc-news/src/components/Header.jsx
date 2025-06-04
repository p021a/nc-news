import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="text-center p-4 bg-gray-900">
      <div className="mb-4 flex flex-row items-center justify-center">
        <span className="text-4xl leading-none text-green-400 font-bold">
          NC NEWS
        </span>
      </div>
      <nav className="bg-gray-800 py-2">
        <ul className="flex justify-center gap-8 list-none p-0 m-0">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-300 hover:text-green-400 transition ${
                  isActive ? "text-green-400 font-semibold" : ""
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-gray-300 hover:text-green-400 transition ${
                  isActive ? "text-green-400 font-semibold" : ""
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/topics"
              className={({ isActive }) =>
                `text-gray-300 hover:text-green-400 transition ${
                  isActive ? "text-green-400 font-semibold" : ""
                }`
              }
            >
              Topics
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/author-of-the-year"
              className={({ isActive }) =>
                `text-gray-300 hover:text-green-400 transition ${
                  isActive ? "text-green-400 font-semibold" : ""
                }`
              }
            >
              Author of the Year
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
