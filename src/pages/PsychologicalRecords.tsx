import { useState } from 'react'
import { Card, Table, Button, Input, Space, Tag, Modal, Form, Select, DatePicker, message, Descriptions, Typography, Timeline, Alert } from 'antd'
import { PlusOutlined, SearchOutlined, EyeOutlined, FormOutlined, TeamOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

const { TextArea } = Input
const { Title } = Typography

interface PsychologicalRecord {
  key: string
  patientId: string
  patientName: string
  type: 'counseling' | 'support' | 'crisis-intervention'
  serviceName: string
  provider: string
  serviceDate: string
  duration: string
  status: 'completed' | 'ongoing' | 'follow-up'
  content: string
  outcome: string
}

const PsychologicalRecords = () => {
  const [searchText, setSearchText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<PsychologicalRecord | null>(null)
  const [form] = Form.useForm()

  const [records, setRecords] = useState<PsychologicalRecord[]>([
    {
      key: '1',
      patientId: 'P001',
      patientName: '张三',
      type: 'counseling',
      serviceName: '心理疏导',
      provider: '李社工',
      serviceDate: '2024-01-18',
      duration: '45分钟',
      status: 'completed',
      content: '患者表达了对病情的担忧和对死亡的恐惧。通过倾听和共情，帮助患者表达情绪，探讨生命意义。',
      outcome: '患者情绪有所缓解，表示愿意继续接受心理支持',
    },
    {
      key: '2',
      patientId: 'P001',
      patientName: '张三',
      type: 'support',
      serviceName: '家属支持',
      provider: '李社工',
      serviceDate: '2024-01-17',
      duration: '60分钟',
      status: 'completed',
      content: '与患者家属进行沟通，指导家属如何更好地照顾和陪伴患者，提供心理支持技巧。',
      outcome: '家属表示理解和支持，愿意配合治疗',
    },
    {
      key: '3',
      patientId: 'P003',
      patientName: '王五',
      type: 'crisis-intervention',
      serviceName: '危机干预',
      provider: '李社工',
      serviceDate: '2024-01-16',
      duration: '30分钟',
      status: 'follow-up',
      content: '患者情绪激动，表现出强烈的焦虑和恐慌。立即进行危机干预，通过呼吸放松技巧稳定情绪。',
      outcome: '患者情绪逐渐稳定，需要持续关注',
    },
  ])

  const getTypeTag = (type: string) => {
    const tagMap: Record<string, { color: string; text: string }> = {
      counseling: { color: 'blue', text: '心理疏导' },
      support: { color: 'green', text: '支持服务' },
      'crisis-intervention': { color: 'red', text: '危机干预' },
    }
    const { color, text } = tagMap[type] || { color: 'default', text: type }
    return <Tag color={color}>{text}</Tag>
  }

  const getStatusTag = (status: string) => {
    const tagMap: Record<string, { color: string; text: string }> = {
      completed: { color: 'green', text: '已完成' },
      ongoing: { color: 'blue', text: '进行中' },
      'follow-up': { color: 'orange', text: '需随访' },
    }
    const { color, text } = tagMap[status] || { color: 'default', text: status }
    return <Tag color={color}>{text}</Tag>
  }

  const columns: ColumnsType<PsychologicalRecord> = [
    {
      title: '记录ID',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: '患者ID',
      dataIndex: 'patientId',
      key: 'patientId',
    },
    {
      title: '患者姓名',
      dataIndex: 'patientName',
      key: 'patientName',
    },
    {
      title: '服务类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => getTypeTag(type),
    },
    {
      title: '服务名称',
      dataIndex: 'serviceName',
      key: 'serviceName',
    },
    {
      title: '服务者',
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: '服务日期',
      dataIndex: 'serviceDate',
      key: 'serviceDate',
      sorter: (a, b) => dayjs(a.serviceDate).unix() - dayjs(b.serviceDate).unix(),
    },
    {
      title: '时长',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<EyeOutlined />} onClick={() => handleView(record)}>查看</Button>
          <Button type="link" icon={<FormOutlined />}>编辑</Button>
        </Space>
      ),
    },
  ]

  const handleAdd = () => {
    form.validateFields().then((values) => {
      const newRecord: PsychologicalRecord = {
        key: Date.now().toString(),
        ...values,
        serviceDate: values.serviceDate.format('YYYY-MM-DD'),
      }
      setRecords([...records, newRecord])
      setIsModalOpen(false)
      form.resetFields()
      message.success('添加成功')
    })
  }

  const handleView = (record: PsychologicalRecord) => {
    setSelectedRecord(record)
    setViewModalOpen(true)
  }

  return (
    <div>
      <Card>
        <Alert
          message="心理服务记录提醒"
          description="请如实记录心理服务过程，保护患者隐私。对于高风险情况，及时上报并做好危机干预。"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />

        <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Input
              placeholder="搜索患者姓名或ID"
              prefix={<SearchOutlined />}
              style={{ width: 250 }}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            新建心理记录
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={records.filter(
            (record) =>
              record.patientName.includes(searchText) ||
              record.patientId.toLowerCase().includes(searchText.toLowerCase())
          )}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="新建心理记录"
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
            name="patientId"
            label="患者ID"
            rules={[{ required: true, message: '请输入患者ID' }]}
          >
            <Input placeholder="请输入患者ID" />
          </Form.Item>

          <Form.Item
            name="patientName"
            label="患者姓名"
            rules={[{ required: true, message: '请输入患者姓名' }]}
          >
            <Input placeholder="请输入患者姓名" />
          </Form.Item>

          <Form.Item
            name="type"
            label="服务类型"
            rules={[{ required: true, message: '请选择服务类型' }]}
          >
            <Select placeholder="请选择服务类型">
              <Select.Option value="counseling">心理疏导</Select.Option>
              <Select.Option value="support">支持服务</Select.Option>
              <Select.Option value="crisis-intervention">危机干预</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="serviceName"
            label="服务名称"
            rules={[{ required: true, message: '请输入服务名称' }]}
          >
            <Input placeholder="请输入服务名称" />
          </Form.Item>

          <Form.Item
            name="provider"
            label="服务者"
            rules={[{ required: true, message: '请输入服务者姓名' }]}
          >
            <Input placeholder="请输入服务者姓名" />
          </Form.Item>

          <Form.Item
            name="serviceDate"
            label="服务日期"
            rules={[{ required: true, message: '请选择服务日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="duration"
            label="服务时长"
            rules={[{ required: true, message: '请输入服务时长' }]}
          >
            <Input placeholder="请输入服务时长，如：45分钟" />
          </Form.Item>

          <Form.Item
            name="content"
            label="服务内容"
            rules={[{ required: true, message: '请输入服务内容' }]}
          >
            <TextArea rows={4} placeholder="请详细描述心理服务的过程和内容" />
          </Form.Item>

          <Form.Item
            name="outcome"
            label="服务效果"
            rules={[{ required: true, message: '请输入服务效果' }]}
          >
            <TextArea rows={3} placeholder="请描述服务后的效果和反应" />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="completed">已完成</Select.Option>
              <Select.Option value="ongoing">进行中</Select.Option>
              <Select.Option value="follow-up">需随访</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="查看心理记录"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={null}
        width={800}
      >
        {selectedRecord && (
          <>
            <Descriptions bordered column={2} style={{ marginBottom: 24 }}>
              <Descriptions.Item label="记录ID" span={2}>{selectedRecord.key}</Descriptions.Item>
              <Descriptions.Item label="患者ID">{selectedRecord.patientId}</Descriptions.Item>
              <Descriptions.Item label="患者姓名">{selectedRecord.patientName}</Descriptions.Item>
              <Descriptions.Item label="服务类型">{getTypeTag(selectedRecord.type)}</Descriptions.Item>
              <Descriptions.Item label="服务名称">{selectedRecord.serviceName}</Descriptions.Item>
              <Descriptions.Item label="服务者">{selectedRecord.provider}</Descriptions.Item>
              <Descriptions.Item label="服务日期">{selectedRecord.serviceDate}</Descriptions.Item>
              <Descriptions.Item label="服务时长">{selectedRecord.duration}</Descriptions.Item>
              <Descriptions.Item label="状态">{getStatusTag(selectedRecord.status)}</Descriptions.Item>
            </Descriptions>

            <Title level={5}>
              <TeamOutlined /> 服务过程
            </Title>
            <Timeline style={{ marginBottom: 16 }}>
              <Timeline.Item color="blue">
                <p><strong>服务日期：</strong>{selectedRecord.serviceDate}</p>
                <p><strong>服务时长：</strong>{selectedRecord.duration}</p>
              </Timeline.Item>
              <Timeline.Item color="green">
                <p><strong>服务内容：</strong></p>
                <p>{selectedRecord.content}</p>
              </Timeline.Item>
              <Timeline.Item color="orange">
                <p><strong>服务效果：</strong></p>
                <p>{selectedRecord.outcome}</p>
              </Timeline.Item>
            </Timeline>
          </>
        )}
      </Modal>
    </div>
  )
}

export default PsychologicalRecords
