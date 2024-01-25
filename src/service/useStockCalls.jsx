import {
  fetchStart,
  fetchFail,
  getStockSuccess,
  getProPurBranFirmSuccess,
} from "../features/stockSlice"
import useAxios from "./useAxios"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
import { useDispatch } from "react-redux"

const useStockCalls = () => {
  const { axiosWithToken } = useAxios()
  const dispatch = useDispatch()

  //   const getFirms = async () => {
  //     dispatch(fetchStart())
  //     try {
  //       const { data } = await axiosWithToken("/firms/")
  //       dispatch(getFirmsSuccess(data.data))
  //     } catch (error) {
  //       dispatch(fetchFail())
  //       toastErrorNotify("Firm bilgileri çekilemedi.")
  //     }
  //   }

  //   const getSales = async () => {
  //     dispatch(fetchStart())
  //     try {
  //       const { data } = await axiosWithToken("/sales/")
  //       dispatch(getSalesSuccess(data.data))
  //     } catch (error) {
  //       dispatch(fetchFail())
  //       toastErrorNotify("Sales bilgileri çekilemedi.")
  //     }
  //   }

  // parametre olarak sales ya da firms gelecek. url = "firms" default değer verdik, vermesek de olur önemli değil
  const getStocks = async (url = "firms") => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosWithToken(`/${url}/`)
      const apiData = data.data
      dispatch(getStockSuccess({ apiData, url }))
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(`${url} bilgileri çekilemedi.`)
    }
  }

  // promise all için. bak Purchases.jsx ve stockSlice.jsx
  const getProPurBranFirm = async () => {
    dispatch(fetchStart())
    try {
      const [products, purchases, brands, firms] = await Promise.all([
        axiosWithToken("/products/"),
        axiosWithToken("/purchases/"),
        axiosWithToken("/brands/"),
        axiosWithToken("/firms/"),
      ])
      dispatch(
        getProPurBranFirmSuccess([
          // eğer burada bir datayı eksik yapacaksan products?.data gibi stockSlice.jsx içinde payload[0]?.data yapman gerekir
          products?.data?.data,
          purchases?.data?.data,
          brands?.data?.data,
          firms?.data?.data,
        ])
      )
    } catch (error) {
      dispatch(fetchFail())
    }
  }

  const deleteStock = async (url = "firms", id) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.delete(`/${url}/${id}/`)
      toastSuccessNotify(`${url} bilgisi silinmiştir.`)
      getStocks(url) //serverda sildikten sonra state'i güncellemek için get işlemi
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(`${url} silinemedi`)
    }
  }

  const postStock = async (url = "firms", info) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.post(`/${url}/`, info)
      toastSuccessNotify(`${url} kayıdı eklenmiştir.`)
      getStocks(url) //servera eklendikten sonra state'i güncellemek için get işlemi
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(`${url} kaydi eklenemiştir.`)
    }
  }

  // putta değişecek objenin tamamını göndermen lazım, patchde ise obje içindeki sadece değişecek olan key-value'yu gönderirsin 
  const putStock = async (url = "firms", info) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.put(`/${url}/${info._id}`, info)
      toastSuccessNotify(`${url} kayıdı güncellenmiştir..`)
      getStocks(url)
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(`${url} kaydi güncelenememiştir.`)
    }
  }

  return { getStocks, deleteStock, postStock, putStock, getProPurBranFirm }
}

export default useStockCalls



// arkadaşlar stockapp de promise.all için genel bir fonksiyon yazdım buyrun thread de
// Q8177 - Bruce
// const getStockPromise = async (stocks) => {
//     dispatch(fetchStart());
//     try {
//       const promises = stocks.map((stock) => axiosWithToken(`/${stock}/`));
//       console.log(promises);
//       const promiseResults = await Promise.all(promises);
//       // console.log(promiseResults);
//       const stockData = promiseResults.map((result, index) => ({
//         name: stocks[index],
//         data: result?.data?.data,
//       }));
//       dispatch(getStockPromiseSuccess(stockData));
//     } catch (error) {
//       dispatch(fetchFail());
//     }
//   };

// getStockPromiseSuccess: (state, { payload }) => {
//       payload.map(
//         (_, index) => (state[payload[index].name] = payload[index].data)
//       );
//       state.loading = false;
//     },

// // fonksiyon çağrılırken dizi içine yazalım parametreleri ör. purchases için aşağıdaki gibi
// getStockPromise(["purchases","products","brands","firms"])
