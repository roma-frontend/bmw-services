import React from "react";
import "./Preview.css";
import myImage1 from "../../../assets/1.jpg";
import myImage2 from "../../../assets/2.jpg";
import myImage3 from "../../../assets/3.jpg";
import myImage4 from "../../../assets/cheng-feng-l5iWkE8hWuA-unsplash.jpg";
import myImage5 from "../../../assets/curtis-potvin-xiav1z8CDFw-unsplash.jpg";
import myImage6 from "../../../assets/redd-f-gvwI7qWdE1U-unsplash.jpg";
import WithOpacity from "../../hoc/WithOpacity";

const Preview = React.memo(() => {
  return (
    <section className="home__section">
      <h1 className="home__title">All about BMW</h1>
      <div className="container">
        <div className="card">
          <div className="card__content">
            <div
              className="card__front card__front--bmw"
              style={{ backgroundImage: `url(${myImage1})` }}
            >
              <h3 className="card__title">BMW Experience</h3>
              <p className="card__subtitle">Get behind the wheel</p>
            </div>

            <div
              className="card__back card__back--bmw .card__back--animated"
              style={{ backgroundImage: `url(${myImage4})` }}
            >
              <div className="overlay"></div>
              <p className="card__body">
                Experience the thrill of driving a BMW
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card__content">
            <div
              className="card__front card__front--bmw"
              style={{ backgroundImage: `url(${myImage2})` }}
            >
              <h3 className="card__title">BMW Lifestyle</h3>
              <p className="card__subtitle">Drive in style</p>
            </div>

            <div
              className="card__back card__back--bmw .card__back--animated"
              style={{ backgroundImage: `url(${myImage5})` }}
            >
              <div className="overlay"></div>
              <p className="card__body">
                Embrace the BMW lifestyle with our accessories and merchandise
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card__content">
            <div
              className="card__front card__front--bmw"
              style={{ backgroundImage: `url(${myImage3})` }}
            >
              <h3 className="card__title">BMW Legacy</h3>
              <p className="card__subtitle">Discover the history</p>
            </div>

            <div
              className="card__back card__back--bmw .card__back--animated"
              style={{ backgroundImage: `url(${myImage6})` }}
            >
              <div className="overlay"></div>
              <p className="card__body">
                Discover the rich history and heritage of BMW
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Preview.displayName = "Preview";

export default WithOpacity(Preview);