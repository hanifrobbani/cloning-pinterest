// components/Container.js
import Card from './card';

const Container = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-7xl m-auto pb-10">
      {cards.map((card) => (
        <Card key={card.id} id={card.id} imageSrc={card.imageSrc} title={card.title} />
      ))}
    </div>
  );
};

export default Container;
