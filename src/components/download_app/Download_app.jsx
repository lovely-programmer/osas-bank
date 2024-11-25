import "./download_app.css";

export default function Download_app() {
  return (
    <div className="download_app_container">
      <div className="right">
        <img src="./zelle_img.avif" alt="" />
      </div>
      <div className="left">
        <h2>Banking in the palm of your hand</h2>
        <p className="header_text">
          Our Wells Fargo Mobile® app gives you fast and secure access to your
          finances
        </p>
        <div className="download_list">
          <p>Check your account balance</p>
          <p>View your latest FICO® Score1</p>
          <p>Send and receive money with Zelle®2</p>
        </div>
        <div className="download_bottom">
          <p className="p_download">Download our app</p>
          <div className="download_buttons">
            <a href="#">
              <img src="./apple.jpg" alt="" />
              <span>Apple Store</span>
            </a>
            <a href="#">
              <img src="./google_play.jpg" alt="" />
              <span>Google play</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
