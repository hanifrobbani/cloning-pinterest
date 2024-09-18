// components/Card.js
import Link from "next/link";
import Image from "next/image";

const Card = ({ imageSrc, title, id }) => {
  return (
    <div className="overflow-hidden relative group h-min">
      <Link href={`/post/details/${id}`}>
        <div className="relative overflow-hidden bg-white shadow-md rounded-2xl">
          <img
            src={imageSrc}
            alt={title}
            className="object-cover w-full h-auto transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-50"
            style={{ aspectRatio: 'auto' }}
          />
          <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            <button className="bg-red-500 text-white rounded-full py-2 px-3 hover:bg-red-600 cursor-pointer focus:outline-none font-semibold">
              Simpan
            </button>
          </div>

          <div className="absolute bottom-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex gap-2">
            <button className="bg-white rounded-full p-2 focus:outline-none hover:bg-slate-100">
              <Image
                src="/share.svg"
                alt="Unduh Logo"
                width={25}
                height={25}
              />
            </button>
            <button className="bg-white rounded-full p-2 focus:outline-none hover:bg-slate-100">
              <Image
                src="/option.svg"
                alt="Unduh Logo"
                width={25}
                height={25}
              />
            </button>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <h1 className="font-semibold md:text-lg text-base leading-5 mb-1">{title}</h1>
        <div className="flex items-center gap-2">
          <img src="/fellows.png" alt="User Profile" width={30} height={30} className="rounded-full object-fill"/>
          <p>Username</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
