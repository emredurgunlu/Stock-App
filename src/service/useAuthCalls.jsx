// Bu dosyanın adı service yerine api de olabilir

// import axios from "axios"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
import { useNavigate } from "react-router-dom"
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice"
import { useDispatch } from "react-redux"
// import {  useSelector } from "react-redux"
import useAxios from "./useAxios"

const useAuthCalls = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const { token } = useSelector((state) => state.auth)
  const { axiosWithToken, axiosPublic } = useAxios()

  const login = async (userInfo) => {
    dispatch(fetchStart())
    try {
      // const { data } = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL}/auth/login/`,
      //   userInfo
      // )
      const { data } = await axiosPublic.post("/auth/login/", userInfo)
      dispatch(loginSuccess(data))
      toastSuccessNotify("Login işlemi basarili.")
      // navigate hooku (ve diğer react hookları) sadece jsx dönüyorsa yani react component içinde çalışır
      // sadece js kodları içinde çalışmaz.
      // sırf navigate hookunu çalıştırabilmek için react component kullanmak mantıksız çünkü jsx döndürmeyeceğiz
      // navigate hookunu sadece js kodları içinde çalıştırabilmek için js kodlarının custom hook olması gerekir
      // custom hook içinde react componenti gibi hook çağırabileceksin ve jsx'in olmayacak.
      // peki js kodlarını nasıl custom hooka çeviririz:
      // 1- dosya adı use ile başlamalıdır
      // 2- rafce yap, react componenti başlatıyor gibi ama ilk harfi küçük başlayacak const useAuthCalls = () gibi
      // en üst satır import React from 'react'i sil.
      // return içindeki divi sil. jsx döndürmeyeceksin. js kodlarını return'ün üstüne yapıştır
      // yapıştırdığın js kodlarının fonksyon adlarını return et
      navigate("/stock")
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify("Login işlemi başarisiz oldu.")
      console.log(error)
    }
  }

  const register = async (userInfo) => {
    dispatch(fetchStart())
    try {
      // const { data } = await axios.post(
      //   `${process.env.REACT_APP_BASE_URL}/users/`,
      //   userInfo
      // )
      const { data } = await axiosPublic.post("/users/", userInfo)
      dispatch(registerSuccess(data))
      navigate("/stock")
    } catch (error) {
      dispatch(fetchFail())
    }
  }

  const logout = async () => {
    dispatch(fetchStart()) // dispatchleri yapmasak da olur logout işlemi başlamış mı bitmiş mi bunu kontrol etmeye çok da gerek yok
    try {
      // Normalde logout işlemi get değil posttur. Ama bu uygulamanın backendi yazılırken get olarak yazılmış
      // get işlemi ile apiden bilgi alınırken aynı zamanda header bölümü apiye gönderiliyor
      // headers bölümünde kullanıcının tokeni olduğundan serverda ilgili kullanıcın log out işlemi yapılıyor ve ona ayrılan kaynaklar serbest bırakılıyor
      // await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {
      //   headers: { Authorization: `Token ${token}` },
      // })
      // axiosWithToken("/auth/logout/") veya axiosWithToken.get("/auth/logout/") aynı.
      // base url'in devamına gelecek olan şeyi ekliyoruz "/auth/logout/"
      await axiosWithToken("/auth/logout/")
      toastSuccessNotify("Çıkış işlemi başarili.")
      dispatch(logoutSuccess())
      // navigate("/") bilgiler silinince zaten private routedan dolayı buraya "/" yani login sayfasına gideceği için bu satıra gerek yok
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify("Çıkış işlemi başarisiz oldu.")
    }
  }

  return { login, register, logout }
}

export default useAuthCalls
