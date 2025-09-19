"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Settings, 
  Brain, 
  Users, 
  Target,
  Clock,
  AlertTriangle,
  TrendingUp,
  RefreshCw,
  Pause,
  Edit,
  Copy,
  BarChart3,
  FlaskConical
} from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// 模拟数据
const mockStrategyData = {
  overview: {
    activeStrategies: 8,
    avgSuccessRate: 76.3,
    totalTests: 12,
    recommendationAccuracy: 89.2
  },
  tieredStrategies: [
    {
      id: 1,
      name: "预警阶段策略",
      stage: "1-15天",
      description: "温和提醒，维护客户关系",
      successRate: 82.5,
      status: "active",
      actions: [
        { day: 3, action: "友好短信提醒", channel: "SMS" },
        { day: 7, action: "管家电话联系", channel: "电话" },
        { day: 10, action: "微信个性化提醒", channel: "微信" },
        { day: 15, action: "上门拜访沟通", channel: "面访" }
      ]
    },
    {
      id: 2,
      name: "初级催收策略",
      stage: "16-30天",
      description: "加强沟通，寻求解决方案",
      successRate: 74.2,
      status: "active",
      actions: [
        { day: 16, action: "正式催费通知书", channel: "书面+电子" },
        { day: 20, action: "管家约谈", channel: "面访" },
        { day: 25, action: "联系紧急联系人", channel: "电话" },
        { day: 30, action: "最后通牒告知函", channel: "书面" }
      ]
    },
    {
      id: 3,
      name: "中级催收策略",
      stage: "31-60天",
      description: "施加适度压力，促成缴费",
      successRate: 68.9,
      status: "active",
      actions: [
        { day: 31, action: "主管介入约谈", channel: "面访" },
        { day: 35, action: "限制增值服务", channel: "系统" },
        { day: 40, action: "公告栏张贴通知", channel: "公告" },
        { day: 45, action: "律师函警告", channel: "法务" }
      ]
    },
    {
      id: 4,
      name: "高级催收策略",
      stage: "61-90天",
      description: "法律手段强制执行",
      successRate: 45.7,
      status: "active",
      actions: [
        { day: 61, action: "提起诉讼", channel: "法务" },
        { day: 75, action: "财产保全申请", channel: "法务" },
        { day: 90, action: "强制执行", channel: "法务" }
      ]
    }
  ],
  differentialStrategies: [
    {
      type: "高价值业主",
      description: "优先级最高，一对一专属服务",
      tolerance: "45天",
      successRate: 91.2,
      count: 156,
      features: ["专属服务", "延长容忍度", "高级话术"]
    },
    {
      type: "普通业主",
      description: "标准流程执行，严格按照时间节点",
      tolerance: "30天",
      successRate: 76.8,
      count: 2847,
      features: ["标准流程", "定时提醒", "常规话术"]
    },
    {
      type: "问题业主",
      description: "快速进入法律程序，缩短至30天启动",
      tolerance: "30天",
      successRate: 52.3,
      count: 89,
      features: ["快速升级", "法务优先", "强制话术"]
    }
  ],
  reasonBasedStrategies: [
    {
      reason: "服务质量问题",
      strategy: "优先解决服务问题，暂缓强制催收",
      successRate: 85.4,
      avgDays: 18,
      count: 482
    },
    {
      reason: "经济困难",
      strategy: "人性化处理，提供12个月分期方案",
      successRate: 71.2,
      avgDays: 25,
      count: 235
    },
    {
      reason: "恶意欠费",
      strategy: "30天直接进入法律程序",
      successRate: 43.8,
      avgDays: 35,
      count: 67
    }
  ],
  abTests: [
    {
      id: 1,
      name: "短信语气测试",
      description: "测试温和语气 vs 正式语气的效果",
      status: "running",
      startDate: "2024-09-01",
      progress: 75,
      groups: [
        { name: "温和语气", conversion: 23.4, participants: 500 },
        { name: "正式语气", conversion: 19.8, participants: 500 }
      ]
    },
    {
      id: 2,
      name: "发送时间测试",
      description: "测试上午 vs 下午发送效果",
      status: "completed",
      startDate: "2024-08-15",
      progress: 100,
      winner: "上午发送",
      groups: [
        { name: "上午发送", conversion: 28.7, participants: 800 },
        { name: "下午发送", conversion: 24.1, participants: 800 }
      ]
    }
  ],
  strategyEffectiveness: [
    { month: "2024-04", smsRate: 18.2, wechatRate: 24.6, phoneRate: 31.8, visitRate: 45.2 },
    { month: "2024-05", smsRate: 19.8, wechatRate: 26.3, phoneRate: 33.1, visitRate: 47.8 },
    { month: "2024-06", smsRate: 21.4, wechatRate: 28.9, phoneRate: 35.4, visitRate: 49.3 },
    { month: "2024-07", smsRate: 23.1, wechatRate: 31.2, phoneRate: 37.8, visitRate: 52.1 },
    { month: "2024-08", smsRate: 25.6, wechatRate: 33.8, phoneRate: 40.2, visitRate: 54.7 },
    { month: "2024-09", smsRate: 27.2, wechatRate: 35.4, phoneRate: 42.6, visitRate: 56.9 }
  ]
}

