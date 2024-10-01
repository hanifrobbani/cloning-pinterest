// components/Container.js
import Card from './card';

const Container = ({ cards }) => {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 max-w-7xl mx-auto p-4">
      {cards.map((card) => (
        <div key={card.id} className="mb-4 break-inside-avoid">
          <Card
            id={card.id}
            imageSrc={card.imageSrc}
            title={card.title}
            user={card.user}
          />
        </div>
      ))}
    </div>
  );
};

export default Container;