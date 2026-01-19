import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Patient {
  id: string
  name: string
  age: number
  gender: string
  diagnosis: string
  admissionDate: string
  condition: 'stable' | 'critical' | 'improving' | 'deteriorating'
  room: string
  primaryCaregiver: string
  contact: string
}

interface PatientState {
  patients: Patient[]
  selectedPatient: Patient | null
  loading: boolean
  error: string | null
}

const initialState: PatientState = {
  patients: [],
  selectedPatient: null,
  loading: false,
  error: null,
}

const patientSlice = createSlice({
  name: 'patient',
  initialState,
  reducers: {
    setPatients: (state, action: PayloadAction<Patient[]>) => {
      state.patients = action.payload
    },
    selectPatient: (state, action: PayloadAction<Patient>) => {
      state.selectedPatient = action.payload
    },
    addPatient: (state, action: PayloadAction<Patient>) => {
      state.patients.push(action.payload)
    },
    updatePatient: (state, action: PayloadAction<Patient>) => {
      const index = state.patients.findIndex(p => p.id === action.payload.id)
      if (index !== -1) {
        state.patients[index] = action.payload
      }
    },
    deletePatient: (state, action: PayloadAction<string>) => {
      state.patients = state.patients.filter(p => p.id !== action.payload)
    },
  },
})

export const { setPatients, selectPatient, addPatient, updatePatient, deletePatient } = patientSlice.actions
export default patientSlice.reducer
