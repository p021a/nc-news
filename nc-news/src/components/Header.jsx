import React from "react";

export default function Header() {
  return (
    <header className="text-center p-4">
      <div className="mb-4 flex flex-row items-center justify-center">
        <span className="text-4xl leading-none text-green-600 font-bold">
          NC NEWS
        </span>
      </div>
      <nav className="bg-green-900 bg-opacity-90 py-2">
        <ul className="flex justify-center gap-8 list-none p-0 m-0">
          <li>
            <a
              href="/"
              className="text-green-300 hover:text-green-500 transition colors"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/about"
              className="text-green-300 hover:text-green-500 transition colors"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="/topics"
              className="text-green-300 hover:text-green-500 transition colors"
            >
              Topics
            </a>
          </li>
          <li>
            <a
              href="/author-of-the-year"
              className="text-green-300 hover:text-green-500 transition colors"
            >
              Author of the Year
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
