import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  //   value: 17,
  data: 18,
  //   [
  //     {
  //       name: "Seto",
  //       gender: "male",
  //       course: "UI/UX",
  //     },
  //   ],
}

export const counterSlice = createSlice({
  name: "counter",
  initialState, // karna key dan value nya sama
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    reset: (state) => {
      state.value = 0
    },
    confirm: (state, action) => {
      state.value = action.payload
    },
  },
})

// action adalah function yang akan return sebuah "ACTION Object"
// "Action object" memiliki 2 properti
// -type(Yang akan dikirim ke reducer)(Cth increment dan decrement dan reset)
// -payload(Optional)

// reducers adalah kumpulan condition yang akan merubah isi globa state
// setiap condition dari reducer akan ngcek type dari ACTION OBJECT
// yang artinya perubahan isi dari global state akan ditentukan berdasarkan type action yang dikirim ke reducer

// Nama funciton direducer akan menjadi nama type di reducer untuk mengganti isi store
// dispact mengirimkan action object ke reducer

// contoh: ada function namanya increment dalam

// proses perngiriman dinamakan dispacth

// component-> dispatch->ACTION OBJECT->Reducer(cek propertinya)->Store
export const { increment, decrement, reset, confirm } = counterSlice.actions
// increment dsini untuk memabuat action objek untuk si reducer increment

export default counterSlice.reducer
