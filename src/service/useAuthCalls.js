import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { useNavigate } from "react-router-dom";

const useAuthCalls = () => {
  const navigate = useNavigate();
  const login = async (userInfo) => {
    try {
      const data = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        userInfo
      );
      toastSuccessNotify("Login işlemi basarili");
      navigate("/stock");
      console.log("login data", data.data);
      // axios geleni data içine koyduğu için data.data şeklinde datayı çıkarmamız gerekiyor veya
      // const {data} = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL}/auth/login`
      // );
      // console.log("login data", data.data);
    } catch (error) {
      toastErrorNotify("Login işlemi basarisiz");
      console.log(error);
    }
  };
  return { login };
};

export default useAuthCalls;
