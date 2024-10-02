import Link from "next/link";
import Image from "next/image";

const Card = ({ imageSrc, title, id, user }) => {
  return (
    <div className="overflow-hidden bg-white">
      <Link href={`/post/details/${id}`}>
        <div className="relative group">
          <Image
            src={imageSrc}
            alt={title}
            layout="responsive"
            width={500}
            height={300}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:brightness-75 rounded-xl"
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-red-500 text-white rounded-full py-2 px-4 text-sm font-bold hover:bg-red-600">
              Simpan
            </button>
          </div>
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
            <button className="bg-gray-100 rounded-full p-2 hover:bg-gray-200">
              <Image src="/share.svg" alt="Share" width={20} height={20} />
            </button>
            <button className="bg-gray-100 rounded-full p-2 hover:bg-gray-200">
              <Image src="/option.svg" alt="Options" width={20} height={20} />
            </button>
          </div>
        </div>
      </Link>
      <div className="p-0">
        <h2 className="font-semibold text-sm mb-2 line-clamp-2">{title}</h2>
        <div className="flex items-center gap-2">
          <Image
            src="/fellows.png"
            alt="User Profile"
            width={24}
            height={24}
            className="w-6 h-6 rounded-full object-cover"
          />
          <p className="text-sm text-gray-600">{user}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;

// components/Card.js (Default)
// import Link from "next/link";
// import Image from "next/image";

// const Card = ({ imageSrc, title, id, user }) => {
//   return (
//     <div className="overflow-hidden bg-white">
//       <Link href={`/post/details/${id}`}>
//         <div className="relative group">
//           <img
//             src={imageSrc}
//             alt={title}
//             className="w-full h-auto object-cover transition-transform duration-300 group-hover:brightness-75 rounded-xl"
//           />
//           <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//             <button className="bg-red-500 text-white rounded-full py-2 px-4 text-sm font-bold hover:bg-red-600">
//               Simpan
//             </button>
//           </div>
//           <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
//             <button className="bg-gray-100 rounded-full p-2 hover:bg-gray-200">
//               <Image src="/share.svg" alt="Share" width={20} height={20} />
//             </button>
//             <button className="bg-gray-100 rounded-full p-2 hover:bg-gray-200">
//               <Image src="/option.svg" alt="Options" width={20} height={20} />
//             </button>
//           </div>
//         </div>
//       </Link>
//       <div className="p-0">
//         <h2 className="font-semibold text-sm mb-2 line-clamp-2">{title}</h2>
//         <div className="flex items-center gap-2">
//           <img
//             src="/fellows.png"
//             alt="User Profile"
//             className="w-6 h-6 rounded-full object-cover"
//           />
//           <p className="text-sm text-gray-600">{user}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;
