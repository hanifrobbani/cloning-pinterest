import Image from "next/image";
import Link from "next/link";

const generateRandomNumber = () => Math.floor(Math.random() * 1000);

const Jelajah = () => {
  const cardData = [
    {
      id: 1,
      imgSrc: `https://picsum.photos/200/300?random=${generateRandomNumber()}`,
      caption: "Menyala konten ku🔥🔥",
      title: "Inspo editan dan doodle foto estetik",
    },
    {
      id: 2,
      imgSrc: `https://picsum.photos/200/300?random=${generateRandomNumber()}`,
      caption: "Mengalir konten mu💧💧",
      title: "Desain poster menarik dan kreatif",
    },
    {
      id: 3,
      imgSrc: `https://picsum.photos/200/300?random=${generateRandomNumber()}`,
      caption: "Terbangkan ide mu🕊️",
      title: "Inspirasi kreatif dengan ilustrasi modern",
    },
    {
      id: 4,
      imgSrc: `https://picsum.photos/200/300?random=${generateRandomNumber()}`,
      caption: "Ide-ide menari di kepala🎶",
      title: "Fotografi unik dan editing profesional",
    },
    {
      id: 5,
      imgSrc: `https://picsum.photos/200/300?random=${generateRandomNumber()}`,
      caption: "Tersulut semangatmu🔥",
      title: "Kolase seni dengan teknik mix media",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="md:pt-32 pt-10 px-8">
        <HeaderSection />
        <CardSection cardData={cardData} />
      </div>
    </div>
  );
};

const HeaderSection = () => {
  return (
    <div className="w-full text-center">
      <h1 className="font-bold text-2xl">4 September 2024</h1>
      <h1 className="font-bold text-4xl">Dapatkan Inspirasi</h1>
    </div>
  );
};

const CardSection = ({ cardData }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-10">
      {cardData.map((card) => (
        <div key={card.id} className="min-w-[30rem] flex">
          <Card imgSrc={card.imgSrc} caption={card.caption} title={card.title} />
        </div>
      ))}
    </div>
  );
};

const Card = ({ imgSrc, caption, title }) => {
  return (
    <Link href={'/'} className="relative w-full max-w-[40rem] h-full max-h-[20rem] overflow-hidden bg-white rounded-2xl shadow-lg">
      <div>
        <Image
          src={imgSrc}
          alt={title}
          layout="responsive"
          width={300}
          height={200}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black text-center bg-opacity-50 flex items-center justify-center flex-col">
          <div className="mt-24 px-4">
            <p className="text-white">{caption}</p>
            <h2 className="text-white text-3xl font-bold">{title}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Jelajah;
