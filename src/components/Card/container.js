// components/Container.js
import Card from './card';

const Container = ({ cards }) => {
  return (
    <div className="flex flex-wrap gap-5 max-w-7xl m-auto justify-center md:justify-start pb-10">
      {cards.map((card) => (
        <div key={card.id} className="w-auto h-auto max-h-64">
          <Card id={card.id} imageSrc={card.imageSrc} title={card.title} />
        </div>
      ))}
    </div>
  );
};

export default Container;
