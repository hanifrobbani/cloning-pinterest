import Image from "next/image";

const ActionButton = ({ iconSrc, altText }) => (
  <div className="p-1 hover:bg-slate-200 rounded-full transition cursor-pointer">
    <Image src={iconSrc} alt={altText} width={25} height={25} priority />
  </div>
);

export default ActionButton