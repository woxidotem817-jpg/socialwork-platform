import { useState } from 'react'
import { Card, Table, Button, Input, Space, Tag, Modal, Form, Select, DatePicker, message, Descriptions, Typography } from 'antd'
import { PlusOutlined, SearchOutlined, FileTextOutlined, EyeOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import BackgroundWrapper from '../components/BackgroundWrapper/BackgroundWrapper'

const { TextArea } = Input
const { Title } = Typography

interface MedicalRecord {
  key: string
  patientId: string
  patientName: string
  diagnosis: string
  doctorName: string
  recordDate: string
  symptoms: string
  examination: string
  treatment: string
  status: 'completed' | 'follow-up'
}

const MedicalRecords = () => {
  const [searchText, setSearchText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null)
  const [form] = Form.useForm()

  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      key: '1',
      patientId: 'P001',
      patientName: '张三',
      diagnosis: '晚期肺癌',
      doctorName: '陈医生',
      recordDate: '2024-01-18',
      symptoms: '胸痛加重，呼吸困难，食欲下降',
      examination: '胸部CT显示肿瘤增大，胸腔积液增加',
      treatment: '调整止痛药物方案，给予胸腔穿刺抽液',
      status: 'follow-up',
    },
    {
      key: '2',
      patientId: 'P002',
      patientName: '李四',
      diagnosis: '阿尔茨海默病',
      doctorName: '陈医生',
      recordDate: '2024-01-17',
      symptoms: '记忆力明显减退，言语障碍加重',
      examination: '神经功能评估显示认知功能下降',
      treatment: '调整药物治疗方案，加强认知训练',
      status: 'completed',
    },
    {
      key: '3',
      patientId: 'P003',
      patientName: '王五',
      diagnosis: '心力衰竭',
      doctorName: '陈医生',
      recordDate: '2024-01-16',
      symptoms: '胸闷气急，下肢水肿',
      examination: 'BNP升高，超声心动图显示心功能恶化',
      treatment: '调整利尿剂剂量，加强营养支持',
      status: 'follow-up',
    },
  ])

  const getStatusTag = (status: string) => {
    const tagMap: Record<string, { color: string; text: string }> = {
      completed: { color: 'green', text: '已完成' },
      'follow-up': { color: 'blue', text: '需随访' },
    }
    const { color, text } = tagMap[status] || { color: 'default', text: status }
    return <Tag color={color}>{text}</Tag>
  }

  const columns: ColumnsType<MedicalRecord> = [
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
      title: '诊断',
      dataIndex: 'diagnosis',
      key: 'diagnosis',
    },
    {
      title: '主治医生',
      dataIndex: 'doctorName',
      key: 'doctorName',
    },
    {
      title: '记录日期',
      dataIndex: 'recordDate',
      key: 'recordDate',
      sorter: (a, b) => dayjs(a.recordDate).unix() - dayjs(b.recordDate).unix(),
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
        </Space>
      ),
    },
  ]

  const handleAdd = () => {
    form.validateFields().then((values) => {
      const newRecord: MedicalRecord = {
        key: Date.now().toString(),
        ...values,
        recordDate: values.recordDate.format('YYYY-MM-DD'),
      }
      setRecords([...records, newRecord])
      setIsModalOpen(false)
      form.resetFields()
      message.success('添加成功')
    })
  }

  const handleView = (record: MedicalRecord) => {
    setSelectedRecord(record)
    setViewModalOpen(true)
  }

  return (
    <BackgroundWrapper backgroundType="professional">
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
            新增医疗记录
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
        title="新增医疗记录"
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
            rules={[{ required: true, message: '请输入诊断信息' }]}
          >
            <Input placeholder="请输入诊断信息" />
          </Form.Item>

          <Form.Item
            name="symptoms"
            label="症状描述"
            rules={[{ required: true, message: '请描述患者症状' }]}
          >
            <TextArea rows={3} placeholder="请描述患者症状" />
          </Form.Item>

          <Form.Item
            name="examination"
            label="检查结果"
            rules={[{ required: true, message: '请输入检查结果' }]}
          >
            <TextArea rows={3} placeholder="请输入检查结果" />
          </Form.Item>

          <Form.Item
            name="treatment"
            label="治疗方案"
            rules={[{ required: true, message: '请输入治疗方案' }]}
          >
            <TextArea rows={3} placeholder="请输入治疗方案" />
          </Form.Item>

          <Form.Item
            name="recordDate"
            label="记录日期"
            rules={[{ required: true, message: '请选择记录日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Select.Option value="completed">已完成</Select.Option>
              <Select.Option value="follow-up">需随访</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="查看医疗记录"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={null}
        width={800}
      >
        {selectedRecord && (
          <Descriptions bordered column={2}>
            <Descriptions.Item label="记录ID" span={2}>{selectedRecord.key}</Descriptions.Item>
            <Descriptions.Item label="患者ID">{selectedRecord.patientId}</Descriptions.Item>
            <Descriptions.Item label="患者姓名">{selectedRecord.patientName}</Descriptions.Item>
            <Descriptions.Item label="诊断" span={2}>{selectedRecord.diagnosis}</Descriptions.Item>
            <Descriptions.Item label="主治医生">{selectedRecord.doctorName}</Descriptions.Item>
            <Descriptions.Item label="记录日期">{selectedRecord.recordDate}</Descriptions.Item>
            <Descriptions.Item label="症状描述" span={2}>{selectedRecord.symptoms}</Descriptions.Item>
            <Descriptions.Item label="检查结果" span={2}>{selectedRecord.examination}</Descriptions.Item>
            <Descriptions.Item label="治疗方案" span={2}>{selectedRecord.treatment}</Descriptions.Item>
            <Descriptions.Item label="状态">{getStatusTag(selectedRecord.status)}</Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </BackgroundWrapper>
  )
}

export default MedicalRecords
