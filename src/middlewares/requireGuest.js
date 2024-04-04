import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NavigationGuard = ({ children }) => {
  const navigate = useNavigate();

  const handleNavigation = useCallback(() => {
    if (localStorage.getItem("_token")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    handleNavigation();
  }, [handleNavigation]);

  return (
    <>
        {children}
        </>
  );
};

export default NavigationGuard;