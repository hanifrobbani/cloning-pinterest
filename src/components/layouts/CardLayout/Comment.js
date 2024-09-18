import Image from "next/image";

const Comment = ({ username, comment }) => (
    <div className="flex justify-start mt-10 gap-4">
      <img src="/fellows.png" alt="Profile Image" className="rounded-full cursor-pointer object-cover max-h-12" priority />
      <div className="flex flex-col">
        <div className="flex gap-2 items-center flex-wrap">
          <p className="font-bold hover:underline cursor-pointer">{username}</p>
          <p>{comment}</p>
        </div>
        <div className="flex gap-4 items-center mt-2">
          <p className="font-semibold text-slate-600 text-sm">Balas</p>
          <Image src="/like.svg" alt="Like Icon" width={15} height={15} className="object-cover cursor-pointer" priority />
          <Image src="/option.svg" alt="Options Icon" width={15} height={15} className="object-cover cursor-pointer" priority />
        </div>
      </div>
    </div>
  );

  export default Comment;