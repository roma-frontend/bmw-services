import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import './Button.scss'

const HomeButton = () => {
  return (
    <Link to="/" >
      <Button variant="contained" color="primary" className="homeButton">
        Back to Home Page
      </Button>
    </Link>
  );
};

export default HomeButton;
