import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { productApi } from "../../../api/products";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(5),
    width: "100%",
    minHeight: "calc(100vh - 64px)",
  },
  card: {
    marginTop: "50px",
    maxWidth: 600,
    width: "100%",
    margin: theme.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  button: {
    margin: theme.spacing(2),
  },
  infoBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const getProduct = async () => {
      const response = await productApi(id);
      setProduct(response.data.data);
    };
    getProduct();
  }, [id]);

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }} className={classes.root}>
      <Typography variant="h3">{product?.categoryName}</Typography>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={product?.images[0]?.md}
          title={product?.name}
        />
        <CardContent className={classes.infoBox}>
          <Typography variant="h6">{product?.description}</Typography>
          <Typography variant="h6">{product?.price}$</Typography>
        </CardContent>
      </Card>
      <Link to={`/products/`}>
        <Button className={classes.button} variant="contained" color="primary">
          Back to Products
        </Button>
      </Link>
    </div>
  );
};

export default Product;