// Ini tempat penyimpanan utama GLOBAL STATE

import { configureStore } from "@reduxjs/toolkit"

import counterSlice from "../features/counter/counterSlice"
import studentSlice from "../features/student/studentSlice"
import employeeSlice from "../features/employee/employeeSlice"

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    student: studentSlice,
    employee: employeeSlice,
  },
})
