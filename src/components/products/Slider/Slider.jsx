import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTrail, animated, useSpring } from "react-spring";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  updateProduct,
  deleteProduct,
  setProducts,
} from "../../../store/slice/products.slice";
import {
  addFavoriteProduct,
  removeFavoriteProduct,
} from "../../../store/slice/products.slice";
import { setActiveProduct } from "../../../store/slice/active.slice";
import { setLoader } from "../../../store/slice/global.slice";
import { productsApi, updateProductApi } from "../../../api/products";
import Modal from "../dialog/Dialog";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Slider.scss";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(() => ({}));

const Slideshow = React.memo(() => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  useEffect(() => {
    (async () => {
      try {
        const res = await productsApi();
        dispatch(setProducts(res.data.data));
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  const toggleLike = async (id, isLiked) => {
    console.log("toggleLike", id, isLiked);
    try {
      const product = products.find((product) => product.id === id);
      const updatedProduct = {
        ...product,
        is_favorite: isLiked,
        color: isLiked ? "red" : "white",
      };
      await updateProductApi(id, updatedProduct);
      dispatch(updateProduct({ id: product.id, key: "is_favorite", value: isLiked }));
      if (isLiked) {
        dispatch(addFavoriteProduct(id)); 
        toast.success("Product added to favorites");
      } else {
        dispatch(removeFavoriteProduct(id));
        toast.success("Product removed from favorites");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update product");
    }
  };

  const trail = useTrail(products.length, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { duration: 200 },
  });
  const swiperAnimationProps = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { duration: 200 },
  });
  const handleClickEye = useCallback(
    (product) => {
      setSelectedProduct(product);
      dispatch(setActiveProduct(product));
      setOpenModal(true);
    },
    [dispatch]
  );
  const handleDelete = useCallback((id) => {
    setDeleteProductId(id);
    setOpenConfirmModal(true);
  }, []);

  const confirmDelete = useCallback(async () => {
    try {
      dispatch(setLoader(true));
      dispatch(deleteProduct(deleteProductId));
      toast.success("Successfully deleted ");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoader(false));
      setOpenConfirmModal(false);
    }
  }, [deleteProductId, dispatch]);

  return (
    <>
      <div className="products-wrapper">
        {products.length > 0 &&
          trail.map((animationProps, index) => (
            <animated.div
              key={products[index].id}
              className="one-product"
              style={animationProps}
            >
              <div className={"images"}>
                <animated.div style={swiperAnimationProps}>
                  <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{
                      type: "fraction",
                    }}
                    navigation={true}
                  >
                    {products[index].images.map((image) => (
                      <SwiperSlide key={image.md}>
                        <animated.div
                          className="one-slide"
                          style={animationProps}
                        >
                          <div className="icons">
                            <Button className="button__box">
                              <FontAwesomeIcon
                                className={`eye ${
                                  products[index].is_favorite ? "active" : ""
                                }`}
                                icon={faEye}
                                onClick={() => {
                                  handleClickEye(products[index]);
                                }}
                              />
                            </Button>
                            <Button className="button__box">
                              <FontAwesomeIcon
                                className="heart"
                                icon={faHeart}
                                color={
                                  products[index].is_favorite ? "red" : "white"
                                }
                                onClick={() =>
                                  toggleLike(
                                    products[index].id,
                                    !products[index].is_favorite
                                  )
                                }
                              />
                            </Button>
                            <Button className="button__box">
                              <FontAwesomeIcon
                                className={`${classes.deleteButton} deleteButton`}
                                icon={faTrash}
                                onClick={() => handleDelete(products[index].id)}
                              />
                            </Button>
                          </div>
                          <img
                            src={image.md}
                            alt={products[index].name}
                            style={{ maxWidth: "100%" }}
                          />
                        </animated.div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </animated.div>
              </div>
            </animated.div>
          ))}
        {selectedProduct && (
          <Modal
            onClose={() => setOpenModal(false)}
            open={openModal}
            selectedProduct={selectedProduct}
          />
        )}
      </div>
      <Dialog
        open={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <p>Do you really want to delete this product?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmModal(false)}>No</Button>
          <Button onClick={confirmDelete} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
});
Slideshow.displayName = "Slideshow";
export default Slideshow;
