import Image from "next/image";

const ActionButton = ({ iconSrc, altText, onClick, isActive }) => (
  <div 
    className={`p-1 hover:bg-slate-200 rounded-full transition cursor-pointer}`}
    onClick={onClick}
  >
    <Image 
      src={iconSrc} 
      alt={altText} 
      width={25} 
      height={25} 
      priority 
      className="cursor-pointer"
    />
  </div>
);

export default ActionButton;