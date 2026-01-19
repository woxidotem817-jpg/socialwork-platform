import { useState } from 'react'
import { Card, Typography, Row, Col, Avatar, Divider, Timeline, Alert, Form, Input, Button, message, List, Tag, Select } from 'antd'
import { TeamOutlined, SafetyCertificateOutlined, PhoneOutlined, MailOutlined, FileTextOutlined, StarOutlined, WarningOutlined } from '@ant-design/icons'

const { Title, Paragraph, Text } = Typography
const { TextArea } = Input

const About = () => {
  const [feedbackForm] = Form.useForm()

  const teamMembers = [
    {
      name: '张教授',
      role: '项目指导老师',
      title: '安宁疗护领域主任医师',
      avatar: '张',
      color: '#1890ff'
    },
    {
      name: '李教授',
      role: '项目指导老师',
      title: '计算机领域教授',
      avatar: '李',
      color: '#52c41a'
    },
    {
      name: '王老师',
      role: '项目指导老师',
      title: '社会工作系教授',
      avatar: '王',
      color: '#722ed1'
    },
    {
      name: '学生A',
      role: '医疗专业',
      title: '医疗专业负责人',
      avatar: 'A',
      color: '#faad14'
    },
    {
      name: '学生B',
      role: '计算机专业',
      title: '技术负责人',
      avatar: 'B',
      color: '#eb2f96'
    },
    {
      name: '学生C',
      role: '社工专业',
      title: '需求调研负责人',
      avatar: 'C',
      color: '#13c2c2'
    }
  ]

  const experts = [
    {
      name: '陈教授',
      title: 'XX医院安宁疗护中心主任',
      organization: 'XX医院',
      field: '医疗',
      avatar: '陈',
      color: '#1890ff'
    },
    {
      name: '李教授',
      title: 'XX大学社会工作系教授',
      organization: 'XX大学',
      field: '社工',
      avatar: '李',
      color: '#52c41a'
    },
    {
      name: '王教授',
      title: '国家安宁疗护专家委员会成员',
      organization: '国家卫健委',
      field: '医疗',
      avatar: '王',
      color: '#722ed1'
    }
  ]

  const features = [
    {
      icon: '🎯',
      title: '基于权威指南',
      description: '依据《安宁疗护实践指南（2025年版）》开发，确保专业性'
    },
    {
      icon: '🔐',
      title: '数据安全保障',
      description: '采用AES加密技术存储用户隐私数据，符合《个人信息保护法》'
    },
    {
      icon: '👨‍👩‍👧‍👦',
      title: '多学科协作',
      description: '整合医疗、心理、社工等多学科服务，提供全面照护'
    },
    {
      icon: '📱',
      title: '响应式设计',
      description: '支持电脑、手机、平板多端访问，移动端优先优化'
    }
  ]

  const handleFeedbackSubmit = () => {
    feedbackForm.validateFields().then((values) => {
      message.success('反馈提交成功，感谢您的宝贵意见！')
      feedbackForm.resetFields()
    })
  }

  return (
    <div>
      {/* 横幅图片 */}
      <div className="page-banner">
        <img
          src="/images/home/banner-1.jpg"
          alt="关于我们"
        />
      </div>

      <Card>
        <Title level={2}>
          <StarOutlined /> 关于我们
        </Title>
        <Paragraph type="secondary">
          强化公信力，展示项目背景和团队构成
        </Paragraph>

        {/* 项目背景 */}
        <Title level={3}>
          <TeamOutlined /> 项目背景
        </Title>
        <Alert
          message="国家级大学生创新创业训练项目"
          description="本项目为2025年国家级大学生创新创业训练项目，旨在通过信息化手段提升安宁疗护服务质量。"
          type="info"
          showIcon
          style={{ marginBottom: 24 }}
        />

        <Card type="inner" style={{ marginBottom: 24 }}>
          <Paragraph>
            <Text strong>研究目标：</Text>
            <ul>
              <li>构建标准化的安宁疗护服务平台</li>
              <li>整合多学科协作模式</li>
              <li>提供全周期的死亡教育和哀伤辅导</li>
              <li>促进患者、家属、医护人员之间的有效沟通</li>
            </ul>
          </Paragraph>

          <Paragraph>
            <Text strong>团队构成：</Text>
            <ul>
              <li><Tag color="blue">医疗专业</Tag> - 负责医疗内容和专业指导</li>
              <li><Tag color="green">计算机专业</Tag> - 负责平台开发和技术实现</li>
              <li><Tag color="purple">社工专业</Tag> - 负责需求调研和用户体验</li>
            </ul>
          </Paragraph>

          <Paragraph>
            <Text strong>指导老师资质：</Text>
            <ul>
              <li>安宁疗护领域主任医师</li>
              <li>计算机领域教授</li>
              <li>社会工作系教授</li>
            </ul>
          </Paragraph>
        </Card>

        <Title level={4}>项目进展</Title>
        <Timeline
          dataSource={[
            { color: 'blue', children: '2024年6月 - 项目立项，组建多学科团队' },
            { color: 'blue', children: '2024年7-8月 - 需求调研，梳理用户需求' },
            { color: 'blue', children: '2024年9-10月 - 平台原型设计，核心功能开发' },
            { color: 'green', children: '2024年11-12月 - 3家机构试点应用，收集反馈' },
            { color: 'green', children: '2024年12月 - 服务用户1000+，优化用户体验' },
            { color: 'orange', children: '2025年1月 - 平台正式上线' }
          ]}
          style={{ marginBottom: 32 }}
        />

        <Divider />

        {/* 专家顾问团 */}
        <Title level={3}>
          <SafetyCertificateOutlined /> 专家顾问团
        </Title>
        <Alert
          message="权威专家支持"
          description="平台邀请医疗、心理、社工、伦理等领域专家组成顾问团，确保内容的专业性和权威性。"
          type="info"
          showIcon
          style={{ marginBottom: 24 }}
        />

        <Row gutter={[16, 16]}>
          {experts.map((expert, index) => (
            <Col xs={24} sm={12} md={8} key={index}>
              <Card>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <Avatar size={64} style={{ backgroundColor: expert.color, fontSize: 24 }}>
                    {expert.avatar}
                  </Avatar>
                </div>
                <Title level={5} style={{ textAlign: 'center', marginBottom: 8 }}>
                  {expert.name}
                </Title>
                <Paragraph style={{ textAlign: 'center', marginBottom: 4 }}>
                  <Text strong>{expert.title}</Text>
                </Paragraph>
                <Paragraph style={{ textAlign: 'center', marginBottom: 0 }}>
                  <Text type="secondary">{expert.organization}</Text>
                </Paragraph>
                <div style={{ textAlign: 'center', marginTop: 16 }}>
                  <Tag color="blue">{expert.field}</Tag>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Divider />

        {/* 隐私与数据安全 */}
        <Title level={3}>
          <WarningOutlined /> 隐私与数据安全
        </Title>
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={12}>
            <Card title="数据存储方式" type="inner" style={{ height: '100%' }}>
              <ul>
                <li>采用AES-256加密技术</li>
                <li>符合《个人信息保护法》</li>
                <li>数据存储在中国境内服务器</li>
                <li>定期进行安全审计</li>
              </ul>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="数据使用范围" type="inner" style={{ height: '100%' }}>
              <ul>
                <li>仅用于用户服务提供</li>
                <li>不向第三方泄露用户数据</li>
                <li>用户可自主删除个人信息</li>
                <li>用户可控制数据分享权限</li>
              </ul>
            </Card>
          </Col>
        </Row>

        <Card title="数据留存期限" type="inner" style={{ marginBottom: 24 }}>
          <Paragraph>
            用户注销账号后，系统将在30天内永久删除所有个人信息和服务记录。在留存期间，用户可以随时申请提前删除。
          </Paragraph>
          <Button type="link">申请提前删除</Button>
        </Card>

        <Card title="隐私设置中心" type="inner" style={{ marginBottom: 24 }}>
          <Paragraph>
            用户可以自主控制：
          </Paragraph>
          <ul>
            <li>个人信息的可见范围</li>
            <li>评估数据的分享权限</li>
            <li>社区帖子的公开/私密设置</li>
            <li>接收通知的类型和频率</li>
          </ul>
          <Button type="primary">前往隐私设置</Button>
        </Card>

        <Divider />

        {/* 平台特色 */}
        <Title level={3}>平台特色</Title>
        <Row gutter={[16, 16]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <span style={{ fontSize: 48 }}>{feature.icon}</span>
                </div>
                <Title level={5} style={{ textAlign: 'center', marginBottom: 8 }}>
                  {feature.title}
                </Title>
                <Paragraph type="secondary" style={{ textAlign: 'center' }}>
                  {feature.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>

        <Divider />

        {/* 反馈与建议 */}
        <Title level={3}>反馈与建议</Title>
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={12}>
            <Card title="意见征集" type="inner" style={{ marginBottom: 16 }}>
              <Paragraph>
                您可以通过文字、图片、视频等方式向我们反馈意见或建议。
              </Paragraph>
              <Form form={feedbackForm} layout="vertical" onFinish={handleFeedbackSubmit}>
                <Form.Item
                  name="type"
                  label="反馈类型"
                  rules={[{ required: true, message: '请选择反馈类型' }]}
                >
                  <Select>
                    <Select.Option value="bug">功能问题</Select.Option>
                    <Select.Option value="feature">功能建议</Select.Option>
                    <Select.Option value="content">内容建议</Select.Option>
                    <Select.Option value="other">其他</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="content"
                  label="详细描述"
                  rules={[{ required: true, message: '请输入详细描述' }]}
                >
                  <TextArea rows={4} placeholder="请详细描述您的问题或建议" />
                </Form.Item>
                <Form.Item
                  name="contact"
                  label="联系方式"
                >
                  <Input placeholder="手机号或邮箱（可选）" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    提交反馈
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="功能投票区" type="inner">
              <Paragraph>
                您可以投票选出最希望新增的功能。
              </Paragraph>
              <List
                dataSource={[
                  { title: 'AI智能客服', votes: 1234 },
                  { title: '线上心理咨询', votes: 987 },
                  { title: '家属社交功能', votes: 856 },
                  { title: '志愿者培训课程', votes: 743 }
                ]}
                renderItem={(feature) => (
                  <List.Item
                    actions={[
                      <Button type="primary" size="small">
                        投票
                      </Button>
                    ]}
                  >
                    <List.Item.Meta
                      title={feature.title}
                      description={
                        <Tag color="blue">{feature.votes}票</Tag>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        <Card title="常见问题解答（FAQ）" type="inner" style={{ marginBottom: 24 }}>
          <List
            dataSource={[
              { question: '如何使用平台？', answer: '注册账号后，根据角色访问相应的功能模块。' },
              { question: '数据如何保护？', answer: '采用AES加密技术存储，用户可自主控制数据权限。' },
              { question: '如何联系客服？', answer: '可通过下方的联系方式与我们取得联系。' }
            ]}
            renderItem={(faq) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <div>
                      <Text strong>Q: {faq.question}</Text>
                    </div>
                  }
                  description={
                    <div>
                      <Text type="secondary">A: {faq.answer}</Text>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Card>

        <Divider />

        {/* 联系我们 */}
        <Title level={3}>
          <PhoneOutlined /> 联系我们
        </Title>
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={8}>
            <Card type="inner">
              <div style={{ textAlign: 'center' }}>
                <PhoneOutlined style={{ fontSize: 48, color: '#1890ff', marginBottom: 16 }} />
                <Title level={5}>客服电话</Title>
                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>400-123-4567</Text>
                <Paragraph type="secondary">工作日 9:00-18:00</Paragraph>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card type="inner">
              <div style={{ textAlign: 'center' }}>
                <MailOutlined style={{ fontSize: 48, color: '#52c41a', marginBottom: 16 }} />
                <Title level={5}>电子邮箱</Title>
                <Text style={{ fontSize: 18 }}>contact@hospice-care.com</Text>
                <Paragraph type="secondary">24小时内回复</Paragraph>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card type="inner">
              <div style={{ textAlign: 'center' }}>
                <FileTextOutlined style={{ fontSize: 48, color: '#722ed1', marginBottom: 16 }} />
                <Title level={5}>微信公众号</Title>
                <Text style={{ fontSize: 18 }}>安宁疗护服务平台</Text>
                <Paragraph type="secondary">扫码关注</Paragraph>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Card title="机构合作" type="inner">
              <Paragraph>
                如果您是安宁疗护机构，欢迎与平台合作。
              </Paragraph>
              <ul>
                <li>机构信息展示</li>
                <li>服务对接</li>
                <li>数据互通</li>
              </ul>
              <Button type="primary" block>
                申请机构合作
              </Button>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="公益合作" type="inner">
              <Paragraph>
                如果您是公益组织或企业，欢迎开展公益合作。
              </Paragraph>
              <ul>
                <li>心愿实现支持</li>
                <li>志愿服务对接</li>
                <li>慈善援助项目</li>
              </ul>
              <Button type="primary" block>
                申请公益合作
              </Button>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default About
