export type UserRole = 'admin' | 'doctor' | 'nurse' | 'social-worker' | 'family' | 'patient'

export interface RoleConfig {
  id: UserRole
  name: string
  icon: string
  color: string
  description: string
  permissions: string[]
  canViewMedicalData: boolean
  canViewPsychologicalData: boolean
  canViewNursingData: boolean
  canCreatePatient: boolean
}

export const roleConfigs: Record<UserRole, RoleConfig> = {
  admin: {
    id: 'admin',
    name: '管理员',
    icon: '/images/roles/admin-avatar.png',
    color: '#722ed1',
    description: '系统全面管理权限',
    permissions: ['all'],
    canViewMedicalData: true,
    canViewPsychologicalData: true,
    canViewNursingData: true,
    canCreatePatient: true,
  },
  doctor: {
    id: 'doctor',
    name: '医生',
    icon: '/images/roles/doctor-avatar.png',
    color: '#1890ff',
    description: '诊疗方案制定与医疗决策',
    permissions: ['patients', 'medical-records', 'treatment-plans', 'medication'],
    canViewMedicalData: true,
    canViewPsychologicalData: false,
    canViewNursingData: true,
    canCreatePatient: false,
  },
  nurse: {
    id: 'nurse',
    name: '护士',
    icon: '/images/roles/nurse-avatar.png',
    color: '#52c41a',
    description: '日常护理与生命体征监测',
    permissions: ['patients', 'vital-signs', 'nursing-records'],
    canViewMedicalData: false,
    canViewPsychologicalData: false,
    canViewNursingData: true,
    canCreatePatient: false,
  },
  'social-worker': {
    id: 'social-worker',
    name: '社工',
    icon: '/images/roles/social-worker-avatar.png',
    color: '#faad14',
    description: '心理疏导与家属支持',
    permissions: ['patients', 'psychological-assessment', 'psychological-records', 'family-communication'],
    canViewMedicalData: false,
    canViewPsychologicalData: true,
    canViewNursingData: false,
    canCreatePatient: true,
  },
  family: {
    id: 'family',
    name: '家属',
    icon: '/images/roles/family-avatar.png',
    color: '#eb2f96',
    description: '查看家属专属服务',
    permissions: ['family-services', 'medical-resources-info'],
    canViewMedicalData: false,
    canViewPsychologicalData: false,
    canViewNursingData: false,
    canCreatePatient: false,
  },
  patient: {
    id: 'patient',
    name: '患者',
    icon: '/images/roles/patient-avatar.png',
    color: '#13c2c2',
    description: '安宁疗护服务与生命回顾',
    permissions: ['family-services', 'death-education', 'resource-center', 'community'],
    canViewMedicalData: false,
    canViewPsychologicalData: false,
    canViewNursingData: false,
    canCreatePatient: false,
  },
}

export const getMenuItemsByRole = (role: UserRole) => {
  const roleSpecificItems: Record<UserRole, any[]> = {
    admin: [
      { key: '/', icon: 'dashboard', label: '工作台' },
      { key: '/patients', icon: 'user', label: '患者管理' },
      { key: '/medical-records', icon: 'file', label: '医疗记录' },
      { key: '/treatment-plans', icon: 'medicine', label: '诊疗方案' },
      { key: '/medication', icon: 'file', label: '用药记录' },
      { key: '/psychological-assessment', icon: 'team', label: '心理评估' },
      { key: '/psychological-records', icon: 'file', label: '心理记录' },
      { key: '/family-communication', icon: 'heart', label: '家属沟通' },
      { key: '/vital-signs', icon: 'heart', label: '生命体征监测' },
      { key: '/nursing-records', icon: 'file', label: '护理记录' },
      { key: '/family-services', icon: 'heart', label: '家属服务' },
      { key: '/medical-resources', icon: 'medicine', label: '医疗资源' },
      { key: '/resource-center', icon: 'file', label: '资源中心' },
      { key: '/service-booking', icon: 'calendar', label: '服务对接' },
      { key: '/community', icon: 'team', label: '互动社区' },
      { key: '/communication-guide', icon: 'message', label: '沟通技巧' },
      { key: '/death-education', icon: 'book', label: '死亡教育' },
      { key: '/records', icon: 'clock', label: '服务记录' },
      { key: '/about', icon: 'info', label: '关于我们' },
      { key: '/settings', icon: 'setting', label: '系统设置' },
    ],
    doctor: [
      { key: '/', icon: 'dashboard', label: '工作台' },
      { key: '/patients', icon: 'user', label: '患者管理' },
      { key: '/medical-records', icon: 'file', label: '医疗记录' },
      { key: '/treatment-plans', icon: 'medicine', label: '诊疗方案' },
      { key: '/medication', icon: 'file', label: '用药记录' },
      { key: '/communication-guide', icon: 'message', label: '沟通技巧' },
      { key: '/records', icon: 'clock', label: '服务记录' },
    ],
    nurse: [
      { key: '/', icon: 'dashboard', label: '工作台' },
      { key: '/patients', icon: 'user', label: '患者管理' },
      { key: '/vital-signs', icon: 'heart', label: '生命体征监测' },
      { key: '/nursing-records', icon: 'file', label: '护理记录' },
      { key: '/communication-guide', icon: 'message', label: '沟通技巧' },
      { key: '/resource-center', icon: 'file', label: '资源中心' },
      { key: '/records', icon: 'clock', label: '服务记录' },
    ],
    'social-worker': [
      { key: '/', icon: 'dashboard', label: '工作台' },
      { key: '/patients', icon: 'user', label: '患者管理' },
      { key: '/psychological-assessment', icon: 'team', label: '心理评估' },
      { key: '/psychological-records', icon: 'file', label: '心理记录' },
      { key: '/family-communication', icon: 'heart', label: '家属沟通' },
      { key: '/communication-guide', icon: 'message', label: '沟通技巧' },
      { key: '/death-education', icon: 'book', label: '死亡教育' },
      { key: '/records', icon: 'clock', label: '服务记录' },
    ],
    family: [
      { key: '/', icon: 'dashboard', label: '工作台' },
      { key: '/family-services', icon: 'heart', label: '家属服务' },
      { key: '/death-education', icon: 'book', label: '死亡教育' },
      { key: '/resource-center', icon: 'file', label: '资源中心' },
      { key: '/community', icon: 'team', label: '互动社区' },
      { key: '/service-booking', icon: 'calendar', label: '服务对接' },
      { key: '/about', icon: 'info', label: '关于我们' },
    ],
    patient: [
      { key: '/', icon: 'dashboard', label: '工作台' },
      { key: '/family-services', icon: 'heart', label: '安宁疗护' },
      { key: '/death-education', icon: 'book', label: '安宁疗护指南' },
      { key: '/resource-center', icon: 'file', label: '资源中心' },
      { key: '/community', icon: 'team', label: '互动社区' },
      { key: '/about', icon: 'info', label: '关于我们' },
    ],
  }

  return roleSpecificItems[role]
}
