import { useState } from 'react'
import { Card, Table, Button, Input, Space, Tag, Modal, Form, Select, DatePicker, message, Descriptions, Typography, Timeline, Avatar } from 'antd'
import { PlusOutlined, SearchOutlined, EyeOutlined, FormOutlined, UserOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import BackgroundWrapper from '../components/BackgroundWrapper/BackgroundWrapper'

const { TextArea } = Input
const { Title } = Typography

interface FamilyCommunication {
  key: string
  patientId: string
  patientName: string
  familyName: string
  relationship: string
  contact: string
  type: 'meeting' | 'phone' | 'visit' | 'consultation'
  topic: string
  provider: string
  date: string
  status: 'completed' | 'scheduled' | 'cancelled'
  summary: string
  followUp: string
}

const FamilyCommunication = () => {
  const [searchText, setSearchText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedComm, setSelectedComm] = useState<FamilyCommunication | null>(null)
  const [form] = Form.useForm()

  const [communications, setCommunications] = useState<FamilyCommunication[]>([
    {
      key: '1',
      patientId: 'P001',
      patientName: '张三',
      familyName: '张小明',
      relationship: '儿子',
      contact: '13800138000',
      type: 'meeting',
      topic: '病情沟通',
      provider: '李社工',
      date: '2024-01-18',
      status: 'completed',
      summary: '与患者儿子沟通病情，告知当前治疗方案，解答家属疑问。家属表示理解并支持治疗决定。',
      followUp: '保持每周沟通，及时告知病情变化',
    },
    {
      key: '2',
      patientId: 'P001',
      patientName: '张三',
      familyName: '李芳',
      relationship: '配偶',
      contact: '13900139000',
      type: 'visit',
      topic: '照护指导',
      provider: '王护士',
      date: '2024-01-17',
      status: 'completed',
      summary: '对患者妻子进行照护技能培训，指导日常护理操作和注意事项。',
      followUp: '定期回访，了解照护情况',
    },
    {
      key: '3',
      patientId: 'P002',
      patientName: '李四',
      familyName: '李小华',
      relationship: '女儿',
      contact: '13700137000',
      type: 'phone',
      topic: '家庭会议安排',
      provider: '李社工',
      date: '2024-01-19',
      status: 'scheduled',
      summary: '',
      followUp: '',
    },
  ])

  const getTypeTag = (type: string) => {
    const tagMap: Record<string, { color: string; text: string }> = {
      meeting: { color: 'blue', text: '会议' },
      phone: { color: 'green', text: '电话' },
      visit: { color: 'orange', text: '探访' },
      consultation: { color: 'purple', text: '咨询' },
    }
    const { color, text } = tagMap[type] || { color: 'default', text: type }
    return <Tag color={color}>{text}</Tag>
  }

  const getStatusTag = (status: string) => {
    const tagMap: Record<string, { color: string; text: string }> = {
      completed: { color: 'green', text: '已完成' },
      scheduled: { color: 'blue', text: '已安排' },
      cancelled: { color: 'red', text: '已取消' },
    }
    const { color, text } = tagMap[status] || { color: 'default', text: status }
    return <Tag color={color}>{text}</Tag>
  }

  const columns: ColumnsType<FamilyCommunication> = [
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
      title: '家属姓名',
      dataIndex: 'familyName',
      key: 'familyName',
    },
    {
      title: '关系',
      dataIndex: 'relationship',
      key: 'relationship',
    },
    {
      title: '联系方式',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '沟通类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => getTypeTag(type),
    },
    {
      title: '主题',
      dataIndex: 'topic',
      key: 'topic',
    },
    {
      title: '沟通者',
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
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
      const newComm: FamilyCommunication = {
        key: Date.now().toString(),
        ...values,
        date: values.date.format('YYYY-MM-DD'),
      }
      setCommunications([...communications, newComm])
      setIsModalOpen(false)
      form.resetFields()
      message.success('添加成功')
    })
  }

  const handleView = (comm: FamilyCommunication) => {
    setSelectedComm(comm)
    setViewModalOpen(true)
  }

  return (
    <BackgroundWrapper backgroundType="warm">
      <Card>
        <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Input
              placeholder="搜索患者或家属姓名"
              prefix={<SearchOutlined />}
              style={{ width: 250 }}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            新增沟通记录
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={communications.filter(
            (comm) =>
              comm.patientName.includes(searchText) ||
              comm.familyName.includes(searchText) ||
              comm.patientId.toLowerCase().includes(searchText.toLowerCase())
          )}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="新增沟通记录"
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
            name="familyName"
            label="家属姓名"
            rules={[{ required: true, message: '请输入家属姓名' }]}
          >
            <Input placeholder="请输入家属姓名" />
          </Form.Item>

          <Form.Item
            name="relationship"
            label="与患者关系"
            rules={[{ required: true, message: '请输入与患者关系' }]}
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
            name="contact"
            label="联系方式"
            rules={[{ required: true, message: '请输入联系方式' }]}
          >
            <Input placeholder="请输入联系方式" />
          </Form.Item>

          <Form.Item
            name="type"
            label="沟通类型"
            rules={[{ required: true, message: '请选择沟通类型' }]}
          >
            <Select placeholder="请选择沟通类型">
              <Select.Option value="meeting">会议</Select.Option>
              <Select.Option value="phone">电话</Select.Option>
              <Select.Option value="visit">探访</Select.Option>
              <Select.Option value="consultation">咨询</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="topic"
            label="沟通主题"
            rules={[{ required: true, message: '请输入沟通主题' }]}
          >
            <Input placeholder="请输入沟通主题" />
          </Form.Item>

          <Form.Item
            name="provider"
            label="沟通者"
            rules={[{ required: true, message: '请输入沟通者姓名' }]}
          >
            <Input placeholder="请输入沟通者姓名" />
          </Form.Item>

          <Form.Item
            name="date"
            label="沟通日期"
            rules={[{ required: true, message: '请选择沟通日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="summary"
            label="沟通摘要"
          >
            <TextArea rows={4} placeholder="请描述沟通的主要内容" />
          </Form.Item>

          <Form.Item
            name="followUp"
            label="后续计划"
          >
            <TextArea rows={3} placeholder="请输入后续计划" />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="completed">已完成</Select.Option>
              <Select.Option value="scheduled">已安排</Select.Option>
              <Select.Option value="cancelled">已取消</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="查看沟通记录"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={null}
        width={800}
      >
        {selectedComm && (
          <>
            <Descriptions bordered column={2} style={{ marginBottom: 24 }}>
              <Descriptions.Item label="记录ID" span={2}>{selectedComm.key}</Descriptions.Item>
              <Descriptions.Item label="患者ID">{selectedComm.patientId}</Descriptions.Item>
              <Descriptions.Item label="患者姓名">{selectedComm.patientName}</Descriptions.Item>
              <Descriptions.Item label="家属姓名">{selectedComm.familyName}</Descriptions.Item>
              <Descriptions.Item label="与患者关系">{selectedComm.relationship}</Descriptions.Item>
              <Descriptions.Item label="联系方式">{selectedComm.contact}</Descriptions.Item>
              <Descriptions.Item label="沟通类型">{getTypeTag(selectedComm.type)}</Descriptions.Item>
              <Descriptions.Item label="沟通主题">{selectedComm.topic}</Descriptions.Item>
              <Descriptions.Item label="沟通者">{selectedComm.provider}</Descriptions.Item>
              <Descriptions.Item label="沟通日期">{selectedComm.date}</Descriptions.Item>
              <Descriptions.Item label="状态" span={2}>{getStatusTag(selectedComm.status)}</Descriptions.Item>
            </Descriptions>

            <Title level={5}>
              <UserOutlined /> 沟通详情
            </Title>
            <Timeline style={{ marginBottom: 16 }}>
              <Timeline.Item color="blue">
                <p><strong>沟通日期：</strong>{selectedComm.date}</p>
                <p><strong>沟通类型：</strong>{getTypeTag(selectedComm.type)}</p>
              </Timeline.Item>
              <Timeline.Item color="green">
                <p><strong>沟通摘要：</strong></p>
                <p>{selectedComm.summary || '暂无摘要'}</p>
              </Timeline.Item>
              <Timeline.Item color="orange">
                <p><strong>后续计划：</strong></p>
                <p>{selectedComm.followUp || '暂无后续计划'}</p>
              </Timeline.Item>
            </Timeline>
          </>
        )}
      </Modal>
    </BackgroundWrapper>
  )
}

export default FamilyCommunication
