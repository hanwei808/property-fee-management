"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { 
  Activity, 
  Users, 
  AlertTriangle, 
  Settings,
  Brain,
  Target,
  BarChart3,
  Shield,
  Clock,
  DollarSign
} from "lucide-react"

export default function RiskModelPage() {
  const [selectedModel, setSelectedModel] = useState("current")

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">风险评分模型</h1>
          <p className="text-muted-foreground mt-2">
            基于历史缴费习惯、账龄、金额、沟通记录等因素智能计算风险分数
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            模型设置
          </Button>
          <Button size="sm">
            <Brain className="w-4 h-4 mr-2" />
            重新训练
          </Button>
        </div>
      </div>

      <Tabs value={selectedModel} onValueChange={setSelectedModel} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="current">模型概览</TabsTrigger>
          <TabsTrigger value="scoring">评分规则</TabsTrigger>
          <TabsTrigger value="segmentation">人群分层</TabsTrigger>
          <TabsTrigger value="prediction">回款预测</TabsTrigger>
        </TabsList>

        {/* 模型概览 */}
        <TabsContent value="current" className="space-y-6">
          {/* 模型性能指标 */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">模型准确率</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87.6%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+2.3%</span> 较上月
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AUC值</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.832</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+0.028</span> 较上月
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">KS值</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0.58</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+0.05</span> 较上月
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">模型状态</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    正常运行
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  最后更新: 2小时前
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 模型详情 */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* 特征重要性 */}
            <Card>
              <CardHeader>
                <CardTitle>特征重要性</CardTitle>
                <CardDescription>影响风险评分的关键因素权重分布</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">历史缴费习惯</span>
                    <span className="text-sm text-muted-foreground">35%</span>
                  </div>
                  <Progress value={35} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">账龄结构</span>
                    <span className="text-sm text-muted-foreground">28%</span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">欠费金额</span>
                    <span className="text-sm text-muted-foreground">20%</span>
                  </div>
                  <Progress value={20} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">沟通记录</span>
                    <span className="text-sm text-muted-foreground">12%</span>
                  </div>
                  <Progress value={12} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">其他因素</span>
                    <span className="text-sm text-muted-foreground">5%</span>
                  </div>
                  <Progress value={5} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* 风险分布 */}
            <Card>
              <CardHeader>
                <CardTitle>风险等级分布</CardTitle>
                <CardDescription>当前所有业主的风险等级分布情况</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm font-medium">高风险</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">1,234户</div>
                      <div className="text-xs text-muted-foreground">15.2%</div>
                    </div>
                  </div>
                  <Progress value={15.2} className="h-2" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm font-medium">中风险</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">2,856户</div>
                      <div className="text-xs text-muted-foreground">35.1%</div>
                    </div>
                  </div>
                  <Progress value={35.1} className="h-2" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">低风险</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold">4,048户</div>
                      <div className="text-xs text-muted-foreground">49.7%</div>
                    </div>
                  </div>
                  <Progress value={49.7} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 模型训练历史 */}
          <Card>
            <CardHeader>
              <CardTitle>模型训练历史</CardTitle>
              <CardDescription>最近的模型训练和性能变化记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    date: "2024-09-19 14:30",
                    version: "v3.2",
                    accuracy: "87.6%",
                    auc: "0.832",
                    status: "生产环境",
                    improvement: "+2.3%"
                  },
                  {
                    date: "2024-09-15 09:15",
                    version: "v3.1",
                    accuracy: "85.3%",
                    auc: "0.804",
                    status: "已替换",
                    improvement: "+1.8%"
                  },
                  {
                    date: "2024-09-10 16:45",
                    version: "v3.0",
                    accuracy: "83.5%",
                    auc: "0.789",
                    status: "已替换",
                    improvement: "+0.9%"
                  }
                ].map((record) => (
                  <div key={record.version} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">{record.version}</span>
                        <span className="text-xs text-muted-foreground">{record.date}</span>
                      </div>
                      <Badge variant={record.status === "生产环境" ? "default" : "secondary"}>
                        {record.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div>准确率: <span className="font-medium">{record.accuracy}</span></div>
                      <div>AUC: <span className="font-medium">{record.auc}</span></div>
                      <div className="text-green-600">{record.improvement}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 评分规则配置 */}
        <TabsContent value="scoring" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>评分规则配置</CardTitle>
              <CardDescription>配置各维度的权重和评分标准</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 历史缴费习惯 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    历史缴费习惯
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">权重:</span>
                    <Input type="number" value="35" className="w-16 h-8 text-center" />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium text-sm mb-2">按时缴费率</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>&gt;90%</span>
                        <span className="text-green-600">低风险 (+20分)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>70-90%</span>
                        <span className="text-yellow-600">中风险 (0分)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>&lt;70%</span>
                        <span className="text-red-600">高风险 (-30分)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="font-medium text-sm mb-2">平均延迟天数</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>&lt;3天</span>
                        <span className="text-green-600">低风险 (+15分)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>3-7天</span>
                        <span className="text-yellow-600">中风险 (0分)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>&gt;7天</span>
                        <span className="text-red-600">高风险 (-20分)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="font-medium text-sm mb-2">连续欠费次数</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>0次</span>
                        <span className="text-green-600">低风险 (+10分)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>1-2次</span>
                        <span className="text-yellow-600">中风险 (0分)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>&gt;2次</span>
                        <span className="text-red-600">高风险 (-25分)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* 账龄结构 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    账龄结构
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">权重:</span>
                    <Input type="number" value="28" className="w-16 h-8 text-center" />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium text-sm mb-2">当前欠费天数</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>&lt;30天</span>
                        <span className="text-green-600">低风险 (+10分)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>30-60天</span>
                        <span className="text-yellow-600">中风险 (-10分)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>&gt;60天</span>
                        <span className="text-red-600">高风险 (-30分)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="font-medium text-sm mb-2">最长欠费记录</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>&lt;7天</span>
                        <span className="text-green-600">低风险 (+15分)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>7-30天</span>
                        <span className="text-yellow-600">中风险 (0分)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>&gt;30天</span>
                        <span className="text-red-600">高风险 (-25分)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="font-medium text-sm mb-2">账龄分布</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>集中在30天内</span>
                        <span className="text-green-600">低风险 (+10分)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>分散各时段</span>
                        <span className="text-yellow-600">中风险 (0分)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>长账龄占比高</span>
                        <span className="text-red-600">高风险 (-20分)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* 欠费金额 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    欠费金额
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">权重:</span>
                    <Input type="number" value="20" className="w-16 h-8 text-center" />
                    <span className="text-sm text-muted-foreground">%</span>
                  </div>
                </div>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 border rounded-lg">
                    <div className="font-medium text-sm mb-2">绝对金额</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>&lt;1000元</span>
                        <span className="text-green-600">低风险 (+5分)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>1000-5000元</span>
                        <span className="text-yellow-600">中风险 (0分)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>&gt;5000元</span>
                        <span className="text-red-600">高风险 (-15分)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="font-medium text-sm mb-2">相对收入比</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>&lt;5%</span>
                        <span className="text-green-600">低风险 (+10分)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>5-15%</span>
                        <span className="text-yellow-600">中风险 (0分)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>&gt;15%</span>
                        <span className="text-red-600">高风险 (-20分)</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="font-medium text-sm mb-2">增长趋势</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>下降</span>
                        <span className="text-green-600">低风险 (+15分)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>平稳</span>
                        <span className="text-yellow-600">中风险 (0分)</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>上升</span>
                        <span className="text-red-600">高风险 (-25分)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline">重置默认</Button>
                <Button>保存配置</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 人群分层管理 */}
        <TabsContent value="segmentation" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* 分层规则配置 */}
            <Card>
              <CardHeader>
                <CardTitle>分层规则配置</CardTitle>
                <CardDescription>设置高中低风险的分界标准</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg border-red-200 bg-red-50">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-red-500"></div>
                      <div>
                        <div className="font-semibold">高风险</div>
                        <div className="text-sm text-muted-foreground">需要重点关注</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono">&lt; -20分</div>
                      <div className="text-xs text-muted-foreground">1,234户 (15.2%)</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg border-yellow-200 bg-yellow-50">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                      <div>
                        <div className="font-semibold">中风险</div>
                        <div className="text-sm text-muted-foreground">定期跟进</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono">-20 ~ 20分</div>
                      <div className="text-xs text-muted-foreground">2,856户 (35.1%)</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg border-green-200 bg-green-50">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full bg-green-500"></div>
                      <div>
                        <div className="font-semibold">低风险</div>
                        <div className="text-sm text-muted-foreground">温和提醒</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono">&gt; 20分</div>
                      <div className="text-xs text-muted-foreground">4,048户 (49.7%)</div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold">分界阈值调整</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-20">高风险:</span>
                      <Input type="number" value="-20" className="flex-1" />
                      <span className="text-sm text-muted-foreground">分以下</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm w-20">低风险:</span>
                      <Input type="number" value="20" className="flex-1" />
                      <span className="text-sm text-muted-foreground">分以上</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 特殊人群管理 */}
            <Card>
              <CardHeader>
                <CardTitle>特殊人群管理</CardTitle>
                <CardDescription>设置需要特殊关注的人群标签</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    label: "老年业主",
                    count: 856,
                    color: "bg-blue-100 text-blue-800",
                    description: "年龄≥65岁，需要更温和的沟通方式"
                  },
                  {
                    label: "残障人士",
                    count: 127,
                    color: "bg-purple-100 text-purple-800",
                    description: "有特殊需求，需要人工客服处理"
                  },
                  {
                    label: "高价值客户",
                    count: 234,
                    color: "bg-orange-100 text-orange-800",
                    description: "房产价值或历史贡献较高"
                  },
                  {
                    label: "投诉敏感",
                    count: 445,
                    color: "bg-red-100 text-red-800",
                    description: "历史投诉频繁，需要谨慎处理"
                  },
                  {
                    label: "经济困难",
                    count: 312,
                    color: "bg-gray-100 text-gray-800",
                    description: "已申请困难减免，优先提供分期"
                  }
                ].map((group) => (
                  <div key={group.label} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge className={group.color}>{group.label}</Badge>
                      <div className="text-sm text-muted-foreground">{group.count}户</div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                <Button variant="outline" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  添加新标签
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 分层策略配置 */}
          <Card>
            <CardHeader>
              <CardTitle>分层催收策略</CardTitle>
              <CardDescription>为不同风险等级配置对应的催收策略</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                {/* 高风险策略 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <h4 className="font-semibold">高风险催收策略</h4>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="font-medium mb-1">第1天</div>
                      <div className="text-muted-foreground">电话 + 短信双重提醒</div>
                    </div>
                    
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="font-medium mb-1">第3天</div>
                      <div className="text-muted-foreground">管家上门拜访</div>
                    </div>
                    
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="font-medium mb-1">第7天</div>
                      <div className="text-muted-foreground">部门主管介入</div>
                    </div>
                    
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="font-medium mb-1">第15天</div>
                      <div className="text-muted-foreground">法务前置通知</div>
                    </div>
                  </div>
                </div>

                {/* 中风险策略 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <h4 className="font-semibold">中风险催收策略</h4>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="font-medium mb-1">第3天</div>
                      <div className="text-muted-foreground">微信温和提醒</div>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="font-medium mb-1">第7天</div>
                      <div className="text-muted-foreground">电话联系沟通</div>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="font-medium mb-1">第15天</div>
                      <div className="text-muted-foreground">管家上门协商</div>
                    </div>
                    
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="font-medium mb-1">第30天</div>
                      <div className="text-muted-foreground">正式催费通知</div>
                    </div>
                  </div>
                </div>

                {/* 低风险策略 */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <h4 className="font-semibold">低风险催收策略</h4>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium mb-1">第7天</div>
                      <div className="text-muted-foreground">友好短信提醒</div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium mb-1">第15天</div>
                      <div className="text-muted-foreground">微信个性化通知</div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium mb-1">第30天</div>
                      <div className="text-muted-foreground">电话关怀询问</div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium mb-1">第45天</div>
                      <div className="text-muted-foreground">管家面谈了解</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 回款预测 */}
        <TabsContent value="prediction" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* 预测概览 */}
            <Card>
              <CardHeader>
                <CardTitle>回款预测概览</CardTitle>
                <CardDescription>基于风险模型的未来回款率预测</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">7日回款率预测</span>
                    <span className="text-lg font-bold text-green-600">78.5%</span>
                  </div>
                  <Progress value={78.5} className="h-3" />
                  <div className="text-xs text-muted-foreground">
                    预计回款: 6,284户 / 8,012户
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">14日回款率预测</span>
                    <span className="text-lg font-bold text-blue-600">91.2%</span>
                  </div>
                  <Progress value={91.2} className="h-3" />
                  <div className="text-xs text-muted-foreground">
                    预计回款: 7,307户 / 8,012户
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">30日回款率预测</span>
                    <span className="text-lg font-bold text-purple-600">96.8%</span>
                  </div>
                  <Progress value={96.8} className="h-3" />
                  <div className="text-xs text-muted-foreground">
                    预计回款: 7,756户 / 8,012户
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 分层预测 */}
            <Card>
              <CardHeader>
                <CardTitle>分层回款预测</CardTitle>
                <CardDescription>不同风险等级的回款率预测</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">低风险 (30日)</span>
                    </div>
                    <span className="text-sm font-bold">98.2%</span>
                  </div>
                  <Progress value={98.2} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm font-medium">中风险 (30日)</span>
                    </div>
                    <span className="text-sm font-bold">94.7%</span>
                  </div>
                  <Progress value={94.7} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm font-medium">高风险 (30日)</span>
                    </div>
                    <span className="text-sm font-bold">82.3%</span>
                  </div>
                  <Progress value={82.3} className="h-2" />
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">预测置信度</h4>
                  <div className="flex items-center justify-between text-sm">
                    <span>模型准确率</span>
                    <span className="font-medium">87.6%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>历史偏差</span>
                    <span className="font-medium">±2.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 项目对比 */}
          <Card>
            <CardHeader>
              <CardTitle>项目回款对比</CardTitle>
              <CardDescription>各项目的风险分布和预测回款率对比</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    project: "保利花园A区",
                    total: 2156,
                    high: 12.3,
                    medium: 34.7,
                    low: 53.0,
                    prediction: 97.2
                  },
                  {
                    project: "保利花园B区",
                    total: 1834,
                    high: 18.9,
                    medium: 38.2,
                    low: 42.9,
                    prediction: 94.8
                  },
                  {
                    project: "保利翡翠湾",
                    total: 2890,
                    high: 14.7,
                    medium: 32.1,
                    low: 53.2,
                    prediction: 96.5
                  },
                  {
                    project: "保利海德公园",
                    total: 1132,
                    high: 22.4,
                    medium: 41.8,
                    low: 35.8,
                    prediction: 91.3
                  }
                ].map((project) => (
                  <div key={project.project} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold">{project.project}</div>
                        <div className="text-sm text-muted-foreground">总户数: {project.total}户</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{project.prediction}%</div>
                        <div className="text-xs text-muted-foreground">30日预测回款率</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-red-600 font-medium">{project.high}%</div>
                        <div className="text-muted-foreground">高风险</div>
                      </div>
                      <div className="text-center">
                        <div className="text-yellow-600 font-medium">{project.medium}%</div>
                        <div className="text-muted-foreground">中风险</div>
                      </div>
                      <div className="text-center">
                        <div className="text-green-600 font-medium">{project.low}%</div>
                        <div className="text-muted-foreground">低风险</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}