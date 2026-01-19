import { useState, useEffect } from 'react'
import { Form, Input, Button, Card, Space, Typography, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'
import RoleSelector from './RoleSelector'
import { roleConfigs, type UserRole } from '../../types/roles'

const { Title, Paragraph } = Typography

interface LoginFormData {
  username: string
  password: string
}

const LoginPage = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const navigate = useNavigate()

  // 清除旧的登录数据，确保干净的登录状态
  useEffect(() => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }, [])

  const handleLogin = async (values: LoginFormData) => {
    if (!selectedRole) {
      message.warning('请选择您的角色')
      return
    }

    setLoading(true)

    // 模拟登录 - 实际项目中应该调用后端API
    setTimeout(() => {
      setLoading(false)

      const mockUsers = {
        admin: { name: '管理员', department: 'system management' },
        doctor: { name: '陈医生', department: '姑息治疗科', specialization: '肿瘤晚期治疗' },
        nurse: { name: '王护士长', department: '护理部' },
        'social-worker': { name: '李社工', department: '社会工作部' },
        family: { name: '张小明', department: '家属' },
      }

      const mockUser = mockUsers[selectedRole]

      // 存储用户信息到 localStorage
      const userInfo = {
        id: `U${Date.now()}`,
        name: mockUser.name,
        role: selectedRole,
        email: `${values.username}@hospice.com`,
        phone: '13800138000',
        avatar: '',
        department: mockUser.department,
        specialization: mockUser.specialization,
      }

      localStorage.setItem('user', JSON.stringify(userInfo))
      localStorage.setItem('token', `token-${Date.now()}`)

      message.success('登录成功！正在跳转...')

      // 立即跳转到首页
      navigate('/')
    }, 500)
  }

  return (
    <div className="login-page">
      <div className="login-background">
        <div className="login-overlay" />
      </div>

      <div className="login-container">
        <div className="login-content">
          <div className="login-header">
            <img
              src="/images/decorative/logo.png"
              alt="安享宁护"
              className="login-logo"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const title = document.querySelector('.login-title');
                if (title) {
                  (title as HTMLElement).style.display = 'block';
                  (title as HTMLElement).style.marginTop = '0';
                }
              }}
            />
            <Title level={2} className="login-title" style={{ display: 'none' }}>
              安宁疗护综合服务平台
            </Title>
            <Paragraph className="login-subtitle">
              用爱与专业守护生命的最后旅程
            </Paragraph>
          </div>

          <Card className="login-card" bordered={false}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <RoleSelector
                selectedRole={selectedRole}
                onRoleSelect={setSelectedRole}
              />

              <Form
                form={form}
                name="login"
                onFinish={handleLogin}
                autoComplete="off"
                layout="vertical"
              >
                <Form.Item
                  label="用户名"
                  name="username"
                  rules={[{ required: true, message: '请输入用户名' }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="请输入用户名"
                    size="large"
                  />
                </Form.Item>

                <Form.Item
                  label="密码"
                  name="password"
                  rules={[{ required: true, message: '请输入密码' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="请输入密码"
                    size="large"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                    block
                    className="login-button"
                  >
                    登录系统
                  </Button>
                </Form.Item>
              </Form>

              <div className="login-footer">
                <a href="#">忘记密码？</a>
                <span>|</span>
                <a href="#">联系管理员</a>
              </div>
            </Space>
          </Card>

          <div className="login-info">
            <Paragraph>
              © 2024 安宁疗护综合服务平台 | 用爱守护生命
            </Paragraph>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
