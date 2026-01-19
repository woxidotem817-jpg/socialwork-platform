import { Card, Typography, Tabs, Alert, Divider, Space, Button } from 'antd'
import { BookOutlined, HeartOutlined, TeamOutlined, MessageOutlined, BulbOutlined } from '@ant-design/icons'
import BackgroundWrapper from '../components/BackgroundWrapper/BackgroundWrapper'

const { Title, Paragraph, Text } = Typography

const CommunicationGuide = () => {
  return (
    <BackgroundWrapper backgroundType="warm">
      <div>
        <div className="page-banner">
          <img
            src="/images/care/psychological-care.jpg"
            alt="心理护理"
          />
        </div>

        <Card>
          <Title level={2}>
            <MessageOutlined /> 沟通技巧指南
          </Title>
          <Paragraph type="secondary">
            依据《安宁疗护实践指南（2025年版）》提供场景化、实操化的沟通技巧指导
          </Paragraph>

          <Tabs defaultActiveKey="patient-family" size="large"
            items={[
              {
                key: 'patient-family',
                label: <span><HeartOutlined /> 家属-患者沟通</span>,
                children: (
                  <>
                    <Alert
                      message="重要提示"
                      description="以下沟通技巧基于安宁疗护专业实践，请在实际应用时根据患者情况灵活调整。"
                      type="info"
                      showIcon
                      style={{ marginBottom: 24 }}
                    />

                    <Title level={4}>
                      <BulbOutlined /> 一、病情告知技巧
                    </Title>
                    <Card type="inner" style={{ marginBottom: 16 }}>
                      <Title level={5}>1. 患者"知情意愿"分类评估</Title>
                      <Paragraph>
                        在告知病情前，先了解患者希望了解多少信息：
                      </Paragraph>
                      <ul>
                        <li>
                          <Text strong>希望完全知情：</Text>
                          <Text>直接告知诊断、预后、治疗方案</Text>
                          <br />
                          <Text type="secondary" style={{ marginLeft: 16 }}>
                            话术示例："医生说你的病情需要我们一起面对，我们会一直陪着你。"
                          </Text>
                        </li>
                        <li>
                          <Text strong>希望部分知情：</Text>
                          <Text>仅告知疾病概况和治疗方向，不深入讨论预后</Text>
                          <br />
                          <Text type="secondary" style={{ marginLeft: 16 }}>
                            话术示例："医生正在制定最合适的治疗方案，我们一起配合，让你舒服一些。"
                          </Text>
                        </li>
                        <li>
                          <Text strong>不愿知情：</Text>
                          <Text>尊重患者意愿，由家属代为沟通</Text>
                          <br />
                          <Text type="secondary" style={{ marginLeft: 16 }}>
                            话术示例："我们会和你的家人详细讨论，你好好休息就好。"
                          </Text>
                        </li>
                      </ul>
                    </Card>

                    <Card type="inner" style={{ marginBottom: 16 }}>
                      <Title level={5}>2. 分阶段告知策略</Title>
                      <Paragraph>
                        不要一次性告知全部信息，分步骤进行：
                      </Paragraph>
                      <ol>
                        <li><Text strong>第一阶段：</Text>告知疾病性质（是否严重）</li>
                        <li><Text strong>第二阶段：</Text>告知当前症状和治疗目标</li>
                        <li><Text strong>第三阶段：</Text>在患者准备好的情况下，告知预后</li>
                      </ol>
                    </Card>

                    <Divider />

                    <Title level={4}>
                      <TeamOutlined /> 二、死亡话题沟通
                    </Title>
                    <Card type="inner" style={{ marginBottom: 16 }}>
                      <Title level={5}>1. 坦诚沟通话术</Title>
                      <ul>
                        <li>
                          <Text strong>询问未来想法：</Text>
                          <br />
                          <Text type="secondary">
                            "我们可以聊聊你对未来的想法吗？"
                          </Text>
                        </li>
                        <li>
                          <Text strong>了解未竟心愿：</Text>
                          <br />
                          <Text type="secondary">
                            "你有没有想完成的心愿？我们一起想办法。"
                          </Text>
                        </li>
                        <li>
                          <Text strong>探讨生命意义：</Text>
                          <br />
                          <Text type="secondary">
                            "你这一辈子最骄傲的事情是什么？"
                          </Text>
                        </li>
                      </ul>
                    </Card>

                    <Card type="inner" style={{ marginBottom: 16 }}>
                      <Title level={5}>2. 避免的沟通误区</Title>
                      <ul>
                        <li>
                          <Text delete type="danger">"你一定会好起来的！"</Text>
                          <Text>→ 虚假希望会让患者失望</Text>
                        </li>
                        <li>
                          <Text delete type="danger">"别想太多，好好休息！"</Text>
                          <Text>→ 否定患者的担忧</Text>
                        </li>
                        <li>
                          <Text delete type="danger">"这都是小事，想开点！"</Text>
                          <Text>→ 轻视患者的感受</Text>
                        </li>
                      </ul>
                    </Card>

                    <Card type="inner" style={{ marginBottom: 16 }}>
                      <Title level={5}>3. 推荐的沟通方式</Title>
                      <ul>
                        <li>
                          <Text strong>接纳恐惧：</Text>
                          <br />
                          <Text type="secondary">
                            "害怕是正常的，我们都在这里陪你。"
                          </Text>
                        </li>
                        <li>
                          <Text strong>探讨告别：</Text>
                          <br />
                          <Text type="secondary">
                            "你想对谁说些什么？或者想留下什么话？"
                          </Text>
                        </li>
                        <li>
                          <Text strong>强调陪伴：</Text>
                          <br />
                          <Text type="secondary">
                            "不管发生什么，我们都不会让你一个人。"
                          </Text>
                        </li>
                      </ul>
                    </Card>

                    <Divider />

                    <Title level={4}>
                      <MessageOutlined /> 三、情感表达技巧
                    </Title>
                    <Card type="inner" style={{ marginBottom: 16 }}>
                      <Title level={5}>1. 开放式问题技巧</Title>
                      <Paragraph>
                        使用开放性问题引导患者表达情感：
                      </Paragraph>
                      <ul>
                        <li>
                          <Text>❌ 不要问："你还好吗？"（答案只有是或否）</Text>
                          <br />
                          <Text>✅ 可以问："你现在心里是什么感觉？"</Text>
                        </li>
                        <li>
                          <Text>❌ 不要问："你需要什么？"（患者可能不知道）</Text>
                          <br />
                          <Text>✅ 可以问："有什么想对我们说的吗？"</Text>
                        </li>
                        <li>
                          <Text>❌ 不要问："你痛不痛？"</Text>
                          <br />
                          <Text>✅ 可以问："你觉得哪里最不舒服？"</Text>
                        </li>
                      </ul>
                    </Card>

                    <Card type="inner" style={{ marginBottom: 16 }}>
                      <Title level={5}>2. 倾听与共情技巧</Title>
                      <Paragraph>
                        <Text strong>非语言技巧：</Text>
                      </Paragraph>
                      <ul>
                        <li>
                          <Text strong>眼神接触：</Text>保持温和的眼神交流，传递关注和支持
                        </li>
                        <li>
                          <Text strong>身体前倾：</Text>微微前倾，表示专注和关心
                        </li>
                        <li>
                          <Text strong>轻轻拍肩：</Text>在适当的时候轻轻拍肩，传递安慰
                        </li>
                        <li>
                          <Text strong>身体接触：</Text>握住患者的手，传递温暖和陪伴
                        </li>
                      </ul>

                      <Paragraph>
                        <Text strong>语言技巧：</Text>
                      </Paragraph>
                      <ul>
                        <li>
                          <Text>重复确认：</Text>
                          "我理解你的意思是...对吗？"
                        </li>
                        <li>
                          <Text>共情回应：</Text>
                          "我能感受到你现在很难受。"
                        </li>
                        <li>
                          <Text>沉默接纳：</Text>允许沉默，不要急于打破
                        </li>
                      </ul>
                    </Card>

                    <Card type="inner" style={{ marginBottom: 16 }}>
                      <Title level={5}>3. 应对常见情绪</Title>
                      <ul>
                        <li>
                          <Text strong>愤怒：</Text>
                          <br />
                          <Text type="secondary">
                            "我理解你现在很生气，你愿意告诉我发生了什么吗？"
                          </Text>
                        </li>
                        <li>
                          <Text strong>悲伤：</Text>
                          <br />
                          <Text type="secondary">
                            "想哭就哭出来吧，我就在这里陪着。"
                          </Text>
                        </li>
                        <li>
                          <Text strong>恐惧：</Text>
                          <br />
                          <Text type="secondary">
                            "害怕也没关系，我们一起面对。"
                          </Text>
                        </li>
                        <li>
                          <Text strong>孤独：</Text>
                          <br />
                          <Text type="secondary">
                            "你从来都不是一个人，我们都在。"
                          </Text>
                        </li>
                      </ul>
                    </Card>
                  </>
                )
              },
              {
                key: 'medical-family',
                label: <span><TeamOutlined /> 医护-家属沟通</span>,
                children: (
                  <>
                    <Alert
                      message="多学科协作"
                      description="医护与家属的沟通需要多学科团队协作，包括医生、护士、社工等。"
                      type="info"
                      showIcon
                      style={{ marginBottom: 24 }}
                    />

                    <Title level={4}>
                      <BookOutlined /> 一、治疗决策协商流程
                    </Title>
                    <Card type="inner" style={{ marginBottom: 16 }}>
                      <Title level={5}>1. 家庭会议组织指南</Title>
                      <Paragraph>
                        <Text strong>参会人员：</Text>
                        <ul>
                          <li>主要家属（配偶、子女等直系亲属）</li>
                          <li>主治医师（必要时多位专家）</li>
                          <li>责任护士</li>
                          <li>社工（负责协调和沟通）</li>
                        </ul>

                        <Text strong>沟通议程：</Text>
                        <ol>
                          <li>介绍参会人员和会议目的</li>
                          <li>汇报患者当前病情和评估结果</li>
                          <li>解释治疗方案和预期效果</li>
                          <li>讨论家属的担忧和期望</li>
                          <li>共同制定照护计划</li>
                          <li>记录决策和后续安排</li>
                        </ol>

                        <Text strong>决策记录：</Text>
                        <ul>
                          <li>使用标准化的会议记录表</li>
                          <li>所有参与人员签字确认</li>
                          <li>建立家属沟通档案</li>
                        </ul>
                      </Paragraph>
                    </Card>

                    <Card type="inner" style={{ marginBottom: 16 }}>
                      <Title level={5}>2. 治疗方案利弊讲解技巧</Title>
                      <Paragraph>
                        平衡呈现各种方案的利弊，让家属做出知情决定：
                      </Paragraph>
                      <ul>
                        <li>
                          <Text strong>方案A - 积极治疗：</Text>
                          <br />
                          <Text>✓ 延长生命时间</Text>
                          <br />
                          <Text>✗ 副作用大，生活质量低</Text>
                          <br />
                          <Text type="secondary">
                            话术："这个方案可能延长生命几个月，但会有比较严重的副作用，让病人很痛苦。"
                          </Text>
                        </li>
                        <li>
                          <Text strong>方案B - 缓解症状：</Text>
                          <br />
                          <Text>✓ 提高生活质量，减少痛苦</Text>
                          <br />
                          <Text>✗ 不能延长生命时间</Text>
                          <br />
                          <Text type="secondary">
                            话术："这个方案能缓解疼痛，让病人舒服一些，但可能有轻微的恶心等副作用。"
                          </Text>
                        </li>
                        <li>
                          <Text strong>方案C - 舒缓照护：</Text>
                          <br />
                          <Text>✓ 专注于舒适和尊严</Text>
                          <br />
                          <Text>✗ 不治疗原发疾病</Text>
                          <br />
                          <Text type="secondary">
                            话术："这个方案专注于让病人舒服，减轻痛苦，让他有尊严地度过这段时间。"
                          </Text>
                        </li>
                      </ul>
                    </Card>

                    <Divider />

                    <Title level={4}>
                      <HeartOutlined /> 二、坏消息告知技巧
                    </Title>
                    <Card type="inner" style={{ marginBottom: 16 }}>
                      <Title level={5}>四步法：准备 - 告知 - 共情 - 支持</Title>
                      <ol>
                        <li>
                          <Text strong>Step 1: 准备（PREPARE）</Text>
                          <ul>
                            <li>准备安静私密的环境</li>
                            <li>准备好病历资料</li>
                            <li>主要家属在场</li>
                            <li>预留充足时间</li>
                            <li>准备好 tissues（纸巾）和水</li>
                            <li>准备好情绪支持人员</li>
                          </ul>
                        </li>
                        <li>
                          <Text strong>Step 2: 告知（TELL）</Text>
                          <ul>
                            <li>使用简单明确的语言</li>
                            <li>告知前给家属心理准备</li>
                            <li>分段告知，不要一次性倾倒</li>
                            <li>确认家属理解</li>
                          </ul>
                          <Text type="secondary">
                            话术示例："接下来的消息可能很难接受，请做好准备。我们尽力治疗，但病情仍在恶化，可能已经进入临终阶段。"
                          </Text>
                        </li>
                        <li>
                          <Text strong>Step 3: 共情（EMPATHIZE）</Text>
                          <ul>
                            <li>允许家属表达情绪</li>
                            <li>不评判情绪反应</li>
                            <li>使用共情语言</li>
                            <li>保持沉默，给予空间</li>
                          </ul>
                          <Text type="secondary">
                            话术示例："我理解这个消息对你们来说太突然了，任何人都会很难接受。你们想哭就哭吧，我就在这里陪着。"
                          </Text>
                        </li>
                        <li>
                          <Text strong>Step 4: 支持（SUPPORT）</Text>
                          <ul>
                            <li>提供情感支持</li>
                            <li>解答疑问</li>
                            <li>协助制定下一步计划</li>
                            <li>链接社工和心理咨询</li>
                            <li>持续随访</li>
                          </ul>
                          <Text type="secondary">
                            话术示例："我们会继续和你们在一起，帮助患者舒服一些。有什么疑问随时问我，我们社工也可以提供心理支持。"
                          </Text>
                        </li>
                      </ol>
                    </Card>

                    <Card type="inner" style={{ marginBottom: 16 }}>
                      <Title level={5}>常见问题的应对</Title>
                      <ul>
                        <li>
                          <Text strong>家属质疑诊断：</Text>
                          <br />
                          <Text type="secondary">
                            "我理解这个结果很难接受。如果您有疑问，我们可以一起再仔细检查一遍，或者请专家会诊。"
                          </Text>
                        </li>
                        <li>
                          <Text strong>家属情绪崩溃：</Text>
                          <br />
                          <Text type="secondary">
                            "慢慢来，想哭就哭出来。我就在这里陪着，需要什么随时告诉我。"
                          </Text>
                        </li>
                        <li>
                          <Text strong>家属要求继续积极治疗：</Text>
                          <br />
                          <Text type="secondary">
                            "我理解您想尽一切可能。但我们也要考虑患者的感受和生活质量，我们可以一起讨论各种方案。"
                          </Text>
                        </li>
                      </ul>
                    </Card>
                  </>
                )
              },
              {
                key: 'social-worker',
                label: <span><BulbOutlined /> 社工专业沟通</span>,
                children: (
                  <>
                    <Alert
                      message="社工专业技能"
                      description="作为社工，您需要运用专业的沟通技巧，链接资源，提供心理支持。"
                      type="info"
                      showIcon
                      style={{ marginBottom: 24 }}
                    />

                    <Title level={4}>社工沟通核心原则</Title>
                    <Card type="inner" style={{ marginBottom: 16 }}>
                      <ul>
                        <li>
                          <Text strong>以患者为中心：</Text>尊重患者的自主权和价值观
                        </li>
                        <li>
                          <Text strong>赋能：</Text>帮助患者和家属发现自身资源和能力
                        </li>
                        <li>
                          <Text strong>系统视角：</Text>考虑家庭、社会、文化等系统因素
                        </li>
                        <li>
                          <Text strong>资源链接：</Text>有效链接医疗、心理、社会资源
                        </li>
                        <li>
                          <Text strong>专业界限：</Text>明确社工的角色和专业边界
                        </li>
                      </ul>
                    </Card>

                    <Title level={4}>常见工作场景沟通</Title>
                    <Card type="inner" style={{ marginBottom: 16 }}>
                      <Title level={5}>1. 心理评估沟通</Title>
                      <ul>
                        <li>
                          <Text strong>建立信任：</Text>
                          <Text type="secondary">
                            "我是社工小李，专门来和你聊聊你的感受和想法，帮你更好地度过这段时间。"
                          </Text>
                        </li>
                        <li>
                          <Text strong>正常化反应：</Text>
                          <Text type="secondary">
                            "你现在的心情完全正常，很多人都和你一样有类似的感受。"
                          </Text>
                        </li>
                        <li>
                          <Text strong>探索资源：</Text>
                          <Text type="secondary">
                            "有没有什么人或者什么事情让你觉得稍微好受一点？"
                          </Text>
                        </li>
                      </ul>
                    </Card>

                    <Card type="inner" style={{ marginBottom: 16 }}>
                      <Title level={5}>2. 家属心理支持</Title>
                      <ul>
                        <li>
                          <Text strong>倾听而非劝慰：</Text>
                          <Text type="secondary">
                            "我听到你说的了，这对您来说太不容易了。"
                          </Text>
                        </li>
                        <li>
                          <Text strong>肯定而非否认：</Text>
                          <Text type="secondary">
                            "您已经做得很好了，不需要自责。"
                          </Text>
                        </li>
                        <li>
                          <Text strong>赋能而非替代：</Text>
                          <Text type="secondary">
                            "您最了解他/她，我相信您可以找到最好的方式陪伴。"
                          </Text>
                        </li>
                      </ul>
                    </Card>

                    <Card type="inner" style={{ marginBottom: 16 }}>
                      <Title level={5}>3. 多学科协作沟通</Title>
                      <ul>
                        <li>
                          <Text strong>与医生沟通：</Text>
                          <Text type="secondary">
                            "患者家属对疼痛控制还有些担忧，能否和您一起讨论调整方案？"
                          </Text>
                        </li>
                        <li>
                          <Text strong>与护士沟通：</Text>
                          <Text type="secondary">
                            "注意到患者情绪有些低落，能否多关注一下？"
                          </Text>
                        </li>
                        <li>
                          <Text strong>组织家庭会议：</Text>
                          <Text type="secondary">
                            "我们是否可以安排一次家庭会议，让医生、护士和家属一起讨论照护计划？"
                          </Text>
                        </li>
                      </ul>
                    </Card>
                  </>
                )
              }
            ]}
          />
        </Card>
      </div>
    </BackgroundWrapper>
  )
}

export default CommunicationGuide
