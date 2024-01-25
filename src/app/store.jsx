import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import stockReducer from "../features/stockSlice"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
// import storage from "redux-persist/lib/storage" //? local storage
import storage from "redux-persist/lib/storage/session" //? session storage refreshde gitmez ama kapatıp açınca gider

const persistConfig = {
  key: "root",
  storage,
}

// rootReducer ile bütüm store storageda saklamak yerine rootReducer'u authReducer ile değiştirip sadece authReducer'i sakladık.
// Normalde auth ile ilgili bilgiler local veya session storage da saklanmaz çünkü güvenli olmaz. Auth bilgilerini httponly cookie de saklamak daha güvenli.
const persistedReducer = persistReducer(persistConfig, authReducer)

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    stock: stockReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  // middleware kısmı  persist paketinin hatasını gidermek için  https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
export const persistor = persistStore(store)

export default store

// persist paketini eklemeden önce store.jsx'in hali
// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../features/authSlice";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
//   devTools: process.env.NODE_ENV !== "production",
// });
// export default store;
