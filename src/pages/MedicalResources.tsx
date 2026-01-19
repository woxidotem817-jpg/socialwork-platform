import { Card, Row, Col, Statistic, List, Tag, Space } from 'antd'
import { MedicineBoxOutlined, UserOutlined, TeamOutlined, PhoneOutlined } from '@ant-design/icons'
import BackgroundWrapper from '../components/BackgroundWrapper/BackgroundWrapper'

const MedicalResources = () => {
  const doctors = [
    {
      name: '陈医生',
      specialty: '姑息治疗科',
      title: '主任医师',
      phone: '13800001001',
      status: '在岗',
    },
    {
      name: '刘医生',
      specialty: '肿瘤科',
      title: '副主任医师',
      phone: '13800001002',
      status: '在岗',
    },
    {
      name: '张医生',
      specialty: '心血管科',
      title: '主治医师',
      phone: '13800001003',
      status: '休假',
    },
  ]

  const nurses = [
    {
      name: '王护士长',
      title: '护士长',
      phone: '13800002001',
      status: '在岗',
    },
    {
      name: '李护士',
      title: '主管护士',
      phone: '13800002002',
      status: '在岗',
    },
    {
      name: '赵护士',
      title: '护士',
      phone: '13800002003',
      status: '在岗',
    },
  ]

  const socialWorkers = [
    {
      name: '李社工',
      title: '中级社工',
      phone: '13800003001',
      status: '在岗',
    },
    {
      name: '周社工',
      title: '初级社工',
      phone: '13800003002',
      status: '外出',
    },
  ]

  return (
    <BackgroundWrapper backgroundType="professional">
      <div>
        <div className="page-banner">
          <img
            src="/images/medical/care-team.jpg"
            alt="医护团队"
          />
        </div>

        <h2 style={{ marginBottom: 24 }}>医疗资源</h2>

        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={8}>
            <Card>
              <Statistic
                title="医生团队"
                value={12}
                prefix={<UserOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="护理人员"
                value={45}
                prefix={<TeamOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="社工团队"
                value={8}
                prefix={<MedicineBoxOutlined />}
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Card title={<Space><UserOutlined />医生团队</Space>} bordered={false}>
              <List
                dataSource={doctors}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <Space>
                          {item.name}
                          <Tag color="blue">{item.title}</Tag>
                          <Tag color={item.status === '在岗' ? 'green' : 'default'}>{item.status}</Tag>
                        </Space>
                      }
                      description={`${item.specialty} | 电话：${item.phone}`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          <Col span={8}>
            <Card title={<Space><TeamOutlined />护理人员</Space>} bordered={false}>
              <List
                dataSource={nurses}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <Space>
                          {item.name}
                          <Tag color="blue">{item.title}</Tag>
                          <Tag color={item.status === '在岗' ? 'green' : 'default'}>{item.status}</Tag>
                        </Space>
                      }
                      description={`电话：${item.phone}`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          <Col span={8}>
            <Card title={<Space><MedicineBoxOutlined />社工团队</Space>} bordered={false}>
              <List
                dataSource={socialWorkers}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <Space>
                          {item.name}
                          <Tag color="purple">{item.title}</Tag>
                          <Tag color={item.status === '在岗' ? 'green' : 'default'}>{item.status}</Tag>
                        </Space>
                      }
                      description={`电话：${item.phone}`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </BackgroundWrapper>
  )
}

export default MedicalResources
