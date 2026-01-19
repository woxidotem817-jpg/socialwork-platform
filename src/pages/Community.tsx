import { useState } from 'react'
import { Card, Typography, Tabs, Alert, List, Input, Button, Tag, Divider, message, Row, Col } from 'antd'
import { MessageOutlined, TeamOutlined, HeartOutlined, UserOutlined, CalendarOutlined, SearchOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons'
import BackgroundWrapper from '../components/BackgroundWrapper/BackgroundWrapper'

const { Title, Paragraph, Text } = Typography
const { TextArea } = Input

const Community = () => {
  const [activeTab, setActiveTab] = useState('patient')
  const [newPost, setNewPost] = useState({ title: '', content: '', category: '' })
  const [posts, setPosts] = useState([
    {
      id: 1,
      category: 'patient',
      author: '张三',
      title: '疼痛控制心得分享',
      content: '经过一个月的调整，疼痛控制效果很好，从7分降到了2分...',
      likes: 45,
      comments: 12,
      timestamp: '2小时前'
    },
    {
      id: 2,
      category: 'family',
      author: '李四',
      title: '如何帮助父亲度过最后时光',
      content: '这段时间学到了很多，想分享给同样处境的家属...',
      likes: 78,
      comments: 23,
      timestamp: '5小时前'
    },
    {
      id: 3,
      category: 'medical',
      author: '王医生',
      title: '难治性疼痛处理经验',
      content: '分享一例难治性疼痛的处理经验和体会...',
      likes: 123,
      comments: 34,
      timestamp: '1天前'
    }
  ])

  const categories = {
    patient: '患者交流区',
    family: '家属交流区',
    medical: '医护交流区',
    volunteer: '志愿者交流区'
  }

  const handlePostSubmit = () => {
    if (!newPost.title || !newPost.content) {
      message.warning('请填写标题和内容')
      return
    }

    const post = {
      id: Date.now(),
      category: activeTab,
      author: '当前用户',
      title: newPost.title,
      content: newPost.content,
      likes: 0,
      comments: 0,
      timestamp: '刚刚'
    }

    setPosts([post, ...posts])
    setNewPost({ title: '', content: '', category: '' })
    message.success('发布成功！')
  }

  return (
    <BackgroundWrapper backgroundType="professional">
      <div>
        {/* 横幅图片 */}
        <div className="page-banner">
          <img
            src="/images/medical/care-team.jpg"
            alt="互动社区"
          />
        </div>

        <Card>
          <Title level={2}>
            <TeamOutlined /> 互动社区
          </Title>
          <Paragraph type="secondary">
            严格的社区管理，营造安全、支持性的交流环境
          </Paragraph>

          <Tabs activeKey={activeTab} onChange={setActiveTab} size="large"
            items={[
              {
                key: 'patient',
                label: <span><HeartOutlined /> 患者交流</span>,
                children: (
                  <div>
                    <Alert
                      message="患者支持"
                      description="这里可以分享症状应对、生命心愿、终末生活感悟等内容。"
                      type="info"
                      showIcon
                      style={{ marginBottom: 24 }}
                    />

                    <Title level={4}>热门话题</Title>
                    <Tag color="blue" style={{ marginBottom: 16 }}>症状分享与应对</Tag>
                    <Tag color="green" style={{ marginBottom: 16 }}>我的生命心愿</Tag>
                    <Tag color="orange" style={{ marginBottom: 16 }}>终末生活感悟</Tag>
                    <Tag color="purple" style={{ marginBottom: 16 }}>疼痛控制方法</Tag>

                    <Divider />

                    <Title level={4}>发布内容</Title>
                    <Card type="inner" style={{ marginBottom: 24 }}>
                      <Input
                        placeholder="标题..."
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        style={{ marginBottom: 16 }}
                      />
                      <TextArea
                        rows={4}
                        placeholder="分享您的心得、感受或经验..."
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        style={{ marginBottom: 16 }}
                      />
                      <Button type="primary" onClick={handlePostSubmit}>
                        发布
                      </Button>
                    </Card>

                    <Title level={4}>最新帖子</Title>
                    <List
                      dataSource={posts.filter(p => p.category === 'patient')}
                      renderItem={(post) => (
                        <List.Item>
                          <List.Item.Meta
                            title={
                              <div>
                                <Text strong>{post.title}</Text>
                                <br />
                                <Text type="secondary">{post.author} | {post.timestamp}</Text>
                              </div>
                            }
                            description={
                              <div>
                                <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>{post.content}</Paragraph>
                                <div style={{ marginTop: 16 }}>
                                  <Button type="text" icon={<LikeOutlined />}>{post.likes}</Button>
                                  <Button type="text" icon={<MessageOutlined />}>{post.comments}条评论</Button>
                                  <Button type="text" icon={<StarOutlined />}>收藏</Button>
                                </div>
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
                key: 'family',
                label: <span><TeamOutlined /> 家属交流</span>,
                children: (
                  <div>
                    <Alert
                      message="家属支持"
                      description="这里可以分享照护经验、家属心理支持、机构选择交流等内容。"
                      type="info"
                      showIcon
                      style={{ marginBottom: 24 }}
                    />

                    <Title level={4}>热门话题</Title>
                    <Tag color="blue" style={{ marginBottom: 16 }}>照护经验分享</Tag>
                    <Tag color="green" style={{ marginBottom: 16 }}>家属心理支持</Tag>
                    <Tag color="orange" style={{ marginBottom: 16 }}>机构选择交流</Tag>
                    <Tag color="purple" style={{ marginBottom: 16 }}>哀伤辅导心得</Tag>

                    <Divider />

                    <Title level={4}>发布内容</Title>
                    <Card type="inner" style={{ marginBottom: 24 }}>
                      <Input
                        placeholder="标题..."
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        style={{ marginBottom: 16 }}
                      />
                      <TextArea
                        rows={4}
                        placeholder="分享您的照护经验、心得或疑问..."
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        style={{ marginBottom: 16 }}
                      />
                      <Button type="primary" onClick={handlePostSubmit}>
                        发布
                      </Button>
                    </Card>

                    <Title level={4}>最新帖子</Title>
                    <List
                      dataSource={posts.filter(p => p.category === 'family')}
                      renderItem={(post) => (
                        <List.Item>
                          <List.Item.Meta
                            title={
                              <div>
                                <Text strong>{post.title}</Text>
                                <br />
                                <Text type="secondary">{post.author} | {post.timestamp}</Text>
                              </div>
                            }
                            description={
                              <div>
                                <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>{post.content}</Paragraph>
                                <div style={{ marginTop: 16 }}>
                                  <Button type="text" icon={<LikeOutlined />}>{post.likes}</Button>
                                  <Button type="text" icon={<MessageOutlined />}>{post.comments}条评论</Button>
                                  <Button type="text" icon={<StarOutlined />}>收藏</Button>
                                </div>
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
                key: 'medical',
                label: <span><UserOutlined /> 医护交流</span>,
                children: (
                  <div>
                    <Alert
                      message="专业交流"
                      description="医护人员可以探讨指南实践、疑难病例、照护方案优化等。"
                      type="warning"
                      showIcon
                      style={{ marginBottom: 24 }}
                    />

                    <Title level={4}>热门话题</Title>
                    <Tag color="blue" style={{ marginBottom: 16 }}>指南实践探讨</Tag>
                    <Tag color="green" style={{ marginBottom: 16 }}>疑难病例分享</Tag>
                    <Tag color="orange" style={{ marginBottom: 16 }}>照护方案优化</Tag>
                    <Tag color="purple" style={{ marginBottom: 16 }}>多学科协作</Tag>

                    <Divider />

                    <Title level={4}>发布内容</Title>
                    <Card type="inner" style={{ marginBottom: 24 }}>
                      <Input
                        placeholder="标题..."
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        style={{ marginBottom: 16 }}
                      />
                      <TextArea
                        rows={4}
                        placeholder="分享您的临床经验、病例讨论或方案优化..."
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        style={{ marginBottom: 16 }}
                      />
                      <Button type="primary" onClick={handlePostSubmit}>
                        发布
                      </Button>
                    </Card>

                    <Title level={4}>最新帖子</Title>
                    <List
                      dataSource={posts.filter(p => p.category === 'medical')}
                      renderItem={(post) => (
                        <List.Item>
                          <List.Item.Meta
                            title={
                              <div>
                                <Text strong>{post.title}</Text>
                                <br />
                                <Text type="secondary">{post.author} | {post.timestamp}</Text>
                              </div>
                            }
                            description={
                              <div>
                                <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>{post.content}</Paragraph>
                                <div style={{ marginTop: 16 }}>
                                  <Button type="text" icon={<LikeOutlined />}>{post.likes}</Button>
                                  <Button type="text" icon={<MessageOutlined />}>{post.comments}条评论</Button>
                                  <Button type="text" icon={<StarOutlined />}>收藏</Button>
                                </div>
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
                key: 'volunteer',
                label: <span><HeartOutlined /> 志愿者交流</span>,
                children: (
                  <div>
                    <Alert
                      message="志愿者支持"
                      description="志愿者可以分享服务心得、服务技巧等。"
                      type="success"
                      showIcon
                      style={{ marginBottom: 24 }}
                    />

                    <Title level={4}>热门话题</Title>
                    <Tag color="blue" style={{ marginBottom: 16 }}>志愿服务心得</Tag>
                    <Tag color="green" style={{ marginBottom: 16 }}>服务技巧交流</Tag>
                    <Tag color="orange" style={{ marginBottom: 16 }}>感动时刻分享</Tag>
                    <Tag color="purple" style={{ marginBottom: 16 }}>服务经验总结</Tag>

                    <Divider />

                    <Title level={4}>发布内容</Title>
                    <Card type="inner" style={{ marginBottom: 24 }}>
                      <Input
                        placeholder="标题..."
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        style={{ marginBottom: 16 }}
                      />
                      <TextArea
                        rows={4}
                        placeholder="分享您的志愿服务心得和经验..."
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        style={{ marginBottom: 16 }}
                      />
                      <Button type="primary" onClick={handlePostSubmit}>
                        发布
                      </Button>
                    </Card>

                    <Title level={4}>最新帖子</Title>
                    <List
                      dataSource={posts.filter(p => p.category === 'volunteer')}
                      renderItem={(post) => (
                        <List.Item>
                          <List.Item.Meta
                            title={
                              <div>
                                <Text strong>{post.title}</Text>
                                <br />
                                <Text type="secondary">{post.author} | {post.timestamp}</Text>
                              </div>
                            }
                            description={
                              <div>
                                <Paragraph style={{ marginTop: 8, marginBottom: 0 }}>{post.content}</Paragraph>
                                <div style={{ marginTop: 16 }}>
                                  <Button type="text" icon={<LikeOutlined />}>{post.likes}</Button>
                                  <Button type="text" icon={<MessageOutlined />}>{post.comments}条评论</Button>
                                  <Button type="text" icon={<StarOutlined />}>收藏</Button>
                                </div>
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  </div>
                ),
              },
            ]}
          />

        <Divider />

        <Title level={4}>主题活动</Title>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="线上活动" type="inner">
              <List
                dataSource={[
                  { title: '生命故事征文', date: '每周三晚7点' },
                  { title: '照护经验分享会', date: '每周五晚8点' },
                  { title: '专家在线答疑', date: '每周日晚7点' }
                ]}
                renderItem={(activity) => (
                  <List.Item>
                    <List.Item.Meta
                      title={activity.title}
                      description={
                        <Tag color="blue">{activity.date}</Tag>
                      }
                    />
                    <Button type="primary" size="small">
                      参加活动
                    </Button>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="线下活动" type="inner">
              <List
                dataSource={[
                  { title: '生命纪念活动（北京）', date: '2024-01-25', location: '北京' },
                  { title: '家属支持小组聚会（上海）', date: '2024-01-26', location: '上海' },
                  { title: '志愿者培训（广州）', date: '2024-01-27', location: '广州' }
                ]}
                renderItem={(activity) => (
                  <List.Item>
                    <List.Item.Meta
                      title={activity.title}
                      description={
                        <div>
                          <Tag color="green">{activity.date}</Tag>
                          <Tag color="orange">{activity.location}</Tag>
                        </div>
                      }
                    />
                    <Button type="primary" size="small">
                      报名参加
                    </Button>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        <Divider />

        <Title level={4}>互助板块</Title>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="家属互助" type="inner">
              <List
                dataSource={[
                  { title: '北京朝阳区有没有需要互相搭把手的家属？', replies: 8 },
                  { title: '求推荐靠谱的居家护工', replies: 15 },
                  { title: '如何缓解失去亲人的痛苦', replies: 23 }
                ]}
                renderItem={(topic) => (
                  <List.Item>
                    <List.Item.Meta
                      title={topic.title}
                      description={
                        <Tag color="blue">{topic.replies}条回复</Tag>
                      }
                    />
                    <Button type="link">查看</Button>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="资源共享" type="inner">
              <List
                dataSource={[
                  { title: '家属分享自制照护工具教程', type: '教程', downloads: 234 },
                  { title: '医护人员分享照护方案模板', type: '模板', downloads: 567 }
                ]}
                renderItem={(resource) => (
                  <List.Item>
                    <List.Item.Meta
                      title={resource.title}
                      description={
                        <div>
                          <Tag color="purple">{resource.type}</Tag>
                          <Text type="secondary"> | 下载{resource.downloads}次</Text>
                        </div>
                      }
                    />
                    <Button type="primary" size="small">
                      下载
                    </Button>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
    </BackgroundWrapper>
  )
}

export default Community
