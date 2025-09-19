import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  Users,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Brain,
} from "lucide-react"

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-balance">智能催收工作台</h1>
          <p className="text-muted-foreground text-pretty">基于AI的智能化催收决策与执行平台</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-chart-3">
            <CheckCircle className="mr-1 h-3 w-3" />
            系统正常
          </Badge>
          <Badge variant="outline" className="text-chart-1">
            <Zap className="mr-1 h-3 w-3" />
            AI引擎运行中
          </Badge>
        </div>
      </div>

      {/* 核心指标卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日回款金额</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">¥128,450</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline mr-1 h-3 w-3" />
              较昨日 +12.5%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待催收户数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-4">1,247</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline mr-1 h-3 w-3" />
              较昨日 -8.2%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">催收成功率</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-1">87.3%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline mr-1 h-3 w-3" />
              较上周 +3.1%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">催收合规风险</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-chart-3">低风险</div>
            <p className="text-xs text-muted-foreground">
              <CheckCircle className="inline mr-1 h-3 w-3" />
              0个高风险事件
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 主要功能区域 */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* 催收管理 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-chart-1" />
              催收管理
            </CardTitle>
            <CardDescription>AI智能排序，优先处理高价值高成功率案件</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                name: "王女士",
                room: "A座1201",
                amount: "¥3,200",
                priority: "高",
                reason: "服务质量问题",
                success: "92%",
              },
              { name: "李先生", room: "B座0805", amount: "¥1,800", priority: "中", reason: "经济困难", success: "78%" },
              { name: "张女士", room: "C座1506", amount: "¥2,400", priority: "高", reason: "忘记缴费", success: "95%" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Badge variant={item.priority === "高" ? "destructive" : "secondary"}>{item.priority}</Badge>
                  <div>
                    <p className="font-medium">
                      {item.name} - {item.room}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.reason}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{item.amount}</p>
                  <p className="text-sm text-chart-3">成功率 {item.success}</p>
                </div>
              </div>
            ))}
            <Button className="w-full bg-transparent" variant="outline">
              查看全部待办 (23)
            </Button>
          </CardContent>
        </Card>

        {/* AI分析洞察 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-chart-2" />
              AI分析洞察
            </CardTitle>
            <CardDescription>基于历史数据的智能分析与策略建议</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">本月回款目标完成度</span>
                <span className="text-sm font-medium">73.2%</span>
              </div>
              <Progress value={73.2} className="h-2" />
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">策略建议</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• 建议优先处理A座高价值业主，预计提升15%回款率</p>
                <p>• 服务质量问题案件建议先整改后催费</p>
                <p>• 经济困难业主可推荐分期付款方案</p>
              </div>
            </div>

            <Button className="w-full">查看详细分析报告</Button>
          </CardContent>
        </Card>
      </div>

      {/* 快速操作区域 */}
      <Card>
        <CardHeader>
          <CardTitle>快速操作</CardTitle>
          <CardDescription>常用功能快速入口</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Zap className="h-6 w-6" />
              批量催费
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Brain className="h-6 w-6" />
              AI话术生成
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Users className="h-6 w-6" />
              业主360°视图
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Clock className="h-6 w-6" />
              实时监控
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
