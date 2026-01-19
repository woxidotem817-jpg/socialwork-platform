import { useState } from 'react'
import { Card, Table, DatePicker, Select, Button, Space, Tag } from 'antd'
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'

interface Record {
  key: string
  id: string
  patientName: string
  patientId: string
  recordType: string
  provider: string
  date: string
  content: string
}

const Records = () => {
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null)
  const [recordType, setRecordType] = useState<string>('')
  const [patientName, setPatientName] = useState<string>('')

  const [records] = useState<Record[]>([
    {
      key: '1',
      id: 'R001',
      patientName: '张三',
      patientId: 'P001',
      recordType: '护理记录',
      provider: '李护士',
      date: '2024-01-18 10:30',
      content: '评估疼痛程度：4分，给予止痛药物',
    },
    {
      key: '2',
      id: 'R002',
      patientName: '张三',
      patientId: 'P001',
      recordType: '护理记录',
      provider: '王护士',
      date: '2024-01-18 08:00',
      content: '晨间护理完成，患者状态良好',
    },
    {
      key: '3',
      id: 'R003',
      patientName: '张三',
      patientId: 'P001',
      recordType: '心理支持',
      provider: '李社工',
      date: '2024-01-17 14:00',
      content: '心理疏导服务，与家属沟通病情',
    },
    {
      key: '4',
      id: 'R004',
      patientName: '李四',
      patientId: 'P002',
      recordType: '护理记录',
      provider: '赵护士',
      date: '2024-01-18 09:00',
      content: '认知训练进行中，患者配合良好',
    },
    {
      key: '5',
      id: 'R005',
      patientName: '王五',
      patientId: 'P003',
      recordType: '医疗记录',
      provider: '陈医生',
      date: '2024-01-17 16:00',
      content: '查房，调整用药方案',
    },
  ])

  const getRecordTypeTag = (type: string) => {
    const tagMap: Record<string, string> = {
      '护理记录': 'blue',
      '医疗记录': 'green',
      '心理支持': 'purple',
      '家属服务': 'orange',
    }
    const color = tagMap[type] || 'default'
    return <Tag color={color}>{type}</Tag>
  }

  const columns: ColumnsType<Record> = [
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
      title: '患者ID',
      dataIndex: 'patientId',
      key: 'patientId',
    },
    {
      title: '记录类型',
      dataIndex: 'recordType',
      key: 'recordType',
      render: (type: string) => getRecordTypeTag(type),
      filters: [
        { text: '护理记录', value: '护理记录' },
        { text: '医疗记录', value: '医疗记录' },
        { text: '心理支持', value: '心理支持' },
        { text: '家属服务', value: '家属服务' },
      ],
    },
    {
      title: '记录者',
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: '时间',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
    },
  ]

  const filteredRecords = records.filter((record) => {
    let match = true
    if (patientName && !record.patientName.includes(patientName)) {
      match = false
    }
    if (recordType && record.recordType !== recordType) {
      match = false
    }
    if (dateRange) {
      const recordDate = dayjs(record.date)
      if (recordDate.isBefore(dateRange[0]) || recordDate.isAfter(dateRange[1])) {
        match = false
      }
    }
    return match
  })

  return (
    <div>
      <Card>
        <Space style={{ marginBottom: 16 }}>
          <Select
            placeholder="选择记录类型"
            style={{ width: 150 }}
            allowClear
            onChange={setRecordType}
          >
            <Select.Option value="护理记录">护理记录</Select.Option>
            <Select.Option value="医疗记录">医疗记录</Select.Option>
            <Select.Option value="心理支持">心理支持</Select.Option>
            <Select.Option value="家属服务">家属服务</Select.Option>
          </Select>

          <DatePicker.RangePicker
            placeholder={['开始日期', '结束日期']}
            onChange={(dates) => setDateRange(dates)}
          />

          <Button icon={<DownloadOutlined />}>导出记录</Button>
        </Space>

        <Table
          columns={columns}
          dataSource={filteredRecords}
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  )
}

export default Records
