import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card, Descriptions, Tabs, Timeline, Button, Space, Tag, List, Avatar, Alert, Empty } from 'antd'
import { HeartOutlined, FileTextOutlined, TeamOutlined, MedicineBoxOutlined, WarningOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { RootState } from '../store'
import { roleConfigs } from '../types/roles'

const PatientDetail = () => {
  const { id } = useParams<{ id: string }>()
  const user = useSelector((state: RootState) => state.auth.user) || JSON.parse(localStorage.getItem('user') || '{}')
  const userRole = user?.role || 'admin'
  const roleConfig = roleConfigs[userRole]

  const getPatientBasicInfo = () => {
    return (
      <Descriptions bordered column={2}>
        <Descriptions.Item label="患者ID">P001</Descriptions.Item>
        <Descriptions.Item label="姓名">张三</Descriptions.Item>
        <Descriptions.Item label="年龄">78</Descriptions.Item>
        <Descriptions.Item label="性别">男</Descriptions.Item>
        <Descriptions.Item label="入院日期">2024-01-10</Descriptions.Item>
        <Descriptions.Item label="病房">101</Descriptions.Item>
        <Descriptions.Item label="主要照护者">张小明</Descriptions.Item>
        <Descriptions.Item label="联系电话">13800138000</Descriptions.Item>
      </Descriptions>
    )
  }

  const getMedicalInfo = () => {
    if (!roleConfig.canViewMedicalData && userRole !== 'admin') {
      return (
        <Alert
          message="权限不足"
          description="您没有权限查看医疗信息"
          type="warning"
          showIcon
          icon={<WarningOutlined />}
        />
      )
    }

    return (
      <Descriptions bordered column={2}>
        <Descriptions.Item label="诊断" span={2}>晚期肺癌</Descriptions.Item>
        <Descriptions.Item label="病史" span={2}>有高血压、糖尿病史</Descriptions.Item>
        <Descriptions.Item label="过敏史">青霉素</Descriptions.Item>
        <Descriptions.Item label="用药情况">详见用药记录</Descriptions.Item>
      </Descriptions>
    )
  }

  const getPsychologicalInfo = () => {
    if (!roleConfig.canViewPsychologicalData && userRole !== 'admin') {
      return (
        <Alert
          message="权限不足"
          description="您没有权限查看心理评估信息"
          type="warning"
          showIcon
          icon={<WarningOutlined />}
        />
      )
    }

    return (
      <Descriptions bordered column={2}>
        <Descriptions.Item label="心理状态">轻度抑郁</Descriptions.Item>
        <Descriptions.Item label="评估日期">2024-01-17</Descriptions.Item>
        <Descriptions.Item label="评估量表" span={2}>HAMD抑郁量表得分：18分（轻度抑郁）</Descriptions.Item>
        <Descriptions.Item label="主要心理问题" span={2}>对死亡恐惧，担心家人未来</Descriptions.Item>
        <Descriptions.Item label="干预措施" span={2}>定期心理疏导，家庭支持疗法</Descriptions.Item>
      </Descriptions>
    )
  }

  const getCarePlanItems = () => {
    if (!roleConfig.canViewMedicalData && !roleConfig.canViewNursingData && userRole !== 'admin') {
      return <Empty description="无权限查看护理计划" />
    }

    return (
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Card title="疼痛管理" size="small">
          <p>按照WHO三级止痛原则，定时评估疼痛程度，及时调整药物剂量</p>
          <Tag color="blue">进行中</Tag>
        </Card>
        <Card title="呼吸困难护理" size="small">
          <p>保持呼吸道通畅，必要时给予氧疗，观察呼吸频率和节律</p>
          <Tag color="green">已完成</Tag>
        </Card>
        <Card title="营养支持" size="small">
          <p>根据患者情况制定个性化营养方案，保证热量和蛋白质摄入</p>
          <Tag color="orange">待评估</Tag>
        </Card>
      </Space>
    )
  }

  const getServiceRecordsItems = () => {
    const records = [
      {
        date: '2024-01-18 10:30',
        content: '评估疼痛程度：4分，给予止痛药物',
        role: 'doctor',
      },
      {
        date: '2024-01-18 08:00',
        content: '晨间护理完成，患者状态良好',
        role: 'nurse',
      },
      {
        date: '2024-01-17 21:00',
        content: '夜间巡房，患者睡眠良好',
        role: 'nurse',
      },
      {
        date: '2024-01-17 14:00',
        content: '心理疏导服务，与家属沟通病情',
        role: 'social-worker',
      },
    ]

    const filteredRecords = records.filter(record => {
      if (userRole === 'admin') return true
      if (userRole === 'doctor' && record.role === 'doctor') return true
      if (userRole === 'nurse' && record.role === 'nurse') return true
      if (userRole === 'social-worker' && record.role === 'social-worker') return true
      return false
    })

    if (filteredRecords.length === 0) {
      return <Empty description="暂无相关服务记录" />
    }

    return (
      <Timeline>
        {filteredRecords.map((record, index) => (
          <Timeline.Item key={index} color={record.role === 'doctor' ? 'blue' : record.role === 'nurse' ? 'green' : 'orange'}>
            <p><strong>{record.date}</strong></p>
            <p>{record.content}</p>
          </Timeline.Item>
        ))}
      </Timeline>
    )
  }

  const getFamilyServicesItems = () => {
    if (userRole === 'doctor' || userRole === 'nurse') {
      return <Empty description="无权限查看家属服务" />
    }

    return (
      <List
        itemLayout="horizontal"
        dataSource={[
          {
            title: '家属心理支持',
            date: '2024-01-17',
            provider: '李社工',
            status: '已完成',
          },
          {
            title: '照护技能培训',
            date: '2024-01-16',
            provider: '王护士长',
            status: '进行中',
          },
          {
            title: '家庭会议',
            date: '2024-01-15',
            provider: '陈医生',
            status: '已完成',
          },
        ]}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<TeamOutlined />} />}
              title={item.title}
              description={`${item.date} | 服务提供者：${item.provider}`}
            />
            <Tag color={item.status === '已完成' ? 'green' : 'blue'}>{item.status}</Tag>
          </List.Item>
        )}
      />
    )
  }

  const items = [
    {
      key: '1',
      label: '基本信息',
      children: getPatientBasicInfo(),
    },
  ]

  if (roleConfig.canViewMedicalData || userRole === 'admin') {
    items.push({
      key: 'medical',
      label: '医疗信息',
      children: getMedicalInfo(),
    })
  }

  if (roleConfig.canViewPsychologicalData || userRole === 'admin') {
    items.push({
      key: 'psychological',
      label: '心理评估',
      children: getPsychologicalInfo(),
    })
  }

  if (roleConfig.canViewMedicalData || roleConfig.canViewNursingData || userRole === 'admin') {
    items.push({
      key: '2',
      label: '护理计划',
      children: getCarePlanItems(),
    })
  }

  items.push({
    key: '3',
    label: '服务记录',
    children: getServiceRecordsItems(),
  })

  if (userRole === 'admin' || userRole === 'social-worker' || userRole === 'family') {
    items.push({
      key: '4',
      label: '家属服务',
      children: getFamilyServicesItems(),
    })
  }

  return (
    <div>
      <Card>
        <Space style={{ marginBottom: 16 }}>
          {(userRole === 'doctor' || userRole === 'admin') && (
            <>
              <Button type="primary" icon={<MedicineBoxOutlined />}>新增医疗记录</Button>
              <Button icon={<FileTextOutlined />}>查看用药记录</Button>
            </>
          )}
          {(userRole === 'nurse' || userRole === 'admin') && (
            <Button type="primary" icon={<HeartOutlined />}>新增护理记录</Button>
          )}
          {(userRole === 'social-worker' || userRole === 'admin') && (
            <Button icon={<TeamOutlined />}>心理评估</Button>
          )}
          {(userRole === 'doctor' || userRole === 'admin') && (
            <Button icon={<FileTextOutlined />}>打印医疗报告</Button>
          )}
        </Space>
        <Tabs items={items} />
      </Card>
    </div>
  )
}

export default PatientDetail
