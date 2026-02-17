import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee(state, action) {
      state.push(action.payload)
    },
    setEmployees(state, action) {
      return action.payload
    },
  },
})

export const { addEmployee, setEmployees } = employeesSlice.actions
export default employeesSlice.reducer
