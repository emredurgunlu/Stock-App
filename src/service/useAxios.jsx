import axios from "axios"
import { useSelector } from "react-redux"

// https://axios-http.com/docs/instance
const useAxios = () => {
  const { token } = useSelector((state) => state.auth)

    // logout işlemi yaparken user tokeni gerekli, bunu header içinde gönderiyoruz.
    // tokeni global stateden aldığımız için useSelector'ün çalışması için bu dosyayı custom hooka çevirdik
    // bu şekilde axios instance kullanmamızın faydası her yerde header token kullanmak yerine sadece bir kere kullanmaktır
  const axiosWithToken = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
    headers: { Authorization: `Token ${token}` },
  })

  // axiosPublic tokensiz işlemler için
  const axiosPublic = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}`,
  })
  return { axiosWithToken, axiosPublic }
}

export default useAxios
