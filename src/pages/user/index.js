import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { router } from "next/router";
import Header from "@/components/head/header";

const Profile = () => {
  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    router.push("/user/login");
  };

  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  //membuat huruf pertama menjadi kapital
  const capitalizeFirstLetter = (str) => {
    if (!str) return ""; // Cek jika str null/undefined
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <>
      <Header title="Setting User" meta_description="Halaman setting user" />
      <div className="pt-28 w-full px-4 flex flex-col justify-center items-center">
        <div>
          <img
            className="max-w-32 rounded-full object-cover"
            src="/fellows.png"
          />
        </div>
        <div className="flex items-center flex-col">
          <h1 className="text-3xl font-semibold">
            {user.name ? capitalizeFirstLetter(user.name) : ""}
          </h1>
          <p className="text-base text-gray-600 text-center">{user.email}</p>
          <p className="font-semibold text-gray-600 text-center">0 mengikuti</p>
        </div>
        <div className="flex gap-4 mt-3">
          <button
            className="py-3 px-4 rounded-3xl bg-gray-200 font-semibold hover:bg-gray-300 transition duration-75"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button className="py-3 px-4 rounded-3xl bg-gray-200 font-semibold hover:bg-gray-300 transition duration-75">
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
