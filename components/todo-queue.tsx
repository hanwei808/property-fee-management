import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Phone,
  MessageSquare,
  Mail,
  MoreHorizontal,
  Eye,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Target,
} from "lucide-react"

const todoItems = [
  {
    id: 1,
    owner: "王女士",
    room: "A座1201",
    phone: "138****8888",
    amount: 3200,
    overdueDays: 15,
    priority: "高",
    reason: "服务质量问题",
    successRate: 92,
    lastContact: "2天前",
    aiSuggestion: "建议先处理服务投诉，再进行温和催费",
    riskLevel: "低",
    paymentHistory: "良好",
    preferredChannel: "微信",
  },
  {
    id: 2,
    owner: "李先生",
    room: "B座0805",
    phone: "139****9999",
    amount: 1800,
    overdueDays: 8,
    priority: "中",
    reason: "经济困难",
    successRate: 78,
    lastContact: "1天前",
    aiSuggestion: "推荐分期付款方案，提供绿色通道",
    riskLevel: "中",
    paymentHistory: "一般",
    preferredChannel: "电话",
  },
  {
    id: 3,
    owner: "张女士",
    room: "C座1506",
    phone: "137****7777",
    amount: 2400,
    overdueDays: 3,
    priority: "高",
    reason: "忘记缴费",
    successRate: 95,
    lastContact: "未联系",
    aiSuggestion: "简单提醒即可，成功率极高",
    riskLevel: "低",
    paymentHistory: "优秀",
    preferredChannel: "短信",
  },
  {
    id: 4,
    owner: "陈先生",
    room: "D座2203",
    phone: "136****6666",
    amount: 4500,
    overdueDays: 25,
    priority: "高",
    reason: "恶意拖欠",
    successRate: 45,
    lastContact: "5天前",
    aiSuggestion: "建议启动法务程序，加强催收力度",
    riskLevel: "高",
    paymentHistory: "差",
    preferredChannel: "上门",
  },
]

export function TodoQueue() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-chart-1" />
              欠缴业主
            </CardTitle>
            <CardDescription>基于成功率×紧急度×金额的AI优先级算法</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">共 {todoItems.length} 户</Badge>
            <Button size="sm">批量操作</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {todoItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <Checkbox className="mt-1" />
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`/generic-placeholder-graphic.png?key=${item.id}`} />
                  <AvatarFallback>{item.owner.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{item.owner}</h4>
                    <Badge
                      variant={
                        item.priority === "高" ? "destructive" : item.priority === "中" ? "default" : "secondary"
                      }
                    >
                      {item.priority}优先级
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        item.riskLevel === "高"
                          ? "border-destructive text-destructive"
                          : item.riskLevel === "中"
                            ? "border-chart-4 text-chart-4"
                            : "border-chart-3 text-chart-3"
                      }
                    >
                      {item.riskLevel}风险
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.room} | {item.phone} | 逾期 {item.overdueDays} 天
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">欠费原因:</span> {item.reason}
                  </p>
                </div>
              </div>

              <div className="text-right space-y-1">
                <p className="text-lg font-bold text-destructive">¥{item.amount.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-sm text-chart-3">
                  <TrendingUp className="h-3 w-3" />
                  成功率 {item.successRate}%
                </div>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-3 space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-chart-1 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">AI建议策略</p>
                  <p className="text-sm text-muted-foreground">{item.aiSuggestion}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>上次联系: {item.lastContact}</span>
                <span>偏好渠道: {item.preferredChannel}</span>
                <span>历史记录: {item.paymentHistory}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button size="sm" variant="default">
                  <Phone className="h-4 w-4 mr-1" />
                  立即催费
                </Button>
                <Button size="sm" variant="outline">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  发送短信
                </Button>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-1" />
                  360°视图
                </Button>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Mail className="mr-2 h-4 w-4" />
                    发送邮件
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Clock className="mr-2 h-4 w-4" />
                    延后处理
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    标记完成
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}

        <div className="flex items-center justify-center pt-4">
          <Button variant="outline">加载更多 (还有19户)</Button>
        </div>
      </CardContent>
    </Card>
  )
}
