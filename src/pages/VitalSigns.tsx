import { useState } from 'react'
import { Card, Table, Button, Input, Space, Tag, Modal, Form, DatePicker, InputNumber, message, Descriptions, Typography, Alert, Statistic, Row, Col } from 'antd'
import { PlusOutlined, SearchOutlined, EyeOutlined, EditOutlined, HeartOutlined, WarningOutlined, CheckCircleOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import BackgroundWrapper from '../components/BackgroundWrapper/BackgroundWrapper'

const { Title } = Typography
const { TextArea } = Input

interface VitalSigns {
  key: string
  patientId: string
  patientName: string
  recordTime: string
  temperature: number
  heartRate: number
  bloodPressureHigh: number
  bloodPressureLow: number
  respiratoryRate: number
  oxygenSaturation: number
  painScore: number
  nurse: string
  status: 'normal' | 'attention' | 'critical'
  notes: string
}

const VitalSignsPage = () => {
  const [searchText, setSearchText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<VitalSigns | null>(null)
  const [form] = Form.useForm()

  const [records, setRecords] = useState<VitalSigns[]>([
    {
      key: '1',
      patientId: 'P001',
      patientName: '张三',
      recordTime: '2024-01-18 10:00',
      temperature: 36.8,
      heartRate: 88,
      bloodPressureHigh: 130,
      bloodPressureLow: 85,
      respiratoryRate: 18,
      oxygenSaturation: 96,
      painScore: 4,
      nurse: '王护士',
      status: 'attention',
      notes: '患者主诉轻度疼痛，已按医嘱给予止痛药物',
    },
    {
      key: '2',
      patientId: 'P002',
      patientName: '李四',
      recordTime: '2024-01-18 08:30',
      temperature: 36.5,
      heartRate: 72,
      bloodPressureHigh: 120,
      bloodPressureLow: 80,
      respiratoryRate: 16,
      oxygenSaturation: 98,
      painScore: 0,
      nurse: '王护士',
      status: 'normal',
      notes: '晨间生命体征监测，患者状态良好',
    },
    {
      key: '3',
      patientId: 'P003',
      patientName: '王五',
      recordTime: '2024-01-18 06:00',
      temperature: 37.2,
      heartRate: 105,
      bloodPressureHigh: 145,
      bloodPressureLow: 95,
      respiratoryRate: 24,
      oxygenSaturation: 90,
      painScore: 6,
      nurse: '王护士',
      status: 'critical',
      notes: '呼吸困难加重，立即通知医生处理',
    },
  ])

  const getStatusTag = (status: string) => {
    const tagMap: Record<string, { color: string; text: string; icon: any }> = {
      normal: { color: 'green', text: '正常', icon: <CheckCircleOutlined /> },
      attention: { color: 'orange', text: '需关注', icon: <WarningOutlined /> },
      critical: { color: 'red', text: '危急', icon: <WarningOutlined /> },
    }
    const { color, text, icon } = tagMap[status] || { color: 'default', text: status, icon: null }
    return <Tag color={color} icon={icon}>{text}</Tag>
  }

  const columns: ColumnsType<VitalSigns> = [
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
      title: '记录时间',
      dataIndex: 'recordTime',
      key: 'recordTime',
      sorter: (a, b) => dayjs(a.recordTime).unix() - dayjs(b.recordTime).unix(),
    },
    {
      title: '体温(℃)',
      dataIndex: 'temperature',
      key: 'temperature',
      render: (temp: number) => {
        if (temp > 37.5) return <Tag color="red">{temp}</Tag>
        if (temp > 37.0) return <Tag color="orange">{temp}</Tag>
        return <Tag color="green">{temp}</Tag>
      },
    },
    {
      title: '心率(次/分)',
      dataIndex: 'heartRate',
      key: 'heartRate',
      render: (rate: number) => {
        if (rate > 100 || rate < 60) return <Tag color="red">{rate}</Tag>
        if (rate > 90 || rate < 70) return <Tag color="orange">{rate}</Tag>
        return <Tag color="green">{rate}</Tag>
      },
    },
    {
      title: '血压(mmHg)',
      dataIndex: 'bloodPressureHigh',
      key: 'bloodPressure',
      render: (_, record) => {
        const { bloodPressureHigh, bloodPressureLow } = record
        const text = `${bloodPressureHigh}/${bloodPressureLow}`
        if (bloodPressureHigh > 140 || bloodPressureHigh < 90 || bloodPressureLow > 90 || bloodPressureLow < 60) {
          return <Tag color="red">{text}</Tag>
        }
        if (bloodPressureHigh > 130 || bloodPressureHigh < 100 || bloodPressureLow > 85 || bloodPressureLow < 70) {
          return <Tag color="orange">{text}</Tag>
        }
        return <Tag color="green">{text}</Tag>
      },
    },
    {
      title: '呼吸(次/分)',
      dataIndex: 'respiratoryRate',
      key: 'respiratoryRate',
      render: (rate: number) => {
        if (rate > 24 || rate < 12) return <Tag color="red">{rate}</Tag>
        if (rate > 20 || rate < 14) return <Tag color="orange">{rate}</Tag>
        return <Tag color="green">{rate}</Tag>
      },
    },
    {
      title: '血氧(%)',
      dataIndex: 'oxygenSaturation',
      key: 'oxygenSaturation',
      render: (saturation: number) => {
        if (saturation < 90) return <Tag color="red">{saturation}</Tag>
        if (saturation < 95) return <Tag color="orange">{saturation}</Tag>
        return <Tag color="green">{saturation}</Tag>
      },
    },
    {
      title: '疼痛评分',
      dataIndex: 'painScore',
      key: 'painScore',
      render: (score: number) => {
        if (score >= 7) return <Tag color="red">{score}</Tag>
        if (score >= 4) return <Tag color="orange">{score}</Tag>
        return <Tag color="green">{score}</Tag>
      },
    },
    {
      title: '护士',
      dataIndex: 'nurse',
      key: 'nurse',
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
      const status = determineStatus(values)

      const newRecord: VitalSigns = {
        key: Date.now().toString(),
        ...values,
        recordTime: values.recordTime.format('YYYY-MM-DD HH:mm'),
        status,
      }
      setRecords([...records, newRecord])
      setIsModalOpen(false)
      form.resetFields()
      message.success('添加成功')
    })
  }

  const determineStatus = (values: any) => {
    const { temperature, heartRate, bloodPressureHigh, bloodPressureLow, oxygenSaturation, painScore } = values

    if (
      temperature > 38.5 ||
      temperature < 35.5 ||
      heartRate > 120 ||
      heartRate < 50 ||
      bloodPressureHigh > 160 ||
      bloodPressureHigh < 80 ||
      bloodPressureLow > 100 ||
      bloodPressureLow < 50 ||
      oxygenSaturation < 88 ||
      painScore >= 8
    ) {
      return 'critical'
    }

    if (
      temperature > 37.5 ||
      temperature < 36.0 ||
      heartRate > 100 ||
      heartRate < 60 ||
      bloodPressureHigh > 140 ||
      bloodPressureHigh < 90 ||
      bloodPressureLow > 90 ||
      bloodPressureLow < 60 ||
      oxygenSaturation < 94 ||
      painScore >= 4
    ) {
      return 'attention'
    }

    return 'normal'
  }

  const handleView = (record: VitalSigns) => {
    setSelectedRecord(record)
    setViewModalOpen(true)
  }

  return (
    <BackgroundWrapper backgroundType="professional">
      <Card>
        <Alert
          message="生命体征监测提醒"
          description="请严格按照操作规程监测生命体征，发现异常及时记录并上报。危急情况立即通知医生处理。"
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
            新增生命体征记录
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
        title="新增生命体征记录"
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
            name="recordTime"
            label="记录时间"
            rules={[{ required: true, message: '请选择记录时间' }]}
          >
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>

          <Title level={5}>生命体征数据</Title>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="temperature"
                label="体温 (℃)"
                rules={[{ required: true, message: '请输入体温' }]}
              >
                <InputNumber step={0.1} min={30} max={45} style={{ width: '100%' }} placeholder="36.5" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="heartRate"
                label="心率 (次/分)"
                rules={[{ required: true, message: '请输入心率' }]}
              >
                <InputNumber min={40} max={180} style={{ width: '100%' }} placeholder="72" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="bloodPressureHigh"
                label="收缩压 (mmHg)"
                rules={[{ required: true, message: '请输入收缩压' }]}
              >
                <InputNumber min={60} max={250} style={{ width: '100%' }} placeholder="120" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="bloodPressureLow"
                label="舒张压 (mmHg)"
                rules={[{ required: true, message: '请输入舒张压' }]}
              >
                <InputNumber min={40} max={150} style={{ width: '100%' }} placeholder="80" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="respiratoryRate"
                label="呼吸 (次/分)"
                rules={[{ required: true, message: '请输入呼吸频率' }]}
              >
                <InputNumber min={8} max={40} style={{ width: '100%' }} placeholder="16" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="oxygenSaturation"
                label="血氧饱和度 (%)"
                rules={[{ required: true, message: '请输入血氧饱和度' }]}
              >
                <InputNumber min={70} max={100} style={{ width: '100%' }} placeholder="98" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="painScore"
                label="疼痛评分 (0-10)"
                rules={[{ required: true, message: '请输入疼痛评分' }]}
              >
                <InputNumber min={0} max={10} style={{ width: '100%' }} placeholder="0" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="nurse"
            label="护士姓名"
            rules={[{ required: true, message: '请输入护士姓名' }]}
          >
            <Input placeholder="请输入护士姓名" />
          </Form.Item>

          <Form.Item
            name="notes"
            label="备注"
          >
            <TextArea rows={3} placeholder="请输入备注信息" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="查看生命体征记录"
        open={viewModalOpen}
        onCancel={() => setViewModalOpen(false)}
        footer={null}
        width={900}
      >
        {selectedRecord && (
          <>
            <Descriptions bordered column={2} style={{ marginBottom: 24 }}>
              <Descriptions.Item label="记录ID" span={2}>{selectedRecord.key}</Descriptions.Item>
              <Descriptions.Item label="患者ID">{selectedRecord.patientId}</Descriptions.Item>
              <Descriptions.Item label="患者姓名">{selectedRecord.patientName}</Descriptions.Item>
              <Descriptions.Item label="记录时间">{selectedRecord.recordTime}</Descriptions.Item>
              <Descriptions.Item label="护士">{selectedRecord.nurse}</Descriptions.Item>
              <Descriptions.Item label="状态">{getStatusTag(selectedRecord.status)}</Descriptions.Item>
            </Descriptions>

            <Title level={5}>生命体征数据</Title>
            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="体温 (℃)"
                    value={selectedRecord.temperature}
                    precision={1}
                    valueStyle={{ color: selectedRecord.temperature > 37.5 ? '#cf1322' : selectedRecord.temperature > 37.0 ? '#fa8c16' : '#3f8600' }}
                    suffix="℃"
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="心率 (次/分)"
                    value={selectedRecord.heartRate}
                    valueStyle={{ color: selectedRecord.heartRate > 100 || selectedRecord.heartRate < 60 ? '#cf1322' : selectedRecord.heartRate > 90 || selectedRecord.heartRate < 70 ? '#fa8c16' : '#3f8600' }}
                    suffix="次/分"
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="血氧 (%)"
                    value={selectedRecord.oxygenSaturation}
                    valueStyle={{ color: selectedRecord.oxygenSaturation < 94 ? '#cf1322' : selectedRecord.oxygenSaturation < 95 ? '#fa8c16' : '#3f8600' }}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>

            <Row gutter={16} style={{ marginBottom: 24 }}>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="血压 (mmHg)"
                    value={`${selectedRecord.bloodPressureHigh}/${selectedRecord.bloodPressureLow}`}
                    valueStyle={{ color: selectedRecord.bloodPressureHigh > 140 || selectedRecord.bloodPressureLow < 60 ? '#cf1322' : selectedRecord.bloodPressureHigh > 130 || selectedRecord.bloodPressureLow < 70 ? '#fa8c16' : '#3f8600' }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="呼吸 (次/分)"
                    value={selectedRecord.respiratoryRate}
                    valueStyle={{ color: selectedRecord.respiratoryRate > 24 || selectedRecord.respiratoryRate < 12 ? '#cf1322' : selectedRecord.respiratoryRate > 20 || selectedRecord.respiratoryRate < 14 ? '#fa8c16' : '#3f8600' }}
                    suffix="次/分"
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="疼痛评分"
                    value={selectedRecord.painScore}
                    valueStyle={{ color: selectedRecord.painScore >= 7 ? '#cf1322' : selectedRecord.painScore >= 4 ? '#fa8c16' : '#3f8600' }}
                    suffix="/10"
                  />
                </Card>
              </Col>
            </Row>

            {selectedRecord.notes && (
              <Card title="备注" size="small">
                <p>{selectedRecord.notes}</p>
              </Card>
            )}
          </>
        )}
          </Modal>
    </BackgroundWrapper>
  )
}

export default VitalSignsPage
