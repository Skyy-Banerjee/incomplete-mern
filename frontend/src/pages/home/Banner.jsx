import { Link } from "react-router-dom";
import bannerImg from "../../assets/header.png";

const Banner = () => {
  return (
    <div className="section__container header__container">
      <div className="header__content z-30">
        <h4 className="uppercase">UP TO 20% discount on</h4>
        <h1>Women's Fashion</h1>
        <p>
          Unleash your unique style with our exclusive collection of women's
          fashion! From timeless classics to trendy must-haves, redefine your
          wardrobe with confidence, elegance, and flair. Because fashion is all
          about you!
        </p>
        <button className="btn">
          <Link to="/shop">EXPLORE NOW</Link>
        </button>
      </div>
      <div className="header__image">
        <img src={bannerImg} alt="banner-img" />
      </div>
    </div>
  );
};

export default Banner;
