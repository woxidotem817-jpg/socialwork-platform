import { useState } from 'react'
import { Card, Table, Button, Input, Space, Tag, Modal, Form, Select, DatePicker, message, Descriptions, Rate, Typography, Alert, Steps, Divider } from 'antd'
import { PlusOutlined, SearchOutlined, EyeOutlined, FormOutlined, HeartOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import BackgroundWrapper from '../components/BackgroundWrapper/BackgroundWrapper'

const { TextArea } = Input
const { Title, Text } = Typography
const { Step } = Steps

interface PsychologicalAssessment {
  key: string
  patientId: string
  patientName: string
  scaleType: string
  score: number
  level: 'normal' | 'mild' | 'moderate' | 'severe'
  assessor: string
  assessmentDate: string
  notes: string
  recommendations: string
}

const PsychologicalAssessmentPage = () => {
  const [searchText, setSearchText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedAssessment, setSelectedAssessment] = useState<PsychologicalAssessment | null>(null)
  const [form] = Form.useForm()

  const [assessments, setAssessments] = useState<PsychologicalAssessment[]>([
    {
      key: '1',
      patientId: 'P001',
      patientName: '张三',
      scaleType: 'HAMD抑郁量表',
      score: 18,
      level: 'mild',
      assessor: '李社工',
      assessmentDate: '2024-01-17',
      notes: '患者对病情担忧，表现出轻度抑郁情绪',
      recommendations: '加强心理疏导，鼓励家属陪伴',
    },
    {
      key: '2',
      patientId: 'P002',
      patientName: '李四',
      scaleType: 'HAMD抑郁量表',
      score: 8,
      level: 'normal',
      assessor: '李社工',
      assessmentDate: '2024-01-16',
      notes: '患者情绪稳定，无明显抑郁症状',
      recommendations: '继续观察，定期评估',
    },
    {
      key: '3',
      patientId: 'P003',
      patientName: '王五',
      scaleType: 'HAMA焦虑量表',
      score: 25,
      level: 'moderate',
      assessor: '李社工',
      assessmentDate: '2024-01-15',
      notes: '患者对死亡存在明显恐惧和焦虑',
      recommendations: '提供生命教育，开展哀伤辅导',
    },
  ])

  const getLevelTag = (level: string) => {
    const tagMap: Record<string, { color: string; text: string }> = {
      normal: { color: 'green', text: '正常' },
      mild: { color: 'orange', text: '轻度' },
      moderate: { color: 'red', text: '中度' },
      severe: { color: 'red', text: '重度' },
    }
    const { color, text } = tagMap[level] || { color: 'default', text: level }
    return <Tag color={color}>{text}</Tag>
  }

  const columns: ColumnsType<PsychologicalAssessment> = [
    {
      title: '评估ID',
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
      title: '量表类型',
      dataIndex: 'scaleType',
      key: 'scaleType',
    },
    {
      title: '得分',
      dataIndex: 'score',
      key: 'score',
      sorter: (a, b) => a.score - b.score,
    },
    {
      title: '程度',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => getLevelTag(level),
    },
    {
      title: '评估师',
      dataIndex: 'assessor',
      key: 'assessor',
    },
    {
      title: '评估日期',
      dataIndex: 'assessmentDate',
      key: 'assessmentDate',
      sorter: (a, b) => dayjs(a.assessmentDate).unix() - dayjs(b.assessmentDate).unix(),
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
      const newAssessment: PsychologicalAssessment = {
        key: Date.now().toString(),
        ...values,
        assessmentDate: values.assessmentDate.format('YYYY-MM-DD'),
      }
      setAssessments([...assessments, newAssessment])
      setIsModalOpen(false)
      form.resetFields()
      message.success('添加成功')
    })
  }

  const handleView = (assessment: PsychologicalAssessment) => {
    setSelectedAssessment(assessment)
    setViewModalOpen(true)
  }

  const scaleOptions = [
    'HAMD抑郁量表',
    'HAMA焦虑量表',
    'SAS焦虑自评量表',
    'SDS抑郁自评量表',
    '生活质量评估量表',
    '社会支持评定量表',
    '应对方式问卷',
  ]

  return (
    <BackgroundWrapper backgroundType="warm">
      <Card>
        <Alert
          message="心理评估注意事项"
          description="请在专业指导下进行心理评估，确保评估结果的准确性和专业性。对于高风险患者，应及时干预并做好记录。"
          type="warning"
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
            新建心理评估
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={assessments.filter(
            (assess) =>
              assess.patientName.includes(searchText) ||
              assess.patientId.toLowerCase().includes(searchText.toLowerCase())
          )}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="新建心理评估"
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
            name="scaleType"
            label="量表类型"
            rules={[{ required: true, message: '请选择量表类型' }]}
          >
            <Select placeholder="请选择量表类型">
              {scaleOptions.map((option) => (
                <Select.Option key={option} value={option}>{option}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="score"
            label="得分"
            rules={[{ required: true, message: '请输入评估得分' }]}
          >
            <Input type="number" placeholder="请输入评估得分" />
          </Form.Item>

          <Form.Item
            name="level"
            label="程度"
            rules={[{ required: true, message: '请选择程度' }]}
          >
            <Select placeholder="请选择程度">
              <Select.Option value="normal">正常</Select.Option>
              <Select.Option value="mild">轻度</Select.Option>
              <Select.Option value="moderate">中度</Select.Option>
              <Select.Option value="severe">重度</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="assessor"
            label="评估师"
            rules={[{ required: true, message: '请输入评估师姓名' }]}
          >
            <Input placeholder="请输入评估师姓名" />
          </Form.Item>

          <Form.Item
            name="assessmentDate"
            label="评估日期"
            rules={[{ required: true, message: '请选择评估日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="notes"
            label="评估说明"
            rules={[{ required: true, message: '请输入评估说明' }]}
          >
            <TextArea rows={3} placeholder="请详细描述评估过程中的观察和发现" />
          </Form.Item>

          <Form.Item
            name="recommendations"
            label="干预建议"
            rules={[{ required: true, message: '请输入干预建议' }]}
          >
            <TextArea rows={3} placeholder="请提供专业的干预建议" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="查看心理评估"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={null}
        width={900}
      >
        {selectedAssessment && (
          <>
            <Descriptions bordered column={2} style={{ marginBottom: 24 }}>
              <Descriptions.Item label="评估ID" span={2}>{selectedAssessment.key}</Descriptions.Item>
              <Descriptions.Item label="患者ID">{selectedAssessment.patientId}</Descriptions.Item>
              <Descriptions.Item label="患者姓名">{selectedAssessment.patientName}</Descriptions.Item>
              <Descriptions.Item label="量表类型" span={2}>{selectedAssessment.scaleType}</Descriptions.Item>
              <Descriptions.Item label="得分">
                <Space>
                  <Text strong style={{ fontSize: 18 }}>{selectedAssessment.score}</Text>
                  {selectedAssessment.level === 'normal' && <Tag color="green">正常</Tag>}
                  {selectedAssessment.level === 'mild' && <Tag color="orange">轻度异常</Tag>}
                  {selectedAssessment.level === 'moderate' && <Tag color="red">中度异常</Tag>}
                  {selectedAssessment.level === 'severe' && <Tag color="red">重度异常</Tag>}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="评估师">{selectedAssessment.assessor}</Descriptions.Item>
              <Descriptions.Item label="评估日期">{selectedAssessment.assessmentDate}</Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">评估详情</Divider>

            <Card size="small" style={{ marginBottom: 16 }}>
              <Title level={5}>
                <HeartOutlined /> 评估说明
              </Title>
              <Text>{selectedAssessment.notes}</Text>
            </Card>

            <Card size="small">
              <Title level={5}>
                <FormOutlined /> 干预建议
              </Title>
              <Text>{selectedAssessment.recommendations}</Text>
            </Card>
          </>
        )}
      </Modal>
    </BackgroundWrapper>
  )
}

export default PsychologicalAssessmentPage
