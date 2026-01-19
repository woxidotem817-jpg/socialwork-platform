import { useState } from 'react'
import { Card, Table, Button, Input, Space, Tag, Modal, Form, Select, message } from 'antd'
import { PlusOutlined, SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

interface Patient {
  key: string
  id: string
  name: string
  age: number
  gender: string
  diagnosis: string
  admissionDate: string
  condition: 'stable' | 'critical' | 'improving' | 'deteriorating'
  room: string
  primaryCaregiver: string
  contact: string
}

const Patients = () => {
  const [searchText, setSearchText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()

  const [patients, setPatients] = useState<Patient[]>([
    {
      key: '1',
      id: 'P001',
      name: '张三',
      age: 78,
      gender: '男',
      diagnosis: '晚期肺癌',
      admissionDate: '2024-01-10',
      condition: 'stable',
      room: '101',
      primaryCaregiver: '张小明',
      contact: '13800138000',
    },
    {
      key: '2',
      id: 'P002',
      name: '李四',
      age: 82,
      gender: '女',
      diagnosis: '阿尔茨海默病',
      admissionDate: '2024-01-15',
      condition: 'improving',
      room: '102',
      primaryCaregiver: '李小华',
      contact: '13900139000',
    },
    {
      key: '3',
      id: 'P003',
      name: '王五',
      age: 75,
      gender: '男',
      diagnosis: '心力衰竭',
      admissionDate: '2024-01-12',
      condition: 'critical',
      room: '103',
      primaryCaregiver: '王小红',
      contact: '13700137000',
    },
  ])

  const getConditionTag = (condition: string) => {
    const tagMap: Record<string, { color: string; text: string }> = {
      stable: { color: 'green', text: '稳定' },
      critical: { color: 'red', text: '危重' },
      improving: { color: 'blue', text: '好转' },
      deteriorating: { color: 'orange', text: '恶化' },
    }
    const { color, text } = tagMap[condition] || { color: 'default', text: condition }
    return <Tag color={color}>{text}</Tag>
  }

  const columns: ColumnsType<Patient> = [
    {
      title: '患者ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: '诊断',
      dataIndex: 'diagnosis',
      key: 'diagnosis',
    },
    {
      title: '入院日期',
      dataIndex: 'admissionDate',
      key: 'admissionDate',
      sorter: (a, b) => dayjs(a.admissionDate).unix() - dayjs(b.admissionDate).unix(),
    },
    {
      title: '状况',
      dataIndex: 'condition',
      key: 'condition',
      render: (condition: string) => getConditionTag(condition),
      filters: [
        { text: '稳定', value: 'stable' },
        { text: '危重', value: 'critical' },
        { text: '好转', value: 'improving' },
        { text: '恶化', value: 'deteriorating' },
      ],
    },
    {
      title: '病房',
      dataIndex: 'room',
      key: 'room',
    },
    {
      title: '主要照护者',
      dataIndex: 'primaryCaregiver',
      key: 'primaryCaregiver',
    },
    {
      title: '联系电话',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />}>编辑</Button>
          <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.key)}>删除</Button>
        </Space>
      ),
    },
  ]

  const handleDelete = (key: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除该患者信息吗？',
      onOk: () => {
        setPatients(patients.filter(patient => patient.key !== key))
        message.success('删除成功')
      },
    })
  }

  const handleAdd = () => {
    form.validateFields().then((values) => {
      const newPatient: Patient = {
        key: Date.now().toString(),
        id: `P${String(patients.length + 1).padStart(3, '0')}`,
        ...values,
        admissionDate: values.admissionDate.format('YYYY-MM-DD'),
      }
      setPatients([...patients, newPatient])
      setIsModalOpen(false)
      form.resetFields()
      message.success('添加成功')
    })
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
            新增患者
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={patients.filter(
            (patient) =>
              patient.name.includes(searchText) ||
              patient.id.toLowerCase().includes(searchText.toLowerCase())
          )}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="新增患者"
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
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入患者姓名' }]}
          >
            <Input placeholder="请输入患者姓名" />
          </Form.Item>

          <Form.Item
            name="age"
            label="年龄"
            rules={[{ required: true, message: '请输入患者年龄' }]}
          >
            <Input type="number" placeholder="请输入患者年龄" />
          </Form.Item>

          <Form.Item
            name="gender"
            label="性别"
            rules={[{ required: true, message: '请选择性别' }]}
          >
            <Select placeholder="请选择性别">
              <Select.Option value="男">男</Select.Option>
              <Select.Option value="女">女</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="diagnosis"
            label="诊断"
            rules={[{ required: true, message: '请输入诊断' }]}
          >
            <Input placeholder="请输入诊断信息" />
          </Form.Item>

          <Form.Item
            name="admissionDate"
            label="入院日期"
            rules={[{ required: true, message: '请选择入院日期' }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            name="condition"
            label="状况"
            rules={[{ required: true, message: '请选择状况' }]}
          >
            <Select placeholder="请选择状况">
              <Select.Option value="stable">稳定</Select.Option>
              <Select.Option value="critical">危重</Select.Option>
              <Select.Option value="improving">好转</Select.Option>
              <Select.Option value="deteriorating">恶化</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="room"
            label="病房"
            rules={[{ required: true, message: '请输入病房号' }]}
          >
            <Input placeholder="请输入病房号" />
          </Form.Item>

          <Form.Item
            name="primaryCaregiver"
            label="主要照护者"
            rules={[{ required: true, message: '请输入主要照护者姓名' }]}
          >
            <Input placeholder="请输入主要照护者姓名" />
          </Form.Item>

          <Form.Item
            name="contact"
            label="联系电话"
            rules={[{ required: true, message: '请输入联系电话' }]}
          >
            <Input placeholder="请输入联系电话" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Patients
