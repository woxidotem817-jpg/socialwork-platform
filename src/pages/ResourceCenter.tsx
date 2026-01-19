import { useState } from 'react'
import { Card, Typography, Tabs, Alert, Button, List, Row, Col, Tag, Divider, Input, Modal, Form, Upload, message, Rate } from 'antd'
import { DownloadOutlined, FileTextOutlined, BookOutlined, VideoCameraOutlined, AudioOutlined, SafetyCertificateOutlined, SearchOutlined } from '@ant-design/icons'
import BackgroundWrapper from '../components/BackgroundWrapper/BackgroundWrapper'

const { Title, Paragraph, Text } = Typography

const ResourceCenter = () => {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)

  const guideFiles = [
    {
      id: 1,
      title: '安宁疗护实践指南（2025年版）- 完整版',
      type: 'PDF',
      version: '2025年版',
      size: '15.2 MB',
      downloadCount: 3421,
      category: '指南文件'
    },
    {
      id: 2,
      title: '安宁疗护实践指南（2025年版）- 精简版',
      type: 'PDF',
      version: '2025年版',
      size: '5.8 MB',
      downloadCount: 2156,
      category: '指南文件'
    },
    {
      id: 3,
      title: '安宁疗护实践指南（2017年试行版）',
      type: 'PDF',
      version: '2017年版',
      size: '8.3 MB',
      downloadCount: 1234,
      category: '指南文件'
    },
    {
      id: 4,
      title: '上海市安宁疗护实施细则',
      type: 'PDF',
      version: '地区版',
      size: '3.2 MB',
      downloadCount: 876,
      category: '政策文件'
    },
    {
      id: 5,
      title: '北京市安宁疗护管理办法',
      type: 'PDF',
      version: '地区版',
      size: '2.9 MB',
      downloadCount: 654,
      category: '政策文件'
    }
  ]

  const templates = [
    {
      id: 1,
      title: '疼痛评估记录表',
      category: '评估类',
      description: '依据WHO疼痛评估标准设计的记录表，包含疼痛强度、部位、性质、持续时间等评估项目',
      fileType: 'Excel',
      downloads: 1892
    },
    {
      id: 2,
      title: '症状监测日志',
      category: '评估类',
      description: '用于日常监测患者症状变化，包括生命体征、疼痛、恶心、呕吐等常见症状',
      fileType: 'Excel',
      downloads: 1654
    },
    {
      id: 3,
      title: '心理状态评估表（HAMD/HAMA）',
      category: '评估类',
      description: '抑郁和焦虑评估量表，用于心理状态评估和干预效果监测',
      fileType: 'Excel',
      downloads: 1432
    },
    {
      id: 4,
      title: '生命体征监测表',
      category: '评估类',
      description: '体温、心率、血压、呼吸、血氧等生命体征的监测记录表',
      fileType: 'Excel',
      downloads: 2156
    },
    {
      id: 5,
      title: '个性化照护计划模板',
      category: '照护类',
      description: '基于多学科评估制定的个性化照护计划模板',
      fileType: 'Word',
      downloads: 1876
    },
    {
      id: 6,
      title: '用药记录表',
      category: '照护类',
      description: '阿片类药物及其他药物的用药记录表，包含剂量、频率、效果等',
      fileType: 'Excel',
      downloads: 2341
    },
    {
      id: 7,
      title: '不良反应记录单',
      category: '照护类',
      description: '药物和治疗方法的不良反应记录单',
      fileType: 'Word',
      downloads: 1234
    },
    {
      id: 8,
      title: '家庭会议记录模板',
      category: '沟通类',
      description: '多学科家庭会议的标准记录模板',
      fileType: 'Word',
      downloads: 987
    },
    {
      id: 9,
      title: '心愿清单模板',
      category: '沟通类',
      description: '患者心愿清单模板，包含个人、家庭、社会三个类别',
      fileType: 'Excel',
      downloads: 1567
    },
    {
      id: 10,
      title: '生命故事收集模板',
      category: '沟通类',
      description: '帮助患者回顾和记录生命历程的模板',
      fileType: 'Word',
      downloads: 1123
    }
  ]

  const videos = [
    {
      id: 1,
      title: '疼痛评估操作演示',
      category: '实操教程',
      duration: '8:30',
      views: 12453,
      speaker: '护理部主管'
    },
    {
      id: 2,
      title: '口腔护理标准流程',
      category: '实操教程',
      duration: '12:15',
      views: 9834,
      speaker: '护士长'
    },
    {
      id: 3,
      title: '患者翻身技巧',
      category: '实操教程',
      duration: '10:45',
      views: 11234,
      speaker: '康复治疗师'
    },
    {
      id: 4,
      title: '进食防误吸方法',
      category: '实操教程',
      duration: '9:20',
      views: 8765,
      speaker: '营养师'
    },
    {
      id: 5,
      title: '海姆立克急救法',
      category: '实操教程',
      duration: '6:30',
      views: 23456,
      speaker: '急诊科医师'
    },
    {
      id: 6,
      title: '安宁疗护指南解读',
      category: '专家讲座',
      duration: '45:00',
      views: 6543,
      speaker: '国家安宁疗护专家'
    },
    {
      id: 7,
      title: '阿片类药物合理使用',
      category: '专家讲座',
      duration: '38:20',
      views: 5432,
      speaker: '疼痛科主任医师'
    },
    {
      id: 8,
      title: '濒死期照护技巧',
      category: '专家讲座',
      duration: '42:15',
      views: 4567,
      speaker: '安宁疗护科主任'
    },
    {
      id: 9,
      title: '父亲的最后时光',
      category: '患者家属分享',
      duration: '15:30',
      views: 8765,
      speaker: '家属代表'
    },
    {
      id: 10,
      title: '陪伴母亲的日子里',
      category: '患者家属分享',
      duration: '18:45',
      views: 7654,
      speaker: '家属代表'
    }
  ]

  const resources = [
    {
      id: 1,
      name: '北京某安宁疗护中心',
      location: '北京市朝阳区',
      serviceTypes: ['机构照护', '门诊服务'],
      beds: 50,
      rating: 4.8,
      phone: '010-12345678',
      services: ['症状控制', '舒适照护', '心理支持', '哀伤辅导']
    },
    {
      id: 2,
      name: '上海某临终关怀院',
      location: '上海市浦东新区',
      serviceTypes: ['机构照护', '居家照护'],
      beds: 80,
      rating: 4.9,
      phone: '021-87654321',
      services: ['多学科团队', '家庭会议', '心愿实现', '志愿者服务']
    },
    {
      id: 3,
      name: '广州某安宁疗护医院',
      location: '广州市天河区',
      serviceTypes: ['机构照护', '居家照护', '门诊服务'],
      beds: 120,
      rating: 4.7,
      phone: '020-98765432',
      services: ['疼痛管理', '呼吸支持', '营养支持', '生命教育']
    }
  ]

  return (
    <BackgroundWrapper backgroundType="professional">
      <Card>
        <Title level={2}>
          <BookOutlined /> 资源中心
        </Title>
        <Paragraph type="secondary">
          依据《安宁疗护实践指南（2025年版）》提供系统化、可下载、持续更新的资源
        </Paragraph>

        <Tabs
          defaultActiveKey="guides"
          size="large"
          items={[
            {
              key: 'guides',
              label: <span><FileTextOutlined /> 指南与政策</span>,
              children: (
                <>
                  <Alert
                    message="权威指南"
                    description="所有指南文件均来自国家卫生健康委员会及地方卫生健康委官方发布。"
                    type="info"
                    showIcon
                    style={{ marginBottom: 24 }}
                  />

                  <Input.Search
                    placeholder="搜索指南文件..."
                    prefix={<SearchOutlined />}
                    size="large"
                    style={{ marginBottom: 24 }}
                    enterButton
                  />

                  <Title level={4}>一、实践指南</Title>
                  <List
                    dataSource={guideFiles.filter(f => f.category === '指南文件')}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button type="primary" icon={<DownloadOutlined />} size="small">
                            下载
                          </Button>
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<FileTextOutlined style={{ fontSize: 32, color: '#1890ff' }} />}
                          title={item.title}
                          description={
                            <div>
                              <Tag color="blue">{item.version}</Tag>
                              <Tag color="green">{item.type}</Tag>
                              <Text type="secondary"> | {item.size} | 已下载 {item.downloadCount} 次</Text>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />

                  <Divider />

                  <Title level={4}>二、政策文件</Title>
                  <List
                    dataSource={guideFiles.filter(f => f.category === '政策文件')}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button type="primary" icon={<DownloadOutlined />} size="small">
                            下载
                          </Button>
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<SafetyCertificateOutlined style={{ fontSize: 32, color: '#52c41a' }} />}
                          title={item.title}
                          description={
                            <div>
                              <Tag color="purple">{item.version}</Tag>
                              <Tag color="green">{item.type}</Tag>
                              <Text type="secondary"> | {item.size} | 已下载 {item.downloadCount} 次</Text>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </>
              )
            },
            {
              key: 'templates',
              label: <span><FileTextOutlined /> 工具模板</span>,
              children: (
                <>
                  <Alert
                    message="可下载编辑"
                    description="所有模板均为可编辑格式（Excel/Word），可根据实际需求修改使用。"
                    type="info"
                    showIcon
                    style={{ marginBottom: 24 }}
                  />

                  <Title level={4}>评估类模板</Title>
                  <List
                    dataSource={templates.filter(t => t.category === '评估类')}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button type="primary" icon={<DownloadOutlined />} size="small">
                            下载 ({item.fileType})
                          </Button>
                        ]}
                      >
                        <List.Item.Meta
                          title={item.title}
                          description={
                            <div>
                              <Tag color="blue">{item.category}</Tag>
                              <Text type="secondary"> | 已下载 {item.downloads} 次</Text>
                              <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>{item.description}</Paragraph>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />

                  <Divider />

                  <Title level={4}>照护类模板</Title>
                  <List
                    dataSource={templates.filter(t => t.category === '照护类')}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button type="primary" icon={<DownloadOutlined />} size="small">
                            下载 ({item.fileType})
                          </Button>
                        ]}
                      >
                        <List.Item.Meta
                          title={item.title}
                          description={
                            <div>
                              <Tag color="green">{item.category}</Tag>
                              <Text type="secondary"> | 已下载 {item.downloads} 次</Text>
                              <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>{item.description}</Paragraph>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />

                  <Divider />

                  <Title level={4}>沟通类模板</Title>
                  <List
                    dataSource={templates.filter(t => t.category === '沟通类')}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button type="primary" icon={<DownloadOutlined />} size="small">
                            下载 ({item.fileType})
                          </Button>
                        ]}
                      >
                        <List.Item.Meta
                          title={item.title}
                          description={
                            <div>
                              <Tag color="orange">{item.category}</Tag>
                              <Text type="secondary"> | 已下载 {item.downloads} 次</Text>
                              <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>{item.description}</Paragraph>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />

                  <Divider />

                  <Title level={4}>行政类模板</Title>
                  <List
                    dataSource={[
                      { title: '医护人员工作流程SOP', downloads: 2134, fileType: 'Word' },
                      { title: '志愿者服务记录模板', downloads: 987, fileType: 'Excel' },
                      { title: '机构照护质量评估表', downloads: 1234, fileType: 'Excel' }
                    ]}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button type="primary" icon={<DownloadOutlined />} size="small">
                            下载 ({item.fileType})
                          </Button>
                        ]}
                      >
                        <List.Item.Meta
                          title={item.title}
                          description={
                            <div>
                              <Tag color="purple">行政类</Tag>
                              <Text type="secondary"> | 已下载 {item.downloads} 次</Text>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </>
              )
            },
            {
              key: 'media',
              label: <span><VideoCameraOutlined /> 视频/音频资源</span>,
              children: (
                <>
                  <Row gutter={16} style={{ marginBottom: 24 }}>
                    <Col span={12}>
                      <Alert
                        message="视频教程"
                        description="提供实操教程、专家讲座、患者家属分享等多种视频资源。"
                        type="info"
                        showIcon
                      />
                    </Col>
                    <Col span={12}>
                      <Alert
                        message="音频资源"
                        description="提供指南解读、心理疏导音频、音乐疗法等音频资源。"
                        type="success"
                        showIcon
                      />
                    </Col>
                  </Row>

                  <Title level={4}>实操教程</Title>
                  <List
                    dataSource={videos.filter(v => v.category === '实操教程')}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button type="primary" icon={<VideoCameraOutlined />}>
                            观看
                          </Button>
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<VideoCameraOutlined style={{ fontSize: 32, color: '#1890ff' }} />}
                          title={item.title}
                          description={
                            <div>
                              <Tag color="blue">{item.category}</Tag>
                              <Text type="secondary"> | 时长：{item.duration} | 主讲：{item.speaker} | 播放：{item.views}次</Text>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />

                  <Divider />

                  <Title level={4}>专家讲座</Title>
                  <List
                    dataSource={videos.filter(v => v.category === '专家讲座')}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button type="primary" icon={<VideoCameraOutlined />}>
                            观看
                          </Button>
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<VideoCameraOutlined style={{ fontSize: 32, color: '#52c41a' }} />}
                          title={item.title}
                          description={
                            <div>
                              <Tag color="green">{item.category}</Tag>
                              <Text type="secondary"> | 时长：{item.duration} | 主讲：{item.speaker} | 播放：{item.views}次</Text>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />

                  <Divider />

                  <Title level={4}>患者家属分享</Title>
                  <List
                    dataSource={videos.filter(v => v.category === '患者家属分享')}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button type="primary" icon={<VideoCameraOutlined />}>
                            观看
                          </Button>
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<VideoCameraOutlined style={{ fontSize: 32, color: '#faad14' }} />}
                          title={item.title}
                          description={
                            <div>
                              <Tag color="orange">{item.category}</Tag>
                              <Text type="secondary"> | 时长：{item.duration} | 分享者：{item.speaker} | 播放：{item.views}次</Text>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />

                  <Divider />

                  <Title level={4}>音频资源</Title>
                  <List
                    dataSource={[
                      { title: '指南解读音频（第一章）', duration: '25:00', size: '15.2 MB' },
                      { title: '心理疏导音频（普通话版）', duration: '30:00', size: '18.5 MB' },
                      { title: '心理疏导音频（方言版）', duration: '30:00', size: '17.8 MB' },
                      { title: '舒缓音乐疗法歌单', duration: '2:00:00', size: '120.5 MB' },
                      { title: '白噪音资源（雨声）', duration: '1:00:00', size: '45.3 MB' },
                      { title: '白噪音资源（海浪声）', duration: '1:00:00', size: '43.7 MB' }
                    ]}
                    renderItem={(item) => (
                      <List.Item
                        actions={[
                          <Button type="primary" icon={<AudioOutlined />}>
                            播放/下载
                          </Button>
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<AudioOutlined style={{ fontSize: 32, color: '#722ed1' }} />}
                          title={item.title}
                          description={
                            <div>
                              <Tag color="purple">音频资源</Tag>
                              <Text type="secondary"> | 时长：{item.duration} | 大小：{item.size}</Text>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </>
              )
            },
            {
              key: 'institutions',
              label: <span><SafetyCertificateOutlined /> 机构查询</span>,
              children: (
                <>
                  <Alert
                    message="机构资源"
                    description="全国安宁疗护试点机构名录，包含机构基本信息、服务项目、收费标准等。"
                    type="info"
                    showIcon
                    style={{ marginBottom: 24 }}
                  />

                  <Input.Search
                    placeholder="搜索机构名称或地区..."
                    prefix={<SearchOutlined />}
                    size="large"
                    style={{ marginBottom: 24 }}
                    enterButton
                  />

                  <List
                    dataSource={resources}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<SafetyCertificateOutlined style={{ fontSize: 32, color: '#52c41a' }} />}
                          title={item.name}
                          description={
                            <div>
                              <Text strong>地点：</Text>{item.location}
                              <br />
                              <Text strong>服务类型：</Text>
                              {item.serviceTypes.map((type, index) => (
                                <Tag key={index} color="blue" style={{ marginLeft: 4 }}>{type}</Tag>
                              ))}
                              <br />
                              <Text strong>床位数：</Text>{item.beds} | <Text strong>评分：</Text>⭐{item.rating}
                              <br />
                              <Text strong>联系电话：</Text>{item.phone}
                              <br />
                              <Text strong>服务项目：</Text>
                              {item.services.map((service, index) => (
                                <Tag key={index} color="green" style={{ marginLeft: 4 }}>{service}</Tag>
                              ))}
                            </div>
                          }
                        />
                        <Button type="primary">查看详情</Button>
                      </List.Item>
                    )}
                  />

                  <Divider />

                  <Title level={4}>医保报销指引</Title>
                  <Card type="inner" style={{ marginBottom: 16 }}>
                    <Paragraph>
                      根据地区查询安宁疗护相关费用的报销比例、报销流程和所需材料。
                    </Paragraph>
                    <Button type="primary" block>
                      选择地区查询
                    </Button>
                  </Card>

                  <Title level={4}>慈善援助资源</Title>
                  <Card type="inner">
                    <Paragraph>
                      面向贫困患者的慈善项目信息，包括药物援助、照护费用补贴等。
                    </Paragraph>
                    <List
                      dataSource={[
                        { name: '某慈善基金会药物援助项目', status: '申请中' },
                        { name: '某公益组织照护费用补贴', status: '可申请' },
                        { name: '某企业志愿者服务项目', status: '申请中' }
                      ]}
                      renderItem={(item) => (
                        <List.Item
                          actions={[
                            <Button type={item.status === '可申请' ? 'primary' : 'default'}>
                              {item.status === '可申请' ? '立即申请' : '等待审核'}
                            </Button>
                          ]}
                        >
                          <List.Item.Meta
                            title={item.name}
                            description={
                              <Tag color={item.status === '可申请' ? 'green' : 'orange'}>
                                {item.status}
                              </Tag>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </Card>
                </>
              )
            }
          ]}
        />
      </Card>
    </BackgroundWrapper>
  )
}

export default ResourceCenter
