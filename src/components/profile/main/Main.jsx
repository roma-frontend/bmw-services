import React, { useState, useEffect } from "react";
import "./Main.scss";
import Dashboard from "../dashboard/Dashboard";
import { useStyles } from "./Styles";
import { Typography, Slider, Grow } from "@material-ui/core";
import axios from "axios";
import Modal from "./Modal";
import clsx from "clsx";

const Main = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleSliderChange = (event, newValue) => {
    setCurrentImage(newValue);
  };

  const handleImageClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get(
        "https://api.unsplash.com/photos/random",
        {
          params: {
            query: "bmw",
            orientation: "portrait",
            count: 4,
            client_id: "PYTAljcZ8RWFztm9k5afmX3ArqEP4n9o1wb8dnPvaAE",
          },
        }
      );
  
      const fetchedImages = response.data.map((image) => image.urls.regular);
      setImages(fetchedImages);
  
      localStorage.setItem("images", JSON.stringify(fetchedImages));
    };
  
    fetchImages();
  }, []);

  useEffect(() => {
  const savedImages = localStorage.getItem("images");
  if (savedImages) {
    const parsedImages = JSON.parse(savedImages);
    setImages(parsedImages);
  }
}, []);

  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [images]);


  

  return (
    <>
      <Dashboard
        open={drawerOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <section
        className={clsx(
          classes.root,
          { [classes.rootShift]: drawerOpen },
          "main__section"
        )}
      >
        <div className="content__main">
          <Typography variant="h4" className={classes.galleryTitle}>
            BMW Gallery
          </Typography>

          <div className={classes.sliderContainer}>
            <Slider
              value={currentImage}
              min={0}
              max={images.length - 1}
              onChange={handleSliderChange}
              className={classes.slider}
            />
            {images.map((image, index) => (
              <Grow
                in={currentImage === index}
                key={index}
                style={{ transformOrigin: "0 0 0" }}
                timeout={2500}
              >
                <img
                  src={image}
                  alt="Slider BMW"
                  className={classes.sliderImage}
                  onClick={handleImageClick}
                />
              </Grow>
            ))}
          </div>
        </div>
      </section>
      <Modal
        className={classes.modalBox}
        open={modalOpen}
        handleClose={handleCloseModal}
        image={images[currentImage]}
      />
    </>
  );
};

export default Main;
