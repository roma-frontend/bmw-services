import React, { useState, useEffect, useMemo, } from "react";
import "./Products.scss";
import { Container, Button } from "@material-ui/core";
import Slideshow from "./Slider/Slider";
import Dialog from "./dialog/Dialog";
import bmwImg from "../../assets/87186155.png";
import WithOpacity from "../hoc/WithOpacity";

const Products = () => {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    let timer;
    if (!showImage) {
      timer = setTimeout(() => {
        setShowImage(true);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [showImage]);

  const scrollToBwm = useMemo(() => {
    return () => {
      const bwmElement = document.getElementById("bwm");
      bwmElement.scrollIntoView({ behavior: "smooth" });
    };
  }, []);

  return (
    <>
      <section className="product__section">
        <Container className="product__container">
          <div className="product__content">
            <div className="text__box">
              <h2>Creating a Successful Online Business</h2>
              <p className="product__subtitle">
                In today is digital age, having a strong online presence is
                crucial for any business to succeed.
              </p>
              <Button
                onClick={scrollToBwm}
                className="product__button"
                variant="contained"
              >
                See more
              </Button>
            </div>
            <img
              loading="lazy"
              src={bmwImg}
              width="450px"
              className={`${showImage ? "show" : ""} blackImage`}
              alt="BMW car"
            />
          </div>
        </Container>
      </section>
      <section className="bmw__section" id="bwm">
        <Container className="product__container bmw-container">
          <h2 className="bmw-title">BMW Cars and SUVs</h2>
          <p className="bmw-subtitle">
            BMW vehicles combine cutting-edge technology with sleek design to
            create a driving experience like no other. Explore our lineup of
            cars and SUVs to find the perfect match for you.
          </p>
          <Slideshow />
        </Container>
      </section>
      <Container className="product__container">
        <Dialog />
      </Container>
    </>
  );
};

export default WithOpacity(Products);