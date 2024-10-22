import dealsImg from "../../assets/deals.png";

function DealSection() {
  return (
    <section className="section__container deals__container">
      <div className="deals__image">
        <img src={dealsImg} alt="" />
      </div>
      <div className="deals__content">
        <h5>Get Up To 20% Discount</h5>
        <h4>Deals Of This Month</h4>
        <p>
          Don't miss out on our exclusive offers! Shop now and save up to 20% on
          select items. From accessories to beauty products, grab the best deals
          this month before they're gone!
        </p>
        <div className="deals__countdown flex-wrap">
          <div className="deals__countdown__card">
            <h4>14</h4>
            <p>Days</p>
          </div>
          <div className="deals__countdown__card">
            <h4>20</h4>
            <p>Hours</p>
          </div>
          <div className="deals__countdown__card">
            <h4>15</h4>
            <p>Mins</p>
          </div>
          <div className="deals__countdown__card">
            <h4>5</h4>
            <p>Secs</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DealSection;
