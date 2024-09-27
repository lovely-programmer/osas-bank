import "./serve_customer.css";

export default function Serve_customer() {
  return (
    <div className="serve_customer_container">
      <h2>Serving our customers and communities</h2>
      <p>
        It doesn't happen with one transaction, in one day on the job, or in one
        quarter. It's earned relationship by relationship.
      </p>
      <div className="serve_customer_boxs">
        <div className="serve_customer_box">
          <div className="head">
            <img src="./service_img.avif" alt="" />
          </div>
          <div className="base">
            <h3>Who we are</h3>
            <span>
              Wells Fargo helps strengthen communities through diversity,
              equity, and inclusion, economic empowerment, and sustainability.
            </span>
            <div className="button_design server_customer_button">
              <button>About Wells Fargo</button>
            </div>
          </div>
        </div>

        <div className="serve_customer_box">
          <div className="head">
            <img src="./service_img.avif" alt="" />
          </div>
          <div className="base">
            <h3>Why we're committed to communities</h3>
            <span>
              We don't just serve our communities—we are our communities. We're
              committed to helping customers and neighborhoods across the
              country thrive.
            </span>
            <div className="button_design server_customer_button">
              <button>Wells Fargo Stories</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
