const RegisForm = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-50">
      <div className="max-w-xl rounded-3xl border px-5 py-7 shadow-lg bg-white">
        <div className="flex justify-center flex-col items-center mb-5">
          <img src="/pinterest.svg" className="w-10" />
          <h1 className="text-3xl font-bold mt-5">
            Mulai Semua di <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">Pinterest</span>
          </h1>
        </div>
        <form className="flex flex-col justify-center max-w-xs m-auto ">
          <label htmlFor="email" className="px-1">
            Username:
          </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="p-3 outline-none border-2 border-gray-300 focus:ring-4 rounded-2xl mb-2"
          />
          <label htmlFor="email" className="px-1">
            Email:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 outline-none border-2 border-gray-300 focus:ring-4 rounded-2xl mb-2"
          />
          <label htmlFor="password" className="px-1">
            Password:
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 outline-none border-2 border-gray-300 focus:ring-4 rounded-2xl"
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
            Sudah memiliki akun pinterest?
          </p>
          <a href="/user/login" className="text-sm text-blue-600 hover:underline cursor-pointer font-semibold">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisForm;
