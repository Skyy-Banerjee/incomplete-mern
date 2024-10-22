import instaImg1 from "../assets/instagram-1.jpg";
import instaImg2 from "../assets/instagram-2.jpg";
import instaImg3 from "../assets/instagram-3.jpg";
import instaImg4 from "../assets/instagram-4.jpg";
import instaImg5 from "../assets/instagram-5.jpg";
import instaImg6 from "../assets/instagram-6.jpg";

function Footer() {
  return (
    <>
      <footer className="section__container footer__container">
        <div className="footer__col">
          <h4>CONTACT INFO</h4>
          <p>
            <span>
              <i className="ri-map-pin-2-fill"></i>{" "}
            </span>
            Lebaba Store. 56/A, Salem Street. Kolkata- 700 088
          </p>
          <p>
            <span>
              <i className="ri-mail-fill"></i>{" "}
            </span>
            support@lebaba.com
          </p>
          <p>
            <span>
              <i className="ri-phone-fill"></i>{" "}
            </span>
            (+033) 244 1139
          </p>
        </div>
        <div className="footer__col">
          <h4>COMPANY</h4>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Work With Us</a>
          <a href="/">Our Blogs</a>
          <a href="/">Terms & Conditions</a>
        </div>
        <div className="footer__col">
          <h4>USEFUL LINKS</h4>
          <a href="/">Help</a>
          <a href="/">Track Your Order</a>
          <a href="/">Men</a>
          <a href="/">Women</a>
          <a href="/">Kids</a>
        </div>
        <div className="footer__col">
          <h4>INSTAGRAM / FACEBOOK</h4>
          <div className="instagram__grid">
            <img src={instaImg1} alt="social-media_img" />
            <img src={instaImg2} alt="social-media_img" />
            <img src={instaImg3} alt="social-media_img" />
            <img src={instaImg4} alt="social-media_img" />
            <img src={instaImg5} alt="social-media_img" />
            <img src={instaImg6} alt="social-media_img" />
          </div>
        </div>
      </footer>
      <div className="footer__bar">
        Copyright ©️ 2024, Lebaba - <a href="https://instagram.com/skyy_banerjee">Soumadip "Skyy" Banerjee👨🏻‍💻. All rights reserved</a>
      </div>
    </>
  );
}

export default Footer;
