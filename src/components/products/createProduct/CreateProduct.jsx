import React, { useState } from "react";
import { setLoader } from "../../../store/slice/global.slice";
import { makeStyles } from "@material-ui/core/styles";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box, Input } from "@mui/material";
import { useDispatch } from "react-redux";
import { createNewProductApi } from "../../../api/products";
import { uploadImageApi } from "../../../api/uploadImage";
import { styled } from "@mui/material/styles";

const useStyles = makeStyles(() => ({
  button: {
    background: "linear-gradient(to right top, #051937, #223a5c, #3e5f83, #5c86ac, #7cb0d6)",
  },
}));

const StyledInput = styled(Input)({
  "& > input[type='file']": {
    display: "none",
  },
  "& > label": {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "10px",
    display: "inline-block",
    cursor: "pointer",
    transition: "250ms",

    '&:hover': {
        background: "linear-gradient(90deg, rgba(42,71,94,1) 0%, rgb(114 164 202) 47%, rgba(15,104,130,1) 100%)",
        color: "#fff",
        transition: "250ms",
    }
  },
});

const CreateProduct = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    categoryName: "",
    images: [],
    description: "",
    price: "",
  });

  const formik = useFormik({
    initialValues: {
      categoryName: "",
      description: "",
      price: "",
    },
    onSubmit: async (values) => {
      dispatch(setLoader(true));
      try {
        if (!values.categoryName || !values.description || !values.price) {
          toast.error("All fields are required");
          dispatch(setLoader(false));
        }
        const newProductData = {
          categoryName: values.categoryName,
          description: values.description,
          price: values.price,
        };

        const uploadedImages = await uploadImageApi(product.images);
        if (uploadedImages.success) {
          newProductData.images = uploadedImages.data;
        } else {
          dispatch(setLoader(false));
          toast.error("Failed to upload images");
          return;
        }

        const createdProduct = await createNewProductApi(newProductData);
        if (createdProduct.id) {
          toast.success("Product created successfully");
          dispatch(setLoader(false));
          navigate("/products");
        } else {
          dispatch(setLoader(false));
          toast.error("Failed to create product");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    },
  });

  return (
    <div className="root">
      <form className="form" onSubmit={formik.handleSubmit}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          maxWidth={640}
          margin="auto"
          padding={5}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
        >
          <Typography variant="h2" fontFamily="Poppins" textAlign="center">
            Create Product
          </Typography>
          <TextField
            name="categoryName"
            fullWidth={true}
            margin="normal"
            label="Category Name"
            variant="outlined"
            placeholder="Enter category name"
            value={product.categoryName}
            onChange={(e) => setProduct({ ...product, categoryName: e.target.value })}
          />
          <StyledInput
            name="images"
            type="file"
            fullWidth={true}
            margin="normal"
            disableUnderline={true}
            inpProps={{ accept: "image/*", multiple: true }}
            onChange={(e) => setProduct({ ...product, images: [...product.images, ...e.target.files] })}
            id="image-upload"
            inputProps={{ "aria-labelledby": "image-upload" }}
            endAdornment={<label htmlFor="image-upload">Choose files</label>}
          />
          <TextField
            name="description"
            fullWidth={true}
            margin="normal"
            label="Description"
            variant="outlined"
            placeholder="Enter description"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
          <TextField
            name="price"
            fullWidth={true}
            margin="normal"
            label="Price"
            variant="outlined"
            placeholder="Enter price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
          <Button
            className={classes.button}
            type="submit"
            disabled={!formik.isValid}
            style={{
              fontFamily: "Poppins",
              marginTop: 3,
              marginBottom: 2,
              width: "60%",
            }}
            variant="contained"
          >
            Create
          </Button>
        </Box>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateProduct;