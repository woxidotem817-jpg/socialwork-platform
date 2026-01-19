import { useState } from 'react'
import { Card, Table, Button, Space, Tag, Modal, Form, Input, Select, DatePicker, InputNumber } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

interface CarePlan {
  key: string
  id: string
  patientName: string
  patientId: string
  type: string
  content: string
  startDate: string
  endDate: string
  status: 'pending' | 'ongoing' | 'completed' | 'cancelled'
  provider: string
}

const CarePlans = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  const [carePlans, setCarePlans] = useState<CarePlan[]>([
    {
      key: '1',
      id: 'CP001',
      patientName: '张三',
      patientId: 'P001',
      type: '疼痛管理',
      content: '按照WHO三级止痛原则，定时评估疼痛程度，及时调整药物剂量',
      startDate: '2024-01-10',
      endDate: '2024-02-10',
      status: 'ongoing',
      provider: '李护士',
    },
    {
      key: '2',
      id: 'CP002',
      patientName: '李四',
      patientId: 'P002',
      type: '认知训练',
      content: '每日进行记忆训练、语言训练和定向力训练，延缓认知功能衰退',
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      status: 'ongoing',
      provider: '王护士长',
    },
    {
      key: '3',
      id: 'CP003',
      patientName: '王五',
      patientId: 'P003',
      type: '心脏康复',
      content: '循序渐进的运动训练，逐步提高心肺功能',
      startDate: '2024-01-12',
      endDate: '2024-03-12',
      status: 'pending',
      provider: '陈医生',
    },
  ])

  const getStatusTag = (status: string) => {
    const tagMap: Record<string, { color: string; text: string }> = {
      pending: { color: 'default', text: '待执行' },
      ongoing: { color: 'blue', text: '进行中' },
      completed: { color: 'green', text: '已完成' },
      cancelled: { color: 'red', text: '已取消' },
    }
    const { color, text } = tagMap[status] || { color: 'default', text: status }
    return <Tag color={color}>{text}</Tag>
  }

  const columns: ColumnsType<CarePlan> = [
    {
      title: '计划ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '患者姓名',
      dataIndex: 'patientName',
      key: 'patientName',
    },
    {
      title: '患者ID',
      dataIndex: 'patientId',
      key: 'patientId',
    },
    {
      title: '护理类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '护理内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
    },
    {
      title: '开始日期',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: '结束日期',
      dataIndex: 'endDate',
      key: 'endDate',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
      filters: [
        { text: '待执行', value: 'pending' },
        { text: '进行中', value: 'ongoing' },
        { text: '已完成', value: 'completed' },
        { text: '已取消', value: 'cancelled' },
      ],
    },
    {
      title: '负责人',
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<CheckOutlined />} disabled={record.status === 'completed'}>
            完成
          </Button>
          <Button type="link" icon={<EditOutlined />}>编辑</Button>
          <Button type="link" danger icon={<DeleteOutlined />}>删除</Button>
        </Space>
      ),
    },
  ]

  const handleAdd = () => {
    form.validateFields().then((values) => {
      const newCarePlan: CarePlan = {
        key: Date.now().toString(),
        id: `CP${String(carePlans.length + 1).padStart(3, '0')}`,
        ...values,
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate.format('YYYY-MM-DD'),
      }
      setCarePlans([...carePlans, newCarePlan])
      setIsModalOpen(false)
      form.resetFields()
    })
  }

  return (
    <div>
      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            新增护理计划
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={carePlans}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="新增护理计划"
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
            name="patientId"
            label="患者ID"
            rules={[{ required: true, message: '请输入患者ID' }]}
          >
            <Input placeholder="请输入患者ID" />
          </Form.Item>

          <Form.Item
            name="type"
            label="护理类型"
            rules={[{ required: true, message: '请选择护理类型' }]}
          >
            <Select placeholder="请选择护理类型">
              <Select.Option value="疼痛管理">疼痛管理</Select.Option>
              <Select.Option value="呼吸困难护理">呼吸困难护理</Select.Option>
              <Select.Option value="营养支持">营养支持</Select.Option>
              <Select.Option value="认知训练">认知训练</Select.Option>
              <Select.Option value="心脏康复">心脏康复</Select.Option>
              <Select.Option value="心理支持">心理支持</Select.Option>
              <Select.Option value="家属教育">家属教育</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="content"
            label="护理内容"
            rules={[{ required: true, message: '请输入护理内容' }]}
          >
            <Input.TextArea rows={4} placeholder="请详细描述护理计划内容" />
          </Form.Item>

          <Form.Item
            name="startDate"
            label="开始日期"
            rules={[{ required: true, message: '请选择开始日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="结束日期"
            rules={[{ required: true, message: '请选择结束日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="provider"
            label="负责人"
            rules={[{ required: true, message: '请输入负责人姓名' }]}
          >
            <Input placeholder="请输入负责人姓名" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default CarePlans
