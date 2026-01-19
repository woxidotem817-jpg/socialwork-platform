import { useState, useEffect } from 'react'
import { Layout, Menu, Avatar, Dropdown, Badge, Space, theme, Typography, Divider, Switch } from 'antd'
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  HeartOutlined,
  MedicineBoxOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  BellOutlined,
  QuestionCircleOutlined,
  CalendarOutlined,
  MessageOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/slices/authSlice'
import { getMenuItemsByRole, type UserRole } from '../../types/roles'
import './MainLayout.css'

const { Header, Sider, Content } = Layout
const { Text } = Typography

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isDarkMode, setIsDarkMode] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const user = useSelector((state: any) => state.auth.user) || JSON.parse(localStorage.getItem('user') || '{}')
  const userRole: UserRole = user?.role || 'admin'

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // 读取保存的主题设置
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'true')
      document.body.classList.toggle('dark-mode', savedTheme === 'true')
    }
  }, [])

  const toggleDarkMode = (checked: boolean) => {
    // 添加主题切换过渡效果
    document.body.classList.add('theme-transition')

    // 短暂延迟以允许过渡动画播放
    setTimeout(() => {
      setIsDarkMode(checked)
      localStorage.setItem('darkMode', String(checked))
      document.body.classList.toggle('dark-mode', checked)
    }, 50)

    // 移除过渡类
    setTimeout(() => {
      document.body.classList.remove('theme-transition')
    }, 400)
  }

  // 辅助函数 - 必须在使用前定义
  const getMenuIcon = (iconName: string) => {
    const iconMap: Record<string, any> = {
      dashboard: <DashboardOutlined />,
      user: <UserOutlined />,
      file: <FileTextOutlined />,
      heart: <HeartOutlined />,
      medicine: <MedicineBoxOutlined />,
      team: <TeamOutlined />,
      clock: <ClockCircleOutlined />,
      setting: <SettingOutlined />,
      calendar: <CalendarOutlined />,
      message: <MessageOutlined />,
      book: <FileTextOutlined />,
      info: <QuestionCircleOutlined />,
    }
    return iconMap[iconName] || null
  }

  const getRoleGradient = (role?: string) => {
    const gradientMap: Record<string, string> = {
      admin: 'linear-gradient(135deg, #722ed1 0%, #9254de 100%)',
      doctor: 'linear-gradient(135deg, #1890ff 0%, #40a9ff 100%)',
      nurse: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
      'social-worker': 'linear-gradient(135deg, #faad14 0%, #ffc53d 100%)',
      family: 'linear-gradient(135deg, #eb2f96 0%, #f759ab 100%)',
      patient: 'linear-gradient(135deg, #13c2c2 0%, #36cfc9 100%)',
    }
    return gradientMap[role || 'admin'] || gradientMap.admin
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // 菜单项 - 在函数定义后使用
  const menuItems = getMenuItemsByRole(userRole).map((item) =>({
    key: item.key,
    icon: getMenuIcon(item.icon),
    label: item.label,
  }))

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
  }

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    dispatch(logout())
    navigate('/login')
  }

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
      onClick: () => navigate('/settings'),
    },
    {
      key: 'help',
      icon: <QuestionCircleOutlined />,
      label: '帮助中心',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      danger: true,
      onClick: handleLogout,
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="main-sider"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo-container">
          <div className="logo">
            <img
              src="/images/decorative/logo.png"
              alt="安享宁护"
              className="logo-image"
              onError={(e) => {
                // 如果图片加载失败，显示文字
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const textSpan = document.querySelector('.logo-text');
                if (textSpan) textSpan.style.display = 'inline';
              }}
            />
            <span className={collapsed ? 'logo-text-collapsed' : 'logo-text'} style={{ display: 'none' }}>
              {collapsed ? '安宁' : '安宁疗护平台'}
            </span>
          </div>
          {!collapsed && (
            <div className="user-info-mini">
              <Avatar
                size={32}
                style={{
                  background: getRoleGradient(user?.role),
                  fontSize: 16,
                }}
              >
                {user?.name?.[0]}
              </Avatar>
              <Text className="user-role-text" style={{ color: 'rgba(255,255,255,0.65)' }}>
                {user?.role === 'admin' ? '管理员' : ''}
                {user?.role === 'doctor' ? '医生' : ''}
                {user?.role === 'nurse' ? '护士' : ''}
                {user?.role === 'social-worker' ? '社工' : ''}
                {user?.role === 'family' ? '家属' : ''}
                {user?.role === 'patient' ? '患者' : ''}
              </Text>
            </div>
          )}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          className="main-menu"
        />
      </Sider>

      <Layout className="main-layout" style={{ marginLeft: collapsed ? 80 : 240, transition: 'margin-left 0.2s' }}>
        <Header className="main-header">
          <div className="header-left">
            <div
              onClick={() => setCollapsed(!collapsed)}
              className="menu-trigger"
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>

            <div className="header-divider">
              <Divider type="vertical" />
            </div>

            <div className="header-info">
              <Text type="secondary">
                {currentTime.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}
              </Text>
              <Text type="secondary" style={{ marginLeft: 16 }}>
                {currentTime.toLocaleTimeString('zh-CN')}
              </Text>
            </div>
          </div>

          <Space className="header-right" size="large">
            <Space>
              {isDarkMode ? <MoonOutlined style={{ color: '#1890ff' }} /> : <SunOutlined />}
              <Switch
                checked={isDarkMode}
                onChange={toggleDarkMode}
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
              />
            </Space>

            <Badge count={3} overflowCount={99}>
              <BellOutlined className="header-icon" />
            </Badge>

            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space className="user-info">
                <Avatar
                  size={40}
                  style={{
                    background: getRoleGradient(user?.role),
                    fontSize: 20,
                  }}
                >
                  {user?.name?.[0]}
                </Avatar>
                <div className="user-details">
                  <Text strong style={{ display: 'block', fontSize: 14 }}>
                    {user?.name}
                  </Text>
                  <Text type="secondary" style={{ display: 'block', fontSize: 12 }}>
                    {user?.department}
                  </Text>
                </div>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        <Content className="main-content">
          <div className="content-wrapper">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
