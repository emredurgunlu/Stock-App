// import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import useAxios from "./useAxios";
import {
  fetchStart,
  loginSuccess,
  fetchFail,
  registerSuccess,
  logoutSuccess,
} from "../features/authSlice";
import { useDispatch } from "react-redux";
const useAuthCalls = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.auth);
  const { axiosWithToken, axiosPublic } = useAxios();
  const login = async (userInfo) => {
    dispatch(fetchStart());

    try {
      // const data = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL}/auth/login`,
      //   userInfo
      // );
      // console.log("login data", data.data);
      // axios geleni data içine koyduğu için data.data şeklinde datayı çıkarmamız gerekiyor veya
      // const { data } = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL}/auth/login`,
      //   userInfo
      // );
      const { data } = await axiosPublic.post("/auth/login/", userInfo);
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
    dispatch(fetchStart());
    try {
      // const { data } = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL}/users/`,
      //   userInfo
      // );
      const { data } = await axiosPublic.post("/users/", userInfo);
      dispatch(registerSuccess(data));
      navigate("/stock");
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  const logout = async () => {
    dispatch(fetchStart()); // fetchStart bu satır olmasa da olur. logout işlemi için gerekli değil
    try {
      // await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {
      //   headers: { Authorization: `Token ${token}` },
      // });
      // Normalde logout post olur ama burda get olguğu için zaten default olarak axiosWithToken.get oluyor
      await axiosWithToken("/auth/logout/");
      toastSuccessNotify("Çıkış işlemi başarili.");
      dispatch(logoutSuccess());
      // navigate("/")
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Çıkış işlemi başarisiz oldu.");
    }
  };
  return { login, logout, register };
};

export default useAuthCalls;
