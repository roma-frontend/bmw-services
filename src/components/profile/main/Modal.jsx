import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  fadeUp: {
    opacity: 0,
    transform: "translateY(20px)",
    transition: "opacity 0.3s ease, transform 0.3s ease",

    "&.fadeUp-enter": {
      opacity: 0,
      transform: "translateY(-100%)",
    },
    "&.fadeUp-enter-active": {
      opacity: 1,
      transform: "translateY(0)",
    },
    "&.fadeUp-exit": {
      opacity: 1,
      transform: "translateY(-100%)",
    },
    "&.fadeUp-exit-active": {
      opacity: 0,
      transform: "translateY(100%)",
    },
  },
  modalChild: {
    position: "relative",
    width: "600px",
    height: "700px",
    padding: "0 !important",
    transition: "ease 350ms",
    "&:hover": {
      "& $modalImage": {
        filter: "brightness(0.4) contrast(1.2)",
      },
    },

    "&:hover $description": {
      visibility: "visible",
      opacity: 1,
    },
  },
  modalImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  description: {
    width: "80%",
    fontSize: "26px",
    color: "#fff",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    visibility: "hidden",
    transition: "350ms ease",
  },
}));

const Modal = ({ open, handleClose, image }) => {
  const classes = useStyles();
  const [randomDescription, setRandomDescription] = useState("");

  useEffect(() => {
    const descriptions = [
      "BMW Service: Experience top-notch maintenance and repairs for your BMW vehicle. Our skilled technicians use advanced diagnostic tools and genuine BMW parts to ensure optimal performance and reliability. Whether it is routine maintenance, engine tune-ups, or complex repairs, we are committed to providing exceptional service and keeping your BMW running smoothly on the road.",
      "Discover the ultimate driving experience with BMW. Our range of luxury vehicles combines cutting-edge technology, elegant design, and powerful performance. From sporty sedans to spacious SUVs, BMW offers a model for every driver. Explore our lineup and experience the thrill of the open road.",
      "BMW Service Excellence: Our dedicated team of certified technicians is committed to providing exceptional service for your BMW vehicle. From routine maintenance to complex repairs, we use the latest diagnostic tools and genuine BMW parts to ensure optimal performance and reliability. Trust us to keep your BMW running smoothly on the road.",
      "Unmatched BMW Maintenance: At our service center, we offer comprehensive maintenance solutions tailored to your BMW's specific needs. Our technicians undergo rigorous training to stay up-to-date with the latest BMW technologies, allowing us to provide top-notch service and ensure your BMW remains in peak condition.",
      "BMW Repair Specialists: When it comes to repairs, our skilled technicians have the expertise to diagnose and fix any issue your BMW may encounter. We understand the intricacies of BMW engineering and use advanced techniques to restore your vehicle to its original performance. Rest assured that your BMW is in capable hands.",
      "Genuine BMW Parts: We only use genuine BMW parts for all repairs and replacements. These parts are specifically designed to fit your BMW and meet the highest quality standards. By using genuine parts, we ensure that your BMW maintains its original performance, safety, and reliability.",
      "Convenient Service Options: We strive to make servicing your BMW as convenient as possible. From online appointment scheduling to complimentary loaner vehicles, we go the extra mile to accommodate your busy schedule. Experience hassle-free service and enjoy peace of mind knowing that your BMW is in the best hands.",
    ];

    const randomIndex = Math.floor(Math.random() * descriptions.length);
    setRandomDescription(descriptions[randomIndex]);
  }, []);
  return (
    <Dialog className={classes.modalParent} open={open} onClose={handleClose}>
      <DialogContent className={classes.modalChild}>
        <img className={classes.modalImage} src={image} alt="BMW" />
        <Typography className={`${classes.description} ${classes.fadeUp}`}>
          {randomDescription}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
