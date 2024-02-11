import axios from "axios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
export const login = async (userInfo) => {
  try {
    const data = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/auth/login`,
      userInfo
    );
    toastSuccessNotify("Login işlemi basarili");
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
