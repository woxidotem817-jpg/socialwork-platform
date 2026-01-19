import { Card, Row, Col, Statistic, Table, Tag, Progress, Space, Typography, Timeline, Avatar, Badge, Carousel } from 'antd'
import { UserOutlined, FileTextOutlined, HeartOutlined, TeamOutlined, ClockCircleOutlined, CheckCircleOutlined, AlertOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'
import { type UserRole } from '../types/roles'
import './Dashboard.css'

const { Title, Text } = Typography

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.user) || JSON.parse(localStorage.getItem('user') || '{}')
  const userRole: UserRole = user?.role || 'admin'

  const statsData = {
    admin: [
      { title: '在院患者', value: 128, icon: <UserOutlined />, color: '#667eea', trend: '+12%' },
      { title: '今日护理', value: 86, icon: <HeartOutlined />, color: '#52c41a', trend: '+8%' },
      { title: '护理计划', value: 156, icon: <FileTextOutlined />, color: '#faad14', trend: '+15%' },
      { title: '家属服务', value: 92, icon: <TeamOutlined />, color: '#722ed1', trend: '+10%' },
    ],
    doctor: [
      { title: '在院患者', value: 45, icon: <UserOutlined />, color: '#667eea', trend: '+5%' },
      { title: '今日查房', value: 32, icon: <HeartOutlined />, color: '#52c41a', trend: '+3%' },
      { title: '诊疗方案', value: 18, icon: <FileTextOutlined />, color: '#faad14', trend: '+2%' },
      { title: '待处理', value: 7, icon: <AlertOutlined />, color: '#ff4d4f', trend: '-5%' },
    ],
    nurse: [
      { title: '负责患者', value: 28, icon: <UserOutlined />, color: '#667eea', trend: '+2%' },
      { title: '今日护理', value: 156, icon: <HeartOutlined />, color: '#52c41a', trend: '+12%' },
      { title: '护理记录', value: 45, icon: <FileTextOutlined />, color: '#faad14', trend: '+8%' },
      { title: '待完成', value: 12, icon: <ClockCircleOutlined />, color: '#722ed1', trend: '-3%' },
    ],
    'social-worker': [
      { title: '服务对象', value: 35, icon: <UserOutlined />, color: '#667eea', trend: '+5%' },
      { title: '今日咨询', value: 18, icon: <HeartOutlined />, color: '#52c41a', trend: '+10%' },
      { title: '跟进服务', value: 23, icon: <FileTextOutlined />, color: '#faad14', trend: '+7%' },
      { title: '预约数', value: 8, icon: <TeamOutlined />, color: '#722ed1', trend: '+4%' },
    ],
    family: [
      { title: '家人情况', value: 1, icon: <UserOutlined />, color: '#667eea', trend: '-' },
      { title: '今日服务', value: 3, icon: <HeartOutlined />, color: '#52c41a', trend: '-' },
      { title: '护理计划', value: 2, icon: <FileTextOutlined />, color: '#faad14', trend: '-' },
      { title: '未读消息', value: 5, icon: <AlertOutlined />, color: '#ff4d4f', trend: '-' },
    ],
  }

  const patientData = [
    {
      key: '1',
      name: '张三',
      age: 78,
      gender: '男',
      diagnosis: '晚期肺癌',
      condition: 'stable',
      room: '101',
      admissionDate: '2024-01-10',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    },
    {
      key: '2',
      name: '李四',
      age: 82,
      gender: '女',
      diagnosis: '阿尔茨海默病',
      condition: 'improving',
      room: '102',
      admissionDate: '2024-01-15',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    },
    {
      key: '3',
      name: '王五',
      age: 75,
      gender: '男',
      diagnosis: '心力衰竭',
      condition: 'critical',
      room: '103',
      admissionDate: '2024-01-12',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    },
  ]

  const columns = [
    {
      title: '患者',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <Space>
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          <div>
            <div>{text}</div>
            <Text type="secondary" style={{ fontSize: 12 }}>{record.age}岁 · {record.gender}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: '诊断',
      dataIndex: 'diagnosis',
      key: 'diagnosis',
    },
    {
      title: '状况',
      dataIndex: 'condition',
      key: 'condition',
      render: (condition: string) => {
        const config: Record<string, any> = {
          stable: { color: 'success', text: '稳定' },
          critical: { color: 'error', text: '危重' },
          improving: { color: 'processing', text: '好转' },
          deteriorating: { color: 'warning', text: '恶化' },
        }
        const { color, text } = config[condition] || { color: 'default', text: condition }
        return <Badge status={color} text={text} />
      },
    },
    {
      title: '病房',
      dataIndex: 'room',
      key: 'room',
    },
    {
      title: '入院日期',
      dataIndex: 'admissionDate',
      key: 'admissionDate',
    },
  ]

  const timelineData = [
    {
      color: 'blue',
      dot: <CheckCircleOutlined style={{ fontSize: 16 }} />,
      children: (
        <div>
          <Text strong>2024-01-18 10:30</Text>
          <p style={{ margin: 0, color: 'rgba(0,0,0,0.45)' }}>评估疼痛程度：4分，给予止痛药物</p>
        </div>
      ),
    },
    {
      color: 'green',
      dot: <CheckCircleOutlined style={{ fontSize: 16 }} />,
      children: (
        <div>
          <Text strong>2024-01-18 08:00</Text>
          <p style={{ margin: 0, color: 'rgba(0,0,0,0.45)' }}>晨间护理完成，患者状态良好</p>
        </div>
      ),
    },
    {
      color: 'red',
      dot: <AlertOutlined style={{ fontSize: 16 }} />,
      children: (
        <div>
          <Text strong>2024-01-17 22:00</Text>
          <p style={{ margin: 0, color: 'rgba(0,0,0,0.45)' }}>夜间巡房，发现患者心率异常，已处理</p>
        </div>
      ),
    },
  ]

  const currentStats = statsData[userRole] || statsData.admin

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <Title level={2} style={{ margin: 0 }}>
          工作台
        </Title>
        <Text type="secondary">
          欢迎回来，{user?.name || '用户'}
        </Text>
      </div>

      <div className="banner-section">
        <Carousel autoplay style={{ height: 300, borderRadius: 12, overflow: 'hidden', marginBottom: 24 }}>
          <div>
            <img
              src="/images/home/banner-1.jpg"
              alt="安宁疗护服务"
              style={{ width: '100%', height: 300, objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
          <div>
            <img
              src="/images/home/banner-2.jpg"
              alt="专业医护团队"
              style={{ width: '100%', height: 300, objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
          <div>
            <img
              src="/images/home/banner-3.jpg"
              alt="温馨关怀环境"
              style={{ width: '100%', height: 300, objectFit: 'cover', objectPosition: 'center' }}
            />
          </div>
        </Carousel>
      </div>

      <Row gutter={[16, 16]} className="stats-row">
        {currentStats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="stat-card" bordered={false}>
              <div className="stat-content">
                <div className="stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-info">
                  <div className="stat-title">{stat.title}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-trend" style={{ color: stat.trend.includes('+') ? '#52c41a' : '#ff4d4f' }}>
                    {stat.trend !== '-' && stat.trend}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card
            title={
              <Space>
                <UserOutlined />
                <span>今日重点关注患者</span>
              </Space>
            }
            bordered={false}
            className="patient-card"
          >
            <Table
              columns={columns}
              dataSource={patientData}
              pagination={false}
              className="patient-table"
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <Space>
                <ClockCircleOutlined />
                <span>最新动态</span>
              </Space>
            }
            bordered={false}
            className="timeline-card"
          >
            <Timeline items={timelineData} />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard
