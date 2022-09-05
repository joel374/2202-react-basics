import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  //   value: 17,
  data: [
    {
      name: "Seto",
      gender: "Male",
      course: "UI/UX",
    },
    {
      name: "Doraemon",
      gender: "Male",
      course: "Web Development",
    },
  ],
}

export const studentSlice = createSlice({
  name: "student",
  initialState, // karna key dan value nya sama
  reducers: {
    addStudent: (state, action) => {
      let newStudent = {
        name: action.payload.username,
        gender: action.payload.gender,
        course: action.payload.course,
      }
      state.data.push(newStudent)
    },
  },
})

export const { addStudent } = studentSlice.actions

export default studentSlice.reducer
