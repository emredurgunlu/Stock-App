import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: "",
  loading: false,
  error: false,
  token: "",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // create asyncThunk yerine farklı şekilde yaptık. Bu şekilde yapınca asyncThunk'ın kod karmaşasından kurtulduk
    // ama useAuthCalls dosyasında dispatch(fetchStart()), dispatch(loginSuccess(data)) gibi her metodu ayrı ayrı çağırmak zorunda kaldık
    // asyncThunk'da ise sadece business ve logic birbirinden ayrılıyordu ve sadece useEffect içinde bir kere çağırıyorduk
    // React tavsiyesi asyncThunk kullanmak
    fetchStart: (state) => {
      state.loading = true
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false
      state.user = payload.user.username
      state.token = payload.token
    },
    registerSuccess: (state, { payload }) => {
      state.loading = false
      state.user = payload.data.username
      state.token = payload.token
    },
    logoutSuccess: (state) => {
      state.user = ""
      state.loading = false
      state.token = ""
    },
    fetchFail: (state) => {
      state.loading = false
      state.error = true
    },
  },
})

export const {
  fetchStart,
  loginSuccess,
  registerSuccess,
  logoutSuccess,
  fetchFail,
} = authSlice.actions

export default authSlice.reducer
