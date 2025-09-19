import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Brain, MessageSquare, Phone, Mail, FileText, BarChart3, Clock } from "lucide-react"

export function QuickActions() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-chart-1" />
            快速操作
          </CardTitle>
          <CardDescription>常用功能一键执行</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start bg-transparent" variant="outline">
            <Brain className="mr-2 h-4 w-4" />
            AI话术生成
            <Badge className="ml-auto">智能</Badge>
          </Button>
          <Button className="w-full justify-start bg-transparent" variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            批量发送短信
            <Badge variant="secondary" className="ml-auto">
              23户
            </Badge>
          </Button>
          <Button className="w-full justify-start bg-transparent" variant="outline">
            <Phone className="mr-2 h-4 w-4" />
            一键拨号
            <Badge variant="secondary" className="ml-auto">
              高优先级
            </Badge>
          </Button>
          <Button className="w-full justify-start bg-transparent" variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            邮件通知
          </Button>
          <Button className="w-full justify-start bg-transparent" variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            生成催费函
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-chart-2" />
            实时监控
          </CardTitle>
          <CardDescription>当前系统状态</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">在线用户</span>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-chart-3 rounded-full"></div>
              <span className="text-sm font-medium">12人</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">处理中任务</span>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-chart-4 rounded-full"></div>
              <span className="text-sm font-medium">8个</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">系统响应</span>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-chart-3 rounded-full"></div>
              <span className="text-sm font-medium">正常</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">AI引擎</span>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-chart-1 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">运行中</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-chart-4" />
            今日提醒
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm space-y-2">
            <div className="flex items-start gap-2">
              <div className="h-2 w-2 bg-destructive rounded-full mt-2"></div>
              <div>
                <p className="font-medium">高风险案件处理</p>
                <p className="text-muted-foreground text-xs">D座2203陈先生需要法务介入</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-2 w-2 bg-chart-4 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">合规检查</p>
                <p className="text-muted-foreground text-xs">今日催费记录需要审核</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-2 w-2 bg-chart-3 rounded-full mt-2"></div>
              <div>
                <p className="font-medium">系统更新</p>
                <p className="text-muted-foreground text-xs">AI模型已优化，成功率提升3%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
