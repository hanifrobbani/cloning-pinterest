import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <>
      <nav className="fixed top-0 left-0 w-full hidden justify-start py-5 px-4 bg-white z-10 md:flex">
        <ul className="flex gap-3 items-center w-full">
          <li>
            <Image
              src="/pinterest.svg"
              alt="Pinterest Logo"
              className="rounded-lg cursor-pointer"
              width={30}
              height={30}
            />
          </li>
          <li
            className={`font-semibold ${
              router.pathname === "/" ? "bg-black text-white" : ""
            } py-3 px-4 rounded-full`}
          >
            <Link href="/">Beranda</Link>
          </li>
          <li
            className={`font-semibold ${
              router.pathname === "/jelajah" ? "bg-black text-white" : ""
            } py-3 px-4 rounded-full`}
          >
            <Link href="/jelajah">Jelajahi</Link>
          </li>
          <li
            className={`font-semibold ${
              router.pathname === "/post/create" ? "bg-black text-white" : ""
            } py-3 px-4 rounded-full`}
          >
            <Link href="/post/create">Buat</Link>
          </li>
          <li className="flex-grow">
            <div className="relative flex items-center w-full cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 w-5 h-5 text-gray-500 font-bold"
                viewBox="0 0 50 50"
                fill="currentColor"
              >
                <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
              </svg>
              <input
                type="text"
                placeholder="Cari"
                className="w-full pl-12 pr-4 py-2 border border-gray-200 bg-gray-200 rounded-full text-gray-800 focus:outline-none font-semibold focus:ring-4"
              />
            </div>
          </li>
        </ul>
        <ul className="flex items-center justify-end">
          <li className="p-3 rounded-full hover:bg-slate-200 cursor-pointer">
            <Image
              src="/bell.svg"
              alt="Bell Logo"
              className="rounded-lg"
              width={35}
              height={35}
            />
          </li>
          <li className="p-3 rounded-full hover:bg-slate-200 cursor-pointer">
            <Image
              src="/chat.svg"
              alt="Chat Logo"
              className="rounded-lg"
              width={40}
              height={40}
            />
          </li>
          <li className="hover:bg-slate-200 cursor-pointer p-3 rounded-full">
            <Link  href="/user" className="block bg-indigo-600 text-white font-semibold px-2 py-1 rounded-full">
              <p>M</p>
            </Link>
          </li>
        </ul>
      </nav>

      {/* bottom nav for mobile view */}
      <div className="fixed md:hidden bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <div className="flex h-full max-w-lg justify-center items-center mx-auto font-medium">
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            {/* <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Home
            </span> */}
          </button>
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <Image
              src="/search.svg"
              alt="Bell Logo"
              className="rounded-lg"
              width={25}
              height={25}
            />
            {/* <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Wallet
            </span> */}
          </button>
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
              />
            </svg>
            {/* <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Settings
            </span> */}
          </button>
          <button
            type="button"
            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <div className="hover:bg-slate-200 cursor-pointer rounded-full">
              <div className="bg-indigo-600 text-white font-semibold px-2 py-1 rounded-full">
                <p className="text-sm">M</p>
              </div>
            </div>
            {/* <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Profile
            </span> */}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;