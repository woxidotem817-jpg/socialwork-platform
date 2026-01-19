import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Card, Table, Button, Space, Tag, Modal, Form, Input, Select, DatePicker, Alert, Descriptions, Typography } from 'antd'
import { PlusOutlined, TeamOutlined, HeartOutlined, EyeOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { RootState } from '../store'
import { roleConfigs } from '../types/roles'

const { Title } = Typography

interface FamilyService {
  key: string
  id: string
  patientName: string
  familyMember: string
  relationship: string
  serviceType: string
  content: string
  date: string
  status: 'scheduled' | 'completed' | 'cancelled'
  provider: string
  contact?: string
}

const FamilyServices = () => {
  const user = useSelector((state: RootState) => state.auth.user) || JSON.parse(localStorage.getItem('user') || '{}')
  const userRole = user?.role || 'admin'
  const roleConfig = roleConfigs[userRole]

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<FamilyService | null>(null)
  const [form] = Form.useForm()

  const [services, setServices] = useState<FamilyService[]>([
    {
      key: '1',
      id: 'FS001',
      patientName: '张三',
      familyMember: '张小明',
      relationship: '儿子',
      serviceType: '心理支持',
      content: '提供心理疏导服务，帮助家属应对悲伤情绪',
      date: '2024-01-17',
      status: 'completed',
      provider: '李社工',
      contact: '13800138000',
    },
    {
      key: '2',
      id: 'FS002',
      patientName: '李四',
      familyMember: '李小华',
      relationship: '女儿',
      serviceType: '照护培训',
      content: '教授基础照护技能，包括翻身、拍背、清洁等',
      date: '2024-01-16',
      status: 'completed',
      provider: '王护士长',
      contact: '13900139000',
    },
    {
      key: '3',
      id: 'FS003',
      patientName: '王五',
      familyMember: '王小红',
      relationship: '女儿',
      serviceType: '家庭会议',
      content: '与家属共同讨论病情发展和护理方案',
      date: '2024-01-19',
      status: 'scheduled',
      provider: '陈医生',
      contact: '13700137000',
    },
  ])

  const getStatusTag = (status: string) => {
    const tagMap: Record<string, { color: string; text: string }> = {
      scheduled: { color: 'blue', text: '已安排' },
      completed: { color: 'green', text: '已完成' },
      cancelled: { color: 'red', text: '已取消' },
    }
    const { color, text } = tagMap[status] || { color: 'default', text: status }
    return <Tag color={color}>{text}</Tag>
  }

  const columns: ColumnsType<FamilyService> = [
    {
      title: '服务ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '患者姓名',
      dataIndex: 'patientName',
      key: 'patientName',
    },
    {
      title: '家属成员',
      dataIndex: 'familyMember',
      key: 'familyMember',
    },
    {
      title: '关系',
      dataIndex: 'relationship',
      key: 'relationship',
    },
    {
      title: '服务类型',
      dataIndex: 'serviceType',
      key: 'serviceType',
    },
    {
      title: '服务内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
    },
    {
      title: '服务日期',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
      filters: [
        { text: '已安排', value: 'scheduled' },
        { text: '已完成', value: 'completed' },
        { text: '已取消', value: 'cancelled' },
      ],
    },
    {
      title: '提供服务者',
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record)}>查看</Button>
        </Space>
      ),
    },
  ]

  const handleAdd = () => {
    if (userRole === 'family') {
      // 家属不能新增服务
      return
    }
    form.validateFields().then((values) => {
      const newService: FamilyService = {
        key: Date.now().toString(),
        id: `FS${String(services.length + 1).padStart(3, '0')}`,
        ...values,
        date: values.date.format('YYYY-MM-DD'),
      }
      setServices([...services, newService])
      setIsModalOpen(false)
      form.resetFields()
    })
  }

  const handleView = (service: FamilyService) => {
    setSelectedService(service)
    setViewModalOpen(true)
  }

  const displayServices = userRole === 'family'
    ? services.filter(s => s.patientName === (user?.name || '')) // 家属只能看到自己的信息
    : services

  return (
    <div>
      <div className="page-banner">
        <img
          src="/images/care/family-support.jpg"
          alt="家属服务"
        />
      </div>

      <Card>
        {userRole === 'family' && (
          <Alert
            message="家属专属服务"
            description="以下是您专属的家属服务信息。如需了解更多服务，请联系医院社工或医护人员。"
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Space style={{ marginBottom: 16 }}>
          {userRole !== 'family' && (
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
              新增家属服务
            </Button>
          )}
        </Space>

        <Table
          columns={columns}
          dataSource={displayServices}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="新增家属服务"
        open={isModalOpen}
        onOk={handleAdd}
        onCancel={() => {
          setIsModalOpen(false)
          form.resetFields()
        }}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="patientName"
            label="患者姓名"
            rules={[{ required: true, message: '请输入患者姓名' }]}
          >
            <Input placeholder="请输入患者姓名" />
          </Form.Item>

          <Form.Item
            name="familyMember"
            label="家属成员"
            rules={[{ required: true, message: '请输入家属成员信息' }]}
          >
            <Input placeholder="例如：张小明" />
          </Form.Item>

          <Form.Item
            name="relationship"
            label="与患者关系"
            rules={[{ required: true, message: '请选择与患者关系' }]}
          >
            <Select placeholder="请选择关系">
              <Select.Option value="配偶">配偶</Select.Option>
              <Select.Option value="子女">子女</Select.Option>
              <Select.Option value="父母">父母</Select.Option>
              <Select.Option value="兄弟姐妹">兄弟姐妹</Select.Option>
              <Select.Option value="其他">其他</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="serviceType"
            label="服务类型"
            rules={[{ required: true, message: '请选择服务类型' }]}
          >
            <Select placeholder="请选择服务类型">
              <Select.Option value="心理支持">心理支持</Select.Option>
              <Select.Option value="照护培训">照护培训</Select.Option>
              <Select.Option value="家庭会议">家庭会议</Select.Option>
              <Select.Option value="哀伤辅导">哀伤辅导</Select.Option>
              <Select.Option value="法律咨询">法律咨询</Select.Option>
              <Select.Option value="经济援助">经济援助</Select.Option>
              <Select.Option value="临终陪伴">临终陪伴</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="content"
            label="服务内容"
            rules={[{ required: true, message: '请输入服务内容' }]}
          >
            <Input.TextArea rows={4} placeholder="请详细描述服务内容" />
          </Form.Item>

          <Form.Item
            name="date"
            label="服务日期"
            rules={[{ required: true, message: '请选择服务日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="provider"
            label="提供服务者"
            rules={[{ required: true, message: '请输入提供服务者姓名' }]}
          >
            <Input placeholder="请输入提供服务者姓名" />
          </Form.Item>

          <Form.Item
            name="contact"
            label="联系方式"
          >
            <Input placeholder="请输入联系方式" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="查看家属服务详情"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={null}
        width={700}
      >
        {selectedService && (
          <>
            <Descriptions bordered column={2} style={{ marginBottom: 24 }}>
              <Descriptions.Item label="服务ID" span={2}>{selectedService.id}</Descriptions.Item>
              <Descriptions.Item label="患者姓名">{selectedService.patientName}</Descriptions.Item>
              <Descriptions.Item label="家属成员">{selectedService.familyMember}</Descriptions.Item>
              <Descriptions.Item label="与患者关系">{selectedService.relationship}</Descriptions.Item>
              <Descriptions.Item label="服务类型">{selectedService.serviceType}</Descriptions.Item>
              <Descriptions.Item label="服务日期">{selectedService.date}</Descriptions.Item>
              <Descriptions.Item label="提供服务者">{selectedService.provider}</Descriptions.Item>
              <Descriptions.Item label="状态">{getStatusTag(selectedService.status)}</Descriptions.Item>
              {selectedService.contact && (
                <Descriptions.Item label="联系方式" span={2}>{selectedService.contact}</Descriptions.Item>
              )}
            </Descriptions>

            <Card title="服务内容" size="small">
              <p>{selectedService.content}</p>
            </Card>
          </>
        )}
      </Modal>
    </div>
  )
}

export default FamilyServices
