import { useState } from 'react'
import { Card, Typography, Tabs, Alert, Form, Input, DatePicker, Select, Button, Row, Col, List, Tag, Rate, message, Modal, Divider } from 'antd'
import { CalendarOutlined, TeamOutlined, PhoneOutlined, VideoCameraOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import BackgroundWrapper from '../components/BackgroundWrapper/BackgroundWrapper'

const { Title, Paragraph, Text } = Typography
const { TextArea } = Input

const ServiceBooking = () => {
  const [bookingForm] = Form.useForm()
  const [workerForm] = Form.useForm()
  const [workerModalOpen, setWorkerModalOpen] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState<any>(null)

  const consultationTypes = [
    { value: 'single', label: '单一学科咨询', description: '选择一个学科进行咨询' },
    { value: 'multi', label: '多学科联合咨询', description: '多个学科专家共同评估' }
  ]

  const departments = [
    { value: 'pain', label: '疼痛科', description: '疼痛评估、药物调整' },
    { value: 'psych', label: '心理科', description: '心理评估、心理疏导' },
    { value: 'social', label: '社工部', description: '家庭会议、资源链接' },
    { value: 'nutrition', label: '营养科', description: '营养评估、饮食计划' },
    { value: 'rehab', label: '康复科', description: '康复评估、康复训练' }
  ]

  const doctors = [
    { id: 1, name: '陈医生', department: '疼痛科', title: '主任医师', rating: 4.8, reviews: 342, available: true },
    { id: 2, name: '李医生', department: '心理科', title: '副主任医师', rating: 4.9, reviews: 287, available: true },
    { id: 3, name: '王社工', department: '社工部', title: '主管社工', rating: 4.7, reviews: 456, available: true },
    { id: 4, name: '张营养师', department: '营养科', title: '营养师', rating: 4.6, reviews: 234, available: false }
  ]

  const workers = [
    {
      id: 1,
      name: '刘阿姨',
      serviceType: '日常护理',
      experience: '5年',
      certifications: ['护工培训证书', '安宁疗护专项培训'],
      rating: 4.8,
      reviews: 128,
      hourlyRate: 80
    },
    {
      id: 2,
      name: '张护士',
      serviceType: '专业护理',
      experience: '8年',
      certifications: ['护士执业证', '安宁疗护专项培训', 'PICC护理证书'],
      rating: 4.9,
      reviews: 87,
      hourlyRate: 150
    },
    {
      id: 3,
      name: '王阿姨',
      serviceType: '日常护理',
      experience: '3年',
      certifications: ['护工培训证书'],
      rating: 4.5,
      reviews: 156,
      hourlyRate: 70
    },
    {
      id: 4,
      name: '李护士',
      serviceType: '心理陪伴',
      experience: '6年',
      certifications: ['护士执业证', '心理咨询师证'],
      rating: 4.7,
      reviews: 93,
      hourlyRate: 120
    }
  ]

  const institutions = [
    {
      id: 1,
      name: '北京安宁疗护中心',
      location: '北京市朝阳区',
      serviceTypes: ['机构照护', '居家照护', '门诊服务'],
      beds: 50,
      rating: 4.8,
      reviews: 567,
      priceRange: '150-300元/天'
    },
    {
      id: 2,
      name: '上海临终关怀院',
      location: '上海市浦东新区',
      serviceTypes: ['机构照护', '居家照护'],
      beds: 80,
      rating: 4.9,
      reviews: 892,
      priceRange: '200-400元/天'
    },
    {
      id: 3,
      name: '广州安宁疗护医院',
      location: '广州市天河区',
      serviceTypes: ['机构照护', '居家照护', '门诊服务'],
      beds: 120,
      rating: 4.7,
      reviews: 723,
      priceRange: '180-350元/天'
    }
  ]

  const handleBookingSubmit = () => {
    bookingForm.validateFields().then((values) => {
      message.success('预约申请提交成功！我们会尽快与您联系确认。')
      bookingForm.resetFields()
    })
  }

  const handleWorkerBook = (worker: any) => {
    setSelectedWorker(worker)
    workerForm.setFieldsValue({
      workerName: worker.name,
      serviceType: worker.serviceType
    })
    setWorkerModalOpen(true)
  }

  const handleWorkerBookingSubmit = () => {
    workerForm.validateFields().then((values) => {
      message.success('服务人员预约成功！我们会尽快联系您。')
      setWorkerModalOpen(false)
      workerForm.resetFields()
      setSelectedWorker(null)
    })
  }

  return (
    <BackgroundWrapper backgroundType="professional">
      <Card>
        <Title level={2}>
          <CalendarOutlined /> 服务对接
        </Title>
        <Paragraph type="secondary">
          提供闭环式、精准化的安宁疗护服务对接
        </Paragraph>

        <Tabs defaultActiveKey="booking" size="large"
          items={[
            {
              key: 'booking',
              label: <span><CalendarOutlined /> 咨询预约</span>,
              children: (
                <div>
                  <Alert
                    message="多学科协作模式"
                    description="依据《安宁疗护实践指南（2025年版）》的多学科协作模式，提供专业的安宁疗护咨询服务。"
                    type="info"
                    showIcon
                    style={{ marginBottom: 24 }}
                  />

                  <Form form={bookingForm} layout="vertical" onFinish={handleBookingSubmit}>
                    <Form.Item
                      label="咨询类型"
                      name="consultationType"
                      rules={[{ required: true, message: '请选择咨询类型' }]}
                    >
                      <Select>
                        {consultationTypes.map(type => (
                          <Select.Option key={type.value} value={type.value}>
                            <div>
                              <Text strong>{type.label}</Text>
                              <br />
                              <Text type="secondary">{type.description}</Text>
                            </div>
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="选择科室"
                      name="department"
                      rules={[{ required: true, message: '请选择科室' }]}
                    >
                      <Select>
                        {departments.map(dept => (
                          <Select.Option key={dept.value} value={dept.value}>
                            <div>
                              <Text strong>{dept.label}</Text>
                              <br />
                              <Text type="secondary">{dept.description}</Text>
                            </div>
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="选择医生/团队"
                      name="doctor"
                      rules={[{ required: true, message: '请选择医生' }]}
                    >
                      <Select>
                        {doctors.filter(d => d.available).map(doctor => (
                          <Select.Option key={doctor.id} value={doctor.id}>
                            <div>
                              <Text strong>{doctor.name}</Text>
                              <Text type="secondary"> - {doctor.title}</Text>
                              <br />
                              <Text type="secondary">{doctor.department} | 评分：⭐{doctor.rating} ({doctor.reviews}条评价)</Text>
                            </div>
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Row gutter={16}>
                      <Col span={12}>
                        <Form.Item
                          label="预约日期"
                          name="date"
                          rules={[{ required: true, message: '请选择日期' }]}
                        >
                          <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="预约时间段"
                          name="timeSlot"
                          rules={[{ required: true, message: '请选择时间段' }]}
                        >
                          <Select>
                            <Select.Option value="morning">上午 (08:00-12:00)</Select.Option>
                            <Select.Option value="afternoon">下午 (14:00-18:00)</Select.Option>
                            <Select.Option value="evening">晚上 (18:00-20:00)</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item
                      label="患者信息"
                      name="patientInfo"
                      rules={[{ required: true, message: '请输入患者信息' }]}
                    >
                      <TextArea rows={2} placeholder="患者姓名、年龄、主要症状等" />
                    </Form.Item>

                    <Form.Item
                      label="咨询问题"
                      name="questions"
                      rules={[{ required: true, message: '请描述咨询问题' }]}
                    >
                      <TextArea rows={4} placeholder="请详细描述您想咨询的问题或困惑" />
                    </Form.Item>

                    <Form.Item
                      label="服务形式"
                      name="serviceType"
                      rules={[{ required: true, message: '请选择服务形式' }]}
                    >
                      <Select>
                        <Select.Option value="online-text">在线文字咨询</Select.Option>
                        <Select.Option value="online-voice">在线语音咨询</Select.Option>
                        <Select.Option value="online-video">在线视频咨询</Select.Option>
                        <Select.Option value="offline">线下门诊预约</Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="联系方式"
                      name="contact"
                      rules={[{ required: true, message: '请输入联系方式' }]}
                    >
                      <Input placeholder="手机号码或微信号" />
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit" size="large" block>
                        提交预约申请
                      </Button>
                    </Form.Item>
                  </Form>

                  <Alert
                    message="会诊支持"
                    description="对于难治性症状（如难治性疼痛、顽固性呼吸困难），可申请多学科会诊。平台将协助组织医生、护士、心理治疗师、社工联合评估，生成会诊报告。"
                    type="warning"
                    showIcon
                    style={{ marginTop: 24 }}
                  />
                  <Button type="link" style={{ paddingLeft: 0 }}>
                    申请多学科会诊 →
                  </Button>
                </div>
              ),
            },
            {
              key: 'workers',
              label: <span><TeamOutlined /> 机构/人员</span>,
              children: (
                <div>
                  <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col span={12}>
                      <Alert
                        message="居家照护人员预约"
                        description="护工、护士上门服务预约，展示服务人员资质、评价等信息。"
                        type="info"
                        showIcon
                      />
                    </Col>
                    <Col span={12}>
                      <Alert
                        message="安宁疗护机构查询"
                        description="按地区、服务类型筛选，展示机构简介、服务项目、收费标准、用户评价。"
                        type="success"
                        showIcon
                      />
                    </Col>
                  </Row>

                  <Title level={4}>一、居家照护人员</Title>
                  <List
                    dataSource={workers}
                    renderItem={(worker) => (
                      <List.Item
                        actions={[
                          <Button type="primary" onClick={() => handleWorkerBook(worker)}>
                            立即预约
                          </Button>
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<UserOutlined style={{ fontSize: 32, color: '#1890ff' }} />}
                          title={
                            <div>
                              <Text strong>{worker.name}</Text>
                              <Tag color="blue" style={{ marginLeft: 8 }}>{worker.serviceType}</Tag>
                              <br />
                              <Text type="secondary">经验：{worker.experience} | 时薪：¥{worker.hourlyRate}/小时</Text>
                            </div>
                          }
                          description={
                            <div>
                              <Text strong>资质证书：</Text>
                              {worker.certifications.map((cert, index) => (
                                <Tag key={index} color="green" style={{ marginLeft: 4 }}>{cert}</Tag>
                              ))}
                              <br />
                              <Text>评分：</Text>
                              <Rate disabled defaultValue={worker.rating} style={{ fontSize: 14 }} />
                              <Text type="secondary"> ({worker.reviews}条评价)</Text>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />

                  <Divider />

                  <Title level={4}>二、安宁疗护机构</Title>
                  <List
                    dataSource={institutions}
                    renderItem={(inst) => (
                      <List.Item
                        actions={[
                          <Button type="primary">查看详情</Button>
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<CheckCircleOutlined style={{ fontSize: 32, color: '#52c41a' }} />}
                          title={
                            <div>
                              <Text strong>{inst.name}</Text>
                              <br />
                              <Text type="secondary">{inst.location}</Text>
                            </div>
                          }
                          description={
                            <div>
                              <Text strong>服务类型：</Text>
                              {inst.serviceTypes.map((type, index) => (
                                <Tag key={index} color="blue" style={{ marginLeft: 4 }}>{type}</Tag>
                              ))}
                              <br />
                              <Text strong>床位数：</Text>{inst.beds}
                              <Text> | </Text>
                              <Text>评分：</Text>
                              <Rate disabled defaultValue={inst.rating} style={{ fontSize: 14 }} />
                              <Text type="secondary"> ({inst.reviews}条评价)</Text>
                              <br />
                              <Text strong>收费范围：</Text>{inst.priceRange}
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </div>
              ),
            },
            {
              key: 'volunteers',
              label: <span><TeamOutlined /> 志愿者服务</span>,
              children: (
                <div>
                  <Alert
                    message="志愿者服务"
                    description="提供志愿者培训、需求匹配、志愿服务管理等服务。"
                    type="info"
                    showIcon
                    style={{ marginBottom: 24 }}
                  />

                  <Row gutter={16}>
                    <Col span={12}>
                      <Card title="志愿者培训" type="inner" style={{ marginBottom: 16 }}>
                        <Paragraph>
                          线上培训课程，完成并通过考核后颁发电子证书：
                        </Paragraph>
                        <ul>
                          <li>安宁疗护基础知识</li>
                          <li>沟通技巧</li>
                          <li>照护辅助技巧</li>
                          <li>伦理规范</li>
                        </ul>
                        <Button type="primary" block>
                          开始培训
                        </Button>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card title="志愿服务需求" type="inner" style={{ marginBottom: 16 }}>
                        <Paragraph>
                          患者/家属可发布志愿服务需求：
                        </Paragraph>
                        <ul>
                          <li>陪伴患者聊天</li>
                          <li>协助整理生命故事</li>
                          <li>家属心理陪伴</li>
                          <li>其他志愿服务需求</li>
                        </ul>
                        <Button type="primary" block>
                          发布需求
                        </Button>
                      </Card>
                    </Col>
                  </Row>

                  <Title level={4}>志愿者服务管理</Title>
                  <List
                    dataSource={[
                      { name: '张志愿者', hours: 120, rating: 4.8, services: ['患者陪伴', '心理支持'] },
                      { name: '李志愿者', hours: 87, rating: 4.7, services: ['生命故事整理', '家务协助'] },
                      { name: '王志愿者', hours: 156, rating: 4.9, services: ['心理疏导', '家属陪伴'] }
                    ]}
                    renderItem={(volunteer) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<TeamOutlined style={{ fontSize: 32, color: '#faad14' }} />}
                          title={volunteer.name}
                          description={
                            <div>
                              <Text>服务时长：</Text>{volunteer.hours}小时 | <Text>评分：</Text>
                              <Rate disabled defaultValue={volunteer.rating} style={{ fontSize: 14 }} />
                              <br />
                              <Text strong>服务类型：</Text>
                              {volunteer.services.map((service, index) => (
                                <Tag key={index} color="orange" style={{ marginLeft: 4 }}>{service}</Tag>
                              ))}
                            </div>
                          }
                        />
                        <Button type="link">查看故事</Button>
                      </List.Item>
                    )}
                  />
                </div>
              ),
            },
          ]}
        />

        <Modal
          title="预约服务人员"
          open={workerModalOpen}
          onOk={handleWorkerBookingSubmit}
          onCancel={() => {
            setWorkerModalOpen(false)
            workerForm.resetFields()
            setSelectedWorker(null)
          }}
          width={600}
        >
          {selectedWorker && (
            <Form form={workerForm} layout="vertical">
              <Form.Item label="服务人员">
                <Input disabled value={selectedWorker.name} />
              </Form.Item>
              <Form.Item label="服务类型">
                <Input disabled value={selectedWorker.serviceType} />
              </Form.Item>
              <Form.Item
                label="服务日期"
                name="date"
                rules={[{ required: true, message: '请选择日期' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                label="服务时长"
                name="duration"
                rules={[{ required: true, message: '请选择服务时长' }]}
              >
                <Select>
                  <Select.Option value="2">2小时</Select.Option>
                  <Select.Option value="4">4小时</Select.Option>
                  <Select.Option value="6">6小时</Select.Option>
                  <Select.Option value="8">8小时</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="联系方式"
                name="contact"
                rules={[{ required: true, message: '请输入联系方式' }]}
              >
                <Input placeholder="请输入联系电话" />
              </Form.Item>
              <Form.Item
                label="备注"
                name="note"
              >
                <TextArea rows={3} placeholder="其他需要说明的事项" />
              </Form.Item>
            </Form>
          )}
        </Modal>
      </Card>
    </BackgroundWrapper>
  )
}

export default ServiceBooking
