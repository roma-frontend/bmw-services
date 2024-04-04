import "./FavoriteProducts.scss";
import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFavoriteProduct } from "../../../store/slice/products.slice";
import DeleteIcon from "@material-ui/icons/Delete";

function FavoriteProducts() {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(state => state.products.favoriteProducts);

  const slides =
    favoriteProducts.length > 0
      ? favoriteProducts.map((product) => ({
          id: product.id,
          image: product.images[0].md,
          title: product.name,
          description: product.description,
        }))
      : [];

  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [animationID, setAnimationID] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePointerDown = (index) => (event) => {
    setCurrentIndex(index);
    setStartPos(event.clientX);
    setIsDragging(true);
    setAnimationID(requestAnimationFrame(animation));
    sliderRef.current.classList.add("grabbing");
  };

  const handlePointerMove = (event) => {
    if (isDragging) {
      const currentPosition = event.clientX;
      setCurrentTranslate(prevTranslate + currentPosition - startPos);
    }
  };

  const handlePointerUp = () => {
    cancelAnimationFrame(animationID);
    setIsDragging(false);
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -100 && currentIndex < slides.length - 1)
      setCurrentIndex(currentIndex + 1);

    if (movedBy > 100 && currentIndex > 0) setCurrentIndex(currentIndex - 1);

    setPositionByIndex();

    sliderRef.current.classList.remove("grabbing");
  };

  const animation = () => {
    setSliderPosition();
    if (isDragging) setAnimationID(requestAnimationFrame(animation));
  };

  const setPositionByIndex = () => {
    setSliderPosition(currentIndex * -window.innerWidth);
    setPrevTranslate(currentTranslate);
  };

  const setSliderPosition = (translate) => {
    sliderRef.current.style.transform = `translateX(${translate}px)`;
  };

  const handlePointerLeave = (event) => {
    const sliderRect = sliderRef.current.getBoundingClientRect();
    if (
      event.clientX < sliderRect.left ||
      event.clientX > sliderRect.right ||
      event.clientY < sliderRect.top ||
      event.clientY > sliderRect.bottom
    ) {
      handlePointerUp();
    }
  };

  const handleDelete = (id) => {
    dispatch(removeFavoriteProduct(id));
  };

  return (
    <section className="favorite__section">
      <div
        className="slider-container"
        ref={sliderRef}
        onPointerLeave={handlePointerLeave}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="slide"
            onPointerDown={handlePointerDown(index)}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
          >
            <div className="img-box">
              <img src={slide.image} alt={slide.title} />
              <div
                className="delete-icon"
                onClick={() => handleDelete(slide.id)}
              >
                <DeleteIcon />
              </div>
            </div>

            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FavoriteProducts;