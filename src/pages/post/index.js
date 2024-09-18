import { useEffect, useState } from "react";
import Container from "../../components/Card/container";

// Fungsi untuk menghasilkan angka acak (optional)
const generateRandomNumber = () => Math.floor(Math.random() * 1000);

const Post = (props) => {
  const [cardsData, setCardsData] = useState([]);
  const { padding = "pt-32" } = props;

  useEffect(() => {
    // Fetch data dari API Laravel
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/post');
        const post = await response.json();

        const updatedCardsData = post.data.map((card) => ({
          id: card.id,
          title: card.title,
          imageSrc: card.image_url || `https://picsum.photos/200/300?random=${generateRandomNumber()}`,
        }));

        setCardsData(updatedCardsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className={`p-4 md:${padding}`}>
        <Container cards={cardsData} />
      </div>
    </div>
  );
};

export default Post;
