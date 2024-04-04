import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  RegisterValidator,
  RegisterInitialValues,
} from "../../validators/register";
import { registerApi } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { Typography, TextField, Button, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setLoader } from "../../store/slice/global.slice";
import { makeStyles } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WithOpacity from "../../components/hoc/WithOpacity";

const useStyles = makeStyles(() => ({
  button: {
    background:
      "linear-gradient(to left bottom, #bac6e1, #3D5D8C)",
    color: "#fff !important",
    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
    transition: "ease-in 250ms !important",
  }
}));

const Register = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector((state) => state.global.errors);

  const formik = useFormik({
    initialValues: RegisterInitialValues,
    validationSchema: RegisterValidator,
    onSubmit: async (values) => {
      try {
        dispatch(setLoader(true));
        const res = await registerApi(values);
        if (res.status === 201) {
          window.localStorage.setItem("_token", res.data.data.token);
          dispatch(setLoader(false));
          toast.success("Successfully registered the user");
          const redirectPath = localStorage.getItem("_redirectPath");
          if (redirectPath) {
            navigate(redirectPath); 
            localStorage.removeItem("_redirectPath"); 
          } else {
            navigate("/");
          }
        } else {
          dispatch(setLoader(false));
        }
      } catch (error) {
        console.log(error);
        dispatch(setLoader(false));
        toast.error("An error occurred. Please try again later.");
      }
    },
  });

  useEffect(() => {
    const redirectPath = localStorage.getItem("_redirectPath");
    if (redirectPath) {
      localStorage.setItem("_redirectPath", redirectPath);
    }
  }, []);

  return (
    <div className="root">
      <form className="form" onSubmit={formik.handleSubmit}>
        <Box
          className="formBox"
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
          <Typography variant="h3"  fontFamily="Poppins" textAlign="center">
            Register
          </Typography>
          <Typography
            variant="body1"
            marginY={1}
            fontFamily="Poppins"
            textAlign="center"
          >
            Enter your details to register
          </Typography>

          <TextField
            fullWidth
            margin="dense"
            label="First Name"
            variant="outlined"
            placeholder="Enter your first name"
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
          />

          <TextField
            fullWidth
            margin="dense"
            label="Last Name"
            variant="outlined"
            placeholder="Enter your last name"
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
          />

          <TextField
            fullWidth
            margin="dense"
            label="Email"
            variant="outlined"
            placeholder="Enter your email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={
              !!(formik.errors.email || (errors?.email && errors?.email[0]))
            }
            helperText={errors?.email && errors?.email[0]}
          />

          <TextField
            fullWidth
            margin="dense"
            type="password"
            label="Password"
            variant="outlined"
            placeholder="Enter your password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={
              !!(
                formik.errors.password ||
                (errors?.password && errors?.password[0])
              )
            }
            helperText={errors?.password && errors?.password[0]}
          />

          <TextField
            fullWidth
            margin="dense"
            type="password"
            label="Confirm Password"
            variant="outlined"
            placeholder="Enter your confirm password"
            name="password_confirmation"
            value={formik.values.password_confirmation}
            onChange={formik.handleChange}
            error={
              !!(
                formik.errors.password_confirmation ||
                (errors?.password_confirmation &&
                  errors?.password_confirmation[0])
              )
            }
          />

          <Button
            className={classes.button}
            type="submit"
            sx={{ fontFamily: "Poppins", marginTop: 2, width: "60%" }}
            variant="contained"
          >
            Register
          </Button>

          <Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
            Already have an account?{" "}
            <span className="inicitingText" onClick={() => navigate("/login")}>
              Login
            </span>
          </Typography>
        </Box>
      </form>
      <ToastContainer />
    </div>
  );
};

export default WithOpacity(Register);
