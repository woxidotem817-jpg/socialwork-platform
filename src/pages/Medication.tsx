import { useState } from 'react'
import { Card, Table, Button, Input, Space, Tag, Modal, Form, Select, DatePicker, message, Descriptions, Typography, Alert } from 'antd'
import { PlusOutlined, SearchOutlined, EditOutlined, EyeOutlined, MedicineBoxOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import BackgroundWrapper from '../components/BackgroundWrapper/BackgroundWrapper'

const { TextArea } = Input
const { Title } = Typography

interface Medication {
  key: string
  patientId: string
  patientName: string
  medicationName: string
  dosage: string
  frequency: string
  route: string
  startDate: string
  endDate: string
  prescribingDoctor: string
  status: 'active' | 'discontinued' | 'completed'
  notes: string
}

const MedicationPage = () => {
  const [searchText, setSearchText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null)
  const [form] = Form.useForm()

  const [medications, setMedications] = useState<Medication[]>([
    {
      key: '1',
      patientId: 'P001',
      patientName: '张三',
      medicationName: '吗啡缓释片',
      dosage: '30mg',
      frequency: '每12小时一次',
      route: '口服',
      startDate: '2024-01-10',
      endDate: '',
      prescribingDoctor: '陈医生',
      status: 'active',
      notes: '用于控制疼痛，需密切监测呼吸',
    },
    {
      key: '2',
      patientId: 'P001',
      patientName: '张三',
      medicationName: '呋塞米',
      dosage: '20mg',
      frequency: '每日一次',
      route: '口服',
      startDate: '2024-01-12',
      endDate: '',
      prescribingDoctor: '陈医生',
      status: 'active',
      notes: '用于缓解水肿',
    },
    {
      key: '3',
      patientId: 'P002',
      patientName: '李四',
      medicationName: '多奈哌齐',
      dosage: '5mg',
      frequency: '每日一次',
      route: '口服',
      startDate: '2024-01-05',
      endDate: '',
      prescribingDoctor: '陈医生',
      status: 'active',
      notes: '用于改善认知功能',
    },
    {
      key: '4',
      patientId: 'P003',
      patientName: '王五',
      medicationName: '地高辛',
      dosage: '0.125mg',
      frequency: '每日一次',
      route: '口服',
      startDate: '2024-01-08',
      endDate: '2024-01-15',
      prescribingDoctor: '陈医生',
      status: 'discontinued',
      notes: '因心功能改善而停用',
    },
  ])

  const getStatusTag = (status: string) => {
    const tagMap: Record<string, { color: string; text: string }> = {
      active: { color: 'green', text: '使用中' },
      discontinued: { color: 'red', text: '已停用' },
      completed: { color: 'blue', text: '已完成' },
    }
    const { color, text } = tagMap[status] || { color: 'default', text: status }
    return <Tag color={color}>{text}</Tag>
  }

  const columns: ColumnsType<Medication> = [
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
      title: '药品名称',
      dataIndex: 'medicationName',
      key: 'medicationName',
    },
    {
      title: '剂量',
      dataIndex: 'dosage',
      key: 'dosage',
    },
    {
      title: '频率',
      dataIndex: 'frequency',
      key: 'frequency',
    },
    {
      title: '给药途径',
      dataIndex: 'route',
      key: 'route',
    },
    {
      title: '开始日期',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a, b) => dayjs(a.startDate).unix() - dayjs(b.startDate).unix(),
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
      const newMedication: Medication = {
        key: Date.now().toString(),
        ...values,
        startDate: values.startDate.format('YYYY-MM-DD'),
        endDate: values.endDate ? values.endDate.format('YYYY-MM-DD') : '',
      }
      setMedications([...medications, newMedication])
      setIsModalOpen(false)
      form.resetFields()
      message.success('添加成功')
    })
  }

  const handleView = (medication: Medication) => {
    setSelectedMedication(medication)
    setViewModalOpen(true)
  }

  return (
    <BackgroundWrapper backgroundType="professional">
      <Card>
        <Alert
          message="用药安全提醒"
          description="请严格按照医嘱执行用药方案，密切观察患者用药反应，如发现异常及时处理。"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />

        <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Input
              placeholder="搜索患者姓名或药品名称"
              prefix={<SearchOutlined />}
              style={{ width: 250 }}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Space>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalOpen(true)}>
            新增用药记录
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={medications.filter(
            (med) =>
              med.patientName.includes(searchText) ||
              med.medicationName.includes(searchText) ||
              med.patientId.toLowerCase().includes(searchText.toLowerCase())
          )}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="新增用药记录"
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
            name="medicationName"
            label="药品名称"
            rules={[{ required: true, message: '请输入药品名称' }]}
          >
            <Input placeholder="请输入药品名称" />
          </Form.Item>

          <Form.Item
            name="dosage"
            label="剂量"
            rules={[{ required: true, message: '请输入剂量' }]}
          >
            <Input placeholder="请输入剂量，如：30mg" />
          </Form.Item>

          <Form.Item
            name="frequency"
            label="给药频率"
            rules={[{ required: true, message: '请输入给药频率' }]}
          >
            <Input placeholder="请输入给药频率，如：每12小时一次" />
          </Form.Item>

          <Form.Item
            name="route"
            label="给药途径"
            rules={[{ required: true, message: '请选择给药途径' }]}
          >
            <Select placeholder="请选择给药途径">
              <Select.Option value="口服">口服</Select.Option>
              <Select.Option value="静脉注射">静脉注射</Select.Option>
              <Select.Option value="肌肉注射">肌肉注射</Select.Option>
              <Select.Option value="皮下注射">皮下注射</Select.Option>
              <Select.Option value="吸入">吸入</Select.Option>
              <Select.Option value="外用">外用</Select.Option>
            </Select>
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
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="prescribingDoctor"
            label="开方医生"
            rules={[{ required: true, message: '请输入开方医生' }]}
          >
            <Input placeholder="请输入开方医生" />
          </Form.Item>

          <Form.Item
            name="notes"
            label="备注"
          >
            <TextArea rows={3} placeholder="请输入备注信息" />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="active">使用中</Select.Option>
              <Select.Option value="discontinued">已停用</Select.Option>
              <Select.Option value="completed">已完成</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="查看用药记录"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={null}
        width={800}
      >
        {selectedMedication && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="记录ID" span={2}>{selectedMedication.key}</Descriptions.Item>
            <Descriptions.Item label="患者ID">{selectedMedication.patientId}</Descriptions.Item>
            <Descriptions.Item label="患者姓名">{selectedMedication.patientName}</Descriptions.Item>
            <Descriptions.Item label="药品名称" span={2}>{selectedMedication.medicationName}</Descriptions.Item>
            <Descriptions.Item label="剂量">{selectedMedication.dosage}</Descriptions.Item>
            <Descriptions.Item label="给药频率">{selectedMedication.frequency}</Descriptions.Item>
            <Descriptions.Item label="给药途径">{selectedMedication.route}</Descriptions.Item>
            <Descriptions.Item label="开方医生">{selectedMedication.prescribingDoctor}</Descriptions.Item>
            <Descriptions.Item label="开始日期">{selectedMedication.startDate}</Descriptions.Item>
            <Descriptions.Item label="结束日期">{selectedMedication.endDate || '-'}</Descriptions.Item>
            <Descriptions.Item label="状态">{getStatusTag(selectedMedication.status)}</Descriptions.Item>
            <Descriptions.Item label="备注" span={2}>{selectedMedication.notes || '-'}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </BackgroundWrapper>
  )
}

export default MedicationPage
