import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserRole = 'admin' | 'doctor' | 'nurse' | 'social-worker' | 'family'

interface User {
  id: string
  name: string
  role: UserRole
  email: string
  phone: string
  avatar: string
  department?: string
  specialization?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  token: string | null
  selectedRole: UserRole | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null,
  selectedRole: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      state.selectedRole = action.payload.user.role
    },
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.selectedRole = null
    },
    selectRole: (state, action: PayloadAction<UserRole>) => {
      state.selectedRole = action.payload
    },
  },
})

export const { loginSuccess, logout, selectRole } = authSlice.actions
export default authSlice.reducer
