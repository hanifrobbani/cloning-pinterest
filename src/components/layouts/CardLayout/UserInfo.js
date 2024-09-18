const UserInfo = ({ username, followers }) => (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-2">
        <img src="/fellows.png" alt="User Profile" width={45} height={45} className="rounded-full object-cover" />
        <div className="block">
          <p className="font-bold">{username}</p>
          <p>{followers} pengikut</p>
        </div>
      </div>
      <button className="border border-black font-semibold px-4 py-2 rounded-full hover:bg-slate-200">
        Ikuti
      </button>
    </div>
  );

  export default UserInfo