export default function StrategyModelPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">催费策略模型</h1>
          <p className="text-muted-foreground mt-2">
            智能催费策略引擎，基于业主画像和欠费原因自动匹配最优催收策略
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            策略配置
          </Button>
          <Button size="sm">
            <Brain className="w-4 h-4 mr-2" />
            智能优化
          </Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">策略概览</TabsTrigger>
          <TabsTrigger value="tiered">分层策略</TabsTrigger>
          <TabsTrigger value="differential">差异化策略</TabsTrigger>
          <TabsTrigger value="testing">A/B测试</TabsTrigger>
          <TabsTrigger value="effectiveness">效果分析</TabsTrigger>
        </TabsList>

        {/* 策略概览 */}
        <TabsContent value="overview" className="space-y-6">
          {/* 关键指标 */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">活跃策略数</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStrategyData.overview.activeStrategies}</div>
                <p className="text-xs text-muted-foreground">覆盖全部催收场景</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">平均成功率</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStrategyData.overview.avgSuccessRate}%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+3.2%</span> 较上月
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">A/B测试数</CardTitle>
                <FlaskConical className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStrategyData.overview.totalTests}</div>
                <p className="text-xs text-muted-foreground">2个进行中</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">推荐准确率</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStrategyData.overview.recommendationAccuracy}%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+1.8%</span> 较上月
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 策略引擎状态 */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  策略引擎状态
                </CardTitle>
                <CardDescription>
                  策略匹配和推荐引擎的实时状态
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">策略匹配引擎</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">运行中</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">智能推荐系统</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">运行中</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">A/B测试引擎</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">运行中</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">效果评估模块</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">运行中</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">上次更新</span>
                  <span className="text-sm text-muted-foreground">2分钟前</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  今日策略执行
                </CardTitle>
                <CardDescription>
                  今日各策略的执行情况统计
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">预警阶段</span>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="w-20" />
                      <span className="text-sm font-medium">428/504</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">初级催收</span>
                    <div className="flex items-center gap-2">
                      <Progress value={72} className="w-20" />
                      <span className="text-sm font-medium">234/325</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">中级催收</span>
                    <div className="flex items-center gap-2">
                      <Progress value={68} className="w-20" />
                      <span className="text-sm font-medium">89/131</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">高级催收</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-20" />
                      <span className="text-sm font-medium">18/40</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 分层策略 */}
        <TabsContent value="tiered" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">分层分级催收策略</h3>
              <p className="text-muted-foreground">根据欠费时长制定的标准化催收流程</p>
            </div>
            <Button>
              <Settings className="w-4 h-4 mr-2" />
              编辑策略
            </Button>
          </div>

          <div className="grid gap-6">
            {mockStrategyData.tieredStrategies.map((strategy) => (
              <Card key={strategy.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        {strategy.name}
                        <Badge variant="outline">{strategy.stage}</Badge>
                      </CardTitle>
                      <CardDescription className="mt-1">{strategy.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={strategy.status === 'active' ? 'default' : 'secondary'}
                        className={strategy.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                      >
                        {strategy.status === 'active' ? '运行中' : '已暂停'}
                      </Badge>
                      <div className="text-right">
                        <div className="text-sm font-medium">成功率</div>
                        <div className="text-lg font-bold text-green-600">{strategy.successRate}%</div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {strategy.actions.map((action, actionIndex) => (
                      <div key={`action-${strategy.id}-${actionIndex}`} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">T+{action.day}天</Badge>
                          <Badge variant="secondary" className="text-xs">{action.channel}</Badge>
                        </div>
                        <div className="text-sm font-medium">{action.action}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 差异化策略 */}
        <TabsContent value="differential" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">差异化催收策略</h3>
              <p className="text-muted-foreground">基于业主类型和欠费原因的个性化策略</p>
            </div>
            <Button>
              <Settings className="w-4 h-4 mr-2" />
              策略配置
            </Button>
          </div>

          {/* 基于业主类型的策略 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                基于业主类型的策略
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {mockStrategyData.differentialStrategies.map((strategy) => (
                  <div key={strategy.type} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{strategy.type}</h4>
                      <Badge variant="outline">{strategy.count}户</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{strategy.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>容忍度:</span>
                        <span className="font-medium">{strategy.tolerance}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>成功率:</span>
                        <span className="font-medium text-green-600">{strategy.successRate}%</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {strategy.features.map((feature, featureIndex) => (
                          <Badge key={`feature-${strategy.type}-${featureIndex}`} variant="secondary" className="text-xs">{feature}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 基于欠费原因的策略 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                基于欠费原因的策略
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStrategyData.reasonBasedStrategies.map((strategy) => (
                  <div key={strategy.reason} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{strategy.reason}</h4>
                      <div className="flex items-center gap-4 text-sm">
                        <span>涉及 <span className="font-medium">{strategy.count}</span> 户</span>
                        <span>平均 <span className="font-medium">{strategy.avgDays}</span> 天回款</span>
                        <span>成功率 <span className="font-medium text-green-600">{strategy.successRate}%</span></span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{strategy.strategy}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* A/B测试 */}
        <TabsContent value="testing" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">A/B测试管理</h3>
              <p className="text-muted-foreground">通过A/B测试持续优化催收策略效果</p>
            </div>
            <Button>
              <FlaskConical className="w-4 h-4 mr-2" />
              创建测试
            </Button>
          </div>

          <div className="grid gap-6">
            {mockStrategyData.abTests.map((test) => (
              <Card key={test.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FlaskConical className="h-5 w-5" />
                        {test.name}
                        <Badge 
                          variant={test.status === 'running' ? 'default' : 'secondary'}
                          className={test.status === 'running' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
                        >
                          {test.status === 'running' ? '进行中' : '已完成'}
                        </Badge>
                        {test.winner && (
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            胜出: {test.winner}
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{test.description}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {test.status === 'running' && (
                        <Button variant="ghost" size="sm">
                          <Pause className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {test.status === 'running' && (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>测试进度</span>
                          <span>{test.progress}%</span>
                        </div>
                        <Progress value={test.progress} />
                      </div>
                    )}
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      {test.groups.map((group) => (
                        <div key={`${test.id}-${group.name}`} className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">{group.name}</h4>
                            <Badge variant="outline">{group.participants}人</Badge>
                          </div>
                          <div className="text-2xl font-bold text-blue-600">{group.conversion}%</div>
                          <div className="text-sm text-muted-foreground">转化率</div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>开始时间: {test.startDate}</span>
                      {test.status === 'running' && <span>预计完成: 7天后</span>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 效果分析 */}
        <TabsContent value="effectiveness" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">策略效果分析</h3>
              <p className="text-muted-foreground">分析不同渠道和策略的转化效果</p>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="6months">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">近1个月</SelectItem>
                  <SelectItem value="3months">近3个月</SelectItem>
                  <SelectItem value="6months">近6个月</SelectItem>
                  <SelectItem value="1year">近1年</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                刷新
              </Button>
            </div>
          </div>

          {/* 渠道效果趋势 */}
          <Card>
            <CardHeader>
              <CardTitle>各渠道转化率趋势</CardTitle>
              <CardDescription>不同催收渠道的转化率变化趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockStrategyData.strategyEffectiveness}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="smsRate" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    name="短信转化率(%)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="wechatRate" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    name="微信转化率(%)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="phoneRate" 
                    stroke="#f59e0b" 
                    strokeWidth={2} 
                    name="电话转化率(%)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="visitRate" 
                    stroke="#ef4444" 
                    strokeWidth={2} 
                    name="上门转化率(%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* 策略效果对比 */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>分层策略效果对比</CardTitle>
                <CardDescription>各阶段策略的平均成功率</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStrategyData.tieredStrategies.map((strategy) => (
                    <div key={`tiered-${strategy.id}`} className="flex items-center justify-between">
                      <span className="text-sm">{strategy.name}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={strategy.successRate} className="w-20" />
                        <span className="text-sm font-medium w-12">{strategy.successRate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>业主类型效果对比</CardTitle>
                <CardDescription>不同业主类型的策略成功率</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStrategyData.differentialStrategies.map((strategy) => (
                    <div key={`differential-chart-${strategy.type}`} className="flex items-center justify-between">
                      <span className="text-sm">{strategy.type}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={strategy.successRate} className="w-20" />
                        <span className="text-sm font-medium w-12">{strategy.successRate}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}