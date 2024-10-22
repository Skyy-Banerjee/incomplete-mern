import card1 from "../../assets/card-1.png";
import card2 from "../../assets/card-2.png";
import card3 from "../../assets/card-3.png";

const cards = [
  {
    id: 1,
    image: card1,
    trend: "Trending, 2024",
    title: "Women's Shirt",
  },
  {
    id: 2,
    image: card2,
    trend: "Trending, 2024",
    title: "Women's Dress",
  },
  {
    id: 3,
    image: card3,
    trend: "Trending, 2024",
    title: "Casuals",
  },
];

const HeroSection = () => {
  return (
    <section className="section__container hero__container">
      {cards.map((card) => {
        return (
          <div key={card.id} className="hero__card">
            <img src={card.image} alt="card-img" />
            <div className="hero__content">
              <p>{card.trend}</p>
              <h4>{card.title}</h4>
              <a href="#">Discover More</a>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default HeroSection;
