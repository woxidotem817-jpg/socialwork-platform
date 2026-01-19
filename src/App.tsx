import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoginPage from './components/Login/LoginPage'
import MainLayout from './components/Layout/MainLayout'
import Dashboard from './pages/Dashboard'
import Patients from './pages/Patients'
import PatientDetail from './pages/PatientDetail'
import CarePlans from './pages/CarePlans'
import FamilyServices from './pages/FamilyServices'
import MedicalResources from './pages/MedicalResources'
import PsychologicalSupport from './pages/PsychologicalSupport'
import Records from './pages/Records'
import Settings from './pages/Settings'
import MedicalRecords from './pages/MedicalRecords'
import TreatmentPlans from './pages/TreatmentPlans'
import Medication from './pages/Medication'
import PsychologicalAssessment from './pages/PsychologicalAssessment'
import PsychologicalRecords from './pages/PsychologicalRecords'
import FamilyCommunication from './pages/FamilyCommunication'
import VitalSigns from './pages/VitalSigns'
import NursingRecords from './pages/NursingRecords'
import CommunicationGuide from './pages/CommunicationGuide'
import DeathEducation from './pages/DeathEducation'
import ResourceCenter from './pages/ResourceCenter'
import ServiceBooking from './pages/ServiceBooking'
import Community from './pages/Community'
import About from './pages/About'
import { RootState } from './store'

function AppContent() {
  const token = useSelector((state: RootState) => state.auth.token)
  const location = useLocation()
  const [pageKey, setPageKey] = useState(location.pathname)

  useEffect(() => {
    // 页面切换时的过渡动画
    setPageKey(location.pathname)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  useEffect(() => {
    // 检查localStorage中是否有用户信息
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')
    if (storedUser && storedToken) {
      // 可以在这里恢复用户状态
    }
  }, [])

  // 判断是否在登录页面
  const isLoginPage = location.pathname === '/login'

  // 如果没有token，重定向到登录页
  if (!token && !localStorage.getItem('token') && !isLoginPage) {
    return <Navigate to="/login" replace />
  }

  // 如果有token，且不在登录页，显示主布局
  if (token || localStorage.getItem('token')) {
    if (isLoginPage) {
      return <Navigate to="/" replace />
    }

    return (
      <MainLayout>
        <div key={pageKey} className="page-transition">
          <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patients/:id" element={<PatientDetail />} />
          <Route path="/care-plans" element={<CarePlans />} />
          <Route path="/family-services" element={<FamilyServices />} />
          <Route path="/medical-resources" element={<MedicalResources />} />
          <Route path="/psychological-support" element={<PsychologicalSupport />} />
          <Route path="/records" element={<Records />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path="/treatment-plans" element={<TreatmentPlans />} />
          <Route path="/medication" element={<Medication />} />
          <Route path="/psychological-assessment" element={<PsychologicalAssessment />} />
          <Route path="/psychological-records" element={<PsychologicalRecords />} />
          <Route path="/family-communication" element={<FamilyCommunication />} />
          <Route path="/vital-signs" element={<VitalSigns />} />
          <Route path="/nursing-records" element={<NursingRecords />} />
          <Route path="/communication-guide" element={<CommunicationGuide />} />
          <Route path="/death-education" element={<DeathEducation />} />
          <Route path="/resource-center" element={<ResourceCenter />} />
          <Route path="/service-booking" element={<ServiceBooking />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </MainLayout>
    )
  }

  // 显示登录页
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
