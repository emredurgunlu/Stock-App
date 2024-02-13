import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
import { fetchStart,loginSuccess,fetchFail,registerSuccess } from "../features/authSlice";
import { useDispatch } from "react-redux";
const useAuthCalls = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (userInfo) => {
    dispatch(fetchStart());

    try {
      // const data = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL}/auth/login`,
      //   userInfo
      // );
      // console.log("login data", data.data);
      // axios geleni data içine koyduğu için data.data şeklinde datayı çıkarmamız gerekiyor veya
      const {data} = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,userInfo
      );
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login işlemi basarili");
      navigate("/stock");

    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Login işlemi basarisiz");
      console.log(error);
    }
  };
  const register = async (userInfo) => {
    dispatch(fetchStart())
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/`,
        userInfo
      )
      // const { data } = await axiosPublic.post("/users/", userInfo)
      dispatch(registerSuccess(data))
      navigate("/stock")
    } catch (error) {
      dispatch(fetchFail())
    }
  };
  const logout = async () => {};
  return { login, logout, register };
};

export default useAuthCalls;
