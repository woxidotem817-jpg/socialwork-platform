import { useState } from 'react'
import { Card, Table, Button, Space, Tag, Modal, Form, Input, Select, DatePicker, Rate } from 'antd'
import { PlusOutlined, HeartOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import BackgroundWrapper from '../components/BackgroundWrapper/BackgroundWrapper'

interface PsychologicalSupport {
  key: string
  id: string
  patientName: string
  supportType: string
  provider: string
  date: string
  duration: number
  moodRating: number
  notes: string
  status: 'scheduled' | 'completed'
}

const PsychologicalSupport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  const [supports, setSupports] = useState<PsychologicalSupport[]>([
    {
      key: '1',
      id: 'PS001',
      patientName: '张三',
      supportType: '情绪疏导',
      provider: '李社工',
      date: '2024-01-18',
      duration: 45,
      moodRating: 3,
      notes: '患者情绪较稳定，能积极面对疾病',
      status: 'completed',
    },
    {
      key: '2',
      id: 'PS002',
      patientName: '李四',
      supportType: '认知干预',
      provider: '李社工',
      date: '2024-01-17',
      duration: 60,
      moodRating: 4,
      notes: '患者认知功能有所改善',
      status: 'completed',
    },
    {
      key: '3',
      id: 'PS003',
      patientName: '王五',
      supportType: '生命回顾',
      provider: '周社工',
      date: '2024-01-20',
      duration: 60,
      moodRating: 0,
      notes: '',
      status: 'scheduled',
    },
  ])

  const getStatusTag = (status: string) => {
    const tagMap: Record<string, { color: string; text: string }> = {
      scheduled: { color: 'blue', text: '已安排' },
      completed: { color: 'green', text: '已完成' },
    }
    const { color, text } = tagMap[status] || { color: 'default', text: status }
    return <Tag color={color}>{text}</Tag>
  }

  const columns: ColumnsType<PsychologicalSupport> = [
    {
      title: '记录ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '患者姓名',
      dataIndex: 'patientName',
      key: 'patientName',
    },
    {
      title: '支持类型',
      dataIndex: 'supportType',
      key: 'supportType',
    },
    {
      title: '服务提供者',
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
      title: '时长（分钟）',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: '情绪评分',
      dataIndex: 'moodRating',
      key: 'moodRating',
      render: (rating: number) => rating > 0 ? <Rate disabled defaultValue={rating} /> : '-',
    },
    {
      title: '备注',
      dataIndex: 'notes',
      key: 'notes',
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    },
  ]

  const handleAdd = () => {
    form.validateFields().then((values) => {
      const newSupport: PsychologicalSupport = {
        key: Date.now().toString(),
        id: `PS${String(supports.length + 1).padStart(3, '0')}`,
        ...values,
        date: values.date.format('YYYY-MM-DD'),
      }
      setSupports([...supports, newSupport])
      setIsModalOpen(false)
      form.resetFields()
    })
  }

  return (
    <BackgroundWrapper backgroundType="warm">
      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            新增心理支持记录
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={supports}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="新增心理支持记录"
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
            name="supportType"
            label="支持类型"
            rules={[{ required: true, message: '请选择支持类型' }]}
          >
            <Select placeholder="请选择支持类型">
              <Select.Option value="情绪疏导">情绪疏导</Select.Option>
              <Select.Option value="认知干预">认知干预</Select.Option>
              <Select.Option value="生命回顾">生命回顾</Select.Option>
              <Select.Option value="心理治疗">心理治疗</Select.Option>
              <Select.Option value="家庭治疗">家庭治疗</Select.Option>
              <Select.Option value="团体治疗">团体治疗</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="provider"
            label="服务提供者"
            rules={[{ required: true, message: '请输入服务提供者姓名' }]}
          >
            <Input placeholder="请输入服务提供者姓名" />
          </Form.Item>

          <Form.Item
            name="date"
            label="日期"
            rules={[{ required: true, message: '请选择日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="duration"
            label="时长（分钟）"
            rules={[{ required: true, message: '请输入时长' }]}
          >
            <Input type="number" placeholder="请输入服务时长" />
          </Form.Item>

          <Form.Item
            name="moodRating"
            label="情绪评分"
            rules={[{ required: true, message: '请评分' }]}
          >
            <Rate />
          </Form.Item>

          <Form.Item
            name="notes"
            label="备注"
          >
            <Input.TextArea rows={4} placeholder="请输入备注信息" />
          </Form.Item>
        </Form>
      </Modal>
    </BackgroundWrapper>
  )
}

export default PsychologicalSupport
