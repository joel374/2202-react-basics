import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: [],
  currentEmployee: {
    name: "",
    email: "",
    password: "",
    id: 0,
  },
}

export const employeeSlice = createSlice({
  name: "employee",
  initialState, // karna key dan value nya sama
  reducers: {
    fillEmployeeList: (state, action) => {
      state.data = action.payload
    },
    loginEmployee: (state, action) => {
      state.currentEmployee = action.payload
    },
    logoutEmployee: (state) => {
      state.currentEmployee = {
        name: "",
        email: "",
        password: "",
        id: "",
      }
    },
  },
})

export const { fillEmployeeList, loginEmployee, logoutEmployee, takeEmployee } =
  employeeSlice.actions

export default employeeSlice.reducer
