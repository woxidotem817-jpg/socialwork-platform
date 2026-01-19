import { useState } from 'react'
import { Card, Table, Button, Input, Space, Tag, Modal, Form, Select, DatePicker, message, Descriptions, Steps, Typography, Progress } from 'antd'
import { PlusOutlined, SearchOutlined, EditOutlined, EyeOutlined, CheckCircleOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

const { TextArea } = Input
const { Title, Text } = Typography
const { Step } = Steps

interface TreatmentPlan {
  key: string
  patientId: string
  patientName: string
  diagnosis: string
  planName: string
  doctorName: string
  createDate: string
  status: 'active' | 'completed' | 'suspended'
  progress: number
  goal: string
  interventions: string[]
}

const TreatmentPlans = () => {
  const [searchText, setSearchText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<TreatmentPlan | null>(null)
  const [form] = Form.useForm()

  const [plans, setPlans] = useState<TreatmentPlan[]>([
    {
      key: '1',
      patientId: 'P001',
      patientName: '张三',
      diagnosis: '晚期肺癌',
      planName: '疼痛管理方案',
      doctorName: '陈医生',
      createDate: '2024-01-10',
      status: 'active',
      progress: 75,
      goal: '将疼痛控制在3分以下',
      interventions: ['使用WHO三级止痛药物', '定时评估疼痛程度', '调整药物剂量', '提供疼痛教育'],
    },
    {
      key: '2',
      patientId: 'P002',
      patientName: '李四',
      diagnosis: '阿尔茨海默病',
      planName: '认知功能改善方案',
      doctorName: '陈医生',
      createDate: '2024-01-05',
      status: 'active',
      progress: 60,
      goal: '延缓认知功能衰退',
      interventions: ['药物治疗', '认知训练', '环境优化', '家庭支持'],
    },
    {
      key: '3',
      patientId: 'P003',
      patientName: '王五',
      diagnosis: '心力衰竭',
      planName: '心功能改善方案',
      doctorName: '陈医生',
      createDate: '2024-01-12',
      status: 'completed',
      progress: 100,
      goal: '改善心功能，提高生活质量',
      interventions: ['利尿剂治疗', '限盐限水', '心功能监测', '营养支持'],
    },
  ])

  const getStatusTag = (status: string) => {
    const tagMap: Record<string, { color: string; text: string }> = {
      active: { color: 'blue', text: '进行中' },
      completed: { color: 'green', text: '已完成' },
      suspended: { color: 'orange', text: '已暂停' },
    }
    const { color, text } = tagMap[status] || { color: 'default', text: status }
    return <Tag color={color}>{text}</Tag>
  }

  const columns: ColumnsType<TreatmentPlan> = [
    {
      title: '方案ID',
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
      title: '诊断',
      dataIndex: 'diagnosis',
      key: 'diagnosis',
    },
    {
      title: '方案名称',
      dataIndex: 'planName',
      key: 'planName',
    },
    {
      title: '主治医生',
      dataIndex: 'doctorName',
      key: 'doctorName',
    },
    {
      title: '创建日期',
      dataIndex: 'createDate',
      key: 'createDate',
      sorter: (a, b) => dayjs(a.createDate).unix() - dayjs(b.createDate).unix(),
    },
    {
      title: '进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => <Progress percent={progress} size="small" />,
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
          <Button type="link" icon={<EditOutlined />}>编辑</Button>
        </Space>
      ),
    },
  ]

  const handleAdd = () => {
    form.validateFields().then((values) => {
      const newPlan: TreatmentPlan = {
        key: Date.now().toString(),
        ...values,
        createDate: values.createDate.format('YYYY-MM-DD'),
        progress: 0,
        interventions: values.interventions || [],
      }
      setPlans([...plans, newPlan])
      setIsModalOpen(false)
      form.resetFields()
      message.success('添加成功')
    })
  }

  const handleView = (plan: TreatmentPlan) => {
    setSelectedPlan(plan)
    setViewModalOpen(true)
  }

  return (
    <div>
      <Card>
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
            新建诊疗方案
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={plans.filter(
            (plan) =>
              plan.patientName.includes(searchText) ||
              plan.patientId.toLowerCase().includes(searchText.toLowerCase())
          )}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="新建诊疗方案"
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
            name="diagnosis"
            label="诊断"
            rules={[{ required: true, message: '请输入诊断' }]}
          >
            <Input placeholder="请输入诊断" />
          </Form.Item>

          <Form.Item
            name="planName"
            label="方案名称"
            rules={[{ required: true, message: '请输入方案名称' }]}
          >
            <Input placeholder="请输入方案名称" />
          </Form.Item>

          <Form.Item
            name="goal"
            label="治疗目标"
            rules={[{ required: true, message: '请输入治疗目标' }]}
          >
            <TextArea rows={2} placeholder="请输入治疗目标" />
          </Form.Item>

          <Form.Item
            name="interventions"
            label="干预措施"
            rules={[{ required: true, message: '请输入干预措施' }]}
          >
            <TextArea rows={4} placeholder="请输入干预措施（每行一个）" />
          </Form.Item>

          <Form.Item
            name="createDate"
            label="创建日期"
            rules={[{ required: true, message: '请选择创建日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="active">进行中</Select.Option>
              <Select.Option value="completed">已完成</Select.Option>
              <Select.Option value="suspended">已暂停</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="查看诊疗方案"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={null}
        width={800}
      >
        {selectedPlan && (
          <>
            <Descriptions bordered column={2} style={{ marginBottom: 16 }}>
              <Descriptions.Item label="方案ID" span={2}>{selectedPlan.key}</Descriptions.Item>
              <Descriptions.Item label="患者ID">{selectedPlan.patientId}</Descriptions.Item>
              <Descriptions.Item label="患者姓名">{selectedPlan.patientName}</Descriptions.Item>
              <Descriptions.Item label="诊断" span={2}>{selectedPlan.diagnosis}</Descriptions.Item>
              <Descriptions.Item label="方案名称" span={2}>{selectedPlan.planName}</Descriptions.Item>
              <Descriptions.Item label="主治医生">{selectedPlan.doctorName}</Descriptions.Item>
              <Descriptions.Item label="创建日期">{selectedPlan.createDate}</Descriptions.Item>
              <Descriptions.Item label="状态">{getStatusTag(selectedPlan.status)}</Descriptions.Item>
              <Descriptions.Item label="进度">
                <Progress percent={selectedPlan.progress} />
              </Descriptions.Item>
              <Descriptions.Item label="治疗目标" span={2}>{selectedPlan.goal}</Descriptions.Item>
            </Descriptions>

            <Title level={5}>干预措施</Title>
            <Steps
              direction="vertical"
              current={-1}
              items={selectedPlan.interventions.map((item, index) => ({
                title: item,
                icon: <CheckCircleOutlined />,
              }))}
            />
          </>
        )}
      </Modal>
    </div>
  )
}

export default TreatmentPlans
