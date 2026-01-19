import { useState } from 'react'
import { Card, Table, Button, Input, Space, Tag, Modal, Form, Select, DatePicker, message, Descriptions, Typography, Timeline, Alert } from 'antd'
import { PlusOutlined, SearchOutlined, EyeOutlined, EditOutlined, FormOutlined, HeartOutlined, CheckCircleOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import BackgroundWrapper from '../components/BackgroundWrapper/BackgroundWrapper'

const { TextArea } = Input
const { Title } = Typography

interface NursingRecord {
  key: string
  patientId: string
  patientName: string
  type: string
  content: string
  nurse: string
  recordTime: string
  status: 'completed' | 'ongoing' | 'follow-up'
  evaluation: string
  nextPlan: string
}

const NursingRecords = () => {
  const [searchText, setSearchText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<NursingRecord | null>(null)
  const [form] = Form.useForm()

  const [records, setRecords] = useState<NursingRecord[]>([
    {
      key: '1',
      patientId: 'P001',
      patientName: '张三',
      type: '晨间护理',
      content: '完成晨间护理，协助患者洗漱、更衣、进食。患者神志清楚，能配合护理操作。皮肤完整，无压疮迹象。',
      nurse: '王护士',
      recordTime: '2024-01-18 08:00',
      status: 'completed',
      evaluation: '护理效果良好，患者舒适度提高',
      nextPlan: '继续常规护理，观察病情变化',
    },
    {
      key: '2',
      patientId: 'P001',
      patientName: '张三',
      type: '疼痛护理',
      content: '评估患者疼痛程度为4分，按医嘱给予止痛药物。30分钟后复评，疼痛减轻至2分。',
      nurse: '王护士',
      recordTime: '2024-01-18 10:30',
      status: 'completed',
      evaluation: '止痛效果良好，患者疼痛明显缓解',
      nextPlan: '定时评估疼痛，及时调整用药',
    },
    {
      key: '3',
      patientId: 'P002',
      patientName: '李四',
      type: '防跌倒护理',
      content: '评估患者跌倒风险为中风险。做好防护措施，床栏全部拉起，床头放置警示标识，家属陪护。',
      nurse: '王护士',
      recordTime: '2024-01-18 14:00',
      status: 'ongoing',
      evaluation: '防跌倒措施落实到位',
      nextPlan: '持续观察，加强巡视',
    },
  ])

  const getStatusTag = (status: string) => {
    const tagMap: Record<string, { color: string; text: string }> = {
      completed: { color: 'green', text: '已完成' },
      ongoing: { color: 'blue', text: '进行中' },
      'follow-up': { color: 'orange', text: '需随访' },
    }
    const { color, text } = tagMap[status] || { color: 'default', text: status }
    return <Tag color={color}>{text}</Tag>
  }

  const nursingTypes = [
    '晨间护理',
    '晚间护理',
    '口腔护理',
    '皮肤护理',
    '疼痛护理',
    '压疮护理',
    '防跌倒护理',
    '防压疮护理',
    '导管护理',
    '伤口护理',
    '康复护理',
    '心理护理',
    '临终护理',
  ]

  const columns: ColumnsType<NursingRecord> = [
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
      title: '护理类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '护士',
      dataIndex: 'nurse',
      key: 'nurse',
    },
    {
      title: '记录时间',
      dataIndex: 'recordTime',
      key: 'recordTime',
      sorter: (a, b) => dayjs(a.recordTime).unix() - dayjs(b.recordTime).unix(),
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
      const newRecord: NursingRecord = {
        key: Date.now().toString(),
        ...values,
        recordTime: values.recordTime.format('YYYY-MM-DD HH:mm'),
      }
      setRecords([...records, newRecord])
      setIsModalOpen(false)
      form.resetFields()
      message.success('添加成功')
    })
  }

  const handleView = (record: NursingRecord) => {
    setSelectedRecord(record)
    setViewModalOpen(true)
  }

  return (
    <BackgroundWrapper backgroundType="professional">
      <Card>
        <Alert
          message="护理记录提醒"
          description="请及时、准确、完整地记录护理过程，确保护理质量。对于异常情况，及时记录并上报。"
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
            新增护理记录
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
        title="新增护理记录"
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
            label="护理类型"
            rules={[{ required: true, message: '请选择护理类型' }]}
          >
            <Select placeholder="请选择护理类型">
              {nursingTypes.map((type) => (
                <Select.Option key={type} value={type}>{type}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="recordTime"
            label="记录时间"
            rules={[{ required: true, message: '请选择记录时间' }]}
          >
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="nurse"
            label="护士姓名"
            rules={[{ required: true, message: '请输入护士姓名' }]}
          >
            <Input placeholder="请输入护士姓名" />
          </Form.Item>

          <Form.Item
            name="content"
            label="护理内容"
            rules={[{ required: true, message: '请输入护理内容' }]}
          >
            <TextArea rows={4} placeholder="请详细描述护理过程和操作内容" />
          </Form.Item>

          <Form.Item
            name="evaluation"
            label="护理效果评估"
            rules={[{ required: true, message: '请输入护理效果评估' }]}
          >
            <TextArea rows={2} placeholder="请评估护理效果" />
          </Form.Item>

          <Form.Item
            name="nextPlan"
            label="后续计划"
            rules={[{ required: true, message: '请输入后续计划' }]}
          >
            <TextArea rows={2} placeholder="请输入后续护理计划" />
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
        title="查看护理记录"
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
              <Descriptions.Item label="护理类型">{selectedRecord.type}</Descriptions.Item>
              <Descriptions.Item label="护士">{selectedRecord.nurse}</Descriptions.Item>
              <Descriptions.Item label="记录时间">{selectedRecord.recordTime}</Descriptions.Item>
              <Descriptions.Item label="状态">{getStatusTag(selectedRecord.status)}</Descriptions.Item>
            </Descriptions>

            <Title level={5}>
              <HeartOutlined /> 护理过程
            </Title>
            <Timeline style={{ marginBottom: 16 }}>
              <Timeline.Item color="blue" dot={<CheckCircleOutlined />}>
                <p><strong>记录时间：</strong>{selectedRecord.recordTime}</p>
                <p><strong>护理类型：</strong>{selectedRecord.type}</p>
                <p><strong>护士：</strong>{selectedRecord.nurse}</p>
              </Timeline.Item>
              <Timeline.Item color="green">
                <p><strong>护理内容：</strong></p>
                <p>{selectedRecord.content}</p>
              </Timeline.Item>
              <Timeline.Item color="orange">
                <p><strong>效果评估：</strong></p>
                <p>{selectedRecord.evaluation}</p>
              </Timeline.Item>
              <Timeline.Item color="blue">
                <p><strong>后续计划：</strong></p>
                <p>{selectedRecord.nextPlan}</p>
              </Timeline.Item>
            </Timeline>
          </>
        )}
      </Modal>
    </BackgroundWrapper>
  )
}

export default NursingRecords
