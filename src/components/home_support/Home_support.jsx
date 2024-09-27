import "./home_support.css";

function Home_support() {
  return (
    <div className="support">
      <h1>Financial guidance and support</h1>
      <div className="support__container container">
        <div className="support__card">
          <div className="support__card-head">
            <img src="./typing_laptop.avif" alt="" />
          </div>
          <div className="support__card-base">
            <h3>Get tools. Get tips. Get peace of mind</h3>
            <p>Discover digital tools to help you budget, save, manage credit, and more</p>
            <div className="support__btn">
              <button>Access the toolkit</button>
            </div>
          </div>
        </div>
        <div className="support__card">
          <div className="support__card-head">
            <img src="./men_bycicle.avif" alt="" />
          </div>
          <div className="support__card-base">
            <h3>Save. Invest. Retire well.</h3>
            <p>Discover how to start saving to meet your retirement goals</p>
            <div className="support__btn">
              <button>Access the toolkit</button>
            </div>

          </div>
        </div>
        <div className="support__card">
          <div className="support__card-head">
            <img src="./women_baby.avif" alt="" />
          </div>
          <div className="support__card-base">
            <h3>Reimagine. Navigate. Move forward.</h3>
            <p>Discover steps that may help you manage life-changing events</p>
            <div className="support__btn">
              <button>Access the toolkit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home_support;