import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { useSpring } from "react-spring";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Modal = ({ onClose, open = false }) => {
  const selectedProduct = useSelector((state) => state.active.product);
  const dialogAnimationProps = useSpring({
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { duration: 300 },
  });

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      style={dialogAnimationProps}
    >
      <DialogTitle>{selectedProduct?.name}</DialogTitle>
      <DialogContent>
        <img
          src={selectedProduct?.images?.[0]?.md}
          alt={selectedProduct?.name}
          style={{ maxWidth: "100%", maxHeight: "450px", objectFit: "cover" }}
        />
        <b>{selectedProduct?.categoryName}</b>
        <p>{selectedProduct?.description}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
        <Button color="primary">
          <Link className="btn-primary" to={`/products/${selectedProduct?.id}`}>
            See more
          </Link>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
