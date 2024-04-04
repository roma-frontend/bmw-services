import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";
import AOS from "aos";
import "aos/dist/aos.css";
import { useStyles } from "./Style";
import { blogs } from "../blogs";
import "./BlogPost.scss";

const BlogPost = () => {
  const { blogId } = useParams();
  const location = useLocation();
  const imageUrl =
    location.state && location.state.imageUrl ? location.state.imageUrl : null;
  const classes = useStyles();

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, [blogId]);

  const blog = blogs.find((blog) => blog.id === parseInt(blogId));
  if (!blog) {
    return null;
  }

  const { content, price } = blog;

  const savedBmwImages = localStorage.getItem("bmwImages");
  const bmwImages = savedBmwImages ? JSON.parse(savedBmwImages) : [];

  return (
    <section className={`section__blog-post ${classes.root}`}>
      <Container className={classes.blogContainer}>
        <Typography variant="h3" component="h1" className={classes.title}>
          {blog.title.en}
        </Typography>
        <div className={classes.blogContent}>
          <img
            src={imageUrl || (bmwImages.length > 0 ? bmwImages[0].urls.regular : blog.image)}
            alt="Image"
            className={`${classes.image} post__image`}
            data-aos="fade-up"
            data-aos-duration="1000"
          />
          <Typography
            variant="body1"
            component="p"
            data-aos="fade-down"
            data-aos-duration="1000"
            className={classes.subtitle}
          >
            {content.en}
          </Typography>
        </div>
        <div className={classes.blogContent}>
          <div className={classes.blogPrice}>
            <Typography variant="h4" component="h2" className={classes.price}>
              {price}
            </Typography>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BlogPost;