import "./Blog.scss";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Button,
  Avatar,
  Tooltip,
} from "@material-ui/core";
import axios from "axios";
import WithOpacity from "../hoc/WithOpacity";
import bmwLogo from "../../assets/logo.png";
import { useStyles } from "./Style";

const BlogPage = () => {
  const classes = useStyles();
  const [bmwImages, setBmwImages] = useState([]);
  const [prices, setPrices] = useState([]);
  const [tooltipContent, setTooltipContent] = useState(null);
  const [ blogs, setBlogs ] = useState([]);
  // eslint-disable-next-line
  const [cachedImages, setCachedImages] = useState([]);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchBmwImages = async () => {
      let response;
      response = await axios.get("https://api.unsplash.com/photos/random", {
        params: {
          query: "bmw",
          orientation: "landscape",
          count: 3,
          client_id: "nyUTTv4GKpqseU0B8t9tDJYBbRW63NtTk_E3l0Ckzi0",
        },
      });
      const bmwImages = response.data;
      setBmwImages(bmwImages);
  
      localStorage.setItem("bmwImages", JSON.stringify(bmwImages));
  
      const updatedBlogs = blogs.map((blog, index) => {
        return {
          ...blog,
          image: bmwImages[index].urls.regular,
        };
      });
  
      setBlogs(updatedBlogs);
    };
  
    fetchBmwImages();
  }, []);

  useEffect(() => {
    const savedBmwImages = localStorage.getItem("bmwImages");
    if (savedBmwImages) {
      const parsedBmwImages = JSON.parse(savedBmwImages);
      setBmwImages(parsedBmwImages);
    }
  }, []);
  

  useEffect(() => {
    const updatedPrices = bmwImages.map(() => getRandomPrice());
    setPrices(updatedPrices);
  }, [bmwImages]);

  const getRandomPrice = () => {
    return (Math.random() * 100).toFixed(2);
  };

  const handleAvatarHover = (event, name, surname, position) => {
    setTooltipContent({ name, surname, position });
  };

  const handleAvatarLeave = () => {
    setTooltipContent(null);
  };

  const handleSeeMoreClick = (blogId, index) => {
    const blog = blogs[index];
    navigate(`/blog-post/${blogId}`, { state: { blog } });
  };
  
  return (
    <section className={`section__blog ${classes.root}`}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item className={classes.firstGrid}>
            <img src={bmwLogo} alt="BMW Logo" className={classes.logo} />
            <Typography variant="h4" className={classes.title}>
              BMW Service Blog
            </Typography>
          </Grid>
          <Grid item className={classes.secondGrid}>
            <div className={classes.magazineContainer}>
              {bmwImages.map((image, index) => (
                <div className={classes.magazineItem} key={index}>
                  <img
                    src={image.urls.regular}
                    alt="BMW"
                    className={classes.magazineImage}
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.magazineDescription}
                  >
                    {index === 0 ? (
                      <>
                        Regular maintenance is key to keeping your BMW running
                        smoothly. In this blog post, we will share some tips and
                        tricks for maintaining your BMW and preventing costly
                        repairs down the road.
                      </>
                    ) : index === 1 ? (
                      <>
                        If you are looking to take your BMW to the next level,
                        there are plenty of performance upgrades available. In
                        this blog post, we will explore some of the best
                        upgrades for BMW enthusiasts, from exhaust systems to
                        suspension upgrades.
                      </>
                    ) : (
                      <>
                        BMW is known for its cutting-edge technology, and there
                        are always new innovations on the horizon. In this blog
                        post, we will take a look at some of the latest
                        technology developments from BMW, including autonomous
                        driving and electric vehicles.
                      </>
                    )}
                  </Typography>
                  <div className={classes.priceTag}>
                    <Tooltip
                      title={
                        tooltipContent ? (
                          <div className={classes.tooltip}>
                            <p>{`${tooltipContent.name} ${tooltipContent.surname}`}</p>
                            <p>{tooltipContent.position}</p>
                          </div>
                        ) : (
                          ""
                        )
                      }
                      placement="top"
                    >
                      <Avatar
                        alt="Service Provider"
                        src={image.user.profile_image.small}
                        className={classes.avatar}
                        onMouseEnter={(event) =>
                          handleAvatarHover(
                            event,
                            image.user.first_name,
                            image.user.last_name,
                            "Service Provider"
                          )
                        }
                        onMouseLeave={handleAvatarLeave}
                      />
                    </Tooltip>
                    <Typography variant="body2" color="textSecondary">
                      ${prices[index]}
                    </Typography>
                  </div>
                  <Button
                    onClick={() =>
                      handleSeeMoreClick(
                        index + 1,
                        bmwImages[index]?.urls?.regular
                      )
                    }
                    variant="contained"
                    className={classes.seeMoreButton}
                  >
                    See more
                  </Button>
                </div>
              ))}
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default WithOpacity(BlogPage);
