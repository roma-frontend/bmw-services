import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { userApi } from "../api/auth";
import { setUser } from "../store/slice/auth.slice";

const LinkListener = () => {
  useEffect(() => {
    const handleClick = (event) => {
      const link = event.target.closest("a");
      if (link && link.href && link.href.startsWith(window.location.origin)) {
        localStorage.setItem("_redirectPath", link.pathname);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
};

const RequireAuth = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  const checkUser = useCallback(async () => {
    const redirectPath = localStorage.getItem("_redirectPath");
    if (!localStorage.getItem("_token")) {
      if (redirectPath) {
        localStorage.removeItem("_redirectPath");
      }
      localStorage.setItem("_redirectPath", location.pathname);
      navigate("/login", { state: { redirectPath: location.pathname } });
    } else if (!user?.id) {
      try {
        const res = await userApi();
        dispatch(setUser(res.data.data));
        if (redirectPath) {
          navigate(redirectPath);
          localStorage.removeItem("_redirectPath");
        }
      } catch (error) {
        localStorage.removeItem("_token");
        navigate("/login", { state: { redirectPath: location.pathname } });
      }
    }
  }, [dispatch, navigate, user, location]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <>
      <LinkListener />
      {children}
    </>
  );
};

export default RequireAuth;