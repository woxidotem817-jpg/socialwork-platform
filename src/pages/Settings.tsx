import { Card, Form, Input, Button, Switch, message, Divider, Typography, Space } from 'antd'
import { UserOutlined, LockOutlined, BellOutlined, SettingOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const Settings = () => {
  const [form] = Form.useForm()

  const handleUserInfoSave = (values: any) => {
    console.log('用户信息保存:', values)
    message.success('用户信息更新成功')
  }

  const handlePasswordChange = (values: any) => {
    console.log('密码修改:', values)
    message.success('密码修改成功')
  }

  const handleNotificationChange = (checked: boolean) => {
    console.log('通知设置:', checked)
    message.success('通知设置已更新')
  }

  return (
    <div>
      <Title level={2} style={{ marginBottom: 24 }}>系统设置</Title>

      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title={<Space><UserOutlined />个人信息</Space>} bordered={false}>
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              name: '管理员',
              email: 'admin@hospice.com',
              phone: '13800138000',
            }}
            onFinish={handleUserInfoSave}
          >
            <Form.Item
              label="姓名"
              name="name"
              rules={[{ required: true, message: '请输入姓名' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                { required: true, message: '请输入邮箱' },
                { type: 'email', message: '请输入有效的邮箱地址' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="联系电话"
              name="phone"
              rules={[{ required: true, message: '请输入联系电话' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                保存更改
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card title={<Space><LockOutlined />修改密码</Space>} bordered={false}>
          <Form layout="vertical" onFinish={handlePasswordChange}>
            <Form.Item
              label="当前密码"
              name="currentPassword"
              rules={[{ required: true, message: '请输入当前密码' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="新密码"
              name="newPassword"
              rules={[
                { required: true, message: '请输入新密码' },
                { min: 6, message: '密码至少6位' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="确认新密码"
              name="confirmPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: '请再次输入新密码' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('两次输入的密码不一致'))
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                修改密码
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card title={<Space><BellOutlined />通知设置</Space>} bordered={false}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text strong>邮件通知</Text>
                <br />
                <Text type="secondary">接收重要事件的邮件提醒</Text>
              </div>
              <Switch defaultChecked onChange={handleNotificationChange} />
            </div>

            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text strong>短信通知</Text>
                <br />
                <Text type="secondary">接收紧急情况的短信提醒</Text>
              </div>
              <Switch defaultChecked onChange={handleNotificationChange} />
            </div>

            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text strong>系统消息</Text>
                <br />
                <Text type="secondary">接收系统更新和公告</Text>
              </div>
              <Switch defaultChecked onChange={handleNotificationChange} />
            </div>
          </Space>
        </Card>

        <Card title={<Space><SettingOutlined />其他设置</Space>} bordered={false}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text strong>自动保存</Text>
                <br />
                <Text type="secondary">自动保存编辑中的内容</Text>
              </div>
              <Switch defaultChecked />
            </div>

            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text strong>深色模式</Text>
                <br />
                <Text type="secondary">切换到深色主题</Text>
              </div>
              <Switch />
            </div>

            <Divider />

            <div>
              <Text strong>数据导出</Text>
              <br />
              <Text type="secondary">导出系统数据备份</Text>
              <div style={{ marginTop: 12 }}>
                <Button>导出数据</Button>
              </div>
            </div>
          </Space>
        </Card>
      </Space>
    </div>
  )
}

export default Settings
