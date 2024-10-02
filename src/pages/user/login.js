import { useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/head/header";
import Cookies from "js-cookie";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error message
    setErrorMessage("");
    try {
      // Kirim request login ke API Laravel
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Simpan token di cookie
        Cookies.set("token", data.access_token, { expires: 1 });
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/");
      } else {
        setErrorMessage(
          data.message || "Login failed, please check your credentials."
        );
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
    <Header
        title="Login"
        meta_description="Halaman autentikasi user"
      />
      <div className="w-full min-h-screen flex justify-center items-center bg-gray-50">
        <div className="max-w-xl rounded-3xl border px-5 py-7 shadow-lg bg-white">
          <div className="flex justify-center flex-col items-center mb-5">
            <img src="/pinterest.svg" className="w-10" alt="Pinterest logo" />
            <h1 className="text-3xl font-bold mt-5">
              Selamat datang di{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-indigo-500">
                Pinterest
              </span>
            </h1>
          </div>
          <form
            className="flex flex-col justify-center max-w-xs m-auto"
            onSubmit={handleSubmit}
          >
            {errorMessage && (
              <p className="text-red-500 text-center mb-4">{errorMessage}</p>
            )}
            <label htmlFor="email" className="px-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-3 outline-none border-2 border-gray-300 focus:ring-4 rounded-2xl mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="px-1">
              Password:
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-3 outline-none border-2 border-gray-300 focus:ring-4 rounded-2xl"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="mt-5 w-full text-center font-semibold text-white bg-red-600 rounded-full py-3"
            >
              Masuk
            </button>
          </form>

          <div className="flex justify-center mt-4 gap-1">
            <p className="text-sm font-semibold">
              Belum bergabung dengan pinterest?
            </p>
            <a
              href="/user/regis"
              className="text-sm text-blue-600 hover:underline cursor-pointer font-semibold"
            >
              Daftar
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
