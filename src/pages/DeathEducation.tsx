import { useState } from 'react'
import { Card, Typography, Tabs, Alert, Divider, Button, Form, Input, Row, Col, Timeline, Tag, List, Modal, message, Select } from 'antd'
import { HeartOutlined, BookOutlined, GiftOutlined, FileTextOutlined, SmileOutlined, TeamOutlined, CalendarOutlined } from '@ant-design/icons'
import BackgroundWrapper from '../components/BackgroundWrapper/BackgroundWrapper'

const { Title, Paragraph, Text } = Typography
const { TextArea } = Input

const DeathEducation = () => {
  const [wishModalOpen, setWishModalOpen] = useState(false)
  const [wishForm] = Form.useForm()

  const articles = [
    {
      title: '如何正视死亡？',
      category: '科普文章',
      author: '安宁疗护专家',
      date: '2024-01-15',
      summary: '死亡是生命的自然过程，正视死亡可以帮助我们更好地活着...',
      content: '详细内容...'
    },
    {
      title: '生命的意义不在于长度，而在于厚度',
      category: '生命教育',
      author: '伦理学家',
      date: '2024-01-12',
      summary: '生命的质量远比长度更重要，在有限的时间里创造无限的价值...',
      content: '详细内容...'
    },
    {
      title: '濒死体验与生命回顾',
      category: '临床研究',
      author: '医学专家',
      date: '2024-01-10',
      summary: '通过生命回顾帮助患者找到人生的意义和满足感...',
      content: '详细内容...'
    }
  ]

  const expertInterviews = [
    {
      name: '陈教授',
      title: '安宁疗护主任医师',
      topic: '死亡教育的重要性',
      date: '2024-01-18',
      content: '死亡教育是安宁疗护的重要组成部分...'
    },
    {
      name: '李教授',
      title: '社会工作系教授',
      topic: '如何帮助患者接受死亡',
      date: '2024-01-16',
      content: '接受死亡是一个过程，需要耐心和支持...'
    }
  ]

  const faqs = [
    {
      question: '是否该告诉患者真实病情？',
      answer: '应根据患者的知情意愿决定。如果患者希望了解，应该坦诚告知；如果不希望，可以由家属代为沟通。关键是以患者为中心，尊重其意愿。'
    },
    {
      question: '患者害怕死亡怎么办？',
      answer: '恐惧是正常反应。不要否定或劝慰，而是倾听、共情、接纳。可以讨论患者的担忧，提供心理支持，帮助其找到生命意义。'
    },
    {
      question: '如何帮助患者完成未竟心愿？',
      answer: '鼓励患者表达心愿，记录愿望清单。链接志愿者、公益组织等资源，帮助实现可能的心愿。对于无法实现的，帮助其找到替代方式或意义。'
    }
  ]

  const wishCases = [
    {
      id:1,
      patientName: '张三',
      wish: '想见远方的儿子',
      type: '家庭心愿',
      status: 'completed',
      description: '通过视频连线实现了与远在海外儿子的面对面交流',
      date: '2024-01-10'
    },
    {
      id: 2,
      patientName: '李四',
      wish: '看一场日出',
      type: '个人心愿',
      status: 'completed',
      description: '志愿者协助安排，在医院天台实现了看日出的愿望',
      date: '2024-01-08'
    },
    {
      id: 3,
      patientName: '王五',
      wish: '完成一次家庭聚餐',
      type: '家庭心愿',
      status: 'in-progress',
      description: '正在协调家庭成员时间和场地',
      date: '2024-01-18'
    }
  ]

  const handleWishSubmit = () => {
    wishForm.validateFields().then((values) => {
      message.success('心愿提交成功，我们会尽快与您联系！')
      setWishModalOpen(false)
      wishForm.resetFields()
    })
  }

  return (
    <BackgroundWrapper backgroundType="warm">
      <Card>
        {/* 横幅图片 */}
        <div className="page-banner">
          <img
            src="/images/care/psychological-care.jpg"
            alt="安宁疗护"
          />
        </div>

        <Title level={2}>
          <HeartOutlined /> 死亡教育与哀伤辅导
        </Title>
        <Paragraph type="secondary">
          依据《安宁疗护实践指南（2025年版）》提供全周期的死亡教育和哀伤辅导服务
        </Paragraph>

        <Tabs defaultActiveKey="education" size="large"
          items={[
            {
              key: 'education',
              label: <span><BookOutlined /> 死亡教育专栏</span>,
              children: (
                <div>
                  <Alert
                    message="专业指导"
                    description="本栏目内容由安宁疗护专家、伦理学家、心理学家等专业人员撰写，确保专业性和准确性。"
                    type="info"
                    showIcon
                    style={{ marginBottom: 24 }}
                  />

                  <Title level={4}>一、科普文章</Title>
                  <List
                    dataSource={articles}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<BookOutlined style={{ fontSize: 24, color: '#1890ff' }} />}
                          title={item.title}
                          description={
                            <div>
                              <Tag color="blue">{item.category}</Tag>
                              <Text type="secondary"> | {item.author} | {item.date}</Text>
                              <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>{item.summary}</Paragraph>
                            </div>
                          }
                        />
                        <Button type="primary">阅读全文</Button>
                      </List.Item>
                    )}
                  />

                  <Divider />

                  <Title level={4}>二、专家访谈</Title>
                  <List
                    dataSource={expertInterviews}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<TeamOutlined style={{ fontSize: 24, color: '#52c41a' }} />}
                          title={item.topic}
                          description={
                            <div>
                              <Text strong>{item.name}</Text> - {item.title}
                              <br />
                              <Text type="secondary">{item.date}</Text>
                              <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>{item.content}</Paragraph>
                            </div>
                          }
                        />
                        <Button type="primary">查看视频</Button>
                      </List.Item>
                    )}
                  />

                  <Divider />

                  <Title level={4}>三、问答专区</Title>
                  <List
                    dataSource={faqs}
                    renderItem={(item, index) => (
                      <List.Item>
                        <List.Item.Meta
                          title={
                            <div>
                              <Text strong>Q{index + 1}: </Text>
                              <Text>{item.question}</Text>
                            </div>
                          }
                          description={
                            <div>
                              <Text type="secondary">A: {item.answer}</Text>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </div>
              )
            },
            {
              key: 'wishes',
              label: <span><GiftOutlined /> 心愿实现支持</span>,
              children: (
                <div>
                  <Alert
                    message="心愿实现"
                    description="我们联合公益组织、志愿者团队，帮助患者实现心愿，让生命不留遗憾。"
                    type="info"
                    showIcon
                    style={{ marginBottom: 24 }}
                  />

                  <Title level={4}>一、心愿清单模板</Title>
                  <Card type="inner" style={{ marginBottom: 24 }}>
                    <Paragraph>
                      心愿清单分为三个类别，患者可以根据需要填写：
                    </Paragraph>
                    <ul>
                      <li><Text strong>个人心愿：</Text>关于自己的个人愿望，如"写一封信""看一场电影""吃一次喜欢的食物"</li>
                      <li><Text strong>家庭心愿：</Text>涉及家庭活动的愿望，如"全家聚餐""家庭旅游""与家人合影"</li>
                      <li><Text strong>社会心愿：</Text>与更广泛社会相关的愿望，如"参加一次公益活动""为社会做贡献"</li>
                    </ul>

                    <Button
                      type="primary"
                      icon={<GiftOutlined />}
                      size="large"
                      onClick={() => setWishModalOpen(true)}
                      style={{ marginTop: 16 }}
                    >
                      我要提交心愿
                    </Button>
                  </Card>

                  <Divider />

                  <Title level={4}>二、心愿实现案例</Title>
                  <List
                    dataSource={wishCases}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<GiftOutlined style={{ fontSize: 24, color: item.status === 'completed' ? '#52c41a' : '#faad14' }} />}
                          title={item.wish}
                          description={
                            <div>
                              <Tag color="blue">{item.type}</Tag>
                              <Text> | 患者：{item.patientName}</Text>
                              <br />
                              <Text type="secondary">{item.date}</Text>
                              <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>{item.description}</Paragraph>
                              <Tag color={item.status === 'completed' ? 'success' : 'processing'}>
                                {item.status === 'completed' ? '已完成' : '进行中'}
                              </Tag>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </div>
              )
            },
            {
              key: 'grief',
              label: <span><SmileOutlined /> 哀伤辅导</span>,
              children: (
                <div>
                  <Alert
                    message="哀伤支持"
                    description="我们提供从预哀伤到居丧期，再到长期随访的全周期哀伤辅导服务。"
                    type="info"
                    showIcon
                    style={{ marginBottom: 24 }}
                  />

                  <Title level={4}>一、预哀伤辅导</Title>
                  <Card type="inner" style={{ marginBottom: 24 }}>
                    <Paragraph>
                      帮助家属提前做好心理准备，减轻居丧期的痛苦：
                    </Paragraph>
                    <ul>
                      <li><Text strong>如何面对患者病情恶化：</Text>
                        <Paragraph>病情波动是正常的，要有心理准备。每天都会有变化，关注当下的状态比关注明天更重要。</Paragraph>
                      </li>
                      <li><Text strong>如何与患者告别：</Text>
                        <Paragraph>不要等到最后时刻。现在就开始说"我爱你""谢谢你""对不起"，表达平时难以启齿的情感。</Paragraph>
                      </li>
                      <li><Text strong>如何准备居丧期：</Text>
                        <Paragraph>了解丧亲后的正常反应，提前寻找支持资源（亲友、社工、心理咨询师）。</Paragraph>
                      </li>
                    </ul>
                  </Card>

                  <Divider />

                  <Title level={4}>二、居丧期辅导（术后1周-1年）</Title>
                  <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col span={12}>
                      <Card title="情绪支持" type="inner" style={{ height: '100%' }}>
                        <Timeline>
                          <Timeline.Item color="blue">
                            <Text strong>陪伴式倾听服务：</Text>
                            <Paragraph>
                              志愿者/社工提供在线陪伴聊天，倾听家属的情感表达，不评判，只是陪伴。
                            </Paragraph>
                          </Timeline.Item>
                          <Timeline.Item color="green">
                            <Text strong>悲伤情绪表达小组：</Text>
                            <Paragraph>
                              匿名化的小组讨论，分享悲伤经历，互相支持，缓解孤独感。
                            </Paragraph>
                          </Timeline.Item>
                        </Timeline>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card title="实操支持" type="inner" style={{ height: '100%' }}>
                        <ul>
                          <li>
                            <Text strong>居丧期生活适应指南：</Text>
                            <ul>
                              <li>如何处理患者遗物</li>
                              <li>如何调整生活节奏</li>
                              <li>如何应对孤独</li>
                              <li>如何重建社交关系</li>
                            </ul>
                          </li>
                          <li style={{ marginTop: 16 }}>
                            <Text strong>纪念仪式建议：</Text>
                            <ul>
                              <li>周年纪念活动策划</li>
                              <li>建立家庭纪念传统</li>
                              <li>参与公益活动纪念</li>
                            </ul>
                          </li>
                        </ul>
                      </Card>
                    </Col>
                  </Row>

                  <Title level={4}>三、长期随访</Title>
                  <Card type="inner" style={{ marginBottom: 24 }}>
                    <Paragraph>
                      术后1周、1个月、3个月、6个月、1年自动发送随访提醒，提供线上辅导预约入口。
                    </Paragraph>
                    <Timeline>
                      <Timeline.Item color="blue">
                        <Text strong>1周随访：</Text>评估急性哀伤反应，提供情绪支持
                      </Timeline.Item>
                      <Timeline.Item color="green">
                        <Text strong>1个月随访：</Text>评估适应情况，讨论重返生活的问题
                      </Timeline.Item>
                      <Timeline.Item color="orange">
                        <Text strong>3个月随访：</Text>识别可能的复杂哀伤，提供专业干预
                      </Timeline.Item>
                      <Timeline.Item color="red">
                        <Text strong>6个月随访：</Text>评估长期适应，提供持续支持
                      </Timeline.Item>
                      <Timeline.Item color="purple">
                        <Text strong>1年随访：</Text>回顾哀伤历程，探讨生命意义
                      </Timeline.Item>
                    </Timeline>
                  </Card>

                  <Divider />

                  <Title level={4}>四、特殊人群哀伤辅导</Title>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Card title="丧亲父母支持" type="inner" style={{ marginBottom: 16 }}>
                        <Paragraph>
                          "失独家庭互助小组"，提供专业心理干预 + 社会支持对接：
                        </Paragraph>
                        <ul>
                          <li>专业心理治疗师定期小组辅导</li>
                          <li>慈善援助资源对接</li>
                          <li>志愿者一对一陪伴服务</li>
                          <li>重新养育/领养咨询</li>
                          <li>纪念活动组织支持</li>
                        </ul>
                        <Button type="primary" block style={{ marginTop: 16 }}>
                          加入互助小组
                        </Button>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card title="儿童丧亲支持" type="inner" style={{ marginBottom: 16 }}>
                        <Paragraph>
                          儿童表达悲伤的方式与成人不同，需要专业的儿童心理支持：
                        </Paragraph>
                        <ul>
                          <li>儿童丧亲辅导小组（分年龄段）</li>
                          <li>艺术疗愈活动（绘画、游戏、手工）</li>
                          <li>帮助儿童理解死亡</li>
                          <li>支持儿童表达悲伤情绪</li>
                          <li>家庭治疗支持</li>
                        </ul>
                        <Button type="primary" block style={{ marginTop: 16 }}>
                          预约儿童辅导
                        </Button>
                      </Card>
                    </Col>
                  </Row>
                </div>
              )
            }
          ]}
        />

        <Modal
          title="提交我的心愿"
          open={wishModalOpen}
          onOk={handleWishSubmit}
          onCancel={() => {
            setWishModalOpen(false)
            wishForm.resetFields()
          }}
          width={800}
        >
          <Form form={wishForm} layout="vertical">
            <Form.Item
              name="patientName"
              label="患者姓名"
              rules={[{ required: true, message: '请输入患者姓名' }]}
            >
              <Input placeholder="请输入患者姓名" />
            </Form.Item>

            <Form.Item
              name="wishType"
              label="心愿类型"
              rules={[{ required: true, message: '请选择心愿类型' }]}
            >
              <Select placeholder="请选择心愿类型">
                <Select.Option value="personal">个人心愿</Select.Option>
                <Select.Option value="family">家庭心愿</Select.Option>
                <Select.Option value="social">社会心愿</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="wish"
              label="心愿描述"
              rules={[{ required: true, message: '请描述您的心愿' }]}
            >
              <TextArea rows={4} placeholder="请详细描述您的心愿，我们会尽力帮助实现" />
            </Form.Item>

            <Form.Item
              name="contact"
              label="联系方式"
              rules={[{ required: true, message: '请输入联系方式' }]}
            >
              <Input placeholder="请输入您的联系电话" />
            </Form.Item>

            <Form.Item
              name="note"
              label="备注"
            >
              <TextArea rows={2} placeholder="其他需要说明的信息" />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </BackgroundWrapper>
  )
}

export default DeathEducation
