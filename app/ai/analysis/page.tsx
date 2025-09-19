"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { 
  Brain, 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  Download,
  RefreshCw,
  Eye,
  Settings
} from "lucide-react"
import { BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// 模拟数据
const mockAnalysisData = {
  overview: {
    totalCases: 1248,
    analyzedCases: 1176,
    accuracy: 94.2,
    processing: 72
  },
  categories: [
    { name: "物业服务维度", count: 482, percentage: 41.0, color: "#3b82f6" },
    { name: "管理机制维度", count: 294, percentage: 25.0, color: "#10b981" },
    { name: "沟通互动维度", count: 235, percentage: 20.0, color: "#f59e0b" },
    { name: "外部环境影响", count: 118, percentage: 10.0, color: "#ef4444" },
    { name: "特殊情境因素", count: 47, percentage: 4.0, color: "#8b5cf6" }
  ],
  detailedReasons: [
    { category: "物业服务维度", reason: "保洁绿化维护不足", count: 186, severity: "high" },
    { category: "物业服务维度", reason: "设施设备故障频发", count: 164, severity: "high" },
    { category: "物业服务维度", reason: "安防形同虚设", count: 132, severity: "medium" },
    { category: "管理机制维度", reason: "费用透明度不足", count: 147, severity: "high" },
    { category: "管理机制维度", reason: "决策参与缺失", count: 147, severity: "medium" },
    { category: "沟通互动维度", reason: "态度与服务意识", count: 118, severity: "high" },
    { category: "沟通互动维度", reason: "信息传递失效", count: 117, severity: "medium" },
    { category: "外部环境影响", reason: "经济压力传导", count: 71, severity: "medium" },
    { category: "外部环境影响", reason: "政策法规变化", count: 47, severity: "low" }
  ],
  trendData: [
    { month: "1月", cases: 98, accuracy: 89.2 },
    { month: "2月", cases: 87, accuracy: 91.1 },
    { month: "3月", cases: 112, accuracy: 92.5 },
    { month: "4月", cases: 128, accuracy: 93.8 },
    { month: "5月", cases: 142, accuracy: 94.2 },
    { month: "6月", cases: 156, accuracy: 94.7 }
  ]
}

const severityColors = {
  high: "#ef4444",
  medium: "#f59e0b", 
  low: "#10b981"
}

const severityLabels = {
  high: "高风险",
  medium: "中风险",
  low: "低风险"
}

export default function AnalysisPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    // 模拟分析过程
    setTimeout(() => {
      setIsAnalyzing(false)
    }, 3000)
  }

  const filteredReasons = mockAnalysisData.detailedReasons.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch = item.reason.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">欠费原因模型</h1>
          <p className="text-muted-foreground">
            基于AI智能分析的欠费原因识别与分类系统
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            导出报告
          </Button>
          <Button onClick={handleAnalyze} disabled={isAnalyzing}>
            {isAnalyzing ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Brain className="mr-2 h-4 w-4" />
            )}
            {isAnalyzing ? "分析中..." : "重新分析"}
          </Button>
        </div>
      </div>

      {/* 概览统计 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">案例总数</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalysisData.overview.totalCases}</div>
            <p className="text-xs text-muted-foreground">
              本月累计处理案例
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已分析案例</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalysisData.overview.analyzedCases}</div>
            <p className="text-xs text-muted-foreground">
              完成AI分析的案例数
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">分析准确率</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalysisData.overview.accuracy}%</div>
            <Progress value={mockAnalysisData.overview.accuracy} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">处理中</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalysisData.overview.processing}</div>
            <p className="text-xs text-muted-foreground">
              正在分析的案例
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容标签页 */}
      <Tabs defaultValue="distribution" className="space-y-4">
        <TabsList>
          <TabsTrigger value="distribution">分布分析</TabsTrigger>
          <TabsTrigger value="detailed">详细原因</TabsTrigger>
          <TabsTrigger value="trends">趋势分析</TabsTrigger>
          <TabsTrigger value="knowledge">知识库</TabsTrigger>
        </TabsList>

        {/* 分布分析标签页 */}
        <TabsContent value="distribution" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>欠费原因分类分布</CardTitle>
                <CardDescription>各类原因占比统计</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={mockAnalysisData.categories}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                    >
                      {mockAnalysisData.categories.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>分类统计</CardTitle>
                <CardDescription>详细数量统计</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={mockAnalysisData.categories}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 详细原因标签页 */}
        <TabsContent value="detailed" className="space-y-4">
          {/* 筛选控件 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="搜索原因..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="选择分类" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部分类</SelectItem>
                {mockAnalysisData.categories.map(cat => (
                  <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 详细原因列表 */}
          <Card>
            <CardHeader>
              <CardTitle>详细原因分析</CardTitle>
              <CardDescription>
                显示 {filteredReasons.length} 条结果
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredReasons.map((item) => (
                  <div key={`${item.category}-${item.reason}`} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{item.reason}</h4>
                        <Badge 
                          variant="outline" 
                          style={{ 
                            color: severityColors[item.severity as keyof typeof severityColors],
                            borderColor: severityColors[item.severity as keyof typeof severityColors]
                          }}
                        >
                          {severityLabels[item.severity as keyof typeof severityLabels]}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg font-bold">{item.count}</div>
                        <div className="text-xs text-muted-foreground">案例数</div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 趋势分析标签页 */}
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>分析趋势</CardTitle>
              <CardDescription>过去6个月的分析数据趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={mockAnalysisData.trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="cases" fill="#3b82f6" name="分析案例数" />
                  <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#10b981" name="准确率%" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 知识库标签页 */}
        <TabsContent value="knowledge" className="space-y-4">
          <div className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>欠费原因知识库</CardTitle>
                <CardDescription>
                  系统内置的欠费原因分类知识库，用于AI模型训练和分析
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* 物业服务维度 */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-blue-600">一、物业服务维度</h3>
                    <div className="space-y-2 ml-4">
                      <div>
                        <h4 className="font-medium">1. 基础服务缺陷</h4>
                        <ul className="list-disc list-inside ml-4 text-sm text-muted-foreground space-y-1">
                          <li>保洁绿化维护不足：公共区域垃圾清运不及时、绿化带枯死未补种</li>
                          <li>设施设备故障频发：电梯维修拖延、水泵房噪音超标</li>
                          <li>安防形同虚设：门禁系统损坏、监控盲区多</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">2. 服务响应滞后</h4>
                        <ul className="list-disc list-inside ml-4 text-sm text-muted-foreground space-y-1">
                          <li>报修工单超时处理（如水管爆裂48小时未修复）</li>
                          <li>投诉反馈流程冗长（某业主投诉邻居违建3个月无进展）</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 管理机制维度 */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-green-600">二、管理机制维度</h3>
                    <div className="space-y-2 ml-4">
                      <div>
                        <h4 className="font-medium">1. 费用透明度不足</h4>
                        <ul className="list-disc list-inside ml-4 text-sm text-muted-foreground space-y-1">
                          <li>公共收益未公示（如停车场收入从未公开）</li>
                          <li>物业费构成不清晰（某项目将开发商维修成本转嫁业主）</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">2. 决策参与缺失</h4>
                        <ul className="list-disc list-inside ml-4 text-sm text-muted-foreground space-y-1">
                          <li>重大事项未召开业主大会（如擅自提高停车费）</li>
                          <li>业委会选举程序违规（某小区物业操控业委会成员选举）</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 沟通互动维度 */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-amber-600">三、沟通互动维度</h3>
                    <div className="space-y-2 ml-4">
                      <div>
                        <h4 className="font-medium">1. 态度与服务意识</h4>
                        <ul className="list-disc list-inside ml-4 text-sm text-muted-foreground space-y-1">
                          <li>客服人员推诿敷衍（对漏水问题回复"这是上一任物业的遗留问题"）</li>
                          <li>管理人员沟通姿态强硬（某经理"不交费就停水"的威胁性言论）</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">2. 信息传递失效</h4>
                        <ul className="list-disc list-inside ml-4 text-sm text-muted-foreground space-y-1">
                          <li>缴费提醒方式单一（仅张贴纸质通知）</li>
                          <li>政策变更未有效触达（如垃圾分类新规未提前告知）</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 外部环境影响 */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-red-600">四、外部环境影响</h3>
                    <div className="space-y-2 ml-4">
                      <div>
                        <h4 className="font-medium">1. 经济压力传导</h4>
                        <ul className="list-disc list-inside ml-4 text-sm text-muted-foreground space-y-1">
                          <li>周边同类项目降价（竞品小区物业费低0.5元/㎡）</li>
                          <li>业主群体性失业（如制造业园区周边小区集中欠费）</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">2. 政策法规变化</h4>
                        <ul className="list-disc list-inside ml-4 text-sm text-muted-foreground space-y-1">
                          <li>政府指导价调整未同步（某市发布物业费限价令后纠纷激增）</li>
                          <li>疫情减免政策执行争议（部分业主认为应延长减免期）</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 特殊情境因素 */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-purple-600">五、特殊情境因素</h3>
                    <div className="space-y-2 ml-4">
                      <div>
                        <h4 className="font-medium">1. 历史遗留问题</h4>
                        <ul className="list-disc list-inside ml-4 text-sm text-muted-foreground space-y-1">
                          <li>房屋质量未解决（开发商承诺的维修基金未到位）</li>
                          <li>前任物业纠纷未清算（如某项目因物业交接时账目不清导致现物业被牵连）</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">2. 个体认知偏差</h4>
                        <ul className="list-disc list-inside ml-4 text-sm text-muted-foreground space-y-1">
                          <li>将开发商问题归咎物业（如精装修房墙面开裂拒缴）</li>
                          <li>错误理解物权法（认为空置房应全额减免）</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 模型配置 */}
            <Card>
              <CardHeader>
                <CardTitle>模型配置</CardTitle>
                <CardDescription>AI分析模型的参数配置与调优</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="precision-select" className="text-sm font-medium">分析精度</label>
                    <Select defaultValue="high">
                      <SelectTrigger id="precision-select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">低精度（快速）</SelectItem>
                        <SelectItem value="medium">中精度（平衡）</SelectItem>
                        <SelectItem value="high">高精度（准确）</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confidence-select" className="text-sm font-medium">置信度阈值</label>
                    <Select defaultValue="0.8">
                      <SelectTrigger id="confidence-select">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.6">60%</SelectItem>
                        <SelectItem value="0.7">70%</SelectItem>
                        <SelectItem value="0.8">80%</SelectItem>
                        <SelectItem value="0.9">90%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4">
                  <Button>
                    <Settings className="mr-2 h-4 w-4" />
                    保存配置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}