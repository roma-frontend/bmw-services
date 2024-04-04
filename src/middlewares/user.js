
import { useEffect } from "react";
import { userApi } from "../api/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slice/auth.slice";
import { setLoader, setError } from "../store/slice/global.slice";


const UserLoader = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoader(true));
      try {
        const res = await userApi();
        if (res.data?.data) {
          dispatch(setUser(res.data.data));
        } else {
          dispatch(setError("Failed to get user data"));
        }
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoader(false));
      }
    };

    if (!user || typeof user.id === "undefined") {
      fetchUser();
    }
  }, [dispatch, user]);

  return props.children;
};

export default UserLoader;
