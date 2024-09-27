import "../header/Header.css";

function Home_section() {
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__section">
          <img src="./woman_dog.avif" alt="" />

          <div className="header__section-content">
            <div className="header__section--second__content">
              <h1 className="home__secthon_h1">A home of your own</h1>
              <p className="home__section_p">
                With low down payment options on a fixed-rate mortgage
              </p>
              <div className="button_design form__button">
                <button>Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home_section;
