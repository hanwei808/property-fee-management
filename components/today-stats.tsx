import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Target, Clock, CheckCircle2, AlertTriangle, TrendingUp, Phone } from "lucide-react"

export function TodayStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">催收目标</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">¥180,000</div>
          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">已完成</span>
              <span className="font-medium">¥128,450</span>
            </div>
            <Progress value={71.4} className="h-2" />
            <p className="text-xs text-muted-foreground">完成度 71.4% | 还需 ¥51,550</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">催单进度</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">15/23</div>
          <div className="space-y-2 mt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-chart-3">已完成</span>
              <span className="text-chart-4">进行中</span>
              <span className="text-muted-foreground">待处理</span>
            </div>
            <div className="flex gap-1">
              <div className="h-2 bg-chart-3 rounded flex-1" style={{ flex: 15 }}></div>
              <div className="h-2 bg-chart-4 rounded flex-1" style={{ flex: 3 }}></div>
              <div className="h-2 bg-muted rounded flex-1" style={{ flex: 5 }}></div>
            </div>
            <p className="text-xs text-muted-foreground">65.2% 完成率 | 平均用时 12分钟</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">已联系客户</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-chart-3">12户</div>
          <div className="space-y-1 mt-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                <Phone className="h-3 w-3 mr-1" />
                电话 8户
              </Badge>
              <Badge variant="secondary" className="text-xs">
                短信 4户
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline mr-1 h-3 w-3" />
              成功率较昨日 +8.5%
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">风险预警</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-chart-4">3户</div>
          <div className="space-y-1 mt-2">
            <div className="flex items-center gap-2">
              <Badge variant="destructive" className="text-xs">
                高风险 1户
              </Badge>
              <Badge variant="outline" className="text-xs border-chart-4 text-chart-4">
                中风险 2户
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">需要重点关注，建议优先处理</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
