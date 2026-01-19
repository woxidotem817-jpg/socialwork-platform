import { Card, Space, Typography, Avatar } from 'antd'
import {
  UserOutlined,
  MedicineBoxOutlined,
  TeamOutlined,
  HeartOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import { roleConfigs, type UserRole } from '../../types/roles'
import './RoleSelector.css'

const { Text } = Typography

interface RoleSelectorProps {
  selectedRole: UserRole | null
  onRoleSelect: (role: UserRole) => void
}

const RoleSelector = ({ selectedRole, onRoleSelect }: RoleSelectorProps) => {
  const getRoleAvatar = (roleId: string) => {
    const avatarMap: Record<string, string> = {
      admin: '/images/roles/admin-avatar.png',
      doctor: '/images/roles/doctor-avatar.png',
      nurse: '/images/roles/nurse-avatar.png',
      'social-worker': '/images/roles/social-worker-avatar.png',
      family: '/images/roles/family-avatar.png',
      patient: '/images/roles/family-avatar.png',
    }
    return avatarMap[roleId] || '/images/roles/admin-avatar.png'
  }

  const getRoleBgColor = (roleId: string) => {
    const colorMap: Record<string, string> = {
      admin: 'linear-gradient(135deg, #722ed1 0%, #9254de 100%)',
      doctor: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
      nurse: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
      'social-worker': 'linear-gradient(135deg, #faad14 0%, #ffc53d 100%)',
      family: 'linear-gradient(135deg, #eb2f96 0%, #f759ab 100%)',
      patient: 'linear-gradient(135deg, #13c2c2 0%, #36cfc9 100%)',
    }
    return colorMap[roleId] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  }

  return (
    <div className="role-selector">
      <Text strong className="role-selector-title">
        请选择您的身份
      </Text>
      <div className="role-grid">
        {Object.values(roleConfigs).map((role) => (
          <Card
            key={role.id}
            className={`role-card ${selectedRole === role.id ? 'selected' : ''}`}
            onClick={() => onRoleSelect(role.id)}
            hoverable
            bordered={false}
          >
            <Space direction="vertical" align="center" size="small" style={{ width: '100%' }}>
              <Avatar
                size={80}
                src={getRoleAvatar(role.id)}
                style={{
                  marginBottom: 12,
                  border: '3px solid white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                icon={<UserOutlined />}
              />
              <Text strong style={{ fontSize: 15, color: role.color, marginBottom: 4 }}>
                {role.name}
              </Text>
              <Text
                type="secondary"
                style={{
                  fontSize: 11,
                  textAlign: 'center',
                  display: 'block',
                  lineHeight: '1.4',
                  maxWidth: '100%',
                }}
              >
                {role.description}
              </Text>
            </Space>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default RoleSelector